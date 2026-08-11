-- Supabase Migration: Initial Schema for Bella Cucina

-- 1. Create tables

-- Menu Categories
CREATE TABLE menu_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_pt TEXT NOT NULL,
    name_en TEXT NOT NULL,
    name_it TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Menu Items
CREATE TABLE menu_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES menu_categories(id) ON DELETE CASCADE,
    name_pt TEXT NOT NULL,
    name_en TEXT NOT NULL,
    name_it TEXT NOT NULL,
    description_pt TEXT NOT NULL,
    description_en TEXT NOT NULL,
    description_it TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    image_url TEXT,
    popular BOOLEAN DEFAULT FALSE,
    dietary TEXT[], -- e.g., ['vegetarian', 'gluten-free']
    "order" INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    table_number TEXT NOT NULL,
    customer_name TEXT,
    status TEXT NOT NULL DEFAULT 'pending', -- pending, preparing, ready, delivered, cancelled
    total_price NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order Items
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    menu_item_id UUID REFERENCES menu_items(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    quantity INTEGER NOT NULL,
    image_url TEXT,
    category TEXT,
    notes TEXT,
    customer_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reservations
CREATE TABLE reservations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    party_size INTEGER NOT NULL,
    datetime_iso TIMESTAMP WITH TIME ZONE NOT NULL,
    special_requests TEXT,
    status TEXT NOT NULL DEFAULT 'confirmed',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Row Level Security (RLS)

-- Enable RLS
ALTER TABLE menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- Menu is public to read
CREATE POLICY "Menu categories are public to read" ON menu_categories FOR SELECT USING (true);
CREATE POLICY "Menu items are public to read" ON menu_items FOR SELECT USING (true);

-- Anyone can insert orders and order items (customers scanning QR code)
CREATE POLICY "Anyone can insert orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can insert order items" ON order_items FOR INSERT WITH CHECK (true);

-- Anyone can insert reservations
CREATE POLICY "Anyone can insert reservations" ON reservations FOR INSERT WITH CHECK (true);

-- Only authenticated users (Waiters/Admins) can read and update orders
CREATE POLICY "Authenticated users can read orders" ON orders FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update orders" ON orders FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can read order items" ON order_items FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update order items" ON order_items FOR UPDATE USING (auth.role() = 'authenticated');

-- Authenticated users can manage reservations
CREATE POLICY "Authenticated users can manage reservations" ON reservations FOR ALL USING (auth.role() = 'authenticated');

-- Authenticated users can manage menu
CREATE POLICY "Authenticated users can manage menu categories" ON menu_categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage menu items" ON menu_items FOR ALL USING (auth.role() = 'authenticated');

-- Function to automatically update 'updated_at' on orders
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_orders_modtime
    BEFORE UPDATE ON orders
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();
