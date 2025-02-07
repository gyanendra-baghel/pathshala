import prisma from "../config/database";

export class StudentModel {
  // Create a new student
  static async createStudent(data: any) {
    const student = await prisma.student.create({
      data,
    });
    return student;
  }

  // Get all students for a grade
  static async getStudentsByGrade(gradeId: number) {
    return prisma.student.findMany({
      where: { gradeId },
    });
  }

  // Get a student by email
  static async getStudentByEmail(email: string) {
    return prisma.student.findFirst({
      where: { email },
    });
  }

  // Get all students for a school
  static async getStudentsBySchool(schoolId: number) {
    return prisma.student.findMany({
      where: { schoolId },
      include: {
        grade: true,
      },
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
