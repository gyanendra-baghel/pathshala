import GradeModel from "../models/gradeModel";
import { StudentModel } from "../models/studentModel";
import ApiError from "../utils/ApiError";

export class StudentService {
  // Create a new student
  static async createStudent(data: any) {
    const student = await StudentModel.getStudentByEmail(data.email);
    const grade = await GradeModel.getGradeById(data.gradeId);
    if (student) {
      throw new Error("Student already exists");
    }
    if (!grade) {
      throw new Error("Grade not found");
    }
    const newStudent = await StudentModel.createStudent(data);
    return newStudent;
  }

  // Get all students for a specific grade
  static async getStudentsGrade(gradeId: number) {
    return StudentModel.getStudentsByGrade(gradeId);
  }

  // Get a student by email and password
  static async getStudentByEmailAndPassword(email: string, password: string) {
    const student = await StudentModel.getStudentByEmail(email);
    if (!student) {
      throw new Error("Student not found");
    }
    if (student.password !== password) {
      throw new Error("Invalid password");
    }
    return student;
  }

  // Get all students for a specific school
  static async getStudentsBySchool(schoolId: number) {
    return StudentModel.getStudentsBySchool(schoolId);
  }

  // Get a student by ID
  static async getStudentById(id: number) {
    return StudentModel.getStudentById(id);
  }

  // Update student information
  static async updateStudent(id: number, data: any) {
    return StudentModel.updateStudent(id, data);
  }

  // Delete a student by ID
  static async deleteStudent(id: number) {
    const student = await StudentModel.getStudentById(id);
    if (!student) {
      throw new ApiError(404, "Student not found");
    }
    return StudentModel.deleteStudent(id);
  }
}
