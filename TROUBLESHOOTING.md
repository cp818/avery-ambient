# 🔧 VitalCare AI - Troubleshooting Guide

Common issues and their solutions when deploying to Vercel.

---

## 🚨 Deployment Issues

### Build Fails on Vercel

#### Error: "Module not found"

**Symptoms:**
```
Error: Cannot find module '@/components/ui/button'
Module not found: Can't resolve '@/config/db'
```

**Solutions:**

1. **Check TypeScript paths**:
   - Verify `tsconfig.json` has correct paths configuration
   - Should have: `"@/*": ["./*"]`

2. **Verify imports**:
   - Check all import statements use correct paths
   - Case-sensitive on Vercel (Linux)
   - Local: `import { Button } from "@/Components/ui/button"` ❌
   - Vercel: `import { Button } from "@/components/ui/button"` ✅

3. **Clear cache and rebuild**:
   ```bash
   # In Vercel dashboard
   Settings → General → Clear Build Cache
   # Then redeploy
   ```

#### Error: "Missing environment variables"

**Symptoms:**
```
Error: DATABASE_URL is not defined
process.env.CLERK_SECRET_KEY is undefined
```

**Solutions:**

1. **Add to Vercel**:
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add ALL required variables
   - Select: Production, Preview, Development

2. **Required variables**:
   ```
   DATABASE_URL
   OPEN_ROUTER_API_KEY
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
   CLERK_SECRET_KEY
   VAPI_PUBLIC_KEY
   VAPI_PRIVATE_KEY
   ```

3. **Redeploy after adding**:
   - Environment changes require redeployment
   - Go to Deployments → Click "..." → Redeploy

#### Error: "Build exceeded maximum duration"

**Symptoms:**
```
Error: Command "npm run build" exceeded timeout of 900000ms
```

**Solutions:**

1. **Use npm instead of other package managers**:
   ```json
   // vercel.json
   {
     "installCommand": "npm install",
     "buildCommand": "npm run build"
   }
   ```

2. **Clear node_modules and rebuild**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

3. **Upgrade Vercel plan** (if needed):
   - Hobby: 45 second build limit
   - Pro: No limit

---

## 🗄️ Database Issues

### Cannot connect to database

**Symptoms:**
```
Error: connect ECONNREFUSED
Error: getaddrinfo ENOTFOUND
Database connection timeout
```

**Solutions:**

1. **Check DATABASE_URL format**:
   ```
   ✅ Correct:
   postgresql://user:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require

   ❌ Wrong:
   postgres://... (should be postgresql://)
   Missing ?sslmode=require
   ```

2. **Verify Neon database is active**:
   - Go to [Neon Console](https://console.neon.tech)
   - Check database status
   - Free tier may auto-pause after inactivity
   - Click "Resume" if paused

3. **Test connection locally**:
   ```bash
   # Create .env.local with DATABASE_URL
   npx drizzle-kit push
   # If successful, database connection works
   ```

4. **Check IP allowlist** (if configured):
   - Vercel uses dynamic IPs
   - Don't restrict by IP for Vercel deployments

### Tables not found

**Symptoms:**
```
Error: relation "users" does not exist
Error: table "sessionChartTable" does not exist
```

**Solutions:**

1. **Push schema to database**:
   ```bash
   npx drizzle-kit push
   ```

2. **Verify tables in Neon**:
   - Go to Neon Console
   - Click "Tables" tab
   - Should see: `users`, `sessionChartTable`

3. **Check schema file**:
   - Verify `config/schema.tsx` exists
   - Check `drizzle.config.ts` points to correct schema

### Database queries fail

**Symptoms:**
```
Error: prepared statement already exists
Error: too many clients
```

**Solutions:**

1. **Connection pooling**:
   - Neon serverless handles this automatically
   - Ensure using `@neondatabase/serverless` package ✅

2. **Check query syntax**:
   ```typescript
   // Correct Drizzle syntax
   const users = await db.select()
     .from(usersTable)
     .where(eq(usersTable.email, email));
   ```

---

## 🔐 Authentication Issues

### Clerk authentication not working

**Symptoms:**
```
Error: Invalid publishable key
Clerk: Missing environment variables
Redirect loop on sign-in
```

**Solutions:**

1. **Verify Clerk environment variables**:
   ```env
   # Check these are set in Vercel
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   ```

2. **Update Clerk dashboard**:
   - Go to [Clerk Dashboard](https://dashboard.clerk.com)
   - Select your application
   - Click "Paths" → "URL-based"
   - Add your Vercel domain:
     ```
     https://your-app.vercel.app
     ```

3. **Configure redirect URLs**:
   - Sign-in URL: `https://your-app.vercel.app/sign-in`
   - Sign-up URL: `https://your-app.vercel.app/sign-up`
   - After sign-in: `https://your-app.vercel.app/dashboard`

4. **Check middleware.ts**:
   - Verify middleware is protecting correct routes
   - Public routes should be accessible without auth

### Users can't sign up

**Symptoms:**
```
Error creating user
Database insert fails after Clerk sign-up
```

**Solutions:**

1. **Check API route**:
   - Verify `/api/users` route exists
   - Check logs for errors

2. **Database permissions**:
   - Verify DATABASE_URL has write permissions
   - Check Neon database isn't read-only

3. **Test manually**:
   ```bash
   # Call API directly
   curl -X POST https://your-app.vercel.app/api/users \
     -H "Authorization: Bearer YOUR_TOKEN"
   ```

---

## 🎙️ Voice Agent Issues

### VAPI won't connect

**Symptoms:**
```
Error: VAPI initialization failed
Microphone access denied
Call won't start
```

**Solutions:**

1. **Check VAPI keys**:
   ```env
   VAPI_PUBLIC_KEY=your_key
   VAPI_PRIVATE_KEY=your_key
   ```

2. **Browser permissions**:
   - Allow microphone access
   - HTTPS required (Vercel provides this)
   - Check browser console for errors

3. **VAPI dashboard**:
   - Go to [VAPI Dashboard](https://dashboard.vapi.ai)
   - Check API key is active
   - Verify webhook URLs (if configured)

4. **Test in different browser**:
   - Some browsers block microphone on certain sites
   - Try Chrome, Edge, Safari

### Voice calls drop or disconnect

**Solutions:**

1. **Check VAPI account credits**
2. **Verify stable internet connection**
3. **Check VAPI status page**
4. **Review VAPI logs in dashboard**

---

## 🤖 AI/OpenRouter Issues

### OpenRouter API errors

**Symptoms:**
```
Error: Invalid API key
Error: Insufficient credits
Error: Rate limit exceeded
```

**Solutions:**

1. **Verify API key**:
   - Go to [OpenRouter](https://openrouter.ai/keys)
   - Regenerate key if needed
   - Update in Vercel environment variables

2. **Add credits**:
   - Check balance in OpenRouter dashboard
   - Add $5-10 for testing
   - Monitor usage

3. **Check rate limits**:
   - Free tier has strict limits
   - Consider upgrading plan
   - Implement request queuing

### AI responses are slow

**Solutions:**

1. **Choose faster models**:
   ```typescript
   // In config/OpenAiModel.tsx
   // Use faster models for better response time
   model: "gpt-3.5-turbo" // Faster
   // vs
   model: "gpt-4" // Slower but better quality
   ```

2. **Implement streaming**:
   - Use streaming responses for better UX
   - Show partial results as they come

3. **Check OpenRouter status**:
   - Visit OpenRouter status page
   - Some models may have delays

---

## 🌐 Runtime Issues

### 500 Internal Server Error

**Symptoms:**
```
API routes return 500
"Something went wrong"
```

**Solutions:**

1. **Check Vercel function logs**:
   - Go to Vercel Dashboard
   - Click on your deployment
   - Go to "Functions" tab
   - Look for error details

2. **Common causes**:
   - Missing environment variables
   - Database connection failed
   - Unhandled exceptions
   - Timeout (10s limit on Hobby plan)

3. **Add better error logging**:
   ```typescript
   try {
     // Your code
   } catch (error) {
     console.error("Detailed error:", error);
     return NextResponse.json(
       { error: error.message },
       { status: 500 }
     );
   }
   ```

### API routes timeout

**Symptoms:**
```
Error: Function execution timeout
504 Gateway Timeout
```

**Solutions:**

1. **Optimize queries**:
   - Add database indexes
   - Limit result sets
   - Use pagination

2. **Increase timeout** (Pro plan only):
   ```json
   // vercel.json
   {
     "functions": {
       "api/**/*.ts": {
         "maxDuration": 60
       }
     }
   }
   ```

3. **Move to background jobs**:
   - Use queues for long-running tasks
   - Consider Vercel Edge Functions

---

## 🎨 UI/Frontend Issues

### Styles not loading

**Symptoms:**
```
Page loads but no styling
TailwindCSS classes not working
```

**Solutions:**

1. **Check PostCSS config**:
   ```mjs
   // postcss.config.mjs
   const config = {
     plugins: ["@tailwindcss/postcss"],
   };
   export default config;
   ```

2. **Verify globals.css imports**:
   ```css
   @import "tailwindcss";
   ```

3. **Clear Vercel build cache**:
   - Settings → General → Clear Build Cache

### Dark mode not working

**Solutions:**

1. **Check next-themes provider**:
   ```typescript
   // app/provider.tsx
   import { ThemeProvider } from 'next-themes'
   ```

2. **Verify theme toggle**:
   - Check if ThemeProvider wraps app
   - Verify theme switcher component

### Motion animations not working

**Solutions:**

1. **Check motion package**:
   ```bash
   npm list motion
   # Should be: motion@12.23.12
   ```

2. **Client component**:
   ```typescript
   'use client' // Required for motion
   import { motion } from 'motion/react'
   ```

---

## 📱 Mobile Issues

### App not responsive

**Solutions:**

1. **Check viewport meta tag**:
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1" />
   ```

2. **Test responsive classes**:
   ```typescript
   className="text-sm md:text-base lg:text-lg"
   ```

3. **Check mobile breakpoints**:
   - TailwindCSS v4 uses standard breakpoints
   - sm: 640px, md: 768px, lg: 1024px

### Voice agent on mobile

**Solutions:**

1. **HTTPS required** (Vercel provides)
2. **Test on actual device** (not just dev tools)
3. **Check browser compatibility**
4. **Allow microphone permissions**

---

## 🔍 Debugging Tools

### Check Vercel Logs

```bash
# Install Vercel CLI
npm install -g vercel

# View logs
vercel logs [deployment-url] --follow
```

### Check Function Logs

1. Go to Vercel Dashboard
2. Click your project
3. Click "Deployments"
4. Click on specific deployment
5. Click "Functions" tab
6. View logs for each function

### Database Debugging

```bash
# Open Drizzle Studio
npx drizzle-kit studio

# View tables and data
# Navigate to: https://local.drizzle.studio
```

### Test API Routes Locally

```bash
# Start dev server
npm run dev

# Test endpoints
curl http://localhost:3000/api/users -X POST
```

---

## 📊 Performance Issues

### Slow page loads

**Solutions:**

1. **Enable Vercel Analytics**:
   ```bash
   npm install @vercel/analytics
   ```

2. **Check bundle size**:
   ```bash
   npm run build
   # Review bundle analysis
   ```

3. **Optimize images**:
   ```typescript
   import Image from 'next/image'
   <Image src="..." width={100} height={100} />
   ```

4. **Use Server Components**:
   - Default in Next.js 15 App Router
   - Only use 'use client' when needed

---

## 🆘 Getting Help

### Before Asking for Help

1. ✅ Check this troubleshooting guide
2. ✅ Review Vercel deployment logs
3. ✅ Test locally first
4. ✅ Verify all environment variables
5. ✅ Check service status pages

### Where to Get Help

- **Vercel Discord**: [vercel.com/discord](https://vercel.com/discord)
- **Next.js Discord**: [nextjs.org/discord](https://nextjs.org/discord)
- **Clerk Discord**: [clerk.com/discord](https://clerk.com/discord)
- **Stack Overflow**: Tag with `next.js`, `vercel`

### Information to Include

When asking for help, provide:
- Error message (full stack trace)
- Deployment URL
- Steps to reproduce
- Expected vs actual behavior
- Environment (local vs production)
- Browser/device information

---

## ✅ Verification Checklist

After fixing issues, verify:

- [ ] App loads without errors
- [ ] Sign-up/sign-in works
- [ ] Dashboard accessible
- [ ] API routes respond correctly
- [ ] Database queries work
- [ ] Voice agent connects
- [ ] Mobile responsive
- [ ] No console errors
- [ ] No Vercel function errors
- [ ] Environment variables set

---

**Still having issues?** 

Review the [DEPLOYMENT.md](./DEPLOYMENT.md) guide or check specific service documentation.
