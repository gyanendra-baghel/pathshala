import AdminModel from "../models/adminModel";
import { SchoolModel } from "../models/schoolModel";
import ApiError from "../utils/ApiError";

export class SchoolService {
  // Create a new school
  static async createSchool(data: any) {
    const school = await SchoolModel.createSchool(data.school);
    data.admin.schoolId = school.id;
    const admin = await AdminModel.createAdmin(data.admin);
    return { school, admin };
  }

  // Get all schools
  static async getAllSchools() {
    return SchoolModel.getAllSchools();
  }

  // Get a specific school by ID
  static async getSchoolById(id: number) {
    const school = await SchoolModel.getSchoolById(id);
    return school;
  }

  // Update school information
  static async updateSchool(id: number, data: any) {
    const school = SchoolService.getSchoolById(id);
    if (!school) {
      throw new ApiError(400, "School Not Found");
    }
    return await SchoolModel.updateSchool(id, data);
  }

  // Delete a school
  static async deleteSchool(id: number) {
    const school = SchoolService.getSchoolById(id);
    if (!school) {
      throw new ApiError(400, "School Not Found");
    }
    return await SchoolModel.deleteSchool(id);
  }
}
