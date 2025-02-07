import { Request, Response, NextFunction } from "express";

// Middleware to handle all errors
export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = "Internal Server Error";

  if (err.name === "ZodError") {
    res
      .status(400)
      .json({ message: "Invalid Credientials", errors: err.errors });
    return;
  } else if (err.name === "ApiError") {
    res.status(err.statusCode).json({ message: err.message });
    return;
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }), // Optionally show stack trace in dev mode
  });
  return;
};
