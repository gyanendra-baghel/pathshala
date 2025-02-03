import { SchoolModel } from "../models/schoolModel";

export class SchoolService {
  // Create a new school
  static async createSchool(data: any) {
    return SchoolModel.createSchool(data);
  }

  // Get all schools
  static async getAllSchools() {
    return SchoolModel.getAllSchools();
  }

  // Get a specific school by ID
  static async getSchoolById(id: number) {
    return SchoolModel.getSchoolById(id);
  }

  // Update school information
  static async updateSchool(id: number, data: any) {
    return SchoolModel.updateSchool(id, data);
  }

  // Delete a school
  static async deleteSchool(id: number) {
    return SchoolModel.deleteSchool(id);
  }
}
