import ReportModel from "../models/reportModel";

class ReportService {
  static async getReports(schoolId: number) {
    return ReportModel.getReports(schoolId);
  }

  static async getReport(id: number) {
    return ReportModel.getReport(id);
  }

  static async createReport(data: any) {
    return ReportModel.createReport(data);
  }

  static async updateReport(id: number, data: any) {
    return ReportModel.updateReport(id, data);
  }

  static async deleteReport(id: number) {
    return ReportModel.deleteReport(id);
  }
}

export default ReportService;
