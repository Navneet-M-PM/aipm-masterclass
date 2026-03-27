# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod, `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Frontend**: React + Vite, Tailwind CSS, Shadcn UI, Framer Motion

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   ├── ai-pm-course/       # AI PM Course Platform (React + Vite, at /)
│   └── api-server/         # Express API server (at /api)
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks + custom-fetch (setUserId)
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts
├── pnpm-workspace.yaml     # pnpm workspace
├── tsconfig.base.json      # Shared TS options
├── tsconfig.json           # Root TS project references
└── package.json            # Root package with hoisted devDeps
```

## AI PM Course Platform (`artifacts/ai-pm-course`)

A premium SaaS learning platform for AI Product Managers.

### Features
- **Landing Page** — Hero with CSS-based dashboard mockup (no external images), animated entry, stats bar (32 lessons, 12 weeks, 23+ questions, 5 playbooks), 5-phase curriculum overview, what's included grid, testimonials (3 cards), 3-tier pricing (Preview/Pro/Team), FAQ accordion, final CTA section
- **Onboarding Modal** — First-visit 2-step modal: name input → role selection (9 options). Stores to localStorage, dismisses on completion. Uses shared UserContext so all components update live.
- **Dashboard** — Personalized welcome (real user name), progress tracker, streak, continue learning, capstone overview
- **Curriculum** — 12-week course in 5 phases (Foundations, Product Design, Building, Scaling, Capstone)
- **Week View** — Lessons list, progress checkboxes, assignments, resources
- **Lesson Page** — Content, key takeaways, "Think Like a PM" section, quiz, notes
- **Capstone Tracker** — Editable templates for problem statement, AI architecture, MVP, metrics, guardrails; stage tracker (Idea→Design→Build→Evaluate→Launch)
- **Templates Library** — AI Problem Framing, RAG vs Fine-tuning Decision Tree, AI Eval Framework, Prompt Cheatsheet
- **Tools Directory** — OpenAI, LangChain, Pinecone, HuggingFace cards
- **Interview Prep** (`/interview`) — 23+ industry-categorized Q&A with full frameworks & sample answers; filters by industry (Tech/SaaS, FinTech, Healthcare, E-commerce, Media, Enterprise), category, and difficulty; search; "Browse by Industry" cards
- **Dark/Light mode toggle** (persisted through session)
- **Responsive** (mobile + desktop)

### User Identity & Per-User Data Isolation
- `UserContext` (`src/contexts/user-context.tsx`) — React Context providing `{ profile, loading, updateProfile, completeOnboarding }` to all components
- `useUserContext()` hook consumed by: `App.tsx` (onboarding gate), `layout.tsx` (sidebar footer), `dashboard.tsx` (welcome greeting)
- `UserProfile` shape: `{ userId: string (UUID), name: string, role: string, onboarded: boolean }`
- Stored in `localStorage` under key `aipm_user_profile`
- `setUserId()` from `@workspace/api-client-react` injects `X-User-Id` header into every API request
- API routes extract `req.headers['x-user-id']` (fallback: 'default') to filter all DB queries per user

### Pre-filled Content
- All 20 lessons enriched with latest AI model data (GPT-4o, Claude 3.5 Sonnet, Gemini 2.0 Flash, Llama 3.3)
- l1: HubSpot 2026 AI market stats
- l2: 2025 Foundation Model Landscape table with pricing/context window comparison
- l8b: AI Agents vs. Chatbots framework + HubSpot agent taxonomy + Low/High-precision task matrix
- l10: HubSpot 4-Phase AI Implementation Roadmap

## API Routes

| Method | Path | Description |
|--------|------|-------------|
| GET | /api/healthz | Health check |
| GET | /api/progress | Get lesson progress for current user (via X-User-Id header) |
| POST | /api/progress | Update lesson completion for current user |
| GET | /api/notes | Get lesson notes for current user |
| PUT | /api/notes/:lessonId | Save/update note for current user's lesson |
| GET | /api/capstone | Get capstone project for current user |
| PUT | /api/capstone | Update capstone project for current user |

## Database Schema

- `lesson_progress` — `(id, user_id, lesson_id, completed, quiz_score, completed_at)` — composite unique on (user_id, lesson_id)
- `lesson_notes` — `(id, user_id, lesson_id, content, updated_at)` — composite unique on (user_id, lesson_id)
- `capstone_project` — `(id, user_id, problem_statement, ai_architecture, mvp_idea, metrics, guardrails, current_stage, updated_at)` — one row per user

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references.

- **Always typecheck from the root** — run `pnpm run typecheck`
- **`emitDeclarationOnly`** — we only emit `.d.ts` files during typecheck
- **Project references** — when package A depends on package B, A's `tsconfig.json` must list B in its `references` array

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API client from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push database schema changes
- `pnpm --filter @workspace/api-server run build` — rebuild API server (required after route changes)

## Important Notes

- **Zod import**: API routes use `import { z } from "zod"` (NOT "zod/v4"). Schema files in `lib/db/src/schema/` use "zod/v4".
- **After API route changes**: Always rebuild API server with `pnpm --filter @workspace/api-server run build` then restart the "API Server" workflow
- **Per-user header**: `setUserId(userId)` from `@workspace/api-client-react` sets the `X-User-Id` header for all subsequent API calls
