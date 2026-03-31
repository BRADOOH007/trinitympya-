# Admin Route Management - Quick Guide

## Overview

Admins can now fully manage bus routes through the dashboard, including adding, editing, and deleting routes.

## Features

### 1. Add New Routes ✨ NEW
- Click the "Add Route" button in the Route Management section
- Fill in the route details:
  - **Origin City** (required): Starting city (e.g., Nairobi)
  - **Origin Country**: Country of origin (e.g., Kenya)
  - **Destination City** (required): Destination city (e.g., Kampala)
  - **Destination Country**: Destination country (e.g., Uganda)
  - **Price** (required): Ticket price (e.g., KSh 3,500)
  - **Duration** (required): Journey time (e.g., 12 hours)
  - **Country/Region**: Target region
  - **Next Bus Time**: Next departure (e.g., 08:00 AM)
  - **Route Image**: Select from available images
  - **Rating**: Route rating 0-5 (e.g., 4.8)
- Click "Add Route" to save

### 2. Edit Existing Routes
- Click the edit icon (pencil) next to any route
- Modify any field inline
- Click the save icon (checkmark) to save changes
- Click the X icon to cancel editing

### 3. Delete Routes ✨ NEW
- Click the delete icon (X) next to any route
- Confirm the deletion
- Route will be removed from the database

### 4. View All Routes
- See all routes in a clean table format
- View route images, prices, and durations
- Sort and filter routes (coming soon)

## Database Structure

All routes are stored in the `trinity_routes` table in the Neon PostgreSQL database:

```sql
CREATE TABLE trinity_routes (
  id BIGSERIAL PRIMARY KEY,
  origin TEXT NOT NULL,
  country_origin TEXT,
  destination TEXT NOT NULL,
  country_dest TEXT,
  price TEXT NOT NULL,
  duration TEXT,
  country TEXT,
  image TEXT,
  rating NUMERIC,
  next_bus TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Access Control

### Admin Login
- URL: `/login`
- Password: `0987654321`
- **⚠️ IMPORTANT**: Change this password before production deployment!

### Admin Dashboard
- URL: `/admin`
- Requires authentication
- Three main tabs:
  1. **Routes**: Manage bus routes
  2. **Bookings**: View and manage customer bookings
  3. **Settings**: Update contact info and payment settings

## Best Practices

### Adding Routes
1. Use consistent formatting for prices (e.g., "KSh 3,500" or "UGX 100,000")
2. Use consistent time format (e.g., "12 hours" not "12hrs")
3. Select appropriate images for each route
4. Set realistic ratings based on customer feedback
5. Keep next bus times updated

### Editing Routes
1. Only edit one route at a time
2. Save changes immediately after editing
3. Verify changes appear correctly in the public routes page
4. Update prices regularly based on fuel costs and demand

### Deleting Routes
1. Only delete routes that are permanently discontinued
2. Consider editing instead of deleting if route is temporarily unavailable
3. Check for existing bookings before deleting
4. Confirm deletion carefully - this action cannot be undone

## Security Considerations

### Current Setup (Development)
- Simple password authentication
- Direct database access from frontend
- No role-based access control

### Recommended for Production
1. **Implement proper authentication**:
   - Use Supabase Auth, Auth0, or similar
   - Add user roles (admin, staff, viewer)
   - Implement session management

2. **Add API layer**:
   - Create backend API endpoints
   - Validate all inputs server-side
   - Implement rate limiting

3. **Enable Row Level Security**:
   - Restrict database access by role
   - Audit all changes
   - Log admin actions

4. **Secure credentials**:
   - Use environment variables
   - Rotate passwords regularly
   - Implement 2FA for admin accounts

## Troubleshooting

### "Add Route" button not working
- Check browser console for errors
- Verify you're logged in as admin
- Ensure database connection is active
- Check that `trinity_routes` table exists

### Routes not appearing after adding
- Refresh the page
- Check the database directly
- Verify no validation errors occurred
- Check browser network tab for failed requests

### Cannot delete routes
- Verify you have admin access
- Check for foreign key constraints (bookings referencing the route)
- Look for error messages in console

### Changes not saving
- Check internet connection
- Verify database credentials in `.env.local`
- Check for TypeScript/validation errors
- Ensure all required fields are filled

## API Reference

### AdminContext Functions

```typescript
// Add a new route
addRoute(route: Omit<Route, 'id'>): Promise<void>

// Update existing route
updateRoute(id: number, updatedRoute: Partial<Route>): void

// Delete a route
deleteRoute(id: number): Promise<void>
```

### Route Interface

```typescript
interface Route {
  id: number;
  origin: string;
  country_origin?: string;
  destination: string;
  country_dest?: string;
  price: string;
  duration: string;
  country?: string;
  image?: string;
  rating?: number;
  nextBus?: string;
}
```

## Future Enhancements

Consider adding these features:

1. **Bulk Operations**:
   - Import routes from CSV
   - Export routes to CSV
   - Bulk price updates

2. **Advanced Filtering**:
   - Search routes by origin/destination
   - Filter by country
   - Sort by price, duration, rating

3. **Route Analytics**:
   - Most popular routes
   - Revenue per route
   - Booking trends

4. **Route Scheduling**:
   - Multiple departure times per route
   - Seasonal pricing
   - Dynamic pricing based on demand

5. **Route Validation**:
   - Check for duplicate routes
   - Validate price formats
   - Ensure image URLs are valid

## Support

For issues or questions:
1. Check the `NEON_DATABASE_SETUP.md` for database setup
2. Review `MIGRATION_GUIDE.md` for migration steps
3. Check browser console for error messages
4. Verify database connection and table structure
