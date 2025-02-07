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
const subjectModel_1 = __importDefault(require("../models/subjectModel"));
class SubjectService {
    static getSubjectsBySchool(schoolId) {
        return __awaiter(this, void 0, void 0, function* () {
            return subjectModel_1.default.getSubjectsBySchool(schoolId);
        });
    }
    static getSubjectById(subjectId) {
        return __awaiter(this, void 0, void 0, function* () {
            return subjectModel_1.default.getSubjectById(subjectId);
        });
    }
    static createSubject(subjectData) {
        return __awaiter(this, void 0, void 0, function* () {
            return subjectModel_1.default.createSubject(subjectData);
        });
    }
    static updateSubject(subjectId, subjectData) {
        return __awaiter(this, void 0, void 0, function* () {
            return subjectModel_1.default.updateSubject(subjectId, subjectData);
        });
    }
    static deleteSubject(subjectId) {
        return __awaiter(this, void 0, void 0, function* () {
            return subjectModel_1.default.deleteSubject(subjectId);
        });
    }
}
exports.default = SubjectService;
