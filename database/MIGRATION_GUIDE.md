# Database Migration Guide

Everything you need to move the AI PM Masterclass database to any PostgreSQL host.

---

## Files in this folder

| File | Purpose |
|------|---------|
| `schema.sql` | Creates all tables from scratch — run this first on any new database |
| `seed.sql` | Optional demo data — run this if you want a pre-populated test account |

---

## Quick Setup (any platform)

### Step 1 — Provision a PostgreSQL database

Any of these work out of the box:

| Platform | Where to find it |
|----------|-----------------|
| **Bolt** (StackBlitz) | Neon (built-in) or external |
| **Supabase** | Dashboard → New Project → Database |
| **Neon** | neon.tech → New Project |
| **Railway** | Add service → Database → PostgreSQL |
| **Render** | New → PostgreSQL |
| **PlanetScale / Turso** | Not compatible (MySQL / SQLite) |

Copy the **connection string** — it looks like:
```
postgresql://user:password@host:5432/dbname
```

---

### Step 2 — Run the schema

**Option A — psql (command line)**
```bash
psql "YOUR_CONNECTION_STRING" -f database/schema.sql
```

**Option B — Drizzle push (if staying in Node.js)**
```bash
DATABASE_URL="YOUR_CONNECTION_STRING" pnpm --filter @workspace/db run push
```

**Option C — Platform SQL editor**

Open the database's web SQL editor (Supabase, Neon, Railway all have one), paste the contents of `schema.sql`, and run it.

---

### Step 3 — Set the environment variable

Add this secret to your new platform:

```
DATABASE_URL=postgresql://user:password@host:5432/dbname
```

---

### Step 4 — (Optional) Restore user data from Replit

If you want to carry over existing progress and notes:

**Export from Replit:**
```bash
pg_dump $DATABASE_URL \
  --data-only \
  --table=lesson_progress \
  --table=lesson_notes \
  --table=capstone_project \
  -f database/export.sql
```

**Import to new database:**
```bash
psql "NEW_CONNECTION_STRING" -f database/export.sql
```

---

## Table Overview

### `lesson_progress`
Stores which lessons each user has completed.

| Column | Type | Notes |
|--------|------|-------|
| `id` | serial | Primary key |
| `user_id` | text | From `x-user-id` header / localStorage |
| `lesson_id` | text | e.g. `l1`, `l2`, `l3b` |
| `completed` | boolean | |
| `quiz_score` | integer | nullable |
| `completed_at` | timestamp | nullable |

### `lesson_notes`
Stores per-user notes written in the lesson sidebar.

| Column | Type | Notes |
|--------|------|-------|
| `id` | serial | Primary key |
| `user_id` | text | |
| `lesson_id` | text | |
| `content` | text | Raw text content |
| `updated_at` | timestamp | Auto-updated |

### `capstone_project`
One record per user for their capstone project tracker.

| Column | Type | Notes |
|--------|------|-------|
| `id` | serial | Primary key |
| `user_id` | text | |
| `problem_statement` | text | |
| `ai_architecture` | text | |
| `mvp_idea` | text | |
| `metrics` | text | |
| `guardrails` | text | |
| `current_stage` | text | One of: Idea, Design, Build, Evaluate, Launch |
| `updated_at` | timestamp | Auto-updated on save |

---

## User ID System

This app uses **client-generated user IDs** stored in `localStorage` — no login required.

Every API request sends a `x-user-id` header (a UUID generated on first visit). The server uses this to scope all data. This means:

- **No auth migration needed** — users just start fresh on the new platform
- **Data portability** — if a user knows their ID (visible in browser DevTools → Application → Local Storage → `aipm_user_profile`), you can migrate their specific rows by matching `user_id`

---

## Troubleshooting

**"relation does not exist" error**
→ Schema hasn't been run yet. Execute `schema.sql` on your database.

**"duplicate key" error when seeding**
→ Data already exists. Safe to ignore — the seed uses `ON CONFLICT DO NOTHING`.

**Connection refused**
→ Check that your `DATABASE_URL` is correct and the database allows connections from your server's IP (check firewall / allowlist settings on Neon/Supabase/Railway).
