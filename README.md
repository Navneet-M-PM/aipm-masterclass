<div align="center">

# 🤖 AI PM Masterclass

**A production-ready, full-stack SaaS course platform for aspiring AI Product Managers**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Express](https://img.shields.io/badge/Express-5-000000?style=flat-square&logo=express)](https://expressjs.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Drizzle-336791?style=flat-square&logo=postgresql)](https://www.postgresql.org)
[![pnpm](https://img.shields.io/badge/pnpm-workspace-F69220?style=flat-square&logo=pnpm)](https://pnpm.io)

[Live Demo](https://aipm-masterclass.replit.app) · [Report Bug](https://github.com/Navneet-M-PM/aipm-masterclass/issues) · [Request Feature](https://github.com/Navneet-M-PM/aipm-masterclass/issues)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Curriculum](#-curriculum)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [API Reference](#-api-reference)
- [Environment Variables](#-environment-variables)
- [Contributing](#-contributing)

---

## 🌟 Overview

AI PM Masterclass is a **premium, production-ready learning platform** that teaches product managers how to ship AI-powered products — from foundational LLM knowledge to production deployment, evaluation, ethics, and career positioning. Built as a full SaaS application with per-user data isolation, persistent progress tracking, an interactive capstone tracker, and a polished landing page with tiered pricing.

The platform is built as a **pnpm monorepo** with a decoupled React frontend and Express API backend, connected through a generated type-safe API client.

---

## ✨ Features

### Learning Experience
- **32 lessons** across 5 phases and 12 weeks of structured content
- **Interactive quizzes** at the end of every lesson with instant answer feedback
- **Visual diagrams** for every lesson — architecture flows, timelines, loops, and pipelines rendered as interactive SVG components
- **Next Lesson navigation** — automatically chains to the next lesson or next week on completion
- **Confetti celebration** when a lesson is completed
- **Collapsible content sections** — Content, Quiz, Visual Guide, Resources

### Progress & Personalization
- **Per-user data isolation** — all progress, notes, and capstone data scoped to the user via `x-user-id`
- **Persistent progress tracking** — lessons marked complete survive page reloads and sessions
- **In-lesson notes sidebar** — write and save personal notes for any lesson
- **2-step onboarding modal** — captures name and role on first visit

### Capstone Tracker
- **5-stage project tracker** — Idea → Design → Build → Evaluate → Launch
- **Auto-save on stage change** — clicking a stage instantly persists to the database
- **Structured project fields** — Problem Statement, MVP Definition, Success Metrics, Guardrails

### Platform
- **Landing page** with hero, stats bar, phase overview, testimonials, 3-tier pricing (Free / Pro / Team), and FAQ
- **Curriculum overview** — all 5 phases and 12 weeks at a glance
- **Templates library** — PM document templates for AI products
- **Tools directory** — curated AI tools for PMs
- **Interview prep module** — common AI PM interview questions and frameworks
- **Dark / Light mode** with persistent theme toggle
- **Fully responsive** — optimized for desktop, tablet, and mobile

---

## 📚 Curriculum

| Phase | Title | Weeks | Lessons |
|-------|-------|-------|---------|
| 🚀 Phase 1 | Foundations & AI Thinking | Weeks 1–2 | 7 lessons |
| 🏗️ Phase 2 | AI Product Design | Weeks 3–5 | 8 lessons |
| ⚙️ Phase 3 | Building with AI | Weeks 6–8 | 7 lessons |
| 📊 Phase 4 | Scaling & Mastery | Weeks 9–11 | 6 lessons |
| 🏁 Phase 5 | Capstone & Career | Week 12 | 4 lessons |

**Total:** 5 phases · 12 weeks · 32 lessons · 32 visual diagrams · 32 quizzes

<details>
<summary><strong>View full week-by-week breakdown</strong></summary>

| Week | Title | Key Topics |
|------|-------|-----------|
| Week 1 | AI Fundamentals for PMs | ML vs AI, LLMs, neural networks, mental models |
| Week 2 | LLMs & Foundation Models | Tokenization, context windows, GPT vs BERT, fine-tuning |
| Week 3 | AI Product Strategy | Opportunity mapping, build vs buy, PM workflow |
| Week 4 | UX for AI Products | Design principles, trust, error handling, feedback loops |
| Week 5 | Data Strategy | Data flywheels, training data, labeling, governance |
| Week 6 | Prompt Engineering | System prompts, few-shot, RAG, chain-of-thought |
| Week 7 | Building with APIs | LLM APIs, orchestration, LangChain patterns |
| Week 8 | Evaluation & Quality | Eval pipelines, LLM-as-judge, A/B testing |
| Week 9 | AI Product Metrics | North star metrics, guardrail metrics, dashboards |
| Week 10 | AI Safety & Ethics | Bias, hallucination, responsible AI, compliance |
| Week 11 | Scaling AI Products | MLOps, model drift, retraining, cost optimization |
| Week 12 | Capstone & Career | Capstone project, portfolio, interview prep, job strategy |

</details>

---

## 🛠 Tech Stack

### Frontend (`artifacts/ai-pm-course`)
| Technology | Purpose |
|-----------|---------|
| **React 19** | UI framework |
| **Vite 7** | Build tool & dev server |
| **TypeScript 5** | Type safety |
| **Tailwind CSS v4** | Utility-first styling |
| **Framer Motion** | Animations & transitions |
| **Wouter** | Lightweight client-side routing |
| **TanStack Query v5** | Server state & caching |
| **Radix UI + shadcn/ui** | Accessible component primitives |
| **Lucide React** | Icon system |
| **canvas-confetti** | Lesson completion celebration |
| **Zod** | Schema validation |

### Backend (`artifacts/api-server`)
| Technology | Purpose |
|-----------|---------|
| **Express 5** | HTTP server & routing |
| **Node.js** | Runtime |
| **Drizzle ORM** | Type-safe database queries |
| **PostgreSQL** | Persistent data store |
| **Pino** | Structured logging |
| **Zod** | Request body validation |

### Shared Libraries (`lib/`)
| Package | Purpose |
|---------|---------|
| `@workspace/db` | Drizzle schema + database client |
| `@workspace/api-zod` | Shared Zod schemas (OpenAPI spec source) |
| `@workspace/api-client-react` | Auto-generated type-safe React hooks (Orval) |

---

## 🏗 Architecture

```
aipm-masterclass/
├── artifacts/
│   ├── ai-pm-course/          # React + Vite frontend (port 19257)
│   └── api-server/            # Express REST API (port 8080)
├── lib/
│   ├── db/                    # Drizzle ORM schema & migrations
│   ├── api-zod/               # Zod schemas → OpenAPI spec
│   └── api-client-react/      # Auto-generated TanStack Query hooks
├── pnpm-workspace.yaml
└── package.json
```

### Data Flow

```
Browser
  └── React (Wouter routing)
       └── TanStack Query hooks (api-client-react)
            └── REST API calls → Express (api-server)
                 └── Drizzle ORM → PostgreSQL
```

### Per-User Isolation

Every API request includes an `x-user-id` header (generated on first visit, stored in `localStorage`). All database queries filter by this ID, ensuring full data isolation without requiring authentication.

```typescript
// All API routes follow this pattern
function getUserId(req): string {
  return (req.headers["x-user-id"] as string) || "default";
}
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20+
- **pnpm** 9+
- **PostgreSQL** database

### Installation

```bash
# Clone the repository
git clone https://github.com/Navneet-M-PM/aipm-masterclass.git
cd aipm-masterclass

# Install dependencies
pnpm install
```

### Environment Variables

Create a `.env` file in the root (or set these in your platform's secrets manager):

```env
DATABASE_URL=postgresql://user:password@host:5432/dbname
```

### Database Setup

The `database/` folder contains everything you need:

```bash
# Option A — Plain SQL (works on any platform: Neon, Supabase, Railway, Render…)
psql "YOUR_DATABASE_URL" -f database/schema.sql

# Option B — Drizzle push (if running locally with Node.js)
pnpm --filter @workspace/db run push
```

> See [`database/MIGRATION_GUIDE.md`](./database/MIGRATION_GUIDE.md) for full step-by-step instructions on moving to a different platform, exporting live data, and restoring it.

### Development

Run both the frontend and API server in parallel:

```bash
# Start the API server
pnpm --filter @workspace/api-server run dev

# In a separate terminal, start the frontend
pnpm --filter @workspace/ai-pm-course run dev
```

| Service | URL |
|---------|-----|
| Frontend | http://localhost:19257 |
| API Server | http://localhost:8080 |

### Build for Production

```bash
# Build the frontend
pnpm --filter @workspace/ai-pm-course run build

# Build the API server
pnpm --filter @workspace/api-server run build
```

---

## 📁 Project Structure

```
artifacts/ai-pm-course/src/
├── components/
│   ├── diagrams.tsx           # 30+ SVG diagram components (one per lesson)
│   ├── layout.tsx             # AppLayout, Sidebar, MobileHeader
│   └── onboarding-modal.tsx   # 2-step onboarding flow
├── contexts/
│   └── user-context.tsx       # Global user profile + localStorage sync
├── hooks/
│   ├── use-progress.ts        # Lesson completion tracking
│   ├── use-notes.ts           # Per-lesson note persistence
│   └── use-capstone.ts        # Capstone project CRUD
├── lib/
│   └── data.ts                # All 32 lessons, 12 weeks, 5 phases
└── pages/
    ├── landing.tsx             # Marketing landing page
    ├── dashboard.tsx           # Learner dashboard
    ├── curriculum.tsx          # Full course overview
    ├── week.tsx                # Week detail page
    ├── lesson.tsx              # Lesson view with quiz + diagram + notes
    ├── capstone.tsx            # Capstone project tracker
    ├── templates.tsx           # PM templates library
    ├── tools.tsx               # AI tools directory
    └── interview.tsx           # Interview prep module

artifacts/api-server/src/routes/
├── progress.ts                 # GET/POST lesson completion
├── notes.ts                    # GET/POST/PATCH lesson notes
└── capstone.ts                 # GET/PUT capstone project data

lib/db/src/
└── schema.ts                   # Drizzle table definitions
    ├── progressTable           # (userId, lessonId, completedAt)
    ├── lessonNotesTable        # (userId, lessonId, content, updatedAt)
    └── capstoneProjectTable    # (userId, stage, problem, mvp, metrics, ...)
```

---

## 📡 API Reference

All endpoints are prefixed with `/api` and require the `x-user-id` header.

### Progress

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/progress` | Get all completed lesson IDs for user |
| `POST` | `/api/progress` | Toggle a lesson as complete/incomplete |

### Notes

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/notes` | Get all notes for user |
| `POST` | `/api/notes` | Create or update a lesson note |

### Capstone

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/capstone` | Get user's capstone project (auto-creates if missing) |
| `PUT` | `/api/capstone` | Update capstone fields and/or stage |

---

## 🔧 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✅ | PostgreSQL connection string |
| `PORT` | ✅ (auto) | API server port (default: 8080) |
| `NODE_ENV` | ✅ (auto) | `development` or `production` |
| `GITHUB_TOKEN` | ⬜ | Only needed for GitHub Actions / CI push |

---

## 🗺 Roadmap

- [ ] Email/password authentication with JWT
- [ ] Stripe payment integration (Free / Pro / Team tiers)
- [ ] Admin dashboard for content management
- [ ] Video lesson embeds (YouTube / Vimeo)
- [ ] Community discussion threads per lesson
- [ ] Cohort mode with instructor-led scheduling
- [ ] Certificate generation on course completion
- [ ] Mobile app (React Native / Expo)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Built with ❤️ by **Navneet M**

[⬆ Back to top](#-ai-pm-masterclass)

</div>
