import { Router } from "express";
import multer from "multer";
import path from "path";
import { applyJob, getApplications, updateStatus } from "../controllers/applicationController";
import { authMiddleware } from "../middleware/auth";

const router = Router();

const upload = multer({
  dest: path.join(__dirname, "../../uploads"),
});

router.post("/apply", authMiddleware(["student"]), upload.single("resume"), applyJob);
router.get("/", authMiddleware(["student", "placement"]), getApplications);
router.patch("/:id/status", authMiddleware(["placement"]), updateStatus);

export default router;
