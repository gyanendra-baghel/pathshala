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
exports.AttendanceModel = void 0;
const database_1 = __importDefault(require("../config/database"));
class AttendanceModel {
    // Record attendance for a student
    static recordAttendance(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.default.attendance.create({
                data,
            });
        });
    }
    // Get all attendance records for a class
    static getAttendanceByGrade(gradeId) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.default.attendance.findMany({
                where: { gradeId },
            });
        });
    }
    // Get attendance record for a specific student
    static getAttendanceByStudent(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.default.attendance.findMany({
                where: { studentId },
            });
        });
    }
    // Update attendance for a student
    static updateAttendance(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.default.attendance.update({
                where: { id },
                data,
            });
        });
    }
    // Delete attendance record
    static deleteAttendance(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.default.attendance.delete({
                where: { id },
            });
        });
    }
}
exports.AttendanceModel = AttendanceModel;
