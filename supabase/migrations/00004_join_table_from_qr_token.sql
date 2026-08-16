CREATE OR REPLACE FUNCTION join_table_session_by_token(
    p_table_token UUID,
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

    IF trim(coalesce(p_guest_name, '')) = '' THEN
        RAISE EXCEPTION 'Guest name is required';
    END IF;

    SELECT * INTO v_table
    FROM restaurant_tables
    WHERE qr_token = p_table_token AND active = TRUE
    LIMIT 1;

    IF v_table.id IS NULL THEN
        RAISE EXCEPTION 'Invalid or inactive table QR token';
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

REVOKE ALL ON FUNCTION join_table_session_by_token(UUID, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION join_table_session_by_token(UUID, TEXT) TO authenticated;
