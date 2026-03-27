import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { lessonNotesTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

const router: IRouter = Router();

router.get("/notes", async (req, res) => {
  try {
    const notes = await db.select().from(lessonNotesTable);
    res.json(notes);
  } catch (err) {
    req.log.error({ err }, "Failed to get notes");
    res.status(500).json({ error: "Failed to get notes" });
  }
});

const saveNoteSchema = z.object({
  content: z.string(),
});

router.put("/notes/:lessonId", async (req, res) => {
  const { lessonId } = req.params;
  const parsed = saveNoteSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request" });
    return;
  }

  const { content } = parsed.data;

  try {
    const existing = await db
      .select()
      .from(lessonNotesTable)
      .where(eq(lessonNotesTable.lessonId, lessonId))
      .limit(1);

    if (existing.length > 0) {
      const [updated] = await db
        .update(lessonNotesTable)
        .set({ content, updatedAt: new Date() })
        .where(eq(lessonNotesTable.lessonId, lessonId))
        .returning();
      res.json(updated);
    } else {
      const [created] = await db
        .insert(lessonNotesTable)
        .values({ lessonId, content, updatedAt: new Date() })
        .returning();
      res.json(created);
    }
  } catch (err) {
    req.log.error({ err }, "Failed to save note");
    res.status(500).json({ error: "Failed to save note" });
  }
});

export default router;
