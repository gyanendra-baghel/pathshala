import { FeeFrequency, FeeType } from "@prisma/client";
import { FeeStructureModel } from "../models/feeStructureModel";

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
    return FeeStructureModel.createFeeStructure(data);
  }

  static async getFeeStructuresBySchool(schoolId: number) {
    return FeeStructureModel.getFeeStructuresBySchool(schoolId);
  }

  // Get a fee structure by ID
  static async getFeeStructureById(id: number) {
    return FeeStructureModel.getFeeStructureById(id);
  }

  // Update a fee structure
  static async updateFeeStructure(id: number, data: any) {
    return FeeStructureModel.updateFeeStructure(id, data);
  }

  // Delete a fee structure
  static async deleteFeeStructure(id: number) {
    return FeeStructureModel.deleteFeeStructure(id);
  }
}

export default FeeStructureService;
