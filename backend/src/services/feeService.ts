import FeeModel from "../models/feeModel";
import ApiError from "../utils/ApiError";

class FeeService {
  static async getAllSchoolFee(schoolId: number, filters: any) {
    const {
      studentId,
      status,
      feeStructureId,
      startDate,
      endDate,
      minAmount,
      maxAmount,
    } = filters;

    const where: any = {};

    if (schoolId) where.schoolId = schoolId;
    if (studentId) where.studentId = Number(studentId);
    if (status) where.status = status;
    if (feeStructureId) where.feeStructureId = Number(feeStructureId);
    if (startDate && endDate) {
      where.createdAt = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }
    if (minAmount && maxAmount) {
      where.amount = {
        gte: parseFloat(minAmount),
        lte: parseFloat(maxAmount),
      };
    }

    return FeeModel.getAllSchoolFee(where);
  }

  static async addFee(data: any) {
    return FeeModel.addFee(data);
  }
  static async getFeeById(id: number) {
    return FeeModel.getFeeById(id);
  }
  static async getStudentFees(studentId: number) {
    return FeeModel.getStudentFees(studentId);
  }
  static async updateFee(id: number, data: any) {
    const fee = await FeeModel.getFeeById(id);
    if (!fee) {
      throw new ApiError(404, "Fee not found");
    }
    return FeeModel.updateFee(id, data);
  }
  static async deleteFee(id: number) {
    const fee = await FeeModel.getFeeById(id);
    if (!fee) {
      throw new ApiError(404, "Fee not found");
    }
    return FeeModel.deleteFee(id);
  }
}

export default FeeService;
