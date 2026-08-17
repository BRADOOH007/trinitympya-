-- Add VIP price column to simba_routes table
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/awowbixrozodsdrovswr/sql

ALTER TABLE simba_routes 
ADD COLUMN IF NOT EXISTS vip_price TEXT;

ALTER TABLE simba_routes 
ADD COLUMN IF NOT EXISTS executive_price TEXT;
