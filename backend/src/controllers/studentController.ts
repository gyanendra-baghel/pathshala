import { NextFunction, Request, Response } from "express";
import { StudentService } from "../services/studentService";
import { z } from "zod";
import ApiError from "../utils/ApiError";

class StudentController {
  // Create a new student
  static async createStudent(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new ApiError(401, "Unauthorized");
      }
      req.body.gradeId = parseInt(req.body.gradeId);
      req.body.schoolId = req.user.schoolId;

      const studentSchema = z.object({
        firstName: z.string().nonempty("First name is required"),
        lastName: z.string().nonempty("Last name is required"),
        dob: z.string().nonempty("Date of birth is required"),
        email: z.string().email("Invalid email format"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        phoneNumber: z
          .string()
          .length(10, "Phone number must be exactly 10 digits"),
        aadharNumber: z
          .string()
          .length(12, "Aadhar number must be exactly 12 digits"),
        fatherName: z.string().nonempty("Father's name is required"),
        motherName: z.string().nonempty("Mother's name is required"),
        address: z.string().nonempty("Address is required"),
        gradeId: z.number().min(1, "Grade ID is required"),
        schoolId: z.number().min(1, "School ID is required"),
      });

      const studentData = studentSchema.parse(req.body);
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
      const gradeId = z.number().positive().parse(req.body.gradeId);
      const students = await StudentService.getStudentsGrade(gradeId);
      res.status(200).json(students);
    } catch (error) {
      next(error);
    }
  }

  // Get a student by ID
  static async getStudentById(req: Request, res: Response, next: NextFunction) {
    try {
      const studentId = z.number().parse(parseInt(req.params.id));
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
      const studentId = z.number().parse(parseInt(id));
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
      const studentData = studentSchema.parse(req.body);

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
      const studentId = z.number().positive().parse(parseInt(id));
      await StudentService.deleteStudent(studentId);
      res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

export default StudentController;
