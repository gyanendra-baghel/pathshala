import { NextFunction, Request, Response } from "express";
import ReportService from "../services/reportService";
import ApiError from "../utils/ApiError";
import { z } from "zod";

class ReportController {
  static async getReports(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new ApiError(401, "Unauthorized access. No token provided.");
      }
      const schoolId = req.user.schoolId;
      const reports = await ReportService.getReports(schoolId);
      res.status(200).json(reports);
    } catch (error) {
      next(error);
    }
  }

  static async getReport(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new ApiError(401, "Unauthorized access. No token provided.");
      }
      const id = z.number().positive().parse(parseInt(req.params.id));
      const report = await ReportService.getReport(id);
      res.status(200).json(report);
    } catch (error) {
      next(error);
    }
  }

  static async createReport(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new ApiError(401, "Unauthorized access. No token provided.");
      }
      req.body.schoolId = req.user.schoolId;
      req.body.studentId = req.user.userId;
      const reportSchema = z.object({
        title: z.string(),
        description: z.string(),
        schoolId: z.number().positive(),
        studentId: z.number().positive(),
      });
      const reportData = reportSchema.parse(req.body);
      console.log(reportData);
      const report = await ReportService.createReport(reportData);
      res.status(201).json(report);
    } catch (error) {
      next(error);
    }
  }

  static async updateReport(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new ApiError(401, "Unauthorized access. No token provided.");
      }
      const id = z.number().positive().parse(parseInt(req.params.id));
      const reportSchema = z.object({
        title: z.string().optional(),
        description: z.string().optional(),
      });
      const reportData = reportSchema.parse(req.body);
      const report = await ReportService.updateReport(id, reportData);
      res.status(200).json(report);
    } catch (error) {
      next(error);
    }
  }

  static async deleteReport(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new ApiError(401, "Unauthorized access. No token provided.");
      }
      const id = z.number().positive().parse(parseInt(req.params.id));
      await ReportService.deleteReport(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default ReportController;
