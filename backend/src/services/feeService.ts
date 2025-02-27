import FeeModel from "../models/feeModel";
import ApiError from "../utils/ApiError";

class FeeService {
  static async getAllSchoolFee(schoolId: number) {
    return FeeModel.getAllSchoolFee(schoolId);
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
