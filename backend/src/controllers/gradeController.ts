import { NextFunction, Request, Response } from "express";
import GradeService from "../services/gradeService";
import { z } from "zod";
import ApiError from "../utils/ApiError";
import { parse } from "path";

class GradeController {
  // Create a new grade
  static async createGrade(req: Request, res: Response, next: NextFunction) {
    try {
      const gradeSchema = z.object({
        name: z.string().nonempty(),
        schoolId: z.number(),
      });
      gradeSchema.parse(req.body);
      const grade = await GradeService.createGrade(req.body);
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
      const { id } = req.params;
      const gradeId = parseInt(id);
      z.object({
        gradeId: z.number(),
      }).parse({ gradeId });
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
      const { id } = req.params;
      const gradeId = parseInt(id);
      z.object({
        gradeId: z.number(),
      }).parse({ gradeId });
      const gradeSchema = z.object({
        name: z.string().nonempty().optional(),
        schoolId: z.number().optional(),
      });
      gradeSchema.parse(req.body);
      const updatedGrade = await GradeService.updateGrade(gradeId, req.body);
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
      const { id } = req.params;
      const gradeId = parseInt(id);
      z.object({
        gradeId: z.number(),
      }).parse({ gradeId });
      await GradeService.deleteGrade(Number(id));
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default GradeController;
