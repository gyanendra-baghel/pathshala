import { NextFunction, Request, Response } from "express";
import { StudentService } from "../services/studentService";
import { z } from "zod";
import ApiError from "../utils/ApiError";

class StudentController {
  // Create a new student
  static async createStudent(req: Request, res: Response, next: NextFunction) {
    try {
      const studentData = req.body;
      const studentSchema = z.object({
        firstName: z.string().nonempty(),
        lastName: z.string().nonempty(),
        dob: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
        phoneNumber: z.string().length(10),
        aadharNumber: z.string(),
        fatherName: z.string(),
        motherName: z.string(),
        address: z.string(),
        gradeId: z.number(),
        schoolId: z.number(),
      });
      studentSchema.parse(studentData);
      const createdStudent = await StudentService.createStudent(studentData);
      res.status(201).json(createdStudent);
    } catch (error) {
      next(error);
    }
  }

  // Get all students for a specific school
  static async getStudentsBySchool(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.user) {
        throw new ApiError(401, "Unauthorized");
      }
      const schoolId = req.user.schoolId;

      const students = await StudentService.getStudentsBySchool(schoolId);
      res.status(200).json(students);
    } catch (error) {
      next(error);
    }
  }

  // Get all students for a specific class
  static async getStudentsByGrade(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      let { gradeId } = req.body;
      z.number().positive().parse({ gradeId });
      const students = await StudentService.getStudentsGrade(gradeId);
      res.status(200).json(students);
    } catch (error) {
      next(error);
    }
  }

  // Get a student by ID
  static async getStudentById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const studentId = parseInt(id);
      const studentIdSchema = z.object({
        id: z.number(),
      });
      studentIdSchema.parse({ id: studentId });
      const student = await StudentService.getStudentById(studentId);
      if (!student) {
        throw new ApiError(404, "Student not found");
      }
      res.status(200).json(student);
    } catch (error) {
      next(error);
    }
  }

  // Update student information
  static async updateStudent(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const studentId = parseInt(id);
      const studentData = req.body;
      const studentSchema = z.object({
        firstName: z.string().nonempty().optional(),
        lastName: z.string().nonempty().optional(),
        dob: z.string().optional(),
        email: z.string().email().optional(),
        password: z.string().min(6).optional(),
        phoneNumber: z.string().length(10).optional(),
        aadharNumber: z.string().optional(),
        fatherName: z.string().optional(),
        motherName: z.string().optional(),
        address: z.string().optional(),
        gradeId: z.number().optional(),
        schoolId: z.number().optional(),
      });
      studentSchema.parse(studentData);
      z.object({
        id: z.number(),
      }).parse({ id: studentId });

      const updatedStudent = await StudentService.updateStudent(
        studentId,
        studentData
      );
      if (!updatedStudent) {
        throw new ApiError(404, "Student not found");
      }
      res.status(200).json(updatedStudent);
    } catch (error) {
      next(error);
    }
  }

  // Delete a student by ID
  static async deleteStudent(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const studentId = parseInt(id);
      const studentIdSchema = z.object({
        id: z.number(),
      });
      studentIdSchema.parse({ id: studentId });
      await StudentService.deleteStudent(studentId);
      res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

export default StudentController;
