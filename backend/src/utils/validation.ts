import { Request, Response, NextFunction } from "express";

// Helper function to validate email format
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

// Middleware to validate required fields in the request body
export const validateRequiredFields = (requiredFields: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    for (let field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ error: `${field} is required` });
      }
    }
    next();
  };
};

// Example for validating a number (e.g., age)
export const validateNumber = (value: any): boolean => {
  return !isNaN(value) && typeof value === "number";
};
