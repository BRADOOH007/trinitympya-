# Simple Fix: Run SQL in Supabase

## The Problem

Neon's serverless driver doesn't work well in the browser. The easiest solution is to use your existing Supabase database.

## Quick Fix (2 minutes):

### Step 1: Go to Supabase SQL Editor
Open this link:
```
https://supabase.com/dashboard/project/awowbixrozodsdrovswr/sql
```

### Step 2: Copy the SQL
Open the file `neon_trinity_schema.sql` in your editor and copy ALL the SQL.

### Step 3: Paste and Run
1. Paste the SQL into the Supabase SQL Editor
2. Click "Run"
3. Wait for it to complete

### Step 4: Refresh Browser
1. Go back to your app: `http://localhost:5173`
2. Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
3. Routes should load now!

## Why This Works

- Supabase has a reliable REST API that works in browsers
- Neon's serverless driver is meant for server-side use (Node.js, Edge functions)
- Your app is already configured to use Supabase
- The SQL will create the same tables with `trinity_` prefix

## After This Fix

✅ Routes will load
✅ Add route will work
✅ Edit/delete will work
✅ Bookings will work
✅ Everything functional

## Note About Pausing

Yes, Supabase Free tier pauses after inactivity, but:
- It wakes up automatically when accessed (takes ~5 seconds)
- For production, you can upgrade to Supabase Pro ($25/month)
- Or we can set up a proper backend API with Neon later

For now, let's get it working with Supabase!
