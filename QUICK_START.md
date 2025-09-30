# 🚀 Avery Ambient - Quick Start Guide

Get your Avery Ambient application deployed to Vercel in **under 30 minutes**!

---

## ⚡ Super Fast Deployment (15 minutes)

### Step 1: Get Your API Keys (10 minutes)

Open these links in separate tabs and sign up:

1. **[Neon Database](https://console.neon.tech/signup)** 
   - Click "Create Project"
   - Copy the connection string
   - Save it as: `DATABASE_URL`

2. **[Clerk Auth](https://dashboard.clerk.com/sign-up)**
   - Create new application
   - Copy "Publishable key" → Save as: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - Copy "Secret key" → Save as: `CLERK_SECRET_KEY`

3. **[OpenRouter](https://openrouter.ai/)**
   - Sign up → Go to "Keys"
   - Create new key
   - Add $5 credits
   - Save as: `OPEN_ROUTER_API_KEY`

4. **[VAPI](https://dashboard.vapi.ai/)**
   - Sign up for account
   - Get public key → Save as: `VAPI_PUBLIC_KEY`
   - Get private key → Save as: `VAPI_PRIVATE_KEY`

### Step 2: Deploy to Vercel (5 minutes)

#### Option A: One-Click Deploy (Fastest)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   # Create repo on GitHub, then:
   git remote add origin https://github.com/YOUR_USERNAME/avery-ambient.git
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to: https://vercel.com/new
   - Click "Import" your GitHub repo
   - Add environment variables (paste values from Step 1)
   - Click "Deploy"
   - ☕ Wait 3-5 minutes

3. **Done!** Copy your Vercel URL

#### Option B: Vercel CLI (Alternative)

```bash
# Install CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Add environment variables when prompted
# Then deploy to production
vercel --prod
```

### Step 3: Configure Clerk (2 minutes)

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Click your app → "Paths"
3. Add your Vercel URL to allowed domains
4. Set redirect URL: `https://your-app.vercel.app/dashboard`

### Step 4: Test Your App (3 minutes)

1. Visit your Vercel URL
2. Click "Get Started" or "Login"
3. Sign up with test account
4. Should redirect to dashboard
5. ✅ Success!

---

## 🛠️ Local Development Setup

### Prerequisites
- Node.js 20+ installed
- npm or yarn installed
- Git installed

### Setup Commands

```bash
# 1. Clone/navigate to project
cd avery-ambient

# 2. Install dependencies
npm install

# 3. Copy environment template
cp env.example .env.local

# 4. Edit .env.local with your API keys
# (Use the keys from Step 1 above)

# 5. Push database schema
npx drizzle-kit push

# 6. Start development server
npm run dev

# 7. Open browser
# Navigate to: http://localhost:3000
```

### Environment Variables (.env.local)

```env
# Database
DATABASE_URL=postgresql://user:password@ep-xxx.region.aws.neon.tech/dbname

# OpenRouter AI
OPEN_ROUTER_API_KEY=sk-or-v1-xxxxxxxxxxxxx

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# VAPI Voice Agent
VAPI_PUBLIC_KEY=xxxxxxxxxxxxx
VAPI_PRIVATE_KEY=xxxxxxxxxxxxx
```

---

## 🔧 Common Issues & Fixes

### Issue: Build fails on Vercel

**Solution:**
```bash
# Test build locally first
npm run build

# If it works locally, check Vercel logs
# Usually missing environment variables
```

### Issue: Database connection fails

**Solution:**
- Verify DATABASE_URL is correct
- Check Neon database is active (not paused)
- Test connection:
```bash
npx drizzle-kit push
```

### Issue: Clerk authentication doesn't work

**Solution:**
- Check environment variables are set in Vercel
- Verify redirect URLs in Clerk dashboard
- Make sure you're using the correct keys (test vs production)

### Issue: VAPI voice agent won't connect

**Solution:**
- Check browser microphone permissions
- Verify VAPI keys in environment variables
- Check VAPI dashboard for configuration issues

---

## 📊 Post-Deployment Checklist

After successful deployment:

- [ ] Test sign-up flow
- [ ] Test sign-in flow
- [ ] Test dashboard access
- [ ] Test voice agent (create session)
- [ ] Test medical report generation
- [ ] Test doctor suggestions
- [ ] Check Vercel deployment logs (no errors)
- [ ] Check Neon database (users table populated)
- [ ] Set up monitoring/alerts
- [ ] Add custom domain (optional)

---

## 🎯 What You Get

After deployment, your app will have:

✅ **Landing Page** - Beautiful hero section with animations
✅ **Authentication** - Sign-up/Sign-in with Clerk
✅ **Dashboard** - User dashboard with session management
✅ **Voice Agent** - AI-powered medical voice assistant
✅ **Medical Reports** - AI-generated health reports
✅ **Doctor Suggestions** - Smart doctor recommendations
✅ **Dark Mode** - Beautiful dark/light theme toggle
✅ **Responsive** - Works on desktop, tablet, mobile

---

## 💰 Cost Overview

### Free Tier (Testing)
- Vercel: Free (Hobby plan)
- Neon: Free (0.5GB storage)
- Clerk: Free (up to 10k users)
- OpenRouter: ~$5-10 for testing
- VAPI: Check their pricing

**Total**: ~$5-10 to start

### Production (Estimated)
- Vercel Pro: $20/month
- Neon Scale: $19/month
- Clerk Pro: $25/month (if >10k users)
- OpenRouter: $10-50/month (usage-based)
- VAPI: Check usage-based pricing

**Total**: ~$50-150/month

---

## 🚨 Important Notes

### Before Going Live

1. **Update Metadata** (app/layout.tsx):
   ```typescript
   export const metadata: Metadata = {
     title: "VitalCare AI - Healthcare Voice Agent",
     description: "AI-powered healthcare voice assistant",
   };
   ```

2. **Add Custom Domain** (optional):
   - Go to Vercel → Settings → Domains
   - Add your domain (e.g., avery-ambient.com)

3. **Enable Analytics**:
   ```bash
   npm install @vercel/analytics @vercel/speed-insights
   ```

4. **Set Up Monitoring**:
   - Check Vercel function logs regularly
   - Monitor Neon database connections
   - Track OpenRouter API usage

5. **Security**:
   - All secrets in environment variables ✅
   - Never commit .env files ✅
   - Use Vercel's environment variable encryption ✅

---

## 📚 Additional Resources

### Documentation
- **Full Deployment Guide**: See `DEPLOYMENT.md`
- **Step-by-Step Checklist**: See `DEPLOYMENT_CHECKLIST.md`
- **Project Overview**: See `README_COMPLETE.md`
- **Analysis**: See `ANALYSIS_SUMMARY.md`

### Support Links
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Drizzle ORM](https://orm.drizzle.team)

### Community
- [Next.js Discord](https://nextjs.org/discord)
- [Vercel Discord](https://vercel.com/discord)
- [Clerk Discord](https://clerk.com/discord)

---

## 🎉 Success!

Once deployed, you'll have a production-ready healthcare AI application!

**Your app features:**
- 🎙️ Voice AI conversations
- 📊 Medical report generation
- 👨‍⚕️ Doctor recommendations
- 🔐 Secure authentication
- 📱 Mobile responsive
- 🌙 Dark mode support

---

## 🔄 Continuous Deployment

After initial deployment:

```bash
# Make changes to your code
git add .
git commit -m "Add new feature"
git push origin main

# Vercel automatically deploys! 🚀
# Check deployment status at vercel.com/dashboard
```

---

## 🆘 Need Help?

1. Check `DEPLOYMENT.md` for detailed instructions
2. Review `DEPLOYMENT_CHECKLIST.md` for step-by-step guidance
3. Check Vercel deployment logs for errors
4. Review environment variables are all set
5. Test locally first: `npm run dev`

---

**Ready? Let's deploy! 🚀**

Start with Step 1: Get your API keys ⬆️
