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
│   ├── api-client-react/   # Generated React Query hooks
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
- **Landing Page** — Hero with CTA, course outcomes, curriculum preview, testimonials, pricing
- **Dashboard** — Progress tracker, streak system, continue learning, capstone overview
- **Curriculum** — 12-week course in 5 phases (Foundations, Product Design, Building, Scaling, Capstone)
- **Week View** — Lessons list, progress checkboxes, assignments, resources
- **Lesson Page** — Content, key takeaways, "Think Like a PM" section, quiz, notes
- **Capstone Tracker** — Editable templates for problem statement, AI architecture, MVP, metrics, guardrails; stage tracker (Idea→Design→Build→Evaluate→Launch)
- **Templates Library** — AI Problem Framing, RAG vs Fine-tuning Decision Tree, AI Eval Framework, Prompt Cheatsheet
- **Tools Directory** — OpenAI, LangChain, Pinecone, HuggingFace cards
- **Dark/Light mode toggle**
- **Responsive** (mobile + desktop)

### Pre-filled Content
- Week 1: Intro to AI, How LLMs Work, AI vs Traditional Software
- Week 3: AI Product Strategy, Case Study: ChatGPT
- Week 5: RAG Architecture Explained
- Week 7: Build a Chatbot (step-by-step guide)

## API Routes

| Method | Path | Description |
|--------|------|-------------|
| GET | /api/healthz | Health check |
| GET | /api/progress | Get all lesson progress |
| POST | /api/progress | Update lesson completion |
| GET | /api/notes | Get all lesson notes |
| PUT | /api/notes/:lessonId | Save/update note for a lesson |
| GET | /api/capstone | Get capstone project data |
| PUT | /api/capstone | Update capstone project |

## Database Schema

- `lesson_progress` — tracks per-lesson completion, quiz score, timestamp
- `lesson_notes` — stores user notes per lesson
- `capstone_project` — stores the capstone project (single row)

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
