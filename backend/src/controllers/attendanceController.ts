import { NextFunction, Request, Response } from "express";
import AttendanceService from "../services/attendanceService";
import { z } from "zod";
import { AttendanceStatus } from "@prisma/client";

const CreateAttendanceSchema = z.object({
  subjectId: z.number().int().positive(),
  studentId: z.number().int().positive(),
  date: z.coerce.date(),
  status: z.nativeEnum(AttendanceStatus),
  reason: z.string().optional(),
});

class AttendanceController {
  static async recordAttendance(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const attendanceData = CreateAttendanceSchema.parse(req.body);
      const attendance = await AttendanceService.recordAttendance(
        attendanceData
      );
      res.status(201).json(attendance);
    } catch (error) {
      next(error);
    }
  }

  static async bulkCreateAttendance(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const BulkAttendanceSchema = z.array(CreateAttendanceSchema);
      const attendanceData = BulkAttendanceSchema.parse(req.body);
      const attendances = await AttendanceService.bulkCreateAttendance(
        attendanceData
      );
      res.status(201).json(attendances);
    } catch (error) {
      next(error);
    }
  }

  static async updateAttendance(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = z.coerce.number().parse(req.params.id);
      const UpdateAttendanceSchema = z.object({
        status: z.nativeEnum(AttendanceStatus).optional(),
        reason: z.string().optional(),
      });
      const attendanceData = UpdateAttendanceSchema.parse(req.body);
      const attendance = await AttendanceService.updateAttendance(
        id,
        attendanceData
      );
      res.json(attendance);
    } catch (error) {
      next(error);
    }
  }

  static async getSubjectAttendance(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const subjectId = parseInt(req.params.subjectId);
      const date = req.query.date
        ? new Date(req.query.date as string)
        : undefined;

      const attendance = await AttendanceService.getSubjectAttendance(
        subjectId,
        date
      );
      res.json(attendance);
    } catch (error) {
      next(error);
    }
  }

  static async getStudentAttendance(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const studentId = parseInt(req.params.studentId);
      const subjectId = req.query.subjectId
        ? parseInt(req.query.subjectId as string)
        : undefined;

      const attendance = await AttendanceService.getStudentAttendance(
        studentId,
        subjectId
      );
      res.json(attendance);
    } catch (error) {
      next(error);
    }
  }

  static async getAttendanceSummary(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const studentId = parseInt(req.params.studentId);
      const subjectId = req.query.subjectId
        ? parseInt(req.query.subjectId as string)
        : undefined;

      const summary = await AttendanceService.getAttendanceSummary(
        studentId,
        subjectId
      );
      res.json(summary);
    } catch (error) {
      next(error);
    }
  }
}

export default AttendanceController;
