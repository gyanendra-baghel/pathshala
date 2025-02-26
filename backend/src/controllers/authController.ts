import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import AuthService from "../services/authService";
import ApiError from "../utils/ApiError";

class AuthController {
  static async login(req: Request, res: Response, next: any) {
    try {
      // Check if email and password are provided
      const loginSchema = z.object({
        email: z.string().email(),
        role: z.enum(["MAIN_ADMIN", "TEACHER", "STUDENT"]),
        password: z.string().min(6),
      });
      const { email, password, role } = loginSchema.parse(req.body);

      const token = await AuthService.authUser(email, password, role);

      if (!token) {
        throw new ApiError(401, "Invalid credentials");
      }
      res.status(200).json({ message: "Login Successful", token });
    } catch (error) {
      next(error);
    }
  }

  static async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new ApiError(401, "Unauthorized");
      }

      const user = await AuthService.getUserByIdAndRole(
        req.user.userId,
        req.user.role
      );
      res.status(200).json({ ...user, password: "****", role: req.user.role });
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
