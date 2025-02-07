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
const database_1 = __importDefault(require("../config/database"));
class TeacherModel {
    // Create a new teacher
    static createTeacher(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.default.teacher.create({
                data,
            });
        });
    }
    // Get all teachers for a school
    static getTeachersBySchool(schoolId) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.default.teacher.findMany({
                where: { schoolId },
            });
        });
    }
    // Get a teacher by ID
    static getTeacherById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.default.teacher.findUnique({
                where: { id },
            });
        });
    }
    // Get teacher by email
    static getTeacherByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.default.teacher.findFirst({
                where: { email },
            });
        });
    }
    // Update teacher information
    static updateTeacher(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.default.teacher.update({
                where: { id },
                data,
            });
        });
    }
    // Delete a teacher by ID
    static deleteTeacher(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.default.teacher.delete({
                where: { id },
            });
        });
    }
}
exports.default = TeacherModel;
