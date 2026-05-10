# Quick Environment Variables Setup

## The "Add Route" button is showing! 🎉

But it's failing because Vercel doesn't have the Supabase credentials yet.

---

## Add Environment Variables (2 minutes):

### Step 1: Open Vercel Settings
Click this link:
```
https://vercel.com/mkenya-pros-projects/trinity-bus-copy/settings/environment-variables
```

### Step 2: Add First Variable
1. Click "Add New" button
2. **Key:** `VITE_SUPABASE_URL`
3. **Value:** `https://awowbixrozodsdrovswr.supabase.co`
4. Select: Production, Preview, Development (all three)
5. Click "Save"

### Step 3: Add Second Variable
1. Click "Add New" button again
2. **Key:** `VITE_SUPABASE_ANON_KEY`
3. **Value:** `sb_publishable_6HzovrNTkZ26MSAy3QRMAQ_u-kbvpeY`
4. Select: Production, Preview, Development (all three)
5. Click "Save"

### Step 4: Redeploy
After adding both variables, go to:
```
https://vercel.com/mkenya-pros-projects/trinity-bus-copy
```

1. Click "Deployments" tab
2. Find the latest deployment
3. Click the three dots (...)
4. Click "Redeploy"
5. Wait for deployment to complete

---

## Then Test:

1. Go to: https://trinity-bus-copy.vercel.app/login
2. Login with password: `0987654321`
3. Click "Add Route" button
4. Fill the form
5. Click "Add Route"
6. **It will work!** ✅

---

## Why This is Needed:

The app needs these credentials to connect to your Supabase database. Without them, it can't save routes.

Once you add them and redeploy, everything will work perfectly!
