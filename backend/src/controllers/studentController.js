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
const studentService_1 = require("../services/studentService");
const zod_1 = require("zod");
const ApiError_1 = __importDefault(require("../utils/ApiError"));
class StudentController {
    // Create a new student
    static createStudent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const studentData = req.body;
                const studentSchema = zod_1.z.object({
                    firstName: zod_1.z.string().nonempty(),
                    lastName: zod_1.z.string().nonempty(),
                    dob: zod_1.z.string(),
                    email: zod_1.z.string().email(),
                    password: zod_1.z.string().min(6),
                    phoneNumber: zod_1.z.string().length(10),
                    aadharNumber: zod_1.z.string(),
                    fatherName: zod_1.z.string(),
                    motherName: zod_1.z.string(),
                    address: zod_1.z.string(),
                    gradeId: zod_1.z.number(),
                    schoolId: zod_1.z.number(),
                });
                studentSchema.parse(studentData);
                const createdStudent = yield studentService_1.StudentService.createStudent(studentData);
                res.status(201).json(createdStudent);
            }
            catch (error) {
                next(error);
            }
        });
    }
    // Get all students for a specific school
    static getStudentsBySchool(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.user) {
                    throw new ApiError_1.default(401, "Unauthorized");
                }
                const schoolId = req.user.schoolId;
                const students = yield studentService_1.StudentService.getStudentsBySchool(schoolId);
                res.status(200).json(students);
            }
            catch (error) {
                next(error);
            }
        });
    }
    // Get all students for a specific class
    static getStudentsByGrade(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { gradeId } = req.body;
                console.log("Grade ID: ", gradeId);
                console.log("Type: ", typeof gradeId);
                console.log("-------------------");
                // gradeId = parseInt(gradeId);
                const gradeIdSchema = zod_1.z.object({
                    gradeId: zod_1.z.number(),
                });
                gradeIdSchema.parse({ gradeId });
                const students = yield studentService_1.StudentService.getStudentsGrade(gradeId);
                res.status(200).json(students);
            }
            catch (error) {
                // next(error);
            }
        });
    }
    // Get a student by ID
    static getStudentById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const studentId = parseInt(id);
                const studentIdSchema = zod_1.z.object({
                    id: zod_1.z.number(),
                });
                studentIdSchema.parse({ id: studentId });
                const student = yield studentService_1.StudentService.getStudentById(studentId);
                if (!student) {
                    throw new ApiError_1.default(404, "Student not found");
                }
                res.status(200).json(student);
            }
            catch (error) {
                next(error);
            }
        });
    }
    // Update student information
    static updateStudent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const studentId = parseInt(id);
                const studentData = req.body;
                const studentSchema = zod_1.z.object({
                    firstName: zod_1.z.string().nonempty().optional(),
                    lastName: zod_1.z.string().nonempty().optional(),
                    dob: zod_1.z.string().optional(),
                    email: zod_1.z.string().email().optional(),
                    password: zod_1.z.string().min(6).optional(),
                    phoneNumber: zod_1.z.string().length(10).optional(),
                    aadharNumber: zod_1.z.string().optional(),
                    fatherName: zod_1.z.string().optional(),
                    motherName: zod_1.z.string().optional(),
                    address: zod_1.z.string().optional(),
                    gradeId: zod_1.z.number().optional(),
                    schoolId: zod_1.z.number().optional(),
                });
                studentSchema.parse(studentData);
                zod_1.z.object({
                    id: zod_1.z.number(),
                }).parse({ id: studentId });
                const updatedStudent = yield studentService_1.StudentService.updateStudent(studentId, studentData);
                if (!updatedStudent) {
                    throw new ApiError_1.default(404, "Student not found");
                }
                res.status(200).json(updatedStudent);
            }
            catch (error) {
                next(error);
            }
        });
    }
    // Delete a student by ID
    static deleteStudent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const studentId = parseInt(id);
                const studentIdSchema = zod_1.z.object({
                    id: zod_1.z.number(),
                });
                studentIdSchema.parse({ id: studentId });
                yield studentService_1.StudentService.deleteStudent(studentId);
                res.status(200).json({ message: "Student deleted successfully" });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = StudentController;
