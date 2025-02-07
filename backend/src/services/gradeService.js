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
const gradeModel_1 = __importDefault(require("../models/gradeModel"));
class GradeService {
    // Create a new grade
    static createGrade(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data.schedule) {
                data.schedule = {};
            }
            return yield gradeModel_1.default.createGrade(data);
        });
    }
    // Get all grades for a specific school
    static getGradesBySchool(schoolId) {
        return __awaiter(this, void 0, void 0, function* () {
            return gradeModel_1.default.getGradesBySchool(schoolId);
        });
    }
    // Get a specific grade by ID
    static getGradeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return gradeModel_1.default.getGradeById(id);
        });
    }
    // Update grade information
    static updateGrade(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return gradeModel_1.default.updateGrade(id, data);
        });
    }
    // Delete a grade by ID
    static deleteGrade(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return gradeModel_1.default.deleteGrade(id);
        });
    }
}
exports.default = GradeService;
