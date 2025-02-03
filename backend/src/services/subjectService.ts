import SubjectModel from "../models/subjectModel";

class SubjectService {
  static async getSubjectsBySchool(schoolId: number) {
    return SubjectModel.getSubjectsBySchool(schoolId);
  }

  static async getSubjectById(subjectId: number) {
    return SubjectModel.getSubjectById(subjectId);
  }

  static async createSubject(subjectData: any) {
    return SubjectModel.createSubject(subjectData);
  }

  static async updateSubject(subjectId: number, subjectData: any) {
    return SubjectModel.updateSubject(subjectId, subjectData);
  }

  static async deleteSubject(subjectId: number) {
    return SubjectModel.deleteSubject(subjectId);
  }
}

export default SubjectService;
