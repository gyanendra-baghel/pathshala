import { FeeFrequency, FeeType } from "@prisma/client";
import { FeeStructureModel } from "../models/feeStructureModel";
import { get } from "http";

class FeeStructureService {
  // Create a new fee structure
  static async createFeeStructure(data: any) {
    if (data.frequency === "YEARLY") {
      data.frequency = FeeFrequency.YEARLY;
    } else if (data.frequency === "MONTHLY") {
      data.frequency = FeeFrequency.MONTHLY;
    } else {
      data.frequency = FeeFrequency.ONCE;
    }
    data.startDate = new Date(data.startDate);
    data.endDate = new Date(data.endDate);
    const feeStructure = await FeeStructureService.getFeeStructureByStudent(
      data.studentId
    );
    if (feeStructure) {
      throw new Error("Fee structure already exists for this student");
    }
    return FeeStructureModel.createFeeStructure(data);
  }

  static async getFeeStructuresBySchool(schoolId: number) {
    return FeeStructureModel.getFeeStructuresBySchool(schoolId);
  }

  // Get a fee structure by ID
  static async getFeeStructureById(id: number) {
    return FeeStructureModel.getFeeStructureById(id);
  }

  // Get a fee structure by student ID
  static async getFeeStructureByStudent(studentId: number) {
    return FeeStructureModel.getFeeStructureByStudent(studentId);
  }

  // Update a fee structure
  static async updateFeeStructure(id: number, data: any) {
    return FeeStructureModel.updateFeeStructure(id, data);
  }

  // Update a fee structure by student ID
  static async updateFeeStructureByStudent(studentId: number, data: any) {
    if (data.frequency === "YEARLY") {
      data.frequency = FeeFrequency.YEARLY;
    } else if (data.frequency === "MONTHLY") {
      data.frequency = FeeFrequency.MONTHLY;
    } else {
      data.frequency = FeeFrequency.ONCE;
    }
    data.startDate = new Date(data.startDate);
    data.endDate = new Date(data.endDate);
    return FeeStructureModel.updateFeeStructureByStudent(studentId, data);
  }

  // Delete a fee structure
  static async deleteFeeStructure(id: number) {
    return FeeStructureModel.deleteFeeStructure(id);
  }
}

export default FeeStructureService;
