import { NextFunction, Request, Response } from "express";
import SubjectService from "../services/subjectService";
import { z } from "zod";
import ApiError from "../utils/ApiError";

class SubjectController {
  // Get all subjects for a specific school
  static async getAllSubjects(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new ApiError(401, "Unauthorized");
      }
      const schoolId = req.user.schoolId;
      const subjects = await SubjectService.getSubjectsBySchool(schoolId);
      res.status(200).json(subjects);
    } catch (error) {
      next(error);
    }
  }

  // Get a single subject by ID
  static async getSubjectById(req: Request, res: Response, next: NextFunction) {
    try {
      const subjectId = parseInt(req.params.subjectId, 10);
      const subject = await SubjectService.getSubjectById(subjectId);
      if (!subject) {
        throw new ApiError(404, "Subject not found.");
      }
      res.status(200).json(subject);
    } catch (error) {
      next(error);
    }
  }

  // Create a new subject
  static async createSubject(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new ApiError(401, "Unauthorized");
      }
      req.body.schoolId = req.user.schoolId;
      const createSubjectSchema = z.object({
        name: z.string().min(1, "Subject name is required"),
        description: z.string().optional(),
        schoolId: z.number().positive("School ID must be a positive number"),
      });
      const subjectData = createSubjectSchema.parse(req.body);
      const newSubject = await SubjectService.createSubject(subjectData);
      res.status(201).json(newSubject);
    } catch (error) {
      next(error);
    }
  }

  // Update a subject
  static async updateSubject(req: Request, res: Response, next: NextFunction) {
    try {
      const subjectId = z
        .number()
        .positive()
        .parse(parseInt(req.params.subjectId));
      const updateSubjectSchema = z.object({
        name: z.string().min(1, "Subject name is required").optional(),
        description: z.string().optional(),
        schoolId: z
          .number()
          .positive("School ID must be a positive number")
          .optional(),
      });
      const subjectData = updateSubjectSchema.parse(req.body);

      const updatedSubject = await SubjectService.updateSubject(
        subjectId,
        subjectData
      );
      res.status(200).json(updatedSubject);
    } catch (error) {
      next(error);
    }
  }

  // Delete a subject
  static async deleteSubject(req: Request, res: Response, next: NextFunction) {
    try {
      const subjectId = z
        .number()
        .positive()
        .parse(parseInt(req.params.subjectId));
      await SubjectService.deleteSubject(subjectId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default SubjectController;
