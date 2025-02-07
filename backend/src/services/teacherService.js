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
const teacherModel_1 = __importDefault(require("../models/teacherModel"));
class TeacherService {
    static createTeacher(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const teacher = yield teacherModel_1.default.getTeacherByEmail(data.email);
            if (teacher) {
                throw new Error("Teacher already exists");
            }
            return teacherModel_1.default.createTeacher(data);
        });
    }
    static getTeacherByEmailAndPassword(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const teacher = yield teacherModel_1.default.getTeacherByEmail(email);
            if (!teacher) {
                throw new Error("Teacher not found");
            }
            if (teacher.password !== password) {
                throw new Error("Invalid password");
            }
            return teacher;
        });
    }
    static getTeachersBySchool(schoolId) {
        return __awaiter(this, void 0, void 0, function* () {
            const teachers = teacherModel_1.default.getTeachersBySchool(schoolId);
            if (!teachers) {
                throw new Error("No teachers found");
            }
            return teachers;
        });
    }
    static getTeacherById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const teacher = teacherModel_1.default.getTeacherById(id);
            if (!teacher) {
                throw new Error("Teacher not found");
            }
            return teacher;
        });
    }
    static updateTeacher(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const teacher = yield teacherModel_1.default.getTeacherById(id);
            if (!teacher) {
                throw new Error("Teacher not found");
            }
            return teacherModel_1.default.updateTeacher(id, data);
        });
    }
    static deleteTeacher(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const teacher = yield teacherModel_1.default.getTeacherById(id);
            if (!teacher) {
                throw new Error("Teacher not found");
            }
            return teacherModel_1.default.deleteTeacher(id);
        });
    }
}
exports.default = TeacherService;
