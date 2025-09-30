# Avery Ambient 🏥🤖

> AI Voice Agents for Modern Healthcare - Transform patient care with intelligent voice technology

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-38bdf8)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-Private-red)]()

## 🚀 Quick Start

### Deploy to Vercel (Fastest Way)

```bash
# 1. Clone and install
git clone <your-repo>
cd avery-ambient
npm install

# 2. Set up environment variables (see env.example)
cp env.example .env.local

# 3. Push to GitHub and deploy to Vercel
git push origin main
```

**📖 Detailed Instructions**: See [QUICK_START.md](./QUICK_START.md) for step-by-step guide

## ✨ Features

- **🎙️ AI Voice Agent** - Interactive voice consultations using VAPI
- **🔐 Secure Auth** - User authentication with Clerk
- **📊 Medical Reports** - AI-generated health reports
- **👨‍⚕️ Smart Recommendations** - Doctor suggestions based on symptoms
- **🌙 Dark Mode** - Beautiful light/dark themes
- **📱 Responsive** - Works on all devices

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5
- **Styling**: TailwindCSS v4
- **Database**: Neon (PostgreSQL) + Drizzle ORM
- **Auth**: Clerk
- **AI**: OpenRouter
- **Voice**: VAPI
- **UI**: shadcn/ui + Radix UI

## 📁 Project Structure

```
app/
├── (auth)/              # Authentication pages
├── (routes)/dashboard/  # Main application
├── api/                 # API routes
└── _components/         # Shared components

config/
├── db.tsx              # Database setup
├── schema.tsx          # Database schema
└── OpenAiModel.tsx     # AI configuration
```

## 🔧 Local Development

```bash
# Install dependencies
npm install

# Set up environment variables
cp env.example .env.local
# Edit .env.local with your API keys

# Push database schema
npx drizzle-kit push

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🌐 Deploy to Vercel

### Option 1: One-Click Deploy

1. Push to GitHub
2. Import to [Vercel](https://vercel.com/new)
3. Add environment variables
4. Deploy! 🚀

### Option 2: Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

**📖 Complete Guide**: See [DEPLOYMENT.md](./DEPLOYMENT.md)

## 📋 Required Environment Variables

```env
DATABASE_URL=                          # Neon PostgreSQL
OPEN_ROUTER_API_KEY=                   # OpenRouter AI
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=     # Clerk Auth
CLERK_SECRET_KEY=                      # Clerk Secret
VAPI_PUBLIC_KEY=                       # VAPI Voice
VAPI_PRIVATE_KEY=                      # VAPI Secret
```

See [env.example](./env.example) for complete list.

## 📚 Documentation

- **[QUICK_START.md](./QUICK_START.md)** - Get started in 15 minutes
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Complete deployment guide
- **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)** - Step-by-step checklist
- **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** - Common issues & solutions
- **[ANALYSIS_SUMMARY.md](./ANALYSIS_SUMMARY.md)** - Technical analysis

## 🔐 Authentication Flow

1. User visits landing page
2. Signs up/in with Clerk
3. Redirected to dashboard
4. Access to voice agent & features

## 🗄️ Database Schema

### Users Table
- Clerk user information
- Credit system for AI features
- Email & profile data

### Session Chart Table
- Voice agent sessions
- Medical reports
- Conversation history
- Doctor recommendations

## 📊 API Routes

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/users` | POST | Create/get user |
| `/api/session-chat` | GET | Get session data |
| `/api/medical-report` | POST | Generate report |
| `/api/suggest-doctors` | POST | Get recommendations |

## 🧪 Testing

```bash
# Build for production
npm run build

# Start production server
npm start

# Push database schema
npx drizzle-kit push

# Open Drizzle Studio
npx drizzle-kit studio
```

## 🔧 Troubleshooting

Having issues? Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

**Common issues:**
- Missing environment variables
- Database connection errors
- Clerk authentication issues
- VAPI connection problems

## 📈 Performance

- ⚡ Server Components by default
- 🖼️ Optimized images with next/image
- 📦 Automatic code splitting
- 🌐 Edge-ready API routes
- 🎨 CSS optimization with Tailwind v4

## 💰 Estimated Costs

**Development/Testing**: ~$5-10/month
**Production**: ~$50-150/month

See [QUICK_START.md](./QUICK_START.md) for detailed breakdown.

## 🤝 Contributing

This is a private project. For contribution guidelines, contact the project maintainers.

## 📄 License

Private and proprietary.

## 🆘 Support

- **Documentation**: Check the `/docs` files
- **Issues**: Common problems in [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- **Deployment**: Follow [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)

## 🎯 Next Steps

1. ✅ Set up required services (Neon, Clerk, OpenRouter, VAPI)
2. ✅ Configure environment variables
3. ✅ Deploy to Vercel
4. ✅ Test authentication
5. ✅ Test voice agent
6. ✅ Go live! 🚀

---

**Built with ❤️ using Next.js 15, TailwindCSS v4, and modern AI**

Ready to deploy? Start with [QUICK_START.md](./QUICK_START.md)! 🚀
