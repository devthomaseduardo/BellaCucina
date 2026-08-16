CREATE POLICY "Staff can read restaurant tables"
ON restaurant_tables FOR SELECT
USING (is_staff_session());
