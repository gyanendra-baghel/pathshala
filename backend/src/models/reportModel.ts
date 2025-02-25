import prisma from "../config/database";

class ReportModel {
  static async getReports(schoolId: number) {
    return prisma.reports.findMany({
      where: {
        schoolId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  static async getReport(id: number) {
    return prisma.reports.findUnique({
      where: {
        id,
      },
    });
  }

  static async createReport(data: any) {
    return prisma.reports.create({
      data,
    });
  }

  static async updateReport(id: number, data: any) {
    return prisma.reports.update({
      where: {
        id,
      },
      data,
    });
  }

  static async deleteReport(id: number) {
    return prisma.reports.delete({
      where: {
        id,
      },
    });
  }
}

export default ReportModel;
