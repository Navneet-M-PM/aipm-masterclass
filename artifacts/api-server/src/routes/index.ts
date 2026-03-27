import { Router, type IRouter } from "express";
import healthRouter from "./health";
import progressRouter from "./progress";
import notesRouter from "./notes";
import capstoneRouter from "./capstone";

const router: IRouter = Router();

router.use(healthRouter);
router.use(progressRouter);
router.use(notesRouter);
router.use(capstoneRouter);

export default router;
