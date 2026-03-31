# Migration Guide: Supabase to Neon PostgreSQL

## Overview

This guide explains how to migrate from the old Supabase setup to the new Neon PostgreSQL database with proper table namespacing.

## What Changed

### Database
- **Old**: Supabase hosted database
- **New**: Neon PostgreSQL (shared database with other projects)
- **Table Prefix**: All tables now use `trinity_` prefix to avoid conflicts

### New Features
1. **Add Routes**: Admins can now add new routes directly from the dashboard
2. **Delete Routes**: Admins can delete routes with confirmation
3. **Better Organization**: All tables are properly namespaced

## Migration Steps

### Step 1: Backup Existing Data (If Applicable)

If you have existing data in Supabase, export it first:

```sql
-- Export routes
COPY (SELECT * FROM routes) TO '/tmp/routes_backup.csv' CSV HEADER;

-- Export bookings
COPY (SELECT * FROM bookings) TO '/tmp/bookings_backup.csv' CSV HEADER;

-- Export contact info
COPY (SELECT * FROM contact_info) TO '/tmp/contact_backup.csv' CSV HEADER;
```

### Step 2: Set Up Neon Database

1. Open Neon Console: https://console.neon.tech/
2. Navigate to SQL Editor
3. Run the `neon_trinity_schema.sql` file
4. Verify all tables are created with `trinity_` prefix

### Step 3: Import Data (If Applicable)

If you have backup data, import it to the new tables:

```sql
-- Import routes (adjust column names as needed)
COPY trinity_routes(origin, country_origin, destination, country_dest, price, duration, country, image, rating, next_bus)
FROM '/tmp/routes_backup.csv' CSV HEADER;

-- Import bookings
COPY trinity_bookings(route_id, origin, destination, date, time, seat, passengers, passenger_name, phone_number, total_price, payment_method, status, device_type, user_location)
FROM '/tmp/bookings_backup.csv' CSV HEADER;
```

### Step 4: Update Environment Variables

The `.env.local` file has been updated. Verify it contains:

```env
# Neon PostgreSQL Database
VITE_DATABASE_URL=postgresql://neondb_owner:npg_WfvGClZQa4t3@ep-bold-bar-am700dmf-pooler.c-5.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require

# Supabase configuration (keeping for compatibility)
VITE_SUPABASE_URL=https://awowbixrozodsdrovswr.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_6HzovrNTkZ26MSAy3QRMAQ_u-kbvpeY
```

### Step 5: Test the Application

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Test admin login:
   - Go to `/login`
   - Password: `0987654321`

3. Test route management:
   - Click "Add Route" button
   - Fill in route details
   - Save and verify it appears in the list
   - Try editing an existing route
   - Try deleting a route

4. Test bookings:
   - Make a test booking from the home page
   - Verify it appears in the admin dashboard
   - Try confirming/cancelling the booking

### Step 6: Deploy

Once everything is tested locally:

1. Update production environment variables
2. Deploy to Vercel/your hosting platform
3. Verify the production database connection
4. Test all features in production

## Code Changes Summary

### AdminContext.tsx
- Added `addRoute()` function to create new routes
- Added `deleteRoute()` function to remove routes
- Updated context provider to expose new functions

### AdminDashboard.tsx
- Added "Add Route" button in Route Management section
- Added Add Route Modal with form fields
- Added delete button for each route
- Updated to use new `addRoute` and `deleteRoute` functions

### Database Schema
- All tables now use `trinity_` prefix
- Added proper indexes for performance
- Added foreign key constraints
- Included sample data seeding

## Rollback Plan

If you need to rollback to the old setup:

1. Revert `.env.local` to use only Supabase credentials
2. Restore the old `supabase_schema.sql` without `trinity_` prefix
3. Revert code changes in `AdminContext.tsx` and `AdminDashboard.tsx`
4. Redeploy

## Support

If you encounter issues:

1. Check the `NEON_DATABASE_SETUP.md` for detailed setup instructions
2. Verify all tables exist with `trinity_` prefix
3. Check browser console for error messages
4. Verify database connection string is correct

## Next Steps

Consider these improvements for production:

1. **Authentication**: Implement proper user authentication (Supabase Auth, Auth0, etc.)
2. **Row Level Security**: Enable RLS on all tables
3. **API Layer**: Create a backend API instead of direct database access
4. **Validation**: Add server-side validation for all inputs
5. **Audit Logs**: Track who made changes and when
6. **Backup Strategy**: Set up automated database backups
7. **Monitoring**: Add error tracking and performance monitoring
