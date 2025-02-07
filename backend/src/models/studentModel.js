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
exports.StudentModel = void 0;
const database_1 = __importDefault(require("../config/database"));
class StudentModel {
    // Create a new student
    static createStudent(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const student = yield database_1.default.student.create({
                data,
            });
            return student;
        });
    }
    // Get all students for a grade
    static getStudentsByGrade(gradeId) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.default.student.findMany({
                where: { gradeId },
            });
        });
    }
    // Get a student by email
    static getStudentByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.default.student.findFirst({
                where: { email },
            });
        });
    }
    // Get all students for a school
    static getStudentsBySchool(schoolId) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.default.student.findMany({
                where: { schoolId },
                include: {
                    grade: true,
                },
            });
        });
    }
    // Get a student by ID
    static getStudentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.default.student.findUnique({
                where: { id },
            });
        });
    }
    // Update student information
    static updateStudent(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.default.student.update({
                where: { id },
                data,
            });
        });
    }
    // Delete a student by ID
    static deleteStudent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.default.student.delete({
                where: { id },
            });
        });
    }
}
exports.StudentModel = StudentModel;
