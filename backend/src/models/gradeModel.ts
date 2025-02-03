import prisma from "../config/database";

class GradeModel {
  // Create a new grade
  static async createGrade(data: any) {
    return prisma.grade.create({
      data,
    });
  }

  // Get all gredes for a school
  static async getGradesBySchool(schoolId: number) {
    return prisma.grade.findMany({
      where: { schoolId },
    });
  }

  // Get a specific grade by ID
  static async getGradeById(id: number) {
    return prisma.grade.findUnique({
      where: { id },
    });
  }

  // Update grade information
  static async updateGrade(id: number, data: any) {
    return prisma.grade.update({
      where: { id },
      data,
    });
  }

  // Delete a grade by ID
  static async deleteGrade(id: number) {
    return prisma.grade.delete({
      where: { id },
    });
  }
}

export default GradeModel;
