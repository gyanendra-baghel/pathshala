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
    const subjectStudents = await SubjectModel.getStudents(subjectId);
    if (!subjectStudents) {
      throw new ApiError(404, "Subject not found");
    }
    const students = subjectStudents.map((s) => s.student);
    return students;
  }

  static async getSubjectByTeacher(teacherId: number) {
    const subjectTeacher = await SubjectModel.getSubjectByTeacher(teacherId);
    if (!subjectTeacher) {
      throw new ApiError(404, "Teacher not found");
    }
    return subjectTeacher.map((st) => st.subject);
  }

  static async getSubjectByStudent(studentId: number) {
    const subjectStudent = await SubjectModel.getSubjectByStudent(studentId);
    if (!subjectStudent) {
      throw new ApiError(404, "Student not found");
    }
    return subjectStudent.map((st) => st.subject);
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
    const studentTeachers = await SubjectModel.getTeachers(subjectId);
    if (!studentTeachers) {
      throw new ApiError(404, "Subject not found");
    }
    const teachers = studentTeachers.map((t) => t.teacher);
    return teachers;
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
