import { NextFunction, Request, Response } from "express";
import FeeService from "../services/feeService";
import { z } from "zod";
import ApiError from "../utils/ApiError";

class FeeController {
  // Get all fees of the school
  static async getAllSchoolFee(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.user) {
        throw new ApiError(401, "Unauthorized access. No token provided.");
      }
      const { schoolId } = req.user;
      z.number().positive().parse(schoolId);
      const fees = await FeeService.getAllSchoolFee(schoolId);
      res.status(200).json(fees);
    } catch (error) {
      next(error);
    }
  }

  // Get fee by id
  static async getFeeById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const feeId = parseInt(id);
      z.number().positive().parse(feeId);
      const fee = await FeeService.getFeeById(feeId);
      res.status(200).json(fee);
    } catch (error) {
      next(error);
    }
  }

  // Create a fee
  static async createFee(req: Request, res: Response, next: NextFunction) {
    try {
      const feeData = req.body;
      const feeSchema = z.object({
        studentId: z.number().positive(),
        feeStructureId: z.number().positive(),
        status: z.enum(["PAID", "UNPAID", "PARTIAL"]),
        amount: z.number().positive(),
      });
      feeSchema.parse(feeData);
      const fee = await FeeService.addFee(feeData);
      res.status(201).json(fee);
    } catch (error) {
      next(error);
    }
  }

  // Update a fee
  static async updateFee(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const feeId = parseInt(id);
      z.number().positive().parse(feeId);
      const feeData = req.body;
      const feeSchema = z.object({
        studentId: z.number().positive(),
        feeStructureId: z.number().positive(),
        status: z.enum(["PAID", "UNPAID", "PARTIAL"]),
        amount: z.number().positive(),
      });
      feeSchema.parse(feeData);
      const fee = await FeeService.updateFee(feeId, feeData);
      res.status(200).json(fee);
    } catch (error) {
      next(error);
    }
  }

  // Delete a fee
  static async deleteFee(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const feeId = parseInt(id);
      z.number().positive().parse(feeId);
      await FeeService.deleteFee(feeId);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
}

export default FeeController;
