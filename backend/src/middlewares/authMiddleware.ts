import { UserRole } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";

// Middleware to check if the user is authenticated
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Assuming Bearer token format

  if (!token) {
    res.status(401).json({ message: "Unauthorized access. Token missing." });
    return;
  }

  try {
    const decoded = jwt.verify(token, config.app.jwtSecret) as {
      userId: number;
      role: UserRole;
    };
    req.user = decoded; // Attach user info to request object (e.g., userId and role)
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized access. Invalid token." });
    return;
  }
};

// Middleware to check if the user has a specific role
export const roleMiddleware = (role: UserRole) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.role !== role) {
      res
        .status(403)
        .json({ message: "Forbidden access. Insufficient permissions." });
      return;
    }
    next();
  };
};
