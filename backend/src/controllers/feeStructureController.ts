import { NextFunction, Request, Response } from "express";
import FeeStructureService from "../services/feeStructureService";
import ApiError from "../utils/ApiError";
import { z } from "zod";

class FeeStructureController {
  // Create a new fee structure
  static async createFeeStructure(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.user) {
        throw new ApiError(401, "Unauthorized");
      }
      req.body.schoolId = req.user.schoolId;
      const feeStructureSchema = z.object({
        schoolId: z.number().int().positive(),
        gradeId: z.number().int().positive(),
        feeType: z.enum(["TUTION", "TRANSPORT", "EXTRACURRICULAR", "OTHER"]),
        FeeFrequency: z.enum(["YEARLY", "MONTHLY", "ONCE"]),
        amount: z.number().int().positive(),
      });
      const feeData = feeStructureSchema.parse(req.body);
      const createdFee = await FeeStructureService.createFeeStructure(feeData);
      res.status(201).json(createdFee);
    } catch (error) {
      next(error);
    }
  }

  // Get fee structures for a specific class
  static async getFeeStructuresByGrade(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const gradeId = parseInt(id);
      z.object({
        gradeId: z.number().int().positive(),
      }).parse({ gradeId });
      const feeStructures = await FeeStructureService.getFeeStructuresByGrade(
        gradeId
      );
      res.status(200).json(feeStructures);
    } catch (error) {
      next(error);
    }
  }

  static async getFeeStructuresBySchool(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.user) {
        throw new ApiError(401, "Unauthorized");
      }
      const feeStructures = await FeeStructureService.getFeeStructuresBySchool(
        req.user.schoolId
      );
      res.status(200).json(feeStructures);
    } catch (error) {
      next(error);
    }
  }

  // Get a fee structure by ID
  static async getFeeStructureById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const feeStructureId = parseInt(id);
      z.object({
        feeStructureId: z.number().int().positive(),
      }).parse({ feeStructureId });
      const feeStructure = await FeeStructureService.getFeeStructureById(
        feeStructureId
      );
      if (!feeStructure) {
        throw new ApiError(404, "Fee structure not found");
      }
      res.status(200).json(feeStructure);
    } catch (error) {
      next(error);
    }
  }

  // Update fee structure
  static async updateFeeStructure(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const feeStructureId = parseInt(id);
      const feeData = req.body;
      z.object({
        feeStructureId: z.number().int().positive(),
        schoolId: z.number().int().positive().optional(),
        gradeId: z.number().int().positive().optional(),
        feeAmount: z.number().int().positive().optional(),
        feeType: z
          .enum(["TUTION", "TRANSPORT", "EXTRACURRICULAR", "OTHER"])
          .optional(),
        FeeFrequency: z.enum(["YEARLY", "MONTHLY", "ONCE"]).optional(),
        amount: z.number().int().positive().optional(),
      }).parse({ feeStructureId, ...feeData });
      const updatedFee = await FeeStructureService.updateFeeStructure(
        feeStructureId,
        feeData
      );
      if (!updatedFee) {
        throw new ApiError(404, "Fee structure not found");
      }
      res.status(200).json(updatedFee);
    } catch (error) {
      next(error);
    }
  }

  // Delete fee structure by ID
  static async deleteFeeStructure(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const feeStructureId = parseInt(id);
      z.object({
        feeStructureId: z.number().int().positive(),
      }).parse({ feeStructureId });
      const deletedFee = await FeeStructureService.deleteFeeStructure(
        feeStructureId
      );
      if (deletedFee) {
        throw new ApiError(404, "Fee structure not found");
      }
      res.status(200).json({ message: "Fee structure deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

export default FeeStructureController;
