import { AttendanceModel } from "../models/attendanceModel";

class AttendanceService {
  static async recordAttendance(data: any) {
    return AttendanceModel.recordAttendance(data);
  }

  static async bulkCreateAttendance(data: any) {
    return AttendanceModel.bulkCreateAttendance(data);
  }

  static async updateAttendance(id: number, data: any) {
    return AttendanceModel.updateAttendance(id, data);
  }

  static async getSubjectAttendance(subjectId: number, date?: Date) {
    return AttendanceModel.getSubjectAttendance(subjectId, date);
  }

  static async getStudentAttendance(studentId: number, subjectId?: number) {
    return AttendanceModel.getStudentAttendance(studentId, subjectId);
  }

  static async getAttendanceSummary(studentId: number, subjectId?: number) {
    return AttendanceModel.getAttendanceSummary(studentId, subjectId);
  }
}

export default AttendanceService;
