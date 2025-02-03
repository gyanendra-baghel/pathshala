import { Subject } from "@prisma/client";
import prisma from "../config/database";

class SubjectModel {
  //  Fetch all subjects for a specific school.
  static async getSubjectsBySchool(schoolId: number) {
    return prisma.subject.findMany({
      where: { schoolId },
      include: {
        subjectGrades: {
          include: {
            grade: true,
            teacher: true,
          },
        },
      },
    });
  }

  // Fetch a single subject by ID with its details.
  static async getSubjectById(subjectId: number) {
    return prisma.subject.findUnique({
      where: { id: subjectId },
      include: {
        subjectGrades: {
          include: {
            grade: true,
            teacher: true,
          },
        },
      },
    });
  }

  // Create a new subject.
  static async createSubject(subject: any) {
    return prisma.subject.create({
      data: subject,
    });
  }

  //  Update a subject by ID.
  static async updateSubject(subjectId: number, data: Partial<Subject>) {
    return prisma.subject.update({
      where: { id: subjectId },
      data,
    });
  }

  // Delete a subject by ID.
  static async deleteSubject(subjectId: number) {
    prisma.subject.delete({
      where: { id: subjectId },
    });
  }
}

export default SubjectModel;
