-- Anonymous customers use authenticated JWTs, so generic auth.role() checks are not enough.
-- A staff session is a regular authenticated account, not an anonymous Supabase user.

CREATE OR REPLACE FUNCTION is_staff_session()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT auth.uid() IS NOT NULL
    AND coalesce((auth.jwt() ->> 'is_anonymous')::boolean, false) = false;
$$;

REVOKE ALL ON FUNCTION is_staff_session() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION is_staff_session() TO authenticated;

DROP POLICY IF EXISTS "Authenticated users can read orders" ON orders;
DROP POLICY IF EXISTS "Authenticated users can update orders" ON orders;
DROP POLICY IF EXISTS "Authenticated users can read order items" ON order_items;
DROP POLICY IF EXISTS "Authenticated users can update order items" ON order_items;
DROP POLICY IF EXISTS "Authenticated users can manage reservations" ON reservations;
DROP POLICY IF EXISTS "Authenticated users can manage menu categories" ON menu_categories;
DROP POLICY IF EXISTS "Authenticated users can manage menu items" ON menu_items;
DROP POLICY IF EXISTS "Authenticated staff can read table sessions" ON table_sessions;
DROP POLICY IF EXISTS "Authenticated staff can read table guests" ON table_guests;

CREATE POLICY "Staff can read all orders"
ON orders FOR SELECT
USING (is_staff_session());

CREATE POLICY "Staff can update all orders"
ON orders FOR UPDATE
USING (is_staff_session())
WITH CHECK (is_staff_session());

CREATE POLICY "Staff can read all order items"
ON order_items FOR SELECT
USING (is_staff_session());

CREATE POLICY "Staff can update all order items"
ON order_items FOR UPDATE
USING (is_staff_session())
WITH CHECK (is_staff_session());

CREATE POLICY "Staff can manage reservations"
ON reservations FOR ALL
USING (is_staff_session())
WITH CHECK (is_staff_session());

CREATE POLICY "Staff can manage menu categories"
ON menu_categories FOR ALL
USING (is_staff_session())
WITH CHECK (is_staff_session());

CREATE POLICY "Staff can manage menu items"
ON menu_items FOR ALL
USING (is_staff_session())
WITH CHECK (is_staff_session());

CREATE POLICY "Staff can read table sessions"
ON table_sessions FOR SELECT
USING (is_staff_session());

CREATE POLICY "Staff can update table sessions"
ON table_sessions FOR UPDATE
USING (is_staff_session())
WITH CHECK (is_staff_session());

CREATE POLICY "Staff can read table guests"
ON table_guests FOR SELECT
USING (is_staff_session());

-- Customers may only read the orders and items belonging to a session they joined.
-- This prevents a new occupation of the same physical table from seeing a closed previous session.
