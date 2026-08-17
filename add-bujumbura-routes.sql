-- Add Bujumbura - Nairobi Routes
-- Run this SQL in your Supabase SQL Editor

-- Check if routes already exist
SELECT * FROM public.simba_routes 
WHERE (origin = 'Bujumbura' AND destination = 'Nairobi') 
   OR (origin = 'Nairobi' AND destination = 'Bujumbura');

-- Insert Bujumbura to Nairobi route (if not exists)
INSERT INTO public.simba_routes (
  origin, 
  country_origin, 
  destination, 
  country_dest, 
  price, 
  vip_price,
  duration, 
  country, 
  image, 
  rating, 
  next_bus
)
VALUES (
  'Bujumbura',
  'Burundi',
  'Nairobi',
  'Kenya',
  'BIF 200,000',
  NULL,
  '16 hours',
  'Kenya',
  '/assets/nairobi.jpg',
  4.7,
  '06:00 AM, 12:00 PM'
)
ON CONFLICT DO NOTHING;

-- Insert Nairobi to Bujumbura route (reverse - if not exists)
INSERT INTO public.simba_routes (
  origin, 
  country_origin, 
  destination, 
  country_dest, 
  price, 
  vip_price,
  duration, 
  country, 
  image, 
  rating, 
  next_bus
)
VALUES (
  'Nairobi',
  'Kenya',
  'Bujumbura',
  'Burundi',
  'KSh 7,500',
  'KSh 8,500',
  '16 hours',
  'Burundi',
  '/assets/bukavu.webp',
  4.7,
  '06:00 AM, 12:00 PM'
)
ON CONFLICT DO NOTHING;

-- Verify the routes were added
SELECT id, origin, destination, price, vip_price, next_bus 
FROM public.simba_routes 
WHERE (origin = 'Bujumbura' AND destination = 'Nairobi') 
   OR (origin = 'Nairobi' AND destination = 'Bujumbura')
ORDER BY origin;
