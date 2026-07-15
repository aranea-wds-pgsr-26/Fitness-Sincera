import type { Request, RequestHandler } from "express";

export type AuthRequest = Request;

export const verifyJWT: RequestHandler = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ error: "Unauthorized", message: "Missing or invalid token" });
      return;
    }

    const token = authHeader.substring(7);
    // For now, parse the token as JWT payload (in production, use proper JWT verification)
    const payload = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());

    req.user = {
      id: payload.id,
      name: payload.name ?? payload.username ?? "User",
      email: payload.email ?? "",
      password: "",
      role: payload.role || "client",
    };

    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized", message: "Invalid token" });
  }
};

export function requireRole(...roles: string[]) {
  const middleware: RequestHandler = (req, res, next) => {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized", message: "User not authenticated" });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        error: "Forbidden",
        message: `User role '${req.user.role}' is not authorized to access this resource`,
      });
      return;
    }

    next();
  };

  return middleware;
}
