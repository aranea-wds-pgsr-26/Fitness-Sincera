import { Request, Response, NextFunction } from "express";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    username: string;
    role: string;
    isSpecialist: boolean;
  };
}

export function verifyJWT(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized", message: "Missing or invalid token" });
    }

    const token = authHeader.substring(7);
    // For now, parse the token as JWT payload (in production, use proper JWT verification)
    const payload = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());

    req.user = {
      id: payload.id,
      username: payload.username,
      role: payload.role || "client",
      isSpecialist: payload.isSpecialist || false,
    };

    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized", message: "Invalid token" });
  }
}

export function requireRole(...roles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized", message: "User not authenticated" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: "Forbidden",
        message: `User role '${req.user.role}' is not authorized to access this resource`,
      });
    }

    next();
  };
}
