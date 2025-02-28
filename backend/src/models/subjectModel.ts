import { Subject } from "@prisma/client";
import prisma from "../config/database";

class SubjectModel {
  //  Fetch all subjects for a specific school.
  static async getSubjectsBySchool(schoolId: number) {
    return prisma.subject.findMany({
      where: { schoolId },
    });
  }

  // Fetch a single subject by ID with its details.
  static async getSubjectById(subjectId: number) {
    return prisma.subject.findUnique({
      where: { id: subjectId },
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

  // Get All students in a subject.
  static async getStudents(subjectId: number) {
    return prisma.subjectStudent.findMany({
      where: { subjectId },
      include: { student: true },
    });
  }

  // Add students to a subject.
  static async addStudent(
    subjectId: number,
    studentId: number,
    gradeId: number
  ) {
    return prisma.subjectStudent.create({
      data: {
        subjectId,
        studentId,
        gradeId,
      },
      include: { student: true },
    });
  }

  // Remove student from a subject.
  static async removeStudent(subjectId: number, studentId: number) {
    return prisma.subjectStudent.deleteMany({
      where: {
        subjectId,
        studentId,
      },
    });
  }
}

export default SubjectModel;
