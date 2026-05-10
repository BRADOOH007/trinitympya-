-- Add VIP price column to trinity_routes table
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/awowbixrozodsdrovswr/sql

ALTER TABLE trinity_routes 
ADD COLUMN IF NOT EXISTS vip_price TEXT;
