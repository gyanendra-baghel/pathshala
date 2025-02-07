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
class SubjectModel {
    //  Fetch all subjects for a specific school.
    static getSubjectsBySchool(schoolId) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.default.subject.findMany({
                where: { schoolId },
                include: {
                    subjectGrades: {
                        include: {
                            grade: true,
                            teacher: true,
                        },
                    },
                },
            });
        });
    }
    // Fetch a single subject by ID with its details.
    static getSubjectById(subjectId) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.default.subject.findUnique({
                where: { id: subjectId },
                include: {
                    subjectGrades: {
                        include: {
                            grade: true,
                            teacher: true,
                        },
                    },
                },
            });
        });
    }
    // Create a new subject.
    static createSubject(subject) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.default.subject.create({
                data: subject,
            });
        });
    }
    //  Update a subject by ID.
    static updateSubject(subjectId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.default.subject.update({
                where: { id: subjectId },
                data,
            });
        });
    }
    // Delete a subject by ID.
    static deleteSubject(subjectId) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.subject.delete({
                where: { id: subjectId },
            });
        });
    }
}
exports.default = SubjectModel;
