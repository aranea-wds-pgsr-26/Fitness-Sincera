import { randomUUID } from "node:crypto";
import type { RequestHandler } from "express";

declare global {
  namespace Express {
    interface Request {
      requestId?: string;
    }
  }
}

export const requestId: RequestHandler = (req, res, next) => {
  const incomingId = req.get("x-request-id");
  req.requestId = incomingId || randomUUID();
  res.setHeader("x-request-id", req.requestId);
  next();
};
