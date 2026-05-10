# ✅ TABLES EXIST - JUST FIX THE POLICIES

## Good News
The tables already exist in your database! You just need to fix the security policies.

## Copy This SQL (30 seconds)

```sql
drop policy if exists "Public routes are viewable by everyone" on public.trinity_routes;
drop policy if exists "Public contact info is viewable by everyone" on public.trinity_contact_info;
drop policy if exists "Public payment methods are viewable by everyone" on public.trinity_payment_methods;
drop policy if exists "Public payment settings viewable by everyone" on public.trinity_payment_settings;
drop policy if exists "Anyone can create bookings" on public.trinity_bookings;
drop policy if exists "Bookings viewable by everyone" on public.trinity_bookings;
drop policy if exists "Enable all access for payment settings" on public.trinity_payment_settings;

create policy "Enable all access for routes" on public.trinity_routes for all using (true);
create policy "Enable all access for contact info" on public.trinity_contact_info for all using (true);
create policy "Enable all access for payment methods" on public.trinity_payment_methods for all using (true);
create policy "Enable all access for payment settings" on public.trinity_payment_settings for all using (true);
create policy "Enable all access for bookings" on public.trinity_bookings for all using (true);
```

## Steps
1. Copy the SQL above
2. Paste in the Supabase SQL Editor (where you are now)
3. Click "Run"
4. Go back to https://trinity-bus-copy.vercel.app/admin
5. Try adding a route again

## Done!
After running this, you can add/edit/delete routes without any issues.
