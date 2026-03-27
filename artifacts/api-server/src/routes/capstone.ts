import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { capstoneProjectTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

const router: IRouter = Router();

function getUserId(req: any): string {
  return (req.headers["x-user-id"] as string) || "default";
}

router.get("/capstone", async (req, res) => {
  try {
    const userId = getUserId(req);
    const rows = await db
      .select()
      .from(capstoneProjectTable)
      .where(eq(capstoneProjectTable.userId, userId))
      .limit(1);

    if (rows.length === 0) {
      const [created] = await db
        .insert(capstoneProjectTable)
        .values({
          userId,
          problemStatement: "",
          aiArchitecture: "",
          mvpIdea: "",
          metrics: "",
          guardrails: "",
          currentStage: "Idea",
          updatedAt: new Date(),
        })
        .returning();
      res.json(created);
    } else {
      res.json(rows[0]);
    }
  } catch (err) {
    req.log.error({ err }, "Failed to get capstone");
    res.status(500).json({ error: "Failed to get capstone" });
  }
});

const updateCapstoneSchema = z.object({
  problemStatement: z.string().optional(),
  aiArchitecture: z.string().optional(),
  mvpIdea: z.string().optional(),
  metrics: z.string().optional(),
  guardrails: z.string().optional(),
  currentStage: z.string().optional(),
});

router.put("/capstone", async (req, res) => {
  const parsed = updateCapstoneSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request" });
    return;
  }

  const userId = getUserId(req);

  try {
    const rows = await db
      .select()
      .from(capstoneProjectTable)
      .where(eq(capstoneProjectTable.userId, userId))
      .limit(1);

    if (rows.length === 0) {
      const [created] = await db
        .insert(capstoneProjectTable)
        .values({
          userId,
          ...parsed.data,
          problemStatement: parsed.data.problemStatement ?? "",
          aiArchitecture: parsed.data.aiArchitecture ?? "",
          mvpIdea: parsed.data.mvpIdea ?? "",
          metrics: parsed.data.metrics ?? "",
          guardrails: parsed.data.guardrails ?? "",
          currentStage: parsed.data.currentStage ?? "Idea",
          updatedAt: new Date(),
        })
        .returning();
      res.json(created);
    } else {
      const [updated] = await db
        .update(capstoneProjectTable)
        .set({ ...parsed.data, updatedAt: new Date() })
        .where(eq(capstoneProjectTable.userId, userId))
        .returning();
      res.json(updated);
    }
  } catch (err) {
    req.log.error({ err }, "Failed to update capstone");
    res.status(500).json({ error: "Failed to update capstone" });
  }
});

export default router;
