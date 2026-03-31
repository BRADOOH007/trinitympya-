# Quick Fix: Database Connection Issue

## Problem
The app is trying to connect to Supabase (`https://awowbixrozodsdrovswr.supabase.co`) but you created the tables in Neon database.

## Solution Options

### Option 1: Run SQL in Supabase (RECOMMENDED - EASIEST)

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your project: `awowbixrozodsdrovswr`
3. Go to SQL Editor
4. Copy and paste the contents of `neon_trinity_schema.sql`
5. Click "Run"
6. Refresh your browser at `http://localhost:5173/admin-dashboard`
7. Try adding a route again

### Option 2: Use Neon Database Directly

We need to create a direct PostgreSQL connection to Neon instead of using Supabase client.

This requires:
1. Installing `pg` package
2. Creating a new database client
3. Updating all queries

**This is more complex and not recommended for now.**

### Option 3: Use Supabase with Neon as Foreign Data Wrapper

This is advanced and requires Supabase Pro plan.

## Recommended Action: Option 1

**Just run the same SQL in your Supabase database!**

1. Open Supabase: https://supabase.com/dashboard/project/awowbixrozodsdrovswr/sql
2. Paste the SQL from `neon_trinity_schema.sql`
3. Run it
4. Done!

The tables will be created in Supabase and everything will work immediately.
