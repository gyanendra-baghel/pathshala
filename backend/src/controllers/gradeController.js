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
const gradeService_1 = __importDefault(require("../services/gradeService"));
const zod_1 = require("zod");
const ApiError_1 = __importDefault(require("../utils/ApiError"));
class GradeController {
    // Create a new grade
    static createGrade(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const gradeSchema = zod_1.z.object({
                    name: zod_1.z.string().nonempty(),
                    schoolId: zod_1.z.number(),
                });
                gradeSchema.parse(req.body);
                const grade = yield gradeService_1.default.createGrade(req.body);
                res.status(201).json(grade);
            }
            catch (error) {
                next(error);
            }
        });
    }
    // Get all grades for a specific school
    static getGradesBySchool(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { sid } = req.params;
                const schoolId = parseInt(sid);
                zod_1.z.object({
                    schoolId: zod_1.z.number(),
                }).parse({ schoolId });
                const grades = yield gradeService_1.default.getGradesBySchool(schoolId);
                res.status(200).json(grades);
            }
            catch (error) {
                next(error);
            }
        });
    }
    // Get a specific grade by ID
    static getGradeById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const gradeId = parseInt(id);
                zod_1.z.object({
                    gradeId: zod_1.z.number(),
                }).parse({ gradeId });
                const grade = yield gradeService_1.default.getGradeById(gradeId);
                if (!grade) {
                    throw new ApiError_1.default(404, "Grade not found.");
                }
                res.status(200).json(grade);
            }
            catch (error) {
                next(error);
            }
        });
    }
    // Update grade information
    static updateGrade(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const gradeId = parseInt(id);
                zod_1.z.object({
                    gradeId: zod_1.z.number(),
                }).parse({ gradeId });
                const gradeSchema = zod_1.z.object({
                    name: zod_1.z.string().nonempty().optional(),
                    schoolId: zod_1.z.number().optional(),
                });
                gradeSchema.parse(req.body);
                const updatedGrade = yield gradeService_1.default.updateGrade(gradeId, req.body);
                if (!updatedGrade) {
                    throw new ApiError_1.default(404, "Grade not found.");
                }
                res.status(200).json(updatedGrade);
            }
            catch (error) {
                next(error);
            }
        });
    }
    // Delete a grade by ID
    static deleteGrade(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const gradeId = parseInt(id);
                zod_1.z.object({
                    gradeId: zod_1.z.number(),
                }).parse({ gradeId });
                yield gradeService_1.default.deleteGrade(Number(id));
                res.status(204).send();
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = GradeController;
