# Trinity Express - Neon Database Setup

## Database Configuration

This project uses a **Neon PostgreSQL database** that is shared with other projects. All tables use the `trinity_` prefix to avoid conflicts.

### Database Connection

```
postgresql://neondb_owner:npg_WfvGClZQa4t3@ep-bold-bar-am700dmf-pooler.c-5.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

## Setup Instructions

### 1. Run the Schema SQL

Execute the `neon_trinity_schema.sql` file in your Neon database console:

1. Go to your Neon dashboard: https://console.neon.tech/
2. Select your project
3. Go to the SQL Editor
4. Copy and paste the contents of `neon_trinity_schema.sql`
5. Click "Run" to execute

This will create all necessary tables with the `trinity_` prefix:
- `trinity_routes` - Bus routes and pricing
- `trinity_bookings` - Customer bookings
- `trinity_contact_info` - Contact information
- `trinity_payment_methods` - Payment options
- `trinity_payment_settings` - Payment gateway settings

### 2. Environment Variables

The `.env.local` file has been updated with the Neon database URL. Make sure it contains:

```env
VITE_DATABASE_URL=postgresql://neondb_owner:npg_WfvGClZQa4t3@ep-bold-bar-am700dmf-pooler.c-5.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

### 3. Admin Features

Once the database is set up, admin users can:

#### Login
- Navigate to `/login`
- Password: `0987654321`

#### Manage Routes
- **View Routes**: See all available bus routes
- **Edit Routes**: Click the edit icon to modify route details (origin, destination, price, duration, image)
- **Add Routes**: Click "Add Route" button to create new routes
- **Delete Routes**: Click the delete icon to remove routes

#### Manage Bookings
- View all customer bookings
- Confirm or cancel bookings
- Export bookings to CSV
- View revenue statistics

#### Settings
- Update contact information for different countries
- Manage payment methods
- Configure payment gateway settings

## Table Structure

### trinity_routes
- `id` - Auto-incrementing primary key
- `origin` - Starting city
- `country_origin` - Origin country
- `destination` - Destination city
- `country_dest` - Destination country
- `price` - Ticket price (formatted string)
- `duration` - Journey duration
- `country` - Target country/region
- `image` - Route image URL
- `rating` - Route rating (0-5)
- `next_bus` - Next departure time
- `created_at` - Timestamp

### trinity_bookings
- `id` - UUID primary key
- `route_id` - Reference to trinity_routes
- `origin`, `destination` - Trip details
- `date`, `time` - Travel schedule
- `seat`, `passengers` - Booking details
- `passenger_name`, `phone_number` - Customer info
- `total_price` - Total cost
- `payment_method` - Payment type
- `status` - pending/confirmed/cancelled
- `device_type`, `user_location` - Tracking info
- `created_at` - Timestamp

## Security Notes

- All tables are namespaced with `trinity_` prefix
- This prevents conflicts with other projects in the shared database
- Row Level Security (RLS) can be enabled for production
- Consider implementing proper authentication for production use

## Troubleshooting

### Tables Not Found
If you see "Tables not found" errors:
1. Verify the SQL schema was executed successfully
2. Check that all tables have the `trinity_` prefix
3. Verify database connection in `.env.local`

### Connection Issues
If you can't connect to the database:
1. Verify the connection string is correct
2. Check that your IP is allowed in Neon settings
3. Ensure SSL mode is enabled

### Admin Can't Add Routes
If the "Add Route" button doesn't work:
1. Check browser console for errors
2. Verify the `trinity_routes` table exists
3. Ensure the admin is logged in (password: `0987654321`)

## Development

To test the admin functionality:
1. Run `npm install` to install dependencies
2. Run `npm run dev` to start the development server
3. Navigate to `/login` and use password `0987654321`
4. Go to the Routes tab and click "Add Route"

## Production Deployment

Before deploying to production:
1. Change the admin password in `src/context/AdminContext.tsx`
2. Enable Row Level Security on all tables
3. Set up proper authentication (consider Supabase Auth or similar)
4. Update payment gateway keys to live credentials
5. Configure proper CORS settings
