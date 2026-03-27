import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { lessonProgressTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

const router: IRouter = Router();

router.get("/progress", async (req, res) => {
  try {
    const progress = await db.select().from(lessonProgressTable);
    res.json(progress);
  } catch (err) {
    req.log.error({ err }, "Failed to get progress");
    res.status(500).json({ error: "Failed to get progress" });
  }
});

const updateProgressSchema = z.object({
  lessonId: z.string(),
  completed: z.boolean(),
  quizScore: z.number().int().nullish(),
});

router.post("/progress", async (req, res) => {
  const parsed = updateProgressSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request" });
    return;
  }

  const { lessonId, completed, quizScore } = parsed.data;

  try {
    const existing = await db
      .select()
      .from(lessonProgressTable)
      .where(eq(lessonProgressTable.lessonId, lessonId))
      .limit(1);

    if (existing.length > 0) {
      const [updated] = await db
        .update(lessonProgressTable)
        .set({
          completed,
          quizScore: quizScore ?? null,
          completedAt: completed ? new Date() : null,
        })
        .where(eq(lessonProgressTable.lessonId, lessonId))
        .returning();
      res.json(updated);
    } else {
      const [created] = await db
        .insert(lessonProgressTable)
        .values({
          lessonId,
          completed,
          quizScore: quizScore ?? null,
          completedAt: completed ? new Date() : null,
        })
        .returning();
      res.json(created);
    }
  } catch (err) {
    req.log.error({ err }, "Failed to update progress");
    res.status(500).json({ error: "Failed to update progress" });
  }
});

export default router;
