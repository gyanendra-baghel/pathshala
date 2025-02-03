import prisma from "../config/database";

export class SchoolModel {
  // Create a new school
  static async createSchool(data: any) {
    return prisma.school.create({
      data,
    });
  }

  // Get all schools
  static async getAllSchools() {
    return prisma.school.findMany();
  }

  // Get a specific school by ID
  static async getSchoolById(id: number) {
    return prisma.school.findUnique({
      where: { id },
    });
  }

  // Update a school by ID
  static async updateSchool(id: number, data: any) {
    return prisma.school.update({
      where: { id },
      data,
    });
  }

  // Delete a school by ID
  static async deleteSchool(id: number) {
    return prisma.school.delete({
      where: { id },
    });
  }
}
