import SubjectModel from "../models/subjectModel";
import ApiError from "../utils/ApiError";

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

  static async getStudents(subjectId: number) {
    return SubjectModel.getStudents(subjectId);
  }

  static async addStudent(subjectId: number, studentIds: number) {
    const subject = await SubjectModel.getSubjectById(subjectId);
    if (!subject) {
      throw new ApiError(400, "Subject not found");
    }
    if (subject.gradeId === null) {
      subject.gradeId = 1;
    }
    return SubjectModel.addStudent(subjectId, studentIds, subject.gradeId);
  }

  static async removeStudent(subjectId: number, studentId: number) {
    return SubjectModel.removeStudent(subjectId, studentId);
  }

  // Get all teachers for a subject.
  static async getTeachers(subjectId: number) {
    return SubjectModel.getTeachers(subjectId);
  }

  // Add teacher to a subject.
  static async addTeacher(subjectId: number, teacherId: number) {
    return SubjectModel.addTeacher(subjectId, teacherId);
  }

  // Remove teacher from a subject.
  static async removeTeacher(subjectId: number, teacherId: number) {
    return SubjectModel.removeTeacher(subjectId, teacherId);
  }

  // Get all subjectworks for a subject.
  static async getSubjectworks(subjectId: number) {
    return SubjectModel.getSubjectworks(subjectId);
  }

  // Get subjectwork by ID.
  static async getSubjectwork(subjectworkId: number) {
    return SubjectModel.getSubjectwork(subjectworkId);
  }

  // Add subjectwork.
  static async addSubjectwork(subjectworkData: any) {
    return SubjectModel.addSubjectwork(subjectworkData);
  }

  // Update subjectwork.
  static async updateSubjectwork(subjectworkId: number, subjectworkData: any) {
    return SubjectModel.updateSubjectwork(subjectworkId, subjectworkData);
  }

  // Delete subjectwork.
  static async deleteSubjectwork(subjectworkId: number) {
    return SubjectModel.deleteSubjectwork(subjectworkId);
  }
}

export default SubjectService;
