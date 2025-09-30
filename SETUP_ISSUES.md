# 🔧 Avery Ambient - Common Setup Issues & Fixes

## Issues You're Experiencing

### 1. ❌ Profile Page Not Working
**Status:** ✅ FIXED  
**Solution:** Created the profile page at `/dashboard/profile`

### 2. ❌ Consultation Button Loads But Nothing Happens
**Likely Causes:**
1. Database tables not created
2. Environment variables not set in Vercel
3. User not created in database

---

## 🚨 Critical Setup Steps

### Step 1: Verify Environment Variables in Vercel

Go to: https://vercel.com/cp818/avery-ambient/settings/environment-variables

**Required Variables:**
```
DATABASE_URL              # From Neon
OPEN_ROUTER_API_KEY       # From OpenRouter  
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
VAPI_PUBLIC_KEY
VAPI_PRIVATE_KEY
```

**Check:**
- [ ] All 6 variables are added
- [ ] No typos in variable names
- [ ] Values are correct (no extra spaces)
- [ ] Applied to: Production, Preview, Development

### Step 2: Create Database Tables

Your database needs 2 tables. Run this in Neon SQL Editor:

```sql
-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  "clerkId" VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  credits INTEGER
);

-- Session table  
CREATE TABLE IF NOT EXISTS "sessionChartTable" (
  id SERIAL PRIMARY KEY,
  "sessionId" VARCHAR(255) NOT NULL UNIQUE,
  "selectedDoctor" JSONB,
  notes TEXT,
  report JSONB,
  conversation JSONB,
  "createdBy" VARCHAR(255) REFERENCES users(email),
  "createdOn" TIMESTAMP DEFAULT NOW() NOT NULL
);
```

**OR** use Drizzle:
```bash
npx drizzle-kit push --config=drizzle.config.ts
```

### Step 3: Check Vercel Logs

1. Go to: https://vercel.com/cp818/avery-ambient
2. Click on the latest deployment
3. Click "Functions" tab
4. Look for errors in:
   - `/api/users`
   - `/api/suggest-doctors`
   - `/api/session-chat`

---

## 🐛 Debugging Steps

### Test 1: Check if User is Created

Open browser console (F12) and run:
```javascript
fetch('/api/users', { method: 'POST' })
  .then(r => r.json())
  .then(console.log)
```

**Expected:** User object with email  
**If Error:** Check DATABASE_URL and table exists

### Test 2: Test Doctor Suggestion

```javascript
fetch('/api/suggest-doctors', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ notes: 'I have a headache' })
})
  .then(r => r.json())
  .then(console.log)
```

**Expected:** Array of doctors  
**If Error:** Check OPEN_ROUTER_API_KEY

### Test 3: Check Database Connection

In Neon Console:
```sql
SELECT * FROM users LIMIT 5;
SELECT * FROM "sessionChartTable" LIMIT 5;
```

---

## 🔍 Common Error Messages

### "Cannot read property 'emailAddress' of null"
**Cause:** User not authenticated properly  
**Fix:** 
1. Check Clerk environment variables
2. Make sure you're signed in
3. Clear cookies and sign in again

### "relation 'users' does not exist"
**Cause:** Database tables not created  
**Fix:** Run the SQL commands above in Neon

### "Invalid API key"
**Cause:** Wrong or missing API keys  
**Fix:** 
1. Check Vercel environment variables
2. Regenerate keys if needed
3. Redeploy after adding variables

### "Network Error" or Timeout
**Cause:** API route taking too long  
**Fix:**
1. Check Vercel function logs
2. Verify OpenRouter has credits
3. Check database connection

---

## ✅ Checklist for Working Consultation Flow

- [ ] Signed into Clerk account
- [ ] User exists in `users` table
- [ ] Both tables exist in Neon
- [ ] All environment variables set in Vercel
- [ ] OpenRouter has credits ($5+ minimum)
- [ ] Latest code deployed to Vercel
- [ ] No errors in Vercel function logs

---

## 🚀 Quick Fix Commands

### Redeploy to Vercel
```bash
git add .
git commit -m "Fix consultation flow"
git push origin main
```

### Check Vercel Deployment Status
Visit: https://vercel.com/cp818/avery-ambient

### Force Redeploy
Go to Vercel Dashboard → Deployments → Click "..." → Redeploy

---

## 📞 Still Not Working?

### Check These URLs:

1. **Vercel Dashboard:** https://vercel.com/cp818/avery-ambient
2. **Vercel Logs:** https://vercel.com/cp818/avery-ambient/logs
3. **Neon Dashboard:** https://console.neon.tech
4. **Clerk Dashboard:** https://dashboard.clerk.com
5. **OpenRouter Dashboard:** https://openrouter.ai/settings/keys

### Debug in Browser Console:

Open your site → Press F12 → Console tab → Look for red errors

Common issues:
- `404` = API route not found
- `500` = Server error (check Vercel logs)
- `401` = Authentication issue
- `CORS` = Environment variable issue

---

## 💡 What Changed

### Files Added:
- ✅ `/app/(routes)/dashboard/profile/page.tsx` - Profile page
- ✅ User auto-creation in dashboard layout

### Files Modified:
- ✅ `AppHeader.tsx` - Replaced logo with brand name

---

## 🎯 Next Steps

1. **Verify all environment variables** in Vercel
2. **Create database tables** using SQL above
3. **Redeploy** by pushing changes
4. **Test consultation flow** again
5. **Check Vercel logs** if still not working

---

**Need help?** Check the Vercel function logs for specific error messages!
