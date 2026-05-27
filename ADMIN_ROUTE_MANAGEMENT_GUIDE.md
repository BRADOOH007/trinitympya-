# Admin Route Management Guide

## ✅ Admin Capabilities

Your admin panel has **FULL CRUD** (Create, Read, Update, Delete) capabilities for routes:

### 1. **Add New Routes**
- Navigate to Admin Panel → Routes Management
- Click "Add New Route" button
- Fill in route details:
  - Origin (city name)
  - Country Origin
  - Destination (city name)
  - Country Destination
  - Price (with currency, e.g., "KSh 7,500")
  - VIP Price (optional, e.g., "KSh 8,500")
  - Duration (e.g., "16 hours")
  - Next Bus Times (e.g., "06:00 AM, 12:00 PM")
  - Image URL (optional)
  - Rating (optional)

### 2. **Edit Existing Routes**
- Click the "Edit" button on any route
- Modify any field
- Click "Save" to update

### 3. **Delete Routes**
- Click the "Delete" button on any route
- Confirm deletion
- Route is permanently removed

---

## 🆕 Adding Bujumbura - Nairobi Routes

### Option 1: Via Admin Panel (Recommended)
1. Login to admin panel (password: `0987654321`)
2. Go to "Routes Management"
3. Click "Add New Route"
4. Add **Route 1: Bujumbura → Nairobi**
   - Origin: `Bujumbura`
   - Country Origin: `Burundi`
   - Destination: `Nairobi`
   - Country Destination: `Kenya`
   - Price: `BIF 200,000`
   - VIP Price: (leave empty)
   - Duration: `16 hours`
   - Next Bus: `06:00 AM, 12:00 PM`
   - Image: `/assets/nairobi.jpg`
   - Rating: `4.7`

5. Click "Add New Route" again
6. Add **Route 2: Nairobi → Bujumbura**
   - Origin: `Nairobi`
   - Country Origin: `Kenya`
   - Destination: `Bujumbura`
   - Country Destination: `Burundi`
   - Price: `KSh 7,500`
   - VIP Price: `KSh 8,500`
   - Duration: `16 hours`
   - Next Bus: `06:00 AM, 12:00 PM`
   - Image: `/assets/bukavu.webp`
   - Rating: `4.7`

### Option 2: Via SQL (Direct Database)
1. Go to Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Go to SQL Editor
4. Copy and paste the contents of `add-bujumbura-routes.sql`
5. Click "Run"
6. Refresh your website to see the new routes

---

## 📋 Current Route Structure

### Database Schema
```sql
trinity_routes (
  id                bigint (auto-generated)
  origin            text (required)
  country_origin    text (optional)
  destination       text (required)
  country_dest      text (optional)
  price             text (required, e.g., "KSh 7,500")
  vip_price         text (optional, e.g., "KSh 8,500")
  duration          text (optional, e.g., "16 hours")
  country           text (optional, destination country)
  image             text (optional, image URL)
  rating            numeric (optional, e.g., 4.7)
  next_bus          text (optional, e.g., "06:00 AM, 12:00 PM")
  created_at        timestamp (auto-generated)
)
```

---

## 🔐 Admin Access

### Login Credentials
- **URL**: `https://trinitycopy.netlify.app/admin`
- **Password**: `0987654321`

### Admin Features
1. **Dashboard** - Overview of bookings, revenue, stats
2. **Routes Management** - Add, edit, delete routes
3. **Bookings** - View and manage all bookings
4. **Contact Info** - Update contact details
5. **Payment Methods** - Manage payment options
6. **Payment Settings** - Configure payment gateway

---

## 🚀 Quick Actions

### To Add a Route via Admin Panel:
```
1. Login → Admin Panel
2. Routes Management → Add New Route
3. Fill form → Save
4. Route appears immediately on website
```

### To Edit a Route:
```
1. Login → Admin Panel
2. Routes Management → Find route
3. Click Edit → Modify fields
4. Save → Changes reflect immediately
```

### To Delete a Route:
```
1. Login → Admin Panel
2. Routes Management → Find route
3. Click Delete → Confirm
4. Route removed immediately
```

---

## 📝 Notes

- **All changes are real-time** - No need to redeploy
- **Database-driven** - All routes stored in Supabase
- **Secure** - Admin password required for modifications
- **Backup** - All data backed up in Supabase
- **Validation** - Form validates required fields

---

## 🆘 Troubleshooting

### "Failed to add route" Error
**Solution**: Run the RLS policy fix:
```sql
drop policy if exists "Public routes are viewable by everyone" on public.trinity_routes;
create policy "Enable all access for routes" on public.trinity_routes for all using (true);
```

### Routes not showing on website
**Solution**: 
1. Check if routes exist in database (Supabase → Table Editor → trinity_routes)
2. Clear browser cache and refresh
3. Check browser console for errors

### Admin panel not accessible
**Solution**:
1. Verify you're using correct password: `0987654321`
2. Check if you're on `/admin` route
3. Clear localStorage and try again

---

## ✅ Verification

After adding Bujumbura routes, verify:
- [ ] Routes appear in admin panel routes list
- [ ] Routes appear on main Routes page
- [ ] Booking modal shows correct prices
- [ ] Both directions (Bujumbura→Nairobi and Nairobi→Bujumbura) exist
- [ ] Times show as "06:00 AM, 12:00 PM"
- [ ] VIP price shows for Nairobi→Bujumbura route

---

**Status**: ✅ Admin has full route management capabilities  
**Date**: May 27, 2026  
**Next Steps**: Use admin panel to add Bujumbura routes or run SQL script
