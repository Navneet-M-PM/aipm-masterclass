-- =============================================================================
-- AI PM Masterclass — Database Schema
-- =============================================================================
-- Run this file once against any PostgreSQL database to set up all tables.
-- All tables use per-user data isolation via the `user_id` column.
-- =============================================================================

-- -----------------------------------------------------------------------
-- 1. lesson_progress
--    Tracks which lessons a user has completed.
-- -----------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS lesson_progress (
  id            SERIAL PRIMARY KEY,
  user_id       TEXT        NOT NULL DEFAULT 'default',
  lesson_id     TEXT        NOT NULL,
  completed     BOOLEAN     NOT NULL DEFAULT FALSE,
  quiz_score    INTEGER,
  completed_at  TIMESTAMP,

  CONSTRAINT lesson_progress_user_lesson_idx UNIQUE (user_id, lesson_id)
);

-- -----------------------------------------------------------------------
-- 2. lesson_notes
--    Stores per-user, per-lesson notes written in the notes sidebar.
-- -----------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS lesson_notes (
  id          SERIAL PRIMARY KEY,
  user_id     TEXT        NOT NULL DEFAULT 'default',
  lesson_id   TEXT        NOT NULL,
  content     TEXT        NOT NULL DEFAULT '',
  updated_at  TIMESTAMP   NOT NULL DEFAULT NOW(),

  CONSTRAINT lesson_notes_user_lesson_idx UNIQUE (user_id, lesson_id)
);

-- -----------------------------------------------------------------------
-- 3. capstone_project
--    One capstone project record per user (upserted on first API call).
-- -----------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS capstone_project (
  id                 SERIAL PRIMARY KEY,
  user_id            TEXT        NOT NULL DEFAULT 'default',
  problem_statement  TEXT        NOT NULL DEFAULT '',
  ai_architecture    TEXT        NOT NULL DEFAULT '',
  mvp_idea           TEXT        NOT NULL DEFAULT '',
  metrics            TEXT        NOT NULL DEFAULT '',
  guardrails         TEXT        NOT NULL DEFAULT '',
  current_stage      TEXT        NOT NULL DEFAULT 'Idea',
  updated_at         TIMESTAMP   NOT NULL DEFAULT NOW()
);

-- =============================================================================
-- Done. Your database is ready.
-- =============================================================================
