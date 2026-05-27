# Add Bujumbura - Nairobi Routes

## Quick Summary

You need to add **2 new routes**:

### Route 1: Bujumbura → Nairobi
- **Price**: BIF 200,000 (Burundi Francs)
- **VIP Price**: None
- **Times**: 6:00 AM, 12:00 PM
- **Duration**: 16 hours

### Route 2: Nairobi → Bujumbura (Reverse)
- **Price**: KSh 7,500 (Kenya Shillings)
- **VIP Price**: KSh 8,500
- **Times**: 6:00 AM, 12:00 PM
- **Duration**: 16 hours

---

## ✅ Admin Already Has Full Control

Your admin panel **ALREADY HAS** the ability to:
- ✅ **Add routes** - Click "Add New Route" button
- ✅ **Edit routes** - Click "Edit" on any route
- ✅ **Delete routes** - Click "Delete" on any route

**No code changes needed!** Everything is database-driven.

---

## 🚀 How to Add Routes

### Method 1: Admin Panel (Easiest)

1. **Login to Admin**
   - Go to: https://trinitycopy.netlify.app/admin
   - Password: `0987654321`

2. **Navigate to Routes Management**
   - Click "Routes Management" in sidebar

3. **Add First Route (Bujumbura → Nairobi)**
   - Click "Add New Route"
   - Fill in:
     ```
     Origin: Bujumbura
     Country Origin: Burundi
     Destination: Nairobi
     Country Destination: Kenya
     Price: BIF 200,000
     VIP Price: (leave empty)
     Duration: 16 hours
     Next Bus: 06:00 AM, 12:00 PM
     Image: /assets/nairobi.jpg
     Rating: 4.7
     ```
   - Click "Save"

4. **Add Second Route (Nairobi → Bujumbura)**
   - Click "Add New Route" again
   - Fill in:
     ```
     Origin: Nairobi
     Country Origin: Kenya
     Destination: Bujumbura
     Country Destination: Burundi
     Price: KSh 7,500
     VIP Price: KSh 8,500
     Duration: 16 hours
     Next Bus: 06:00 AM, 12:00 PM
     Image: /assets/bukavu.webp
     Rating: 4.7
     ```
   - Click "Save"

5. **Done!** Routes will appear immediately on your website.

---

### Method 2: SQL Script (Direct Database)

If you prefer to add via database:

1. Go to Supabase Dashboard
2. Open SQL Editor
3. Run the script in `add-bujumbura-routes.sql`
4. Refresh your website

---

## 📋 What's Already Built

Your admin system has these features:

### ✅ Route Management
- Add new routes with all details
- Edit existing routes (price, times, duration, etc.)
- Delete routes
- Real-time updates (no deployment needed)

### ✅ Booking Management
- View all bookings
- Update booking status
- Filter and search bookings

### ✅ Contact Info Management
- Update phone numbers
- Update addresses
- Update email

### ✅ Payment Settings
- Configure payment methods
- Update payment gateway settings

---

## 🔍 Verify Routes Exist

To check if Bujumbura routes already exist:

1. **Via Admin Panel**:
   - Login → Routes Management
   - Search for "Bujumbura"

2. **Via Database**:
   - Supabase → Table Editor → trinity_routes
   - Filter by origin or destination = "Bujumbura"

---

## 📝 Route Details Reference

### Bujumbura → Nairobi
```json
{
  "origin": "Bujumbura",
  "country_origin": "Burundi",
  "destination": "Nairobi",
  "country_dest": "Kenya",
  "price": "BIF 200,000",
  "vip_price": null,
  "duration": "16 hours",
  "next_bus": "06:00 AM, 12:00 PM",
  "image": "/assets/nairobi.jpg",
  "rating": 4.7
}
```

### Nairobi → Bujumbura
```json
{
  "origin": "Nairobi",
  "country_origin": "Kenya",
  "destination": "Bujumbura",
  "country_dest": "Burundi",
  "price": "KSh 7,500",
  "vip_price": "KSh 8,500",
  "duration": "16 hours",
  "next_bus": "06:00 AM, 12:00 PM",
  "image": "/assets/bukavu.webp",
  "rating": 4.7
}
```

---

## 🎯 Next Steps

1. **Check if routes exist** (via admin panel or database)
2. **If not exist**: Add via admin panel (Method 1) or SQL (Method 2)
3. **Verify**: Check routes appear on website
4. **Test**: Try booking a ticket on the new routes

---

## 📞 Admin Access

- **URL**: https://trinitycopy.netlify.app/admin
- **Password**: `0987654321`
- **Features**: Full CRUD for routes, bookings, contact info, payments

---

**Status**: ✅ Admin system ready - just add the routes!  
**Files Created**:
- `add-bujumbura-routes.sql` - SQL script to add routes
- `ADMIN_ROUTE_MANAGEMENT_GUIDE.md` - Complete admin guide
- `ADD_BUJUMBURA_ROUTES.md` - This quick reference

**No deployment needed** - All changes are database-driven and reflect immediately!
