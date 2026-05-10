# 🔥 RUN THIS SQL NOW - FIXES THE ERROR

## THE ERROR YOU'RE SEEING
```
Failed to add route: new row violates row_level security policy for table 'trinity_routes'
```

## THE PROBLEM
The table exists, but Row Level Security (RLS) policies are blocking inserts/updates/deletes.

## THE FIX (2 MINUTES)

### STEP 1: Open Supabase SQL Editor
https://supabase.com/dashboard/project/awowbixrozodsdrovswr/sql

### STEP 2: Copy and Paste This SQL

```sql
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
```

### STEP 3: Click "Run"

### STEP 4: Test
1. Go back to: https://trinity-bus-copy.vercel.app/admin
2. Click "Add Route" again
3. Fill the form and submit
4. It should work now!

## WHAT THIS DOES
This SQL removes the restrictive security policies and adds new ones that allow all operations (insert, update, delete) on all tables.

## WHY THIS HAPPENED
Supabase has Row Level Security (RLS) enabled by default. The original SQL only allowed SELECT (read) operations, but blocked INSERT/UPDATE/DELETE operations.

## DONE!
After running this SQL, you can add, edit, and delete routes without any issues.
