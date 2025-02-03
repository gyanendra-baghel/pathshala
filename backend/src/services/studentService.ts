import { StudentModel } from "../models/studentModel";

export class StudentService {
  // Create a new student
  static async createStudent(data: any) {
    return StudentModel.createStudent(data);
  }

  // Get all students for a specific grade
  static async getStudentsGrade(gradeId: number) {
    return StudentModel.getStudentsByGrade(gradeId);
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
    return StudentModel.deleteStudent(id);
  }
}
