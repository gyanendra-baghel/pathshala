import prisma from "../config/database";

export class StudentModel {
  // Create a new student
  static async createStudent(data: any) {
    return prisma.student.create({
      data,
    });
  }

  // Get all students for a grade
  static async getStudentsByGrade(gradeId: number) {
    return prisma.student.findMany({
      where: { gradeId },
    });
  }

  // Get all students for a school
  static async getStudentsBySchool(schoolId: number) {
    return prisma.student.findMany({
      where: { schoolId },
    });
  }

  // Get a student by ID
  static async getStudentById(id: number) {
    return prisma.student.findUnique({
      where: { id },
    });
  }

  // Update student information
  static async updateStudent(id: number, data: any) {
    return prisma.student.update({
      where: { id },
      data,
    });
  }

  // Delete a student by ID
  static async deleteStudent(id: number) {
    return prisma.student.delete({
      where: { id },
    });
  }
}
