import { Request, Response } from "express";
import { z } from "zod";
import SchoolController from "./schoolController";

class AuthController {
  static async login(req: Request, res: Response) {
    // Check if email and password are provided
    const loginSchema = z.object({
      email: z.string().email(),
      role: z.enum(["ADMIN", "TEACHER", "USER"]),
      password: z.string().min(6),
    });
    loginSchema.parse(req.body);

    if (req.body.role === "ADMIN") {
      // Authenticate admin
    } else {
      // Authenticate user
    }
  }

  static async register(req: Request, res: Response) {
    // ...
  }

  static async logout(req: Request, res: Response) {
    // ...
  }

  static async forgotPassword(req: Request, res: Response) {
    // ...
  }

  static async getMe(req: Request, res: Response) {
    res.status(200).json({
      message: "Authenticated",
      user: req.user,
    });
  }
}

export default AuthController;
