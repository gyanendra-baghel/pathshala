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
const schoolService_1 = require("../services/schoolService");
const zod_1 = require("zod");
const ApiError_1 = __importDefault(require("../utils/ApiError"));
class SchoolController {
    // Create a new school
    static createSchool(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schoolData = req.body; // Data from the request body
                const SchoolWithAdminRegistrationSchema = zod_1.z.object({
                    school: zod_1.z.object({
                        name: zod_1.z.string().min(3).max(100),
                        email: zod_1.z.string().email(),
                        phone: zod_1.z.string().regex(/^[+]?[\d\s()-]{10,15}$/),
                        schoolBoard: zod_1.z.enum(["CBSE", "ICSE", "STATE_BOARD", "OTHER"]),
                        address: zod_1.z.string().min(10).max(100),
                        postalCode: zod_1.z.string().regex(/^\d{6}$/),
                    }),
                    admin: zod_1.z.object({
                        name: zod_1.z.string().min(2).max(50),
                        email: zod_1.z.string().email(),
                        password: zod_1.z.string().min(8).max(50), // Add password complexity if needed
                        phoneNumber: zod_1.z.string().regex(/^[+]?[\d\s()-]{10,15}$/),
                    }),
                });
                // Validate the request body
                SchoolWithAdminRegistrationSchema.parse(schoolData);
                const school = yield schoolService_1.SchoolService.createSchool(schoolData);
                res.status(201).json(school);
            }
            catch (error) {
                next(error);
            }
        });
    }
    // Get all schools
    static getAllSchools(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schools = yield schoolService_1.SchoolService.getAllSchools();
                res.status(200).json(schools);
            }
            catch (error) {
                next(error);
            }
        });
    }
    // Get a school by ID
    static getSchoolById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const schoolId = parseInt(id);
                zod_1.z.number().positive().parse(schoolId);
                const school = yield schoolService_1.SchoolService.getSchoolById(schoolId);
                if (!school) {
                    throw new ApiError_1.default(404, "School not found");
                }
                res.status(200).json(school);
            }
            catch (error) {
                next(error);
            }
        });
    }
    // Update a school by ID
    static updateSchool(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const schoolId = parseInt(id);
                zod_1.z.number().positive().parse(schoolId);
                const schoolData = req.body;
                const SchoolUpdateSchema = zod_1.z.object({
                    name: zod_1.z.string().min(3).max(100).optional(),
                    email: zod_1.z.string().email().optional(),
                    phone: zod_1.z
                        .string()
                        .regex(/^[+]?[\d\s()-]{10,15}$/)
                        .optional(),
                    schoolBoard: zod_1.z
                        .enum(["CBSE", "ICSE", "STATE_BOARD", "OTHER"])
                        .optional(),
                    address: zod_1.z.string().min(10).max(100).optional(),
                    postalCode: zod_1.z
                        .string()
                        .regex(/^\d{6}$/)
                        .optional(),
                });
                SchoolUpdateSchema.parse(schoolData);
                const updatedSchool = yield schoolService_1.SchoolService.updateSchool(schoolId, schoolData);
                if (!updatedSchool) {
                    throw new ApiError_1.default(404, "School not found");
                }
                res.status(200).json(updatedSchool);
            }
            catch (error) {
                next(error);
            }
        });
    }
    // Delete a school by ID
    static deleteSchool(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const schoolId = parseInt(id);
                zod_1.z.number().positive().parse(schoolId);
                const deletedSchool = yield schoolService_1.SchoolService.deleteSchool(schoolId);
                if (!deletedSchool) {
                    throw new ApiError_1.default(404, "School not found");
                }
                res.status(200).json({ message: "School deleted successfully" });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = SchoolController;
