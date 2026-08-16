-- Table sessions, guest ownership and live bill support

CREATE TABLE IF NOT EXISTS restaurant_tables (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    number TEXT NOT NULL UNIQUE,
    qr_token UUID NOT NULL UNIQUE DEFAULT gen_random_uuid(),
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS table_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    table_id UUID NOT NULL REFERENCES restaurant_tables(id) ON DELETE RESTRICT,
    status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'payment_pending', 'closed')),
    opened_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    closed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS one_open_session_per_table
ON table_sessions(table_id)
WHERE status <> 'closed';

CREATE TABLE IF NOT EXISTS table_guests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES table_sessions(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    UNIQUE(session_id, user_id)
);

ALTER TABLE orders ADD COLUMN IF NOT EXISTS session_id UUID REFERENCES table_sessions(id) ON DELETE RESTRICT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS guest_id UUID REFERENCES table_guests(id) ON DELETE SET NULL;

ALTER TABLE order_items ADD COLUMN IF NOT EXISTS session_id UUID REFERENCES table_sessions(id) ON DELETE RESTRICT;
ALTER TABLE order_items ADD COLUMN IF NOT EXISTS guest_id UUID REFERENCES table_guests(id) ON DELETE SET NULL;
ALTER TABLE order_items ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'pending'
CHECK (status IN ('pending', 'preparing', 'ready', 'delivered', 'cancelled'));

CREATE INDEX IF NOT EXISTS idx_orders_session_id ON orders(session_id);
CREATE INDEX IF NOT EXISTS idx_order_items_session_id ON order_items(session_id);
CREATE INDEX IF NOT EXISTS idx_order_items_guest_id ON order_items(guest_id);
CREATE INDEX IF NOT EXISTS idx_table_guests_user_id ON table_guests(user_id);

ALTER TABLE restaurant_tables ENABLE ROW LEVEL SECURITY;
ALTER TABLE table_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE table_guests ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION join_table_session(
    p_table_number TEXT,
    p_guest_name TEXT
)
RETURNS TABLE(session_id UUID, guest_id UUID, table_number TEXT)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_user_id UUID := auth.uid();
    v_table restaurant_tables%ROWTYPE;
    v_session table_sessions%ROWTYPE;
    v_guest table_guests%ROWTYPE;
BEGIN
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'Authentication required';
    END IF;

    IF trim(coalesce(p_table_number, '')) = '' OR trim(coalesce(p_guest_name, '')) = '' THEN
        RAISE EXCEPTION 'Table number and guest name are required';
    END IF;

    SELECT * INTO v_table
    FROM restaurant_tables
    WHERE number = trim(p_table_number) AND active = TRUE
    LIMIT 1;

    IF v_table.id IS NULL THEN
        INSERT INTO restaurant_tables(number)
        VALUES (trim(p_table_number))
        RETURNING * INTO v_table;
    END IF;

    SELECT * INTO v_session
    FROM table_sessions
    WHERE table_id = v_table.id AND status <> 'closed'
    ORDER BY opened_at DESC
    LIMIT 1;

    IF v_session.id IS NULL THEN
        INSERT INTO table_sessions(table_id)
        VALUES (v_table.id)
        RETURNING * INTO v_session;
    END IF;

    SELECT * INTO v_guest
    FROM table_guests
    WHERE session_id = v_session.id AND user_id = v_user_id
    LIMIT 1;

    IF v_guest.id IS NULL THEN
        INSERT INTO table_guests(session_id, user_id, name)
        VALUES (v_session.id, v_user_id, trim(p_guest_name))
        RETURNING * INTO v_guest;
    ELSIF v_guest.name IS DISTINCT FROM trim(p_guest_name) THEN
        UPDATE table_guests
        SET name = trim(p_guest_name)
        WHERE id = v_guest.id
        RETURNING * INTO v_guest;
    END IF;

    RETURN QUERY SELECT v_session.id, v_guest.id, v_table.number;
END;
$$;

REVOKE ALL ON FUNCTION join_table_session(TEXT, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION join_table_session(TEXT, TEXT) TO authenticated;

CREATE POLICY "Guests can read their memberships"
ON table_guests FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "Guests can read their active table session"
ON table_sessions FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM table_guests g
        WHERE g.session_id = table_sessions.id
          AND g.user_id = auth.uid()
    )
);

CREATE POLICY "Guests can read orders from their session"
ON orders FOR SELECT
USING (
    session_id IS NOT NULL AND EXISTS (
        SELECT 1 FROM table_guests g
        WHERE g.session_id = orders.session_id
          AND g.user_id = auth.uid()
    )
);

CREATE POLICY "Guests can read items from their session"
ON order_items FOR SELECT
USING (
    session_id IS NOT NULL AND EXISTS (
        SELECT 1 FROM table_guests g
        WHERE g.session_id = order_items.session_id
          AND g.user_id = auth.uid()
    )
);

DROP POLICY IF EXISTS "Anyone can insert orders" ON orders;
DROP POLICY IF EXISTS "Anyone can insert order items" ON order_items;

CREATE POLICY "Guests can insert orders in their session"
ON orders FOR INSERT
WITH CHECK (
    auth.role() = 'authenticated'
    AND session_id IS NOT NULL
    AND guest_id IS NOT NULL
    AND EXISTS (
        SELECT 1 FROM table_guests g
        WHERE g.id = orders.guest_id
          AND g.session_id = orders.session_id
          AND g.user_id = auth.uid()
    )
);

CREATE POLICY "Guests can insert items in their session"
ON order_items FOR INSERT
WITH CHECK (
    auth.role() = 'authenticated'
    AND session_id IS NOT NULL
    AND EXISTS (
        SELECT 1 FROM table_guests g
        WHERE g.session_id = order_items.session_id
          AND g.user_id = auth.uid()
    )
);

CREATE POLICY "Authenticated staff can read table sessions"
ON table_sessions FOR SELECT
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated staff can read table guests"
ON table_guests FOR SELECT
USING (auth.role() = 'authenticated');

-- Add realtime support. Safe to rerun when publications already contain these tables.
DO $$
BEGIN
    BEGIN
        ALTER PUBLICATION supabase_realtime ADD TABLE orders;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END;
    BEGIN
        ALTER PUBLICATION supabase_realtime ADD TABLE order_items;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END;
    BEGIN
        ALTER PUBLICATION supabase_realtime ADD TABLE table_sessions;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END;
END $$;

-- Seed demo tables. Production QR codes should use restaurant_tables.qr_token.
INSERT INTO restaurant_tables(number)
SELECT value::TEXT
FROM generate_series(1, 30) AS value
ON CONFLICT (number) DO NOTHING;
