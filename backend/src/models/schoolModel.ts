import { SchoolBoard } from "@prisma/client";
import prisma from "../config/database";

export class SchoolModel {
  // Create a new school
  static async createSchool(data: any) {
    if (data.schoolBoard == "CBSE") {
      data.schoolBoard = SchoolBoard.CBSE;
    } else if (data.schoolBoard == "ICSE") {
      data.schoolBoard = SchoolBoard.ICSE;
    } else if (data.schoolBoard == "State Board") {
      data.schoolBoard = SchoolBoard.STATE_BOARD;
    } else {
      data.schoolBoard = SchoolBoard.OTHER;
    }

    if (!data.config) {
      data.config = {};
    }
    const school = await prisma.school.create({ data, include: {} });
    return school;
  }

  // Get all schools
  static async getAllSchools() {
    const schools = await prisma.school.findMany();
    return schools;
  }

  // Get a specific school by ID
  static async getSchoolById(id: number) {
    const school = await prisma.school.findUnique({
      where: { id },
    });
    return school;
  }

  // Update a school by ID
  static async updateSchool(id: number, data: any) {
    const school = await prisma.school.update({
      where: { id },
      data,
    });
    return school;
  }

  // Delete a school by ID
  static async deleteSchool(id: number) {
    const school = await prisma.school.delete({
      where: { id },
    });
    return school;
  }
}
