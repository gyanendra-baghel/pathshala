import prisma from "../config/database";

class FeeModel {
  // Gee all fees of the school
  static async getAllSchoolFee(schoolId: number) {
    return prisma.fee.findMany();
    // {where: { schoolId },}
  }
  // add a new fee to the student
  static async addFee(data: any) {
    return prisma.fee.create({
      data,
    });
  }
  // get fee by ID
  static async getFeeById(id: number) {
    return prisma.fee.findUnique({
      where: { id },
    });
  }
  // update fee
  static async updateFee(id: number, data: any) {
    return prisma.fee.update({
      where: { id },
      data,
    });
  }
  // delete fee
  static async deleteFee(id: number) {
    return prisma.fee.delete({
      where: { id },
    });
  }
}

export default FeeModel;
