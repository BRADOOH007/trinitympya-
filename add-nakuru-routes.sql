-- Add Nakuru routes to trinity_routes table
-- Run this in your Supabase SQL Editor if the routes don't appear automatically

INSERT INTO public.trinity_routes (origin, country_origin, destination, country_dest, price, duration, country)
VALUES
('Nakuru', 'Kenya', 'Kampala', 'Uganda', 'KSh 3,000', '10 hours', 'Uganda'),
('Nakuru', 'Kenya', 'Jinja', 'Uganda', 'KSh 2,500', '8 hours', 'Uganda'),
('Nakuru', 'Kenya', 'Kigali', 'Rwanda', 'KSh 6,500', '13 hours', 'Rwanda')
ON CONFLICT DO NOTHING;
