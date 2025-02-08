import { NextFunction, Request, Response } from "express";
import GradeService from "../services/gradeService";
import { z } from "zod";
import ApiError from "../utils/ApiError";

class GradeController {
  // Create a new grade
  static async createGrade(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new ApiError(401, "Unauthorized");
      }
      req.body.schoolId = req.user.schoolId;
      const gradeSchema = z.object({
        name: z.string().nonempty(),
        schoolId: z.number(),
      });
      const gradeData = gradeSchema.parse(req.body);
      const grade = await GradeService.createGrade(gradeData);
      res.status(201).json(grade);
    } catch (error) {
      next(error);
    }
  }

  // Get all grades for a specific school
  static async getGradesBySchool(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.user) {
        throw new ApiError(401, "Unauthorized");
      }
      const schoolId = req.user.schoolId;

      const grades = await GradeService.getGradesBySchool(schoolId);
      res.status(200).json(grades);
    } catch (error) {
      next(error);
    }
  }

  // Get a specific grade by ID
  static async getGradeById(req: Request, res: Response, next: NextFunction) {
    try {
      const gradeId = z.number().positive().parse(parseInt(req.params.id));
      const grade = await GradeService.getGradeById(gradeId);
      if (!grade) {
        throw new ApiError(404, "Grade not found.");
      }
      res.status(200).json(grade);
    } catch (error) {
      next(error);
    }
  }

  // Update grade information
  static async updateGrade(req: Request, res: Response, next: NextFunction) {
    try {
      const gradeId = z.number().positive().parse(parseInt(req.params.id));
      const gradeSchema = z.object({
        name: z.string().nonempty().optional(),
        schoolId: z.number().optional(),
      });
      const gradeData = gradeSchema.parse(req.body);
      const updatedGrade = await GradeService.updateGrade(gradeId, gradeData);
      if (!updatedGrade) {
        throw new ApiError(404, "Grade not found.");
      }
      res.status(200).json(updatedGrade);
    } catch (error) {
      next(error);
    }
  }

  // Delete a grade by ID
  static async deleteGrade(req: Request, res: Response, next: NextFunction) {
    try {
      const gradeId = z.number().positive().parse(parseInt(req.params.id));
      await GradeService.deleteGrade(gradeId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default GradeController;
