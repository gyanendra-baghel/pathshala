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
exports.StudentService = void 0;
const gradeModel_1 = __importDefault(require("../models/gradeModel"));
const studentModel_1 = require("../models/studentModel");
const ApiError_1 = __importDefault(require("../utils/ApiError"));
class StudentService {
    // Create a new student
    static createStudent(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const student = yield studentModel_1.StudentModel.getStudentByEmail(data.email);
            const grade = yield gradeModel_1.default.getGradeById(data.gradeId);
            if (student) {
                throw new Error("Student already exists");
            }
            if (!grade) {
                throw new Error("Grade not found");
            }
            const newStudent = yield studentModel_1.StudentModel.createStudent(data);
            return newStudent;
        });
    }
    // Get all students for a specific grade
    static getStudentsGrade(gradeId) {
        return __awaiter(this, void 0, void 0, function* () {
            return studentModel_1.StudentModel.getStudentsByGrade(gradeId);
        });
    }
    // Get a student by email and password
    static getStudentByEmailAndPassword(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const student = yield studentModel_1.StudentModel.getStudentByEmail(email);
            if (!student) {
                throw new Error("Student not found");
            }
            if (student.password !== password) {
                throw new Error("Invalid password");
            }
            return student;
        });
    }
    // Get all students for a specific school
    static getStudentsBySchool(schoolId) {
        return __awaiter(this, void 0, void 0, function* () {
            return studentModel_1.StudentModel.getStudentsBySchool(schoolId);
        });
    }
    // Get a student by ID
    static getStudentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return studentModel_1.StudentModel.getStudentById(id);
        });
    }
    // Update student information
    static updateStudent(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return studentModel_1.StudentModel.updateStudent(id, data);
        });
    }
    // Delete a student by ID
    static deleteStudent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const student = yield studentModel_1.StudentModel.getStudentById(id);
            if (!student) {
                throw new ApiError_1.default(404, "Student not found");
            }
            return studentModel_1.StudentModel.deleteStudent(id);
        });
    }
}
exports.StudentService = StudentService;
