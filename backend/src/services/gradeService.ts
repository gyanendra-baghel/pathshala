import GradeModel from "../models/gradeModel";

class GradeService {
  // Create a new grade
  static async createGrade(data: any) {
    if (!data.schedule) {
      data.schedule = {};
    }
    return await GradeModel.createGrade(data);
  }

  // Get all grades for a specific school
  static async getGradesBySchool(schoolId: number) {
    return GradeModel.getGradesBySchool(schoolId);
  }

  // Get a specific grade by ID
  static async getGradeById(id: number) {
    return GradeModel.getGradeById(id);
  }

  // Update grade information
  static async updateGrade(id: number, data: any) {
    return GradeModel.updateGrade(id, data);
  }

  // Delete a grade by ID
  static async deleteGrade(id: number) {
    return GradeModel.deleteGrade(id);
  }
}

export default GradeService;
