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
      const subjectId = z.number().positive().parse(parseInt(req.params.id));
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

  // Get all students in a subject
  static async getStudents(req: Request, res: Response, next: NextFunction) {
    try {
      const subjectId = z
        .number()
        .positive()
        .parse(parseInt(req.params.subjectId));
      const students = await SubjectService.getStudents(subjectId);
      res.status(200).json(students);
    } catch (error) {
      next(error);
    }
  }

  // Add student to a subject
  static async addStudent(req: Request, res: Response, next: NextFunction) {
    try {
      const subjectId = z
        .number()
        .positive()
        .parse(parseInt(req.params.subjectId));
      const addStudentsSchema = z.object({
        studentId: z.number().positive(),
      });
      const studentData = addStudentsSchema.parse(req.body);
      const students = await SubjectService.addStudent(
        subjectId,
        studentData.studentId
      );
      res.status(201).json(students);
    } catch (error) {
      next(error);
    }
  }

  // Remove student from a subject
  static async removeStudent(req: Request, res: Response, next: NextFunction) {
    try {
      const subjectId = z
        .number()
        .positive()
        .parse(parseInt(req.params.subjectId));
      const studentId = z
        .number()
        .positive()
        .parse(parseInt(req.params.studentId));
      await SubjectService.removeStudent(subjectId, studentId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  // Get all subjectworks for a subject
  static async getSubjectworks(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const subjectId = z
        .number()
        .positive()
        .parse(parseInt(req.params.subjectId));
      const subjectworks = await SubjectService.getSubjectworks(subjectId);
      res.status(200).json(subjectworks);
    } catch (error) {
      next(error);
    }
  }

  // Get a single subjectwork by ID
  static async getSubjectwork(req: Request, res: Response, next: NextFunction) {
    try {
      const subjectworkId = z
        .number()
        .positive()
        .parse(parseInt(req.params.subjectworkId));
      const subjectwork = await SubjectService.getSubjectwork(subjectworkId);
      res.status(200).json(subjectwork);
    } catch (error) {
      next(error);
    }
  }

  // Add a new subjectwork
  static async addSubjectwork(req: Request, res: Response, next: NextFunction) {
    try {
      const subjectId = z.coerce.number().parse(req.params.subjectId);
      const addSubjectworkSchema = z.object({
        title: z.string().min(3, "Title must be at least 3 characters"),
        description: z
          .string()
          .min(10, "Description must be at least 10 characters"),
        type: z.enum(["ASSIGNMENT", "MATERIAL"]),
        dueDate: z.coerce.date().optional(), // Only required for assignments
      });
      const files = req.files as Express.Multer.File[];
      const attachments = files.map((file) => file.path); // Cloudinary URL
      const subjectworkData = addSubjectworkSchema.parse(req.body);
      const newSubjectwork = await SubjectService.addSubjectwork({
        subjectId,
        ...subjectworkData,
        attachments,
      });
      res.status(201).json(newSubjectwork);
    } catch (error) {
      next(error);
    }
  }

  // Update a subjectwork
  static async updateSubjectwork(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const subjectworkId = z
        .number()
        .positive()
        .parse(parseInt(req.params.subjectworkId));
      const updateSubjectworkSchema = z.object({
        title: z.string().min(1, "Title is required").optional(),
        description: z.string().optional(),
        dueDate: z.string().optional(),
        subjectId: z.number().positive().optional(),
      });
      const subjectworkData = updateSubjectworkSchema.parse(req.body);
      const updatedSubjectwork = await SubjectService.updateSubjectwork(
        subjectworkId,
        subjectworkData
      );
      res.status(200).json(updatedSubjectwork);
    } catch (error) {
      next(error);
    }
  }

  // Delete a subjectwork
  static async deleteSubjectwork(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const subjectworkId = z
        .number()
        .positive()
        .parse(parseInt(req.params.subjectworkId));
      await SubjectService.deleteSubjectwork(subjectworkId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default SubjectController;
