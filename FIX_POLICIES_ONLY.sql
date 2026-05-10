-- COPY AND RUN THIS IN SUPABASE SQL EDITOR
-- This fixes the Row Level Security policies to allow admin operations

-- Drop existing restrictive policies
drop policy if exists "Public routes are viewable by everyone" on public.trinity_routes;
drop policy if exists "Public contact info is viewable by everyone" on public.trinity_contact_info;
drop policy if exists "Public payment methods are viewable by everyone" on public.trinity_payment_methods;
drop policy if exists "Public payment settings viewable by everyone" on public.trinity_payment_settings;
drop policy if exists "Anyone can create bookings" on public.trinity_bookings;
drop policy if exists "Bookings viewable by everyone" on public.trinity_bookings;
drop policy if exists "Enable all access for payment settings" on public.trinity_payment_settings;

-- Create new policies that allow all operations
create policy "Enable all access for routes" on public.trinity_routes for all using (true);
create policy "Enable all access for contact info" on public.trinity_contact_info for all using (true);
create policy "Enable all access for payment methods" on public.trinity_payment_methods for all using (true);
create policy "Enable all access for payment settings" on public.trinity_payment_settings for all using (true);
create policy "Enable all access for bookings" on public.trinity_bookings for all using (true);
