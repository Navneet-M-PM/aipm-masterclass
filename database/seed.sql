-- =============================================================================
-- AI PM Masterclass — Seed Data (Optional)
-- =============================================================================
-- This file is OPTIONAL. The app auto-creates records on first API call.
-- Only run this if you want to pre-populate a demo or test account.
-- =============================================================================

-- Demo user: replace 'demo-user-001' with any user_id you want to seed.

-- Mark first 3 lessons as completed for the demo user
INSERT INTO lesson_progress (user_id, lesson_id, completed, completed_at)
VALUES
  ('demo-user-001', 'l1',  TRUE, NOW()),
  ('demo-user-001', 'l2',  TRUE, NOW()),
  ('demo-user-001', 'l3',  TRUE, NOW())
ON CONFLICT (user_id, lesson_id) DO NOTHING;

-- Add a sample note for the first lesson
INSERT INTO lesson_notes (user_id, lesson_id, content, updated_at)
VALUES
  ('demo-user-001', 'l1', 'Key insight: LLMs predict the next token, not "think". Mental model shift!', NOW())
ON CONFLICT (user_id, lesson_id) DO NOTHING;

-- Create a capstone project for the demo user
INSERT INTO capstone_project (user_id, problem_statement, mvp_idea, metrics, guardrails, current_stage, updated_at)
VALUES (
  'demo-user-001',
  'Customer support agents spend 40% of their time searching through legacy wikis for policy answers.',
  'A Slack bot that retrieves internal docs via RAG and drafts a response for the agent to review and send.',
  '- Reduce ticket resolution time by 20%' || E'\n' || '- 80% acceptance rate of AI-drafted responses',
  'Risk: Hallucination of policies.' || E'\n' || 'Mitigation: Ground model strictly in RAG, include citations.',
  'Build',
  NOW()
)
ON CONFLICT DO NOTHING;
