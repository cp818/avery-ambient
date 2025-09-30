# VitalCare AI 🏥🤖

> Transform patient care with intelligent voice technology that handles appointments, answers medical questions, and provides 24/7 support.

## 🚀 Overview

VitalCare AI is a modern healthcare application that leverages AI voice agents to enhance patient care and reduce administrative burden. Built with Next.js 15, it provides an intelligent voice interface for medical consultations, report generation, and doctor recommendations.

## ✨ Features

- **🎙️ AI Voice Agents** - Interactive voice conversations using VAPI technology
- **🔐 Secure Authentication** - User management with Clerk
- **📊 Medical Reports** - AI-generated medical reports and session transcripts
- **👨‍⚕️ Doctor Recommendations** - Smart doctor suggestions based on symptoms
- **💬 Session Chat** - Conversation history and tracking
- **🌙 Dark Mode** - Beautiful UI with light/dark theme support
- **📱 Responsive Design** - Works seamlessly on all devices

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React features
- **TypeScript** - Type-safe development
- **TailwindCSS v4** - Modern utility-first CSS
- **shadcn/ui** - Beautiful UI components
- **Motion** - Smooth animations
- **Lucide React** - Icon library

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Drizzle ORM** - Type-safe SQL queries
- **Neon Database** - Serverless PostgreSQL

### Authentication & APIs
- **Clerk** - User authentication and management
- **OpenRouter** - AI language model access
- **VAPI** - Voice agent technology

## 📁 Project Structure

```
VitalCare-main/
├── app/
│   ├── (auth)/              # Authentication pages
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── (routes)/            # Main application routes
│   │   └── dashboard/       # Dashboard and medical agent
│   ├── _components/         # Page-specific components
│   ├── api/                 # API routes
│   │   ├── medical-report/  # Report generation
│   │   ├── session-chat/    # Chat sessions
│   │   ├── suggest-doctors/ # Doctor recommendations
│   │   └── users/           # User management
│   ├── globals.css          # Global styles with Tailwind v4
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Landing page
│   └── provider.tsx         # App providers
├── components/              # Reusable UI components
│   └── ui/                  # shadcn/ui components
├── config/                  # Configuration files
│   ├── db.tsx              # Database connection
│   ├── OpenAiModel.tsx     # AI model configuration
│   └── schema.tsx          # Database schema
├── context/                 # React context providers
├── drizzle/                 # Drizzle migrations
├── lib/                     # Utility functions
├── public/                  # Static assets
├── shared/                  # Shared utilities
├── middleware.ts            # Clerk authentication middleware
├── drizzle.config.ts       # Drizzle ORM configuration
├── next.config.ts          # Next.js configuration
├── package.json            # Dependencies
└── tsconfig.json           # TypeScript configuration
```

## 🗄️ Database Schema

### Users Table
```typescript
{
  id: integer (Primary Key, Auto-increment)
  clerkId: varchar(255) (Unique)
  name: varchar(255)
  email: varchar(255) (Unique)
  credits: integer
}
```

### Session Chart Table
```typescript
{
  id: integer (Primary Key, Auto-increment)
  sessionId: varchar(255) (Unique)
  selectedDoctor: json
  notes: text
  report: json
  conversation: json
  createdBy: varchar(255) (Foreign Key → users.email)
  createdOn: timestamp
}
```

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ installed
- npm, yarn, pnpm, or bun package manager
- Git installed

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd VitalCare-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   DATABASE_URL=postgresql://user:password@host/database

   # OpenRouter AI
   OPEN_ROUTER_API_KEY=your_openrouter_api_key

   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
   CLERK_SECRET_KEY=sk_test_xxxxx
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

   # VAPI Voice Agent
   VAPI_PUBLIC_KEY=your_vapi_public_key
   VAPI_PRIVATE_KEY=your_vapi_private_key
   ```

4. **Push database schema**
   ```bash
   npx drizzle-kit push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🌐 Deploy to Vercel

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/vitalcare-ai)

### Manual Deployment

For detailed deployment instructions, see **[DEPLOYMENT.md](./DEPLOYMENT.md)**

Quick steps:
1. Push your code to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy!

### Required Services

Before deploying, sign up for these services:

1. **[Neon](https://neon.tech)** - PostgreSQL database
2. **[Clerk](https://clerk.com)** - Authentication
3. **[OpenRouter](https://openrouter.ai)** - AI API
4. **[VAPI](https://vapi.ai)** - Voice agents

## 📚 API Routes

### POST `/api/users`
Create or retrieve user information
- **Auth**: Required (Clerk)
- **Returns**: User object

### GET `/api/session-chat?sessionId={id}`
Get session details and conversation history
- **Auth**: Required
- **Returns**: Session details

### POST `/api/medical-report`
Generate medical report from session
- **Auth**: Required
- **Body**: `{ sessionId: string }`
- **Returns**: Medical report

### POST `/api/suggest-doctors`
Get doctor recommendations based on symptoms
- **Auth**: Required
- **Body**: `{ symptoms: string }`
- **Returns**: List of recommended doctors

## 🎨 UI Components

Built with **shadcn/ui** and **TailwindCSS v4**:

- Buttons
- Dialogs
- Forms
- Cards
- Toasts (Sonner)
- Dark mode support
- Responsive layouts

## 🔧 Scripts

```json
{
  "dev": "next dev",           // Start development server
  "build": "next build",       // Build for production
  "start": "next start"        // Start production server
}
```

### Drizzle Commands

```bash
npx drizzle-kit generate      # Generate migrations
npx drizzle-kit push          # Push schema to database
npx drizzle-kit studio        # Open Drizzle Studio
```

## 🔐 Authentication Flow

1. User visits landing page
2. Clicks "Get Started" or "Login"
3. Redirected to Clerk sign-in/sign-up
4. After authentication, redirected to dashboard
5. User record created in database automatically
6. Receives 10 credits for AI features

Protected routes:
- `/dashboard`
- `/dashboard/medical-agent/*`
- All `/api/*` routes (except webhooks)

## 🎙️ Voice Agent Flow

1. User creates new session in dashboard
2. Selects medical agent/doctor
3. Starts voice conversation
4. Real-time transcription displayed
5. Conversation saved to database
6. Medical report generated after session
7. Doctor recommendations provided

## 📊 Key Features Breakdown

### Medical Voice Agent
- Real-time voice interaction
- Live transcription
- Session recording
- Call status monitoring
- Conversation history

### Dashboard
- Session management
- Credits tracking
- User profile
- Medical history
- Quick actions

### Reports
- AI-generated medical summaries
- Symptom analysis
- Treatment recommendations
- Doctor referrals

## 🐛 Troubleshooting

### Common Issues

**Build fails with module errors**
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run build
```

**Database connection fails**
```bash
# Verify DATABASE_URL
# Check Neon database is active
npx drizzle-kit push
```

**Clerk authentication not working**
- Verify environment variables
- Check redirect URLs in Clerk dashboard
- Ensure middleware.ts is configured correctly

**VAPI voice agent not connecting**
- Verify API keys
- Check browser permissions for microphone
- Review VAPI dashboard logs

## 📈 Performance

- **Next.js 15** with App Router for optimal performance
- **Server Components** by default for faster loads
- **Edge Runtime** ready for API routes
- **Optimized fonts** with next/font
- **Image optimization** with next/image
- **Code splitting** automatic

## 🔄 Updates & Maintenance

To update dependencies:
```bash
npm update
# or check for major updates
npx npm-check-updates -u
npm install
```

## 📄 License

This project is private and proprietary.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For issues and questions:
- Check the [DEPLOYMENT.md](./DEPLOYMENT.md) guide
- Review the API documentation above
- Check environment variables in `env.example`

## 🎯 Roadmap

- [ ] Mobile app version
- [ ] Multiple language support
- [ ] Advanced analytics
- [ ] Payment integration
- [ ] Appointment scheduling
- [ ] Electronic health records integration
- [ ] Video consultations

---

**Built with ❤️ using Next.js 15, TailwindCSS v4, and modern web technologies**

Ready to revolutionize healthcare with AI? Let's go! 🚀
