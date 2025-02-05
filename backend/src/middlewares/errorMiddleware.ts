import { Request, Response, NextFunction } from "express";

// Middleware to handle all errors
export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error:-----\n", err, "\n----"); // Log the error for debugging (use a logger in production)

  const statusCode = err.statusCode || 500;
  const message = "Internal Server Error";

  if (err.name === "ZodError") {
    res.status(400).json({ errors: err.errors });
    return;
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }), // Optionally show stack trace in dev mode
  });
  return;
};
