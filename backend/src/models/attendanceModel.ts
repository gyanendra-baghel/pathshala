import prisma from "../config/database";

export class AttendanceModel {
  // Record attendance for a student
  static async recordAttendance(data: any) {
    return prisma.attendance.create({
      data,
    });
  }

  // Get all attendance records for a subject
  static async getAttendanceBySubject(subjectId: number) {
    return prisma.attendance.findMany({
      where: { subjectId },
    });
  }

  // Get attendance record for a specific student
  static async getAttendanceByStudent(studentId: number) {
    return prisma.attendance.findMany({
      where: { studentId },
    });
  }

  // Update attendance for a student
  static async updateAttendance(id: number, data: any) {
    return prisma.attendance.update({
      where: { id },
      data,
    });
  }

  // Delete attendance record
  static async deleteAttendance(id: number) {
    return prisma.attendance.delete({
      where: { id },
    });
  }
}
