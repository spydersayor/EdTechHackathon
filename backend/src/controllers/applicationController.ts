import { Request, Response } from "express";
import { prisma } from "../config/db";

export const applyJob = async (req: Request, res: Response) => {
  try {
    const { jobId } = req.body;
    const resume = req.file?.filename;

    if (!resume) return res.status(400).json({ message: "Resume required" });

    const application = await prisma.application.create({
      data: {
        resume,
        userId: (req as any).user.id,
        jobId: Number(jobId),
      },
    });

    res.json(application);
  } catch (err) {
    res.status(500).json({ message: "Application failed" });
  }
};

export const getApplications = async (req: Request, res: Response) => {
  const user = (req as any).user;
  let apps;

  if (user.role === "student") {
    apps = await prisma.application.findMany({
      where: { userId: user.id },
      include: { job: true },
    });
  } else {
    apps = await prisma.application.findMany({ include: { user: true, job: true } });
  }

  res.json(apps);
};

export const updateStatus = async (req: Request, res: Response) => {
  const { status } = req.body;
  const id = Number(req.params.id);

  const app = await prisma.application.update({
    where: { id },
    data: { status },
  });

  res.json(app);
};
