import TeacherModel from "../models/teacherModel";

class TeacherService {
  static async createTeacher(data: any) {
    const teacher = await TeacherModel.getTeacherByEmail(data.email);
    if (teacher) {
      throw new Error("Teacher already exists");
    }
    return TeacherModel.createTeacher(data);
  }

  static async getTeacherByEmailAndPassword(email: string, password: string) {
    const teacher = await TeacherModel.getTeacherByEmail(email);
    if (!teacher) {
      throw new Error("Teacher not found");
    }
    if (teacher.password !== password) {
      throw new Error("Invalid password");
    }
    return teacher;
  }

  static async getTeachersBySchool(schoolId: number) {
    const teachers = TeacherModel.getTeachersBySchool(schoolId);
    if (!teachers) {
      throw new Error("No teachers found");
    }
    return teachers;
  }

  static async getTeacherById(id: number) {
    const teacher = TeacherModel.getTeacherById(id);
    if (!teacher) {
      throw new Error("Teacher not found");
    }
    return teacher;
  }

  static async updateTeacher(id: number, data: any) {
    const teacher = await TeacherModel.getTeacherById(id);
    if (!teacher) {
      throw new Error("Teacher not found");
    }
    return TeacherModel.updateTeacher(id, data);
  }

  static async deleteTeacher(id: number) {
    const teacher = await TeacherModel.getTeacherById(id);
    if (!teacher) {
      throw new Error("Teacher not found");
    }
    return TeacherModel.deleteTeacher(id);
  }
}

export default TeacherService;
