import prisma from "../config/database";

export class TeacherModel {
  // Create a new teacher
  static async createTeacher(data: any) {
    return prisma.teacher.create({
      data,
    });
  }

  // Get all teachers for a school
  static async getTeachersBySchool(schoolId: number) {
    return prisma.teacher.findMany({
      where: { schoolId },
    });
  }

  // Get a teacher by ID
  static async getTeacherById(id: number) {
    return prisma.teacher.findUnique({
      where: { id },
    });
  }

  // Update teacher information
  static async updateTeacher(id: number, data: any) {
    return prisma.teacher.update({
      where: { id },
      data,
    });
  }

  // Delete a teacher by ID
  static async deleteTeacher(id: number) {
    return prisma.teacher.delete({
      where: { id },
    });
  }
}
