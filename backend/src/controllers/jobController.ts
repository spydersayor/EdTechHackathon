import { Request, Response } from "express";
import { prisma } from "../config/db";

export const getJobs = async (req: Request, res: Response) => {
  const jobs = await prisma.job.findMany();
  res.json(jobs);
};

export const getJob = async (req: Request, res: Response) => {
  const job = await prisma.job.findUnique({ where: { id: Number(req.params.id) } });
  if (!job) return res.status(404).json({ message: "Job not found" });
  res.json(job);
};

export const createJob = async (req: Request, res: Response) => {
  const { title, description, company } = req.body;
  const job = await prisma.job.create({
    data: { title, description, company },
  });
  res.json(job);
};
