import { NextFunction, Request, Response } from "express";
import TeacherService from "../services/teacherService";
import { z } from "zod";

class TeacherController {
  static async createTeacher(req: Request, res: Response, next: NextFunction) {
    try {
      const createTeacherSchema = z.object({
        name: z.string().min(3, "Name must be at least 3 characters long"),
        email: z.string().email("Invalid email format"),
        password: z
          .string()
          .min(6, "Password must be at least 6 characters long"),
        address: z.string(),
        schoolId: z.number().int().positive(),
      });
      const validatedData = createTeacherSchema.parse(req.body);
      const teacher = await TeacherService.createTeacher(validatedData);
      res
        .status(201)
        .json({ message: "Teacher created successfully", teacher });
    } catch (error) {
      next(error);
    }
  }

  static async getTeacherByEmailAndPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const schema = z.object({
        email: z.string().email("Invalid email format"),
        password: z
          .string()
          .min(6, "Password must be at least 6 characters long"),
      });
      const { email, password } = schema.parse(req.body);
      const teacher = await TeacherService.getTeacherByEmailAndPassword(
        email,
        password
      );
      res.json(teacher);
    } catch (error) {
      next(error);
    }
  }

  static async getTeachersBySchool(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const schoolId = parseInt(req.params.schoolId);
      z.number().positive().parse(schoolId);
      const teachers = await TeacherService.getTeachersBySchool(schoolId);
      res.json(teachers);
    } catch (error) {
      next(error);
    }
  }

  static async getTeacherById(req: Request, res: Response, next: NextFunction) {
    try {
      const teacherId = parseInt(req.params.id);
      z.number().positive().parse(teacherId);
      const teacher = await TeacherService.getTeacherById(teacherId);
      res.json(teacher);
    } catch (error) {
      next(error);
    }
  }

  static async updateTeacher(req: Request, res: Response, next: NextFunction) {
    try {
      const teacherId = parseInt(req.params.id);
      z.number().positive().parse(teacherId);
      const updateTeacherSchema = z.object({
        name: z
          .string()
          .min(3, "Name must be at least 3 characters long")
          .optional(),
        email: z.string().email("Invalid email format").optional(),
        password: z
          .string()
          .min(6, "Password must be at least 6 characters long")
          .optional(),
        address: z.string().optional(),
        schoolId: z.number().int().positive().optional(),
      });
      const validatedData = updateTeacherSchema.parse(req.body);
      const updatedTeacher = await TeacherService.updateTeacher(
        teacherId,
        validatedData
      );
      res.json({
        message: "Teacher updated successfully",
        updatedTeacher,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteTeacher(req: Request, res: Response, next: NextFunction) {
    try {
      const teacherId = parseInt(req.params.id);
      z.number().positive().parse(teacherId);
      await TeacherService.deleteTeacher(teacherId);
      res.json({ message: "Teacher deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

export default TeacherController;
