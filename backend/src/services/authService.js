"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config/config"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const adminService_1 = __importDefault(require("./adminService"));
const studentService_1 = require("./studentService");
const teacherService_1 = __importDefault(require("./teacherService"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthService {
    static authUser(email, password, role) {
        return __awaiter(this, void 0, void 0, function* () {
            if (role === "ADMIN") {
                const admin = yield adminService_1.default.getAdminByEmailAndPassword(email, password);
                return AuthService.generateToken(admin);
            }
            else if (role === "TEACHER") {
                const teacher = yield teacherService_1.default.getTeacherByEmailAndPassword(email, password);
                return AuthService.generateToken(teacher);
            }
            else if (role == "STUDENT") {
                const student = yield studentService_1.StudentService.getStudentByEmailAndPassword(email, password);
                return AuthService.generateToken(student);
            }
            else {
                throw new ApiError_1.default(400, "Invalid Role");
            }
        });
    }
    static generateToken(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return jsonwebtoken_1.default.sign({
                userId: user.id,
                role: user.role,
                schoolId: user.schoolId,
            }, config_1.default.app.jwtSecret, {
                expiresIn: "1h",
            });
        });
    }
    static getUserByIdAndRole(userId, role) {
        return __awaiter(this, void 0, void 0, function* () {
            if (role === "ADMIN") {
                return adminService_1.default.getAdminById(userId);
            }
            else if (role === "TEACHER") {
                return teacherService_1.default.getTeacherById(userId);
            }
            else if (role === "STUDENT") {
                return studentService_1.StudentService.getStudentById(userId);
            }
            else {
                throw new ApiError_1.default(400, "Invalid Role");
            }
        });
    }
}
exports.default = AuthService;
