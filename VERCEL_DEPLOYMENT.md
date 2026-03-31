# Vercel Deployment Guide

## ✅ Build Status: SUCCESS

Your app is ready to deploy to Vercel!

---

## Option 1: Deploy via Vercel CLI (Fastest)

### Step 1: Install Vercel CLI (if not installed)
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```

### Step 3: Deploy
```bash
vercel --prod
```

### Step 4: Add Environment Variables
After deployment, go to your Vercel dashboard and add:

```
VITE_SUPABASE_URL=https://awowbixrozodsdrovswr.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_6HzovrNTkZ26MSAy3QRMAQ_u-kbvpeY
```

Then redeploy:
```bash
vercel --prod
```

---

## Option 2: Deploy via Vercel Dashboard (Recommended)

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Add admin route management features"
git push origin main
```

### Step 2: Import to Vercel
1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your repository
4. Click "Import"

### Step 3: Configure Environment Variables
In the Vercel import screen, add these environment variables:

```
VITE_SUPABASE_URL=https://awowbixrozodsdrovswr.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_6HzovrNTkZ26MSAy3QRMAQ_u-kbvpeY
```

### Step 4: Deploy
Click "Deploy" and wait for completion!

---

## Option 3: Quick Deploy (If Already Connected)

If your project is already connected to Vercel:

```bash
git add .
git commit -m "Add admin route management"
git push origin main
```

Vercel will auto-deploy!

---

## After Deployment

### Test Your Deployed App

1. **Visit your Vercel URL** (e.g., `https://trinity-bus.vercel.app`)

2. **Test Public Routes:**
   - Go to `/routes`
   - Verify routes load

3. **Test Admin Features:**
   - Go to `/login`
   - Password: `0987654321`
   - Click "Add Route"
   - Fill form and submit
   - Verify route appears

4. **Test Bookings:**
   - Make a test booking
   - Check admin dashboard for booking

---

## Environment Variables Needed

```env
VITE_SUPABASE_URL=https://awowbixrozodsdrovswr.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_6HzovrNTkZ26MSAy3QRMAQ_u-kbvpeY
```

**Important:** These must be added in Vercel dashboard under:
- Project Settings → Environment Variables

---

## Vercel Configuration

Your `vercel.json` is already configured:
```json
{
  "framework": "vite",
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

This ensures:
- ✅ Vite framework detected
- ✅ Client-side routing works
- ✅ All routes redirect to index.html

---

## Build Settings (Auto-detected)

- **Framework:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

---

## Troubleshooting

### Issue: Routes not loading on Vercel

**Solution:**
1. Check environment variables are set
2. Verify Supabase tables exist
3. Check Vercel deployment logs
4. Ensure `vercel.json` has rewrites

### Issue: Admin can't add routes

**Solution:**
1. Verify environment variables in Vercel
2. Check browser console for errors
3. Ensure Supabase project is not paused
4. Check Vercel function logs

### Issue: 404 on routes

**Solution:**
- Ensure `vercel.json` has the rewrite rule
- Redeploy after adding the rule

---

## Post-Deployment Checklist

- [ ] App loads at Vercel URL
- [ ] Public routes page works
- [ ] Admin login works
- [ ] Admin can view routes
- [ ] Admin can add routes
- [ ] Admin can edit routes
- [ ] Admin can delete routes
- [ ] Bookings work
- [ ] Contact page works
- [ ] All images load

---

## Custom Domain (Optional)

### Add Custom Domain in Vercel:
1. Go to Project Settings → Domains
2. Add your domain (e.g., `trinityexpress.com`)
3. Follow DNS configuration instructions
4. Wait for DNS propagation (~24 hours)

---

## Performance Optimization

Your build is already optimized:
- ✅ Gzipped: 138.80 kB
- ✅ Code splitting enabled
- ✅ Images optimized
- ✅ CSS minified

For further optimization:
- Consider lazy loading routes
- Implement image CDN
- Add service worker for offline support

---

## Monitoring

### Vercel Analytics (Free)
1. Go to Project Settings → Analytics
2. Enable Vercel Analytics
3. View real-time traffic and performance

### Error Tracking
Consider adding:
- Sentry for error tracking
- LogRocket for session replay
- Google Analytics for user tracking

---

## Security Notes

### Before Going Live:

1. **Change Admin Password:**
   - Edit `src/context/AdminContext.tsx`
   - Change password from `0987654321` to something secure

2. **Enable Supabase RLS:**
   - Go to Supabase dashboard
   - Enable Row Level Security on all tables
   - Add policies for admin access

3. **Add Rate Limiting:**
   - Consider Vercel Edge Middleware
   - Or use Supabase rate limiting

4. **Environment Variables:**
   - Never commit `.env.local` to Git
   - Use Vercel's environment variables

---

## Deployment Commands Summary

### First Time:
```bash
# Build locally to verify
npm run build

# Deploy to Vercel
vercel --prod

# Or push to GitHub (if connected)
git add .
git commit -m "Deploy admin features"
git push origin main
```

### Updates:
```bash
# Just push to GitHub
git add .
git commit -m "Update features"
git push origin main
```

Vercel will auto-deploy!

---

## Success Criteria

Your deployment is successful when:
- ✅ App loads at Vercel URL
- ✅ No console errors
- ✅ Routes load from Supabase
- ✅ Admin can login
- ✅ Admin can add/edit/delete routes
- ✅ Bookings work
- ✅ All pages accessible

---

## Support

### Vercel Support:
- Documentation: https://vercel.com/docs
- Discord: https://vercel.com/discord
- Twitter: @vercel

### Supabase Support:
- Documentation: https://supabase.com/docs
- Discord: https://discord.supabase.com
- GitHub: https://github.com/supabase/supabase

---

**Ready to Deploy!** 🚀

Choose your deployment method and let's go live!
