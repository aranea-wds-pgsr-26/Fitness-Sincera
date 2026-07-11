import type { NextFunction, Request, Response } from "express";
import { getSessionUser, type User } from "../lib/store";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.get("authorization");
  const token = header?.startsWith("Bearer ") ? header.slice(7) : req.get("x-auth-token");

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  const user = await getSessionUser(token);
  if (!user) {
    return res.status(401).json({ message: "Authentication required" });
  }

  req.user = user;
  return next();
}

export function requireRole(roles: Array<User["role"]>) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    return next();
  };
}
