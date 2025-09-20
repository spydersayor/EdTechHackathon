import { Router } from "express";
import { getJobs, getJob, createJob } from "../controllers/jobController";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.get("/", getJobs);
router.get("/:id", getJob);
router.post("/", authMiddleware(["placement"]), createJob);

export default router;
