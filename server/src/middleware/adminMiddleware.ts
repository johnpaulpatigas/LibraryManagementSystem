// src/middleware/adminMiddleware.ts
import { Request, Response, NextFunction } from "express";

export const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ error: "Forbidden: Admins only." });
  }
  next();
};
