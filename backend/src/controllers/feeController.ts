import { Request, Response } from "express";
import { FeeService } from "../services/feeService";

class FeeController {
  // Create a new fee structure
  static async createFeeStructure(req: Request, res: Response) {
    try {
      const feeData = req.body;
      const createdFee = await FeeService.createFeeStructure(feeData);
      res.status(201).json(createdFee);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to create fee structure", error });
    }
  }

  // Get fee structures for a specific class
  static async getFeeStructuresByGrade(req: Request, res: Response) {
    try {
      const { gradeId } = req.params;
      const feeStructures = await FeeService.getFeeStructuresByGrade(
        parseInt(gradeId)
      );
      res.status(200).json(feeStructures);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to fetch fee structures", error });
    }
  }

  // Get a fee structure by ID
  static async getFeeStructureById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const feeStructure = await FeeService.getFeeStructureById(parseInt(id));
      if (feeStructure) {
        res.status(200).json(feeStructure);
      } else {
        res.status(404).json({ message: "Fee structure not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch fee structure", error });
    }
  }

  // Update fee structure
  static async updateFeeStructure(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const feeData = req.body;
      const updatedFee = await FeeService.updateFeeStructure(
        parseInt(id),
        feeData
      );
      if (updatedFee) {
        res.status(200).json(updatedFee);
      } else {
        res.status(404).json({ message: "Fee structure not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to update fee structure", error });
    }
  }

  // Delete fee structure by ID
  static async deleteFeeStructure(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletedFee = await FeeService.deleteFeeStructure(parseInt(id));
      if (deletedFee) {
        res.status(200).json({ message: "Fee structure deleted successfully" });
      } else {
        res.status(404).json({ message: "Fee structure not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to delete fee structure", error });
    }
  }
}

export default FeeController;
