// src/middlewares/errorMiddleware.ts
import { Request, Response, NextFunction } from "express";

// Middleware to handle all errors
export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err); // Log the error for debugging (use a logger in production)

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }), // Optionally show stack trace in dev mode
  });
};
