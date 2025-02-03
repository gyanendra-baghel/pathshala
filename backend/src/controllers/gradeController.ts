import { Request, Response } from "express";
import GradeService from "../services/gradeService";

class GradeController {
  // Create a new grade
  static async createGrade(req: Request, res: Response) {
    try {
      const grade = await GradeService.createGrade(req.body);
      res.status(201).json(grade);
    } catch (error) {
      res.status(500).json({ error: "Failed to create grade." });
    }
  }

  // Get all grades for a specific school
  static async getGradesBySchool(req: Request, res: Response) {
    try {
      const { schoolId } = req.params;
      const grades = await GradeService.getGradesBySchool(Number(schoolId));
      res.status(200).json(grades);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve grades." });
    }
  }

  // Get a specific grade by ID
  static async getGradeById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const grade = await GradeService.getGradeById(Number(id));
      if (!grade) {
        res.status(404).json({ error: "Grade not found." });
        return;
      }
      res.status(200).json(grade);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve grade." });
    }
  }

  // Update grade information
  static async updateGrade(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updatedGrade = await GradeService.updateGrade(Number(id), req.body);
      if (!updatedGrade) {
        res.status(404).json({ error: "Grade not found." });
        return;
      }
      res.status(200).json(updatedGrade);
    } catch (error) {
      res.status(500).json({ error: "Failed to update grade." });
    }
  }

  // Delete a grade by ID
  static async deleteGrade(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await GradeService.deleteGrade(Number(id));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete grade." });
    }
  }
}

export default GradeController;
