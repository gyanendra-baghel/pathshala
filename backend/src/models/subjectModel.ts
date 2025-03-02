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
      include: {
        students: true,
        sobjectWorks: true,
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

  // Get all teachers in a subject.
  static async getTeachers(subjectId: number) {
    return prisma.subjectTeacher.findMany({
      where: { subjectId },
      include: { teacher: true },
    });
  }

  // Add Teacher to a subject.
  static async addTeacher(subjectId: number, teacherId: number) {
    return prisma.subjectTeacher.create({
      data: {
        subjectId,
        teacherId,
        gradeId: 1, // Replace 1 with the appropriate gradeId value
      },
      include: { teacher: true },
    });
  }

  // Remove Teacher from a subject.
  static async removeTeacher(subjectId: number, teacherId: number) {
    return prisma.subjectTeacher.deleteMany({
      where: {
        subjectId,
        teacherId,
      },
    });
  }

  // Add subjectwork
  static async addSubjectwork(data: any) {
    return prisma.subjectWork.create({
      data,
    });
  }

  // Get all subjectworks for a subject
  static async getSubjectworks(subjectId: number) {
    return prisma.subjectWork.findMany({
      where: { subjectId },
    });
  }

  // Get a specific subjectwork by ID
  static async getSubjectwork(id: number) {
    return prisma.subjectWork.findUnique({
      where: { id },
    });
  }

  // Update subjectwork information
  static async updateSubjectwork(id: number, data: any) {
    return prisma.subjectWork.update({
      where: { id },
      data,
    });
  }

  // Delete a subjectwork by ID
  static async deleteSubjectwork(id: number) {
    return prisma.subjectWork.delete({
      where: { id },
    });
  }
}

export default SubjectModel;
