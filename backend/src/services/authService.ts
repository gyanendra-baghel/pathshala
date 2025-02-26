import config from "../config/config";
import ApiError from "../utils/ApiError";
import AdminService from "./adminService";
import { StudentService } from "./studentService";
import TeacherService from "./teacherService";
import jwt from "jsonwebtoken";

class AuthService {
  static async authUser(email: string, password: string, role: string) {
    if (["ADMIN", "MAIN_ADMIN"].includes(role)) {
      const admin = await AdminService.getAdminByEmailAndPassword(
        email,
        password
      );

      return AuthService.generateToken(admin, role);
    } else if (role === "TEACHER") {
      const teacher = await TeacherService.getTeacherByEmailAndPassword(
        email,
        password
      );
      return AuthService.generateToken(teacher, role);
    } else if (role == "STUDENT") {
      const student = await StudentService.getStudentByEmailAndPassword(
        email,
        password
      );
      return AuthService.generateToken(student, role);
    } else {
      throw new ApiError(400, "Invalid Role");
    }
  }

  static async generateToken(user: any, role: string) {
    return jwt.sign(
      {
        userId: user.id,
        role,
        schoolId: user.schoolId,
      },
      config.app.jwtSecret,
      {
        expiresIn: "1h",
      }
    );
  }

  static async getUserByIdAndRole(userId: number, role: string) {
    if (["ADMIN", "MAIN_ADMIN"].includes(role)) {
      return AdminService.getAdminById(userId);
    } else if (role === "TEACHER") {
      return TeacherService.getTeacherById(userId);
    } else if (role === "STUDENT") {
      return StudentService.getStudentById(userId);
    } else {
      throw new ApiError(400, "Invalid Role");
    }
  }
}

export default AuthService;
