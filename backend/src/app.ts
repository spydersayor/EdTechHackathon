import express from "express";
import cors from "cors";
import path from "path";
import authRoutes from "./routes/auth";
import jobRoutes from "./routes/jobs";
import applicationRoutes from "./routes/applications";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

app.use(errorHandler);

export default app;
