import { AttendanceStatus } from "@prisma/client";
import prisma from "../config/database";

export class AttendanceModel {
  // Record attendance for a student
  static async recordAttendance(data: any) {
    // Check if attendance for student, subject, and date already exists
    const existingAttendance = await prisma.attendance.findUnique({
      where: {
        studentId_subjectId_date: {
          studentId: data.studentId,
          subjectId: data.subjectId,
          date: data.date || new Date(),
        },
      },
    });

    if (existingAttendance) {
      throw new Error(
        "Attendance already recorded for this student and subject"
      );
    }

    return prisma.attendance.create({
      data: {
        ...data,
        date: data.date || new Date(),
      },
      include: {
        student: true,
        subject: true,
      },
    });
  }

  // Bulk create attendance records
  static async bulkCreateAttendance(data: any) {
    // Use transaction to ensure all records are created or none
    return prisma.$transaction(async (tx) => {
      const createdRecords = [];

      for (const attendanceData of data) {
        // Check for existing record
        const existingAttendance = await tx.attendance.findUnique({
          where: {
            studentId_subjectId_date: {
              studentId: attendanceData.studentId,
              subjectId: attendanceData.subjectId,
              date: attendanceData.date || new Date(),
            },
          },
        });

        if (!existingAttendance) {
          const record = await tx.attendance.create({
            data: {
              ...attendanceData,
              date: attendanceData.date || new Date(),
            },
            include: {
              student: true,
              subject: true,
            },
          });
          createdRecords.push(record);
        }
      }

      return createdRecords;
    });
  }

  // Update attendance record
  static async updateAttendance(id: number, data: any) {
    return prisma.attendance.update({
      where: { id },
      data,
      include: {
        student: true,
        subject: true,
      },
    });
  }

  // Get attendance for a specific subject and date
  static async getSubjectAttendance(subjectId: number, date?: Date) {
    return prisma.attendance.findMany({
      where: {
        subjectId,
        date: date
          ? {
              gte: new Date(date.setHours(0, 0, 0, 0)),
              lt: new Date(date.setHours(23, 59, 59, 999)),
            }
          : undefined,
      },
      include: {
        student: true,
        subject: true,
      },
    });
  }

  // Get student attendance history
  static async getStudentAttendance(studentId: number, subjectId?: number) {
    return prisma.attendance.findMany({
      where: {
        studentId,
        subjectId: subjectId ? subjectId : undefined,
      },
      include: {
        subject: true,
      },
      orderBy: {
        date: "desc",
      },
    });
  }

  // Generate attendance summary
  static async getAttendanceSummary(studentId: number, subjectId?: number) {
    const where = {
      studentId,
      subjectId: subjectId ? subjectId : undefined,
    };

    const totalRecords = await prisma.attendance.count({ where });

    const statusCounts = await prisma.attendance.groupBy({
      by: ["status"],
      where,
      _count: {
        status: true,
      },
    });

    return {
      total: totalRecords,
      summary: statusCounts.reduce((acc, curr) => {
        acc[curr.status] = curr._count.status;
        return acc;
      }, {} as Record<AttendanceStatus, number>),
    };
  }
}
