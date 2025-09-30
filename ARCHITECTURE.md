# VitalCare AI - Architecture Documentation

## System Overview

VitalCare AI is a full-stack healthcare application built on Next.js 15 with the App Router architecture, leveraging serverless functions, AI voice technology, and modern authentication.

---

## 🏗️ High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT SIDE                          │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Landing Page │  │  Auth Pages  │  │   Dashboard  │     │
│  │   (Public)   │  │    (Clerk)   │  │  (Protected) │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  ┌──────────────────────────────────────────────────┐      │
│  │         Voice Agent Interface (VAPI)              │      │
│  │  Real-time transcription & audio streaming        │      │
│  └──────────────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                    HTTPS Requests
                            │
┌─────────────────────────────────────────────────────────────┐
│                    VERCEL EDGE NETWORK                       │
│                    (CDN + Middleware)                        │
└─────────────────────────────────────────────────────────────┘
                            │
                    Authentication Check
                            │
┌─────────────────────────────────────────────────────────────┐
│                  NEXT.JS SERVER (Vercel)                     │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────┐       │
│  │              API Routes (Serverless)              │       │
│  ├──────────────────────────────────────────────────┤       │
│  │  /api/users              │ User management        │       │
│  │  /api/session-chat       │ Session retrieval      │       │
│  │  /api/medical-report     │ Report generation      │       │
│  │  /api/suggest-doctors    │ Doctor recommendations │       │
│  └──────────────────────────────────────────────────┘       │
│                                                               │
└─────────────────────────────────────────────────────────────┘
                            │
            ┌───────────────┼───────────────┐
            │               │               │
            ▼               ▼               ▼
    ┌──────────┐    ┌──────────┐    ┌──────────┐
    │   Neon   │    │   Clerk  │    │OpenRouter│
    │PostgreSQL│    │   Auth   │    │    AI    │
    └──────────┘    └──────────┘    └──────────┘
            │                               │
            │                               ▼
            │                        ┌──────────┐
            │                        │   VAPI   │
            │                        │  Voice   │
            │                        └──────────┘
            │
    ┌───────┴────────┐
    │   Database     │
    │   - users      │
    │   - sessions   │
    └────────────────┘
```

---

## 📁 Directory Structure

```
VitalCare-main/
│
├── app/                              # Next.js App Router
│   ├── (auth)/                       # Authentication group
│   │   ├── sign-in/[[...sign-in]]/  # Clerk sign-in page
│   │   └── sign-up/[[...sign-up]]/  # Clerk sign-up page
│   │
│   ├── (routes)/                     # Protected routes group
│   │   └── dashboard/
│   │       ├── page.tsx             # Dashboard home
│   │       ├── _components/         # Dashboard components
│   │       └── medical-agent/
│   │           └── [sessionId]/     # Dynamic voice agent page
│   │               └── page.tsx
│   │
│   ├── _components/                  # Shared page components
│   │   └── FeatureBentoGrid.tsx
│   │
│   ├── api/                          # API Routes (Serverless)
│   │   ├── users/
│   │   │   └── route.tsx            # POST: Create/get user
│   │   ├── session-chat/
│   │   │   └── route.tsx            # GET: Get session details
│   │   ├── medical-report/
│   │   │   └── route.tsx            # POST: Generate report
│   │   └── suggest-doctors/
│   │       └── route.tsx            # POST: Get recommendations
│   │
│   ├── globals.css                   # TailwindCSS v4 + theme
│   ├── layout.tsx                    # Root layout (Clerk wrapper)
│   ├── page.tsx                      # Landing page
│   └── provider.tsx                  # Theme provider
│
├── components/                       # Reusable UI components
│   └── ui/                          # shadcn/ui components
│       ├── button.tsx
│       ├── dialog.tsx
│       ├── sonner.tsx               # Toast notifications
│       └── ...
│
├── config/                           # Configuration
│   ├── db.tsx                       # Neon DB connection
│   ├── schema.tsx                   # Drizzle ORM schema
│   └── OpenAiModel.tsx              # OpenRouter config
│
├── context/                          # React Context providers
│
├── drizzle/                          # Database migrations
│   ├── meta/
│   └── migrations/
│
├── lib/                              # Utility functions
│   └── utils.ts                     # Helper utilities
│
├── public/                           # Static assets
│   ├── images/
│   └── icons/
│
├── shared/                           # Shared utilities
│
├── middleware.ts                     # Clerk auth middleware
├── drizzle.config.ts                # Drizzle configuration
├── next.config.ts                   # Next.js configuration
├── tsconfig.json                    # TypeScript config
├── package.json                     # Dependencies
└── vercel.json                      # Vercel configuration
```

---

## 🔄 Request Flow

### 1. Public Page Request
```
User → Landing Page (/)
  ↓
Next.js Server Component renders
  ↓
Static HTML sent to client
  ↓
Hydration with React 19
  ↓
Interactive page
```

### 2. Authentication Flow
```
User clicks "Login"
  ↓
Redirected to /sign-in
  ↓
Clerk handles authentication
  ↓
Success → Redirect to /dashboard
  ↓
Middleware checks auth
  ↓
API call to /api/users (create/get user)
  ↓
Database insert/query
  ↓
Dashboard renders with user data
```

### 3. Protected Route Access
```
User navigates to /dashboard
  ↓
middleware.ts intercepts request
  ↓
Clerk validates session
  ↓
Valid? → Allow access
Invalid? → Redirect to /sign-in
  ↓
Page renders with user context
```

### 4. Voice Agent Session
```
User creates new session
  ↓
Generate unique sessionId
  ↓
Navigate to /dashboard/medical-agent/[sessionId]
  ↓
Initialize VAPI client
  ↓
Start voice call
  ↓
Real-time audio streaming ↔ VAPI
  ↓
Transcription updates in UI
  ↓
Call ends
  ↓
Save to database (POST /api/session-chat)
  ↓
Generate report (POST /api/medical-report)
  ↓
OpenRouter AI processes conversation
  ↓
Store report in database
  ↓
Display to user
```

### 5. API Route Request
```
Client makes API call
  ↓
Vercel Serverless Function invoked
  ↓
Clerk auth validation
  ↓
Process request
  ↓
Query database (if needed)
  ↓
External API call (if needed)
  ↓
Format response
  ↓
Return JSON
  ↓
Client updates UI
```

---

## 🗄️ Database Schema

### Entity Relationship

```
┌─────────────────────┐
│       users         │
├─────────────────────┤
│ id (PK)            │
│ clerkId (Unique)   │
│ name               │
│ email (Unique)     │◄────────┐
│ credits            │         │
└─────────────────────┘         │
                                │ Foreign Key
                                │ (email)
                        ┌───────┴────────────┐
                        │ sessionChartTable  │
                        ├────────────────────┤
                        │ id (PK)           │
                        │ sessionId (Unique)│
                        │ selectedDoctor    │
                        │ notes             │
                        │ report            │
                        │ conversation      │
                        │ createdBy (FK)    │
                        │ createdOn         │
                        └────────────────────┘
```

### Table Details

#### users
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  clerkId VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  credits INTEGER
);
```

#### sessionChartTable
```sql
CREATE TABLE sessionChartTable (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  sessionId VARCHAR(255) NOT NULL UNIQUE,
  selectedDoctor JSON,
  notes TEXT,
  report JSON,
  conversation JSON,
  createdBy VARCHAR(255) REFERENCES users(email),
  createdOn TIMESTAMP DEFAULT NOW() NOT NULL
);
```

---

## 🔐 Authentication Architecture

### Clerk Integration

```
┌──────────────────────────────────────────────┐
│              Clerk Dashboard                  │
│  - User management                            │
│  - Sessions                                   │
│  - Webhooks                                   │
└──────────────────────────────────────────────┘
                    │
                    │ JWT Tokens
                    ▼
┌──────────────────────────────────────────────┐
│            middleware.ts                      │
│  - Route protection                           │
│  - Session validation                         │
│  - Public/private route matching              │
└──────────────────────────────────────────────┘
                    │
        ┌───────────┴───────────┐
        │                       │
        ▼                       ▼
┌──────────────┐      ┌──────────────┐
│ Public Routes│      │Private Routes│
│  - /         │      │  - /dashboard│
│  - /sign-in  │      │  - /api/*    │
│  - /sign-up  │      └──────────────┘
└──────────────┘
```

### Protected Routes
- All `/dashboard/*` routes
- All `/api/*` routes (except webhooks if configured)
- Middleware automatically redirects unauthorized users

### Public Routes
- `/` (landing page)
- `/sign-in/*`
- `/sign-up/*`

---

## 🤖 AI Integration Architecture

### OpenRouter Integration

```
Client Request
     │
     ▼
API Route (/api/medical-report)
     │
     ▼
OpenAI Client (configured for OpenRouter)
     │
     ▼
https://openrouter.ai/api/v1
     │
     ▼
AI Model (GPT-3.5/GPT-4/etc.)
     │
     ▼
Response streamed back
     │
     ▼
Formatted & saved to DB
     │
     ▼
Returned to client
```

### VAPI Voice Architecture

```
Browser (Client)
     │
     ▼
VAPI Web SDK (@vapi-ai/web)
     │
     ├─→ Initialize with public key
     ├─→ Start call
     ├─→ Audio stream (WebRTC)
     │
     ▼
VAPI Servers
     │
     ├─→ Speech-to-text
     ├─→ AI processing
     ├─→ Text-to-speech
     │
     ▼
Audio response
     │
     ▼
Client receives audio + transcription
     │
     ▼
UI updates in real-time
```

---

## 🎨 Frontend Architecture

### Component Hierarchy

```
RootLayout (app/layout.tsx)
└── ClerkProvider
    └── ThemeProvider (app/provider.tsx)
        ├── Landing Page (/)
        │   ├── Navbar
        │   ├── Hero Section
        │   └── FeatureBentoGrid
        │
        ├── Auth Pages
        │   ├── Sign In (Clerk component)
        │   └── Sign Up (Clerk component)
        │
        └── Dashboard (/dashboard)
            ├── Header
            ├── Sidebar
            ├── Main Content
            │   ├── Session List
            │   ├── Create Session
            │   └── User Stats
            │
            └── Voice Agent ([sessionId])
                ├── Doctor Card
                ├── Call Controls
                ├── Transcription Display
                └── Report Generation
```

### State Management

```
┌──────────────────────────────────────┐
│         React Context                 │
├──────────────────────────────────────┤
│  - ThemeProvider (next-themes)       │
│  - ClerkProvider (auth state)        │
└──────────────────────────────────────┘
            │
            ▼
┌──────────────────────────────────────┐
│      Component State (useState)       │
├──────────────────────────────────────┤
│  - Voice agent status                │
│  - Transcription buffer              │
│  - Session data                      │
│  - UI state                          │
└──────────────────────────────────────┘
            │
            ▼
┌──────────────────────────────────────┐
│      Server State (API calls)        │
├──────────────────────────────────────┤
│  - User data                         │
│  - Session history                   │
│  - Medical reports                   │
└──────────────────────────────────────┘
```

---

## 🚀 Deployment Architecture

### Vercel Infrastructure

```
┌─────────────────────────────────────────────┐
│           Vercel Edge Network                │
│  - Global CDN                                │
│  - DDoS protection                           │
│  - SSL/TLS termination                       │
└─────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────┐
│            Edge Middleware                   │
│  - Clerk authentication                      │
│  - Route protection                          │
│  - Runs close to user                        │
└─────────────────────────────────────────────┘
                    │
        ┌───────────┴──────────┐
        │                      │
        ▼                      ▼
┌──────────────┐    ┌─────────────────┐
│ Static Files │    │ Serverless Fns  │
│ - HTML       │    │ - API routes    │
│ - CSS        │    │ - SSR pages     │
│ - JS bundles │    │ - 10s timeout   │
│ - Images     │    │   (Hobby)       │
└──────────────┘    └─────────────────┘
        │                      │
        │          ┌───────────┴──────────┐
        │          │                      │
        ▼          ▼                      ▼
    Browser   ┌─────────┐          ┌──────────┐
              │  Neon   │          │ External │
              │   DB    │          │   APIs   │
              └─────────┘          └──────────┘
```

### Build Process

```
GitHub Push
     │
     ▼
Vercel Webhook Triggered
     │
     ▼
Clone Repository
     │
     ▼
Install Dependencies (npm install)
     │
     ▼
Build Next.js (npm run build)
     │
     ├─→ Compile TypeScript
     ├─→ Bundle client JavaScript
     ├─→ Optimize images
     ├─→ Generate static pages
     ├─→ Prepare serverless functions
     │
     ▼
Deploy to Edge Network
     │
     ├─→ Upload static assets to CDN
     ├─→ Deploy serverless functions
     ├─→ Configure routing
     │
     ▼
Health Check
     │
     ▼
Live on Production URL
```

---

## 🔒 Security Architecture

### Layers of Security

```
1. Edge Layer (Vercel)
   ├─→ DDoS protection
   ├─→ SSL/TLS encryption
   └─→ Rate limiting (if configured)

2. Authentication Layer (Clerk)
   ├─→ JWT validation
   ├─→ Session management
   └─→ Middleware protection

3. Application Layer (Next.js)
   ├─→ Input validation
   ├─→ Error handling
   └─→ Secure API routes

4. Database Layer (Neon)
   ├─→ SSL connection
   ├─→ Parameterized queries (Drizzle)
   └─→ Connection pooling

5. External APIs
   ├─→ API key management (env vars)
   ├─→ Request signing
   └─→ Rate limiting
```

### Environment Variables

```
Production Environment (Vercel)
     │
     ▼
Environment Variables
     │
     ├─→ Encrypted at rest
     ├─→ Injected at build time
     ├─→ Available in serverless functions
     │
     └─→ Never exposed to client
         (except NEXT_PUBLIC_* vars)
```

---

## 📊 Data Flow Diagrams

### User Creation Flow

```
New user signs up via Clerk
         │
         ▼
Clerk creates user account
         │
         ▼
User redirected to /dashboard
         │
         ▼
useEffect() triggers on mount
         │
         ▼
POST /api/users
         │
         ├─→ Get Clerk user data
         ├─→ Extract email & name
         ├─→ Check if user exists in DB
         │
         ├─→ If not exists:
         │   ├─→ Insert into users table
         │   ├─→ Set initial credits (10)
         │   └─→ Return user record
         │
         └─→ If exists:
             └─→ Return existing user
```

### Voice Session Flow

```
User clicks "Start Session"
         │
         ▼
Generate sessionId (UUID)
         │
         ▼
Navigate to /medical-agent/[sessionId]
         │
         ▼
Initialize VAPI
         │
         ├─→ Create VAPI instance
         ├─→ Configure with public key
         ├─→ Set up event listeners
         │
         ▼
User clicks "Start Call"
         │
         ▼
VAPI.start()
         │
         ├─→ Request microphone permission
         ├─→ Establish WebRTC connection
         ├─→ Begin audio streaming
         │
         ▼
Conversation happens
         │
         ├─→ Speech → Text (live transcription)
         ├─→ Text → AI processing
         ├─→ AI response → Speech
         │
         ▼
User clicks "End Call"
         │
         ▼
VAPI.stop()
         │
         ▼
Save conversation
         │
         ├─→ POST /api/session-chat
         ├─→ Store in sessionChartTable
         │   ├─→ conversation (JSON)
         │   ├─→ notes
         │   └─→ selectedDoctor
         │
         ▼
Generate medical report
         │
         ├─→ POST /api/medical-report
         ├─→ Send conversation to OpenRouter
         ├─→ AI generates structured report
         ├─→ Update sessionChartTable
         │
         ▼
Display report to user
```

---

## 🔧 Technology Decisions

### Why Next.js 15?
- ✅ App Router for better routing
- ✅ Server Components by default (performance)
- ✅ Built-in API routes (no separate backend)
- ✅ Optimized for Vercel deployment
- ✅ React 19 support

### Why Clerk?
- ✅ Drop-in authentication
- ✅ Beautiful pre-built UI
- ✅ Social login support
- ✅ Session management
- ✅ Middleware integration

### Why Neon?
- ✅ Serverless PostgreSQL (scales to zero)
- ✅ Automatic connection pooling
- ✅ Branch-based development
- ✅ No cold starts
- ✅ Vercel integration

### Why Drizzle ORM?
- ✅ Type-safe queries
- ✅ Better than Prisma for serverless
- ✅ SQL-like syntax
- ✅ Lightweight
- ✅ Great TypeScript support

### Why TailwindCSS v4?
- ✅ CSS-first approach (faster)
- ✅ No config file needed
- ✅ Better performance
- ✅ Modern features
- ✅ Smaller bundle size

---

## 📈 Scalability Considerations

### Current Architecture (Hobby/Small Scale)
- **Users**: Up to 10,000
- **Requests**: Unlimited (with reasonable limits)
- **Database**: 0.5GB storage
- **Functions**: 100GB-hours/month

### Scaling to Production (Medium Scale)
- **Upgrade to Vercel Pro**: $20/month
- **Upgrade Neon**: Scale plan $19/month
- **Add caching**: Redis/Upstash
- **Add monitoring**: Sentry, LogRocket
- **Add CDN**: Images on Cloudinary/S3

### Large Scale Considerations
- **Database read replicas**
- **Queue system** for background jobs
- **Rate limiting** per user
- **API caching** strategy
- **Load testing** and optimization

---

This architecture provides a solid foundation for a production healthcare application while maintaining flexibility for future enhancements.
