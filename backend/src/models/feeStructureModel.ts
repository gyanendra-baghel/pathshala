import prisma from "../config/database";

export class FeeStructureModel {
  // Create a new fee structure
  static async createFeeStructure(data: any) {
    return prisma.feeStructure.create({
      data,
    });
  }

  // Get fee structures for a school
  static async getFeeStructuresBySchool(schoolId: number) {
    return prisma.feeStructure.findMany({
      where: { schoolId },
    });
  }

  // Get fee structure by ID
  static async getFeeStructureById(id: number) {
    return prisma.feeStructure.findUnique({
      where: { id },
    });
  }

  // Update fee structure
  static async updateFeeStructure(id: number, data: any) {
    return prisma.feeStructure.update({
      where: { id },
      data,
    });
  }

  // Delete fee structure
  static async deleteFeeStructure(id: number) {
    return prisma.feeStructure.delete({
      where: { id },
    });
  }
}
