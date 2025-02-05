import config from "../config/config";
import ApiError from "../utils/ApiError";
import AdminService from "./adminService";
import { StudentService } from "./studentService";
import TeacherService from "./teacherService";
import jwt from "jsonwebtoken";

class AuthService {
  static async authUser(email: string, password: string, role: string) {
    if (role === "ADMIN") {
      const admin = await AdminService.getAdminByEmailAndPassword(
        email,
        password
      );

      return AuthService.generateToken(admin);
    } else if (role === "TEACHER") {
      const teacher = await TeacherService.getTeacherByEmailAndPassword(
        email,
        password
      );
      return AuthService.generateToken(teacher);
    } else if (role == "STUDENT") {
      const student = await StudentService.getStudentByEmailAndPassword(
        email,
        password
      );
      return AuthService.generateToken(student);
    } else {
      throw new ApiError(400, "Invalid Role");
    }
  }

  static async generateToken(user: any) {
    return jwt.sign(
      {
        userId: user.id,
        role: user.role,
      },
      config.app.jwtSecret,
      {
        expiresIn: "1h",
      }
    );
  }
}

export default AuthService;
