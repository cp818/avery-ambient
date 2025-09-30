# Avery Ambient - Vercel Deployment Guide

## Prerequisites

Before deploying to Vercel, ensure you have:

1. **Vercel Account** - Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository** - Push this code to GitHub (recommended)
3. **Required API Keys** - See section below

## Required Services & API Keys

### 1. Neon Database (PostgreSQL)
- Sign up at [neon.tech](https://neon.tech)
- Create a new PostgreSQL database
- Copy your connection string (it should look like: `postgresql://user:password@ep-xxx.region.aws.neon.tech/dbname`)

### 2. Clerk Authentication
- Sign up at [clerk.com](https://clerk.com)
- Create a new application
- Get your publishable and secret keys from the dashboard
- Configure sign-in/sign-up pages in Clerk dashboard

### 3. OpenRouter API
- Sign up at [openrouter.ai](https://openrouter.ai)
- Create an API key from your dashboard
- Add credits to your account

### 4. VAPI Voice Agent
- Sign up at [vapi.ai](https://vapi.ai)
- Create an account and get your API keys
- Configure your voice agent settings

## Step-by-Step Deployment

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/avery-ambient.git
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Git Repository"
   - Select your Avery Ambient repository
   - Click "Import"

3. **Configure Environment Variables**
   
   In the Vercel project settings, add these environment variables:
   
   ```env
   DATABASE_URL=postgresql://user:password@host/database
   OPEN_ROUTER_API_KEY=your_openrouter_api_key
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
   CLERK_SECRET_KEY=sk_test_xxxxx
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   VAPI_PUBLIC_KEY=your_vapi_public_key
   VAPI_PRIVATE_KEY=your_vapi_private_key
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete (3-5 minutes)

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - What's your project's name? **avery-ambient**
   - In which directory is your code located? **./**

4. **Add Environment Variables**
   ```bash
   vercel env add DATABASE_URL
   vercel env add OPEN_ROUTER_API_KEY
   vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
   vercel env add CLERK_SECRET_KEY
   vercel env add VAPI_PUBLIC_KEY
   vercel env add VAPI_PRIVATE_KEY
   ```

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## Post-Deployment Steps

### 1. Setup Database Schema

After deployment, you need to push your database schema to Neon:

```bash
npm install
npx drizzle-kit push
```

Or use Drizzle Studio to manage your database:
```bash
npx drizzle-kit studio
```

### 2. Configure Clerk Redirect URLs

In your Clerk dashboard:
- Go to **Paths** settings
- Add your Vercel domain to allowed redirect URLs
- Set sign-in URL: `https://your-domain.vercel.app/sign-in`
- Set sign-up URL: `https://your-domain.vercel.app/sign-up`
- Set after sign-in redirect: `https://your-domain.vercel.app/dashboard`

### 3. Update VAPI Configuration

In your VAPI dashboard:
- Update webhook URLs to point to your Vercel domain
- Configure any domain-specific settings

### 4. Test Your Deployment

1. Visit your Vercel URL
2. Test authentication (sign up/sign in)
3. Test dashboard access
4. Test voice agent functionality

## Troubleshooting

### Build Errors

**Error: Missing environment variables**
- Solution: Add all required environment variables in Vercel dashboard

**Error: Database connection failed**
- Solution: Verify your DATABASE_URL is correct and accessible from Vercel

**Error: Module not found**
- Solution: Ensure all dependencies are in `package.json` and run `npm install`

### Runtime Errors

**Clerk authentication not working**
- Solution: Check Clerk environment variables and redirect URLs

**API routes returning 500**
- Solution: Check Vercel function logs for detailed error messages
- Go to: Vercel Dashboard → Your Project → Deployments → Click deployment → Functions tab

**Database queries failing**
- Solution: Ensure database schema is pushed using `drizzle-kit push`

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✅ Yes | Neon PostgreSQL connection string |
| `OPEN_ROUTER_API_KEY` | ✅ Yes | OpenRouter API key for AI features |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | ✅ Yes | Clerk public key (client-side) |
| `CLERK_SECRET_KEY` | ✅ Yes | Clerk secret key (server-side) |
| `VAPI_PUBLIC_KEY` | ✅ Yes | VAPI public key for voice agent |
| `VAPI_PRIVATE_KEY` | ✅ Yes | VAPI private key for voice agent |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | ⚠️ Optional | Sign-in page path (default: /sign-in) |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | ⚠️ Optional | Sign-up page path (default: /sign-up) |

## Performance Optimization

For production, consider:

1. **Enable Vercel Analytics**
   ```bash
   npm install @vercel/analytics
   ```

2. **Add Speed Insights**
   ```bash
   npm install @vercel/speed-insights
   ```

3. **Configure Caching**
   - Database queries should use proper caching strategies
   - Static assets are automatically cached by Vercel

4. **Monitor Usage**
   - Check Vercel dashboard for function execution time
   - Monitor database connection usage in Neon

## Continuous Deployment

Once connected to GitHub:
- Every push to `main` branch automatically deploys to production
- Pull requests create preview deployments
- Configure branch deployments in Vercel settings

## Support

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Clerk Docs**: [clerk.com/docs](https://clerk.com/docs)
- **Drizzle Docs**: [orm.drizzle.team](https://orm.drizzle.team)

## Cost Estimates

- **Vercel**: Free tier supports hobby projects, Pro plan $20/month
- **Neon**: Free tier with limitations, paid plans from $19/month
- **Clerk**: Free tier for up to 10k MAU, paid plans from $25/month
- **OpenRouter**: Pay per token usage
- **VAPI**: Varies by usage

---

**Ready to deploy?** Follow the steps above and your Avery Ambient application will be live on Vercel! 🚀
