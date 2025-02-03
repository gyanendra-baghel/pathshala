import { Request, Response } from "express";
import SubjectService from "../services/subjectService";
import { z } from "zod";

class SubjectController {
  // Get all subjects for a specific school
  static async getSubjectsBySchool(req: Request, res: Response) {
    try {
      const schoolId = parseInt(req.params.schoolId, 10);
      const subjects = await SubjectService.getSubjectsBySchool(schoolId);
      res.status(200).json(subjects);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch subjects." });
    }
  }

  // Get a single subject by ID
  static async getSubjectById(req: Request, res: Response) {
    try {
      const subjectId = parseInt(req.params.subjectId, 10);
      const subject = await SubjectService.getSubjectById(subjectId);
      if (subject) {
        res.status(200).json(subject);
      } else {
        res.status(404).json({ error: "Subject not found." });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch subject." });
    }
  }

  // Create a new subject
  static async createSubject(req: Request, res: Response) {
    try {
      const subjectData = req.body;
      const createSubjectSchema = z.object({
        name: z.string().min(1, "Subject name is required"),
        description: z.string().optional(),
        schoolId: z.number().positive("School ID must be a positive number"),
      });
      createSubjectSchema.parse(subjectData);
      const newSubject = await SubjectService.createSubject(subjectData);
      res.status(201).json(newSubject);
    } catch (error) {
      res.status(500).json({ error: "Failed to create subject." });
    }
  }

  // Update a subject
  static async updateSubject(req: Request, res: Response) {
    try {
      const updateSubjectSchema = z.object({
        name: z.string().min(1, "Subject name is required").optional(),
        description: z.string().optional(),
        schoolId: z
          .number()
          .positive("School ID must be a positive number")
          .optional(),
      });
      updateSubjectSchema.parse(req.body);
      const subjectId = parseInt(req.params.subjectId, 10);
      const subjectData = req.body;
      const updatedSubject = await SubjectService.updateSubject(
        subjectId,
        subjectData
      );
      res.status(200).json(updatedSubject);
    } catch (error) {
      res.status(500).json({ error: "Failed to update subject." });
    }
  }

  // Delete a subject
  static async deleteSubject(req: Request, res: Response) {
    try {
      const subjectId = parseInt(req.params.subjectId, 10);
      await SubjectService.deleteSubject(subjectId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete subject." });
    }
  }
}

export default SubjectController;
