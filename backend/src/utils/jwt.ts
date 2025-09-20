// src/utils/jwt.ts
import jwt, { type SignOptions } from "jsonwebtoken";
import type { User as PrismaUser } from "@prisma/client";

interface JwtPayload {
  id: number;
  email: string;
  role: string;
}

// Converts "7d", "12h", "30m", "10s", "500ms" or plain "3600" into seconds
function parseDurationToSeconds(input: string): number | null {
  const s = input.trim();

  // If it's just a number, treat as seconds
  if (/^\d+$/.test(s)) {
    return Number(s);
  }

  // Match <number><unit> with optional decimal: e.g., 1.5h, 500ms
  const match = s.match(/^(\d+(?:\.\d+)?)\s*(ms|s|m|h|d|w|y)$/i);
  if (!match) return null;

  const value = parseFloat(match[1]);
  const unit = match[2].toLowerCase();

  switch (unit) {
    case "ms":
      return Math.max(1, Math.ceil(value / 1000)); // round up to at least 1s
    case "s":
      return Math.max(1, Math.ceil(value));
    case "m":
      return Math.max(1, Math.ceil(value * 60));
    case "h":
      return Math.max(1, Math.ceil(value * 60 * 60));
    case "d":
      return Math.max(1, Math.ceil(value * 60 * 60 * 24));
    case "w":
      return Math.max(1, Math.ceil(value * 60 * 60 * 24 * 7));
    case "y":
      return Math.max(1, Math.ceil(value * 60 * 60 * 24 * 365));
    default:
      return null;
  }
}

export function generateToken(user: PrismaUser): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in .env");
  }

  const raw = (process.env.JWT_EXPIRES_IN ?? "7d").trim();
  const seconds = parseDurationToSeconds(raw);

  if (!seconds || !Number.isFinite(seconds)) {
    throw new Error(
      "Invalid JWT_EXPIRES_IN. Use number (seconds) or formats like '7d', '12h', '30m', '10s', '500ms'."
    );
  }

  const payload: JwtPayload = {
    id: user.id,
    email: user.email,
    role: String(user.role), // Prisma enum -> string
  };

  const options: SignOptions = {
    expiresIn: seconds, // always a number => TS-safe for any jsonwebtoken version
  };

  return jwt.sign(payload, secret, options);
}