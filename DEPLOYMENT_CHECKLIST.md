# VitalCare AI - Deployment Checklist ✅

Use this checklist to ensure a smooth deployment to Vercel.

## Pre-Deployment Setup

### 1. API Keys & Services Setup

- [ ] **Neon Database**
  - [ ] Create account at [neon.tech](https://neon.tech)
  - [ ] Create new PostgreSQL database
  - [ ] Copy connection string
  - [ ] Test connection locally

- [ ] **Clerk Authentication**
  - [ ] Create account at [clerk.com](https://clerk.com)
  - [ ] Create new application
  - [ ] Copy publishable key (pk_test_...)
  - [ ] Copy secret key (sk_test_...)
  - [ ] Note: Production keys will be different (pk_live_...)

- [ ] **OpenRouter AI**
  - [ ] Create account at [openrouter.ai](https://openrouter.ai)
  - [ ] Create API key
  - [ ] Add credits to account ($5-10 minimum)

- [ ] **VAPI Voice Agent**
  - [ ] Create account at [vapi.ai](https://vapi.ai)
  - [ ] Get public key
  - [ ] Get private key
  - [ ] Configure voice agent settings

### 2. Local Environment Setup

- [ ] **Environment Variables**
  - [ ] Create `.env.local` file
  - [ ] Add DATABASE_URL
  - [ ] Add OPEN_ROUTER_API_KEY
  - [ ] Add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  - [ ] Add CLERK_SECRET_KEY
  - [ ] Add VAPI_PUBLIC_KEY
  - [ ] Add VAPI_PRIVATE_KEY

- [ ] **Database Schema**
  ```bash
  npx drizzle-kit push
  ```
  - [ ] Verify tables created in Neon dashboard
  - [ ] Check `users` table exists
  - [ ] Check `sessionChartTable` exists

- [ ] **Test Locally**
  ```bash
  npm run dev
  ```
  - [ ] App runs on localhost:3000
  - [ ] Sign-in works
  - [ ] Sign-up creates user
  - [ ] Dashboard accessible
  - [ ] No console errors

## Git & GitHub Setup

- [ ] **Initialize Git** (if not already done)
  ```bash
  git init
  git add .
  git commit -m "Initial commit - VitalCare AI"
  ```

- [ ] **Create GitHub Repository**
  - [ ] Go to [github.com/new](https://github.com/new)
  - [ ] Name: `vitalcare-ai` (or your preferred name)
  - [ ] Keep it private or public
  - [ ] Don't initialize with README (already have one)

- [ ] **Push to GitHub**
  ```bash
  git remote add origin https://github.com/YOUR_USERNAME/vitalcare-ai.git
  git branch -M main
  git push -u origin main
  ```

## Vercel Deployment

### Method 1: Vercel Dashboard (Recommended)

- [ ] **Import Project**
  - [ ] Go to [vercel.com/new](https://vercel.com/new)
  - [ ] Click "Import Git Repository"
  - [ ] Select your GitHub repository
  - [ ] Click "Import"

- [ ] **Configure Build Settings**
  - [ ] Framework Preset: Next.js (auto-detected)
  - [ ] Root Directory: `./`
  - [ ] Build Command: `npm run build` (default)
  - [ ] Output Directory: `.next` (default)
  - [ ] Install Command: `npm install` (default)

- [ ] **Add Environment Variables**
  In Vercel project settings → Environment Variables, add:
  
  Production & Preview & Development:
  - [ ] `DATABASE_URL`
  - [ ] `OPEN_ROUTER_API_KEY`
  - [ ] `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
  - [ ] `CLERK_SECRET_KEY`
  - [ ] `VAPI_PUBLIC_KEY`
  - [ ] `VAPI_PRIVATE_KEY`
  - [ ] `NEXT_PUBLIC_CLERK_SIGN_IN_URL` = `/sign-in`
  - [ ] `NEXT_PUBLIC_CLERK_SIGN_UP_URL` = `/sign-up`

- [ ] **Deploy**
  - [ ] Click "Deploy"
  - [ ] Wait for build (3-5 minutes)
  - [ ] Check for build errors
  - [ ] Copy deployment URL

### Method 2: Vercel CLI (Alternative)

- [ ] **Install Vercel CLI**
  ```bash
  npm install -g vercel
  ```

- [ ] **Login**
  ```bash
  vercel login
  ```

- [ ] **Deploy**
  ```bash
  vercel
  ```
  - [ ] Follow prompts
  - [ ] Link to new project

- [ ] **Add Environment Variables via CLI**
  ```bash
  vercel env add DATABASE_URL production
  vercel env add OPEN_ROUTER_API_KEY production
  # ... add all other variables
  ```

- [ ] **Deploy to Production**
  ```bash
  vercel --prod
  ```

## Post-Deployment Configuration

### Clerk Configuration

- [ ] **Update Redirect URLs**
  - [ ] Go to Clerk Dashboard → Your App → Paths
  - [ ] Add production domain: `https://your-app.vercel.app`
  - [ ] Allowed redirect URLs:
    - [ ] `https://your-app.vercel.app/sign-in`
    - [ ] `https://your-app.vercel.app/sign-up`
    - [ ] `https://your-app.vercel.app/dashboard`
  - [ ] After sign-in redirect: `/dashboard`
  - [ ] After sign-up redirect: `/dashboard`

- [ ] **Test Production Authentication**
  - [ ] Visit production URL
  - [ ] Click "Login"
  - [ ] Sign up with test account
  - [ ] Verify redirect to dashboard

### VAPI Configuration

- [ ] **Update Webhook URLs**
  - [ ] Go to VAPI Dashboard
  - [ ] Update webhook URLs to production domain
  - [ ] Test voice agent connection

### Database Verification

- [ ] **Check Database**
  - [ ] Open Neon dashboard
  - [ ] Verify tables exist
  - [ ] Check user was created after sign-up
  - [ ] Verify connections are working

## Testing Production

- [ ] **Functionality Tests**
  - [ ] Landing page loads
  - [ ] Sign-up creates account
  - [ ] Sign-in works
  - [ ] Dashboard accessible
  - [ ] User info displays correctly
  - [ ] Create new session works
  - [ ] Voice agent connects
  - [ ] Medical report generation works
  - [ ] Doctor suggestions work

- [ ] **Performance Tests**
  - [ ] Check Vercel Analytics
  - [ ] Page load times < 3 seconds
  - [ ] No 500 errors in logs
  - [ ] API routes respond quickly

- [ ] **Mobile Testing**
  - [ ] Test on mobile device
  - [ ] Responsive design works
  - [ ] Touch interactions work
  - [ ] Voice agent works on mobile

## Monitoring & Maintenance

- [ ] **Enable Analytics**
  - [ ] Vercel Analytics (free)
  - [ ] Speed Insights (free)

- [ ] **Monitor Logs**
  - [ ] Check Vercel function logs
  - [ ] Monitor error rates
  - [ ] Set up alerts (optional)

- [ ] **Database Monitoring**
  - [ ] Check Neon connection usage
  - [ ] Monitor query performance
  - [ ] Set up backup schedule

## Cost Management

- [ ] **Review Pricing**
  - [ ] Vercel: Hobby (Free) or Pro ($20/mo)
  - [ ] Neon: Free tier or Scale ($19/mo)
  - [ ] Clerk: Free tier (10k MAU) or Pro ($25/mo)
  - [ ] OpenRouter: Pay-per-use (monitor credits)
  - [ ] VAPI: Check usage limits

- [ ] **Set Budget Alerts**
  - [ ] Set spending alerts on all services
  - [ ] Monitor monthly usage
  - [ ] Upgrade plans as needed

## Production Checklist

Before announcing to users:

- [ ] **Security**
  - [ ] All API keys in environment variables (not code)
  - [ ] Database has SSL enabled
  - [ ] Clerk authentication working
  - [ ] CORS configured if needed

- [ ] **Performance**
  - [ ] No console.log in production
  - [ ] Images optimized
  - [ ] API routes cached where appropriate
  - [ ] Database queries optimized

- [ ] **SEO (Optional)**
  - [ ] Update metadata in `app/layout.tsx`
  - [ ] Add meta description
  - [ ] Add Open Graph tags
  - [ ] Add favicon

- [ ] **Documentation**
  - [ ] README updated
  - [ ] API documentation available
  - [ ] Environment variables documented

## Continuous Deployment Setup

- [ ] **Configure Auto-Deploy**
  - [ ] Main branch → Production
  - [ ] Preview deployments for PRs
  - [ ] Branch deployments configured

- [ ] **Git Workflow**
  - [ ] Create development branch
  - [ ] Test changes in preview
  - [ ] Merge to main for production

## Emergency Rollback Plan

If something goes wrong:

- [ ] **Vercel Rollback**
  - [ ] Go to Deployments tab
  - [ ] Click on previous working deployment
  - [ ] Click "Promote to Production"

- [ ] **Database Rollback**
  - [ ] Neon supports point-in-time recovery
  - [ ] Have backup strategy in place

## Success Metrics

Track these after deployment:

- [ ] User sign-ups
- [ ] Session creations
- [ ] Voice agent usage
- [ ] Report generations
- [ ] Page load times
- [ ] Error rates
- [ ] API response times

---

## Quick Reference

### Important URLs

- **Production**: https://your-app.vercel.app
- **Vercel Dashboard**: https://vercel.com/dashboard
- **GitHub Repo**: https://github.com/YOUR_USERNAME/vitalcare-ai
- **Neon Dashboard**: https://console.neon.tech
- **Clerk Dashboard**: https://dashboard.clerk.com
- **VAPI Dashboard**: https://dashboard.vapi.ai
- **OpenRouter Dashboard**: https://openrouter.ai/dashboard

### Support Contacts

- **Vercel**: support@vercel.com
- **Clerk**: support@clerk.com
- **Neon**: support@neon.tech

---

**✅ Deployment Complete!**

Once all items are checked, your VitalCare AI application is live and ready for users! 🎉

For ongoing updates, just push to GitHub and Vercel will auto-deploy.
