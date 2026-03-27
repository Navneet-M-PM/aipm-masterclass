import { pgTable, serial, text, boolean, integer, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const lessonProgressTable = pgTable("lesson_progress", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().default("default"),
  lessonId: text("lesson_id").notNull(),
  completed: boolean("completed").notNull().default(false),
  quizScore: integer("quiz_score"),
  completedAt: timestamp("completed_at"),
}, (t) => [
  uniqueIndex("lesson_progress_user_lesson_idx").on(t.userId, t.lessonId),
]);

export const insertLessonProgressSchema = createInsertSchema(lessonProgressTable).omit({ id: true });
export type InsertLessonProgress = z.infer<typeof insertLessonProgressSchema>;
export type LessonProgress = typeof lessonProgressTable.$inferSelect;

export const lessonNotesTable = pgTable("lesson_notes", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().default("default"),
  lessonId: text("lesson_id").notNull(),
  content: text("content").notNull().default(""),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (t) => [
  uniqueIndex("lesson_notes_user_lesson_idx").on(t.userId, t.lessonId),
]);

export const insertLessonNoteSchema = createInsertSchema(lessonNotesTable).omit({ id: true });
export type InsertLessonNote = z.infer<typeof insertLessonNoteSchema>;
export type LessonNote = typeof lessonNotesTable.$inferSelect;

export const capstoneProjectTable = pgTable("capstone_project", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().default("default"),
  problemStatement: text("problem_statement").notNull().default(""),
  aiArchitecture: text("ai_architecture").notNull().default(""),
  mvpIdea: text("mvp_idea").notNull().default(""),
  metrics: text("metrics").notNull().default(""),
  guardrails: text("guardrails").notNull().default(""),
  currentStage: text("current_stage").notNull().default("Idea"),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertCapstoneSchema = createInsertSchema(capstoneProjectTable).omit({ id: true });
export type InsertCapstone = z.infer<typeof insertCapstoneSchema>;
export type CapstoneProject = typeof capstoneProjectTable.$inferSelect;
