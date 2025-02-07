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
const subjectService_1 = __importDefault(require("../services/subjectService"));
const zod_1 = require("zod");
class SubjectController {
    // Get all subjects for a specific school
    static getSubjectsBySchool(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schoolId = parseInt(req.params.schoolId, 10);
                const subjects = yield subjectService_1.default.getSubjectsBySchool(schoolId);
                res.status(200).json(subjects);
            }
            catch (error) {
                res.status(500).json({ error: "Failed to fetch subjects." });
            }
        });
    }
    // Get a single subject by ID
    static getSubjectById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subjectId = parseInt(req.params.subjectId, 10);
                const subject = yield subjectService_1.default.getSubjectById(subjectId);
                if (subject) {
                    res.status(200).json(subject);
                }
                else {
                    res.status(404).json({ error: "Subject not found." });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Failed to fetch subject." });
            }
        });
    }
    // Create a new subject
    static createSubject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subjectData = req.body;
                const createSubjectSchema = zod_1.z.object({
                    name: zod_1.z.string().min(1, "Subject name is required"),
                    description: zod_1.z.string().optional(),
                    schoolId: zod_1.z.number().positive("School ID must be a positive number"),
                });
                createSubjectSchema.parse(subjectData);
                const newSubject = yield subjectService_1.default.createSubject(subjectData);
                res.status(201).json(newSubject);
            }
            catch (error) {
                res.status(500).json({ error: "Failed to create subject." });
            }
        });
    }
    // Update a subject
    static updateSubject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updateSubjectSchema = zod_1.z.object({
                    name: zod_1.z.string().min(1, "Subject name is required").optional(),
                    description: zod_1.z.string().optional(),
                    schoolId: zod_1.z
                        .number()
                        .positive("School ID must be a positive number")
                        .optional(),
                });
                updateSubjectSchema.parse(req.body);
                const subjectId = parseInt(req.params.subjectId, 10);
                const subjectData = req.body;
                const updatedSubject = yield subjectService_1.default.updateSubject(subjectId, subjectData);
                res.status(200).json(updatedSubject);
            }
            catch (error) {
                res.status(500).json({ error: "Failed to update subject." });
            }
        });
    }
    // Delete a subject
    static deleteSubject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subjectId = parseInt(req.params.subjectId, 10);
                yield subjectService_1.default.deleteSubject(subjectId);
                res.status(204).send();
            }
            catch (error) {
                res.status(500).json({ error: "Failed to delete subject." });
            }
        });
    }
}
exports.default = SubjectController;
