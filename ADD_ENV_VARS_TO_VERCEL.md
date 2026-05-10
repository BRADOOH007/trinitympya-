# Add Environment Variables to Vercel

## ✅ Deployment Successful!

Your app is deployed at: **https://trinity-bus-copy.vercel.app**

But you need to add environment variables for it to work properly.

---

## Step 1: Go to Vercel Dashboard

Open this link:
```
https://vercel.com/mkenya-pros-projects/trinity-bus-copy/settings/environment-variables
```

Or manually:
1. Go to https://vercel.com/dashboard
2. Click on "trinity-bus-copy" project
3. Go to Settings → Environment Variables

---

## Step 2: Add These Variables

Add each of these environment variables:

### Variable 1:
- **Name:** `VITE_SUPABASE_URL`
- **Value:** `https://awowbixrozodsdrovswr.supabase.co`
- **Environment:** Production, Preview, Development (select all)

### Variable 2:
- **Name:** `VITE_SUPABASE_ANON_KEY`
- **Value:** `sb_publishable_6HzovrNTkZ26MSAy3QRMAQ_u-kbvpeY`
- **Environment:** Production, Preview, Development (select all)

---

## Step 3: Redeploy

After adding the variables, redeploy:

### Option A: Via Dashboard
1. Go to Deployments tab
2. Click the three dots (...) on the latest deployment
3. Click "Redeploy"

### Option B: Via CLI
```bash
vercel --prod
```

---

## Step 4: Test Your App

Once redeployed, visit:
```
https://trinity-bus-copy.vercel.app
```

### Test Checklist:
- [ ] Home page loads
- [ ] Routes page shows routes
- [ ] Login works (`/login` - password: `0987654321`)
- [ ] Admin dashboard loads
- [ ] **"Add Route" button appears** in Route Management
- [ ] Can add a new route
- [ ] Can edit routes
- [ ] Can delete routes

---

## Why the Button Wasn't Showing

The old deployment didn't have the latest code with the "Add Route" button. Now that we've:
1. ✅ Initialized git
2. ✅ Committed all changes
3. ✅ Deployed to Vercel

The button will appear after you add the environment variables and redeploy!

---

## Quick Commands

```bash
# If you need to redeploy
vercel --prod

# If you make more changes
git add .
git commit -m "Your message"
vercel --prod
```

---

**Next Step:** Add the environment variables in Vercel dashboard and redeploy!
