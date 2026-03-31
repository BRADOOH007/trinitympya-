-- Trinity Express Bus Booking System
-- Database Schema for Neon PostgreSQL (Shared Database)
-- All tables use 'trinity_' prefix to avoid conflicts with other projects

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Routes Table
CREATE TABLE IF NOT EXISTS trinity_routes (
  id BIGSERIAL PRIMARY KEY,
  origin TEXT NOT NULL,
  country_origin TEXT,
  destination TEXT NOT NULL,
  country_dest TEXT,
  price TEXT NOT NULL,
  duration TEXT,
  country TEXT,
  image TEXT,
  rating NUMERIC,
  next_bus TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Bookings Table
CREATE TABLE IF NOT EXISTS trinity_bookings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  route_id BIGINT REFERENCES trinity_routes(id) ON DELETE SET NULL,
  origin TEXT,
  destination TEXT,
  date DATE,
  time TEXT,
  seat INTEGER,
  passengers INTEGER,
  passenger_name TEXT,
  phone_number TEXT,
  total_price TEXT,
  payment_method TEXT,
  status TEXT DEFAULT 'pending',
  device_type TEXT,
  user_location TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. Contact Info Table
CREATE TABLE IF NOT EXISTS trinity_contact_info (
  id SERIAL PRIMARY KEY,
  phone_ke TEXT,
  phone_ug TEXT,
  phone_rw TEXT,
  whatsapp TEXT,
  email TEXT,
  address_ke TEXT,
  address_ug TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 4. Payment Methods Table
CREATE TABLE IF NOT EXISTS trinity_payment_methods (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT,
  account_number TEXT,
  account_name TEXT,
  instructions TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 5. Payment Settings Table
CREATE TABLE IF NOT EXISTS trinity_payment_settings (
  id SERIAL PRIMARY KEY,
  provider TEXT NOT NULL DEFAULT 'intasend',
  public_key TEXT,
  secret_key TEXT,
  is_live BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_trinity_routes_origin ON trinity_routes(origin);
CREATE INDEX IF NOT EXISTS idx_trinity_routes_destination ON trinity_routes(destination);
CREATE INDEX IF NOT EXISTS idx_trinity_bookings_status ON trinity_bookings(status);
CREATE INDEX IF NOT EXISTS idx_trinity_bookings_date ON trinity_bookings(date);
CREATE INDEX IF NOT EXISTS idx_trinity_bookings_created_at ON trinity_bookings(created_at);

-- Insert default contact info if not exists
INSERT INTO trinity_contact_info (phone_ke, phone_ug, phone_rw, whatsapp, email, address_ke, address_ug)
SELECT '+254 751 494564', '+256 747 180552', '+250 735 589845', '+254 751 494564', 
       'Trinityexpressbus@gmail.com', 'Duruma Road, Nairobi, Kenya', 'Namirembe Road, Bakuli, Kampala'
WHERE NOT EXISTS (SELECT 1 FROM trinity_contact_info LIMIT 1);

-- Insert default payment method if not exists
INSERT INTO trinity_payment_methods (name, type, account_number, account_name, instructions)
SELECT 'M-Pesa', 'paybill', '400200', 'Trinity Express', 'Enter your booking reference as account number'
WHERE NOT EXISTS (SELECT 1 FROM trinity_payment_methods LIMIT 1);

-- Insert default payment settings if not exists
INSERT INTO trinity_payment_settings (provider, public_key, is_live)
SELECT 'intasend', 'ISPubKey_test_800c1e69-0292-426c-a811-58079737154d', FALSE
WHERE NOT EXISTS (SELECT 1 FROM trinity_payment_settings LIMIT 1);

-- Insert sample routes if table is empty
INSERT INTO trinity_routes (origin, country_origin, destination, country_dest, price, duration, country, image, rating, next_bus)
SELECT * FROM (VALUES
  ('Nairobi', 'Kenya', 'Kampala', 'Uganda', 'KSh 3,500', '12 hours', 'Uganda', '/assets/kampala.jpg', 4.8, '08:00 AM'),
  ('Nairobi', 'Kenya', 'Kigali', 'Rwanda', 'KSh 7,000', '15 hours', 'Rwanda', '/assets/nairobi.jpg', 4.9, '07:30 AM'),
  ('Nairobi', 'Kenya', 'Goma', 'DR Congo', 'KSh 8,000', '19 hours', 'DR Congo', '/assets/goma.jpg', 4.6, '05:00 AM'),
  ('Nairobi', 'Kenya', 'Juba', 'South Sudan', 'KSh 8,500', '14 hours', 'South Sudan', '/assets/juba.jpg', 4.7, '06:00 AM'),
  ('Nairobi', 'Kenya', 'Bukavu', 'DR Congo', 'KSh 7,500', '20 hours', 'DR Congo', '/assets/bukavu.webp', 4.5, '06:30 AM'),
  ('Kampala', 'Uganda', 'Nairobi', 'Kenya', 'UGX 100,000', '12 hours', 'Kenya', '/assets/nairobi.jpg', 4.8, '08:00 AM'),
  ('Kampala', 'Uganda', 'Kigali', 'Rwanda', 'UGX 80,000', '9 hours', 'Rwanda', '/assets/kampala.jpg', 4.7, '09:00 AM'),
  ('Kigali', 'Rwanda', 'Nairobi', 'Kenya', 'RWF 70,000', '15 hours', 'Kenya', '/assets/nairobi.jpg', 4.9, '07:00 AM')
) AS v(origin, country_origin, destination, country_dest, price, duration, country, image, rating, next_bus)
WHERE NOT EXISTS (SELECT 1 FROM trinity_routes LIMIT 1);

-- Grant permissions (adjust as needed for your setup)
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO neondb_owner;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO neondb_owner;
