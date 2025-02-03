import { Request, Response } from "express";
import { StudentService } from "../services/studentService";

class StudentController {
  // Create a new student
  static async createStudent(req: Request, res: Response) {
    try {
      const studentData = req.body;
      const createdStudent = await StudentService.createStudent(studentData);
      res.status(201).json(createdStudent);
    } catch (error) {
      res.status(500).json({ message: "Failed to create student", error });
    }
  }

  // Get all students for a specific school
  static async getStudentsBySchool(req: Request, res: Response) {
    try {
      const { schoolId } = req.params;
      const students = await StudentService.getStudentsBySchool(
        parseInt(schoolId)
      );
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch students", error });
    }
  }

  // Get all students for a specific class
  static async getStudentsByGrade(req: Request, res: Response) {
    try {
      const { gradeId } = req.params;
      const students = await StudentService.getStudentsGrade(parseInt(gradeId));
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch students", error });
    }
  }

  // Get a student by ID
  static async getStudentById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const student = await StudentService.getStudentById(parseInt(id));
      if (student) {
        res.status(200).json(student);
      } else {
        res.status(404).json({ message: "Student not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch student", error });
    }
  }

  // Update student information
  static async updateStudent(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const studentData = req.body;
      const updatedStudent = await StudentService.updateStudent(
        parseInt(id),
        studentData
      );
      if (updatedStudent) {
        res.status(200).json(updatedStudent);
      } else {
        res.status(404).json({ message: "Student not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to update student", error });
    }
  }

  // Delete a student by ID
  static async deleteStudent(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletedStudent = await StudentService.deleteStudent(parseInt(id));
      if (deletedStudent) {
        res.status(200).json({ message: "Student deleted successfully" });
      } else {
        res.status(404).json({ message: "Student not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to delete student", error });
    }
  }
}

export default StudentController;
