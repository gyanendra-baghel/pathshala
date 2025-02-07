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
const feeStructureService_1 = __importDefault(require("../services/feeStructureService"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const zod_1 = require("zod");
class FeeStructureController {
    // Create a new fee structure
    static createFeeStructure(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const feeData = req.body;
                const feeStructureSchema = zod_1.z.object({
                    schoolId: zod_1.z.number().int().positive(),
                    gradeId: zod_1.z.number().int().positive(),
                    feeAmount: zod_1.z.number().int().positive(),
                    feeType: zod_1.z.enum(["TUTION", "TRANSPORT", "EXTRACURRICULAR", "OTHER"]),
                    FeeFrequency: zod_1.z.enum(["YEARLY", "MONTHLY", "ONCE"]),
                    amount: zod_1.z.number().int().positive(),
                });
                feeStructureSchema.parse(feeData);
                const createdFee = yield feeStructureService_1.default.createFeeStructure(feeData);
                res.status(201).json(createdFee);
            }
            catch (error) {
                next(error);
            }
        });
    }
    // Get fee structures for a specific class
    static getFeeStructuresByGrade(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const gradeId = parseInt(id);
                zod_1.z.object({
                    gradeId: zod_1.z.number().int().positive(),
                }).parse({ gradeId });
                const feeStructures = yield feeStructureService_1.default.getFeeStructuresByGrade(gradeId);
                res.status(200).json(feeStructures);
            }
            catch (error) {
                next(error);
            }
        });
    }
    // Get a fee structure by ID
    static getFeeStructureById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const feeStructureId = parseInt(id);
                zod_1.z.object({
                    feeStructureId: zod_1.z.number().int().positive(),
                }).parse({ feeStructureId });
                const feeStructure = yield feeStructureService_1.default.getFeeStructureById(feeStructureId);
                if (!feeStructure) {
                    throw new ApiError_1.default(404, "Fee structure not found");
                }
                res.status(200).json(feeStructure);
            }
            catch (error) {
                next(error);
            }
        });
    }
    // Update fee structure
    static updateFeeStructure(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const feeStructureId = parseInt(id);
                const feeData = req.body;
                zod_1.z.object({
                    feeStructureId: zod_1.z.number().int().positive(),
                    schoolId: zod_1.z.number().int().positive().optional(),
                    gradeId: zod_1.z.number().int().positive().optional(),
                    feeAmount: zod_1.z.number().int().positive().optional(),
                    feeType: zod_1.z
                        .enum(["TUTION", "TRANSPORT", "EXTRACURRICULAR", "OTHER"])
                        .optional(),
                    FeeFrequency: zod_1.z.enum(["YEARLY", "MONTHLY", "ONCE"]).optional(),
                    amount: zod_1.z.number().int().positive().optional(),
                }).parse(Object.assign({ feeStructureId }, feeData));
                const updatedFee = yield feeStructureService_1.default.updateFeeStructure(feeStructureId, feeData);
                if (!updatedFee) {
                    throw new ApiError_1.default(404, "Fee structure not found");
                }
                res.status(200).json(updatedFee);
            }
            catch (error) {
                next(error);
            }
        });
    }
    // Delete fee structure by ID
    static deleteFeeStructure(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const feeStructureId = parseInt(id);
                zod_1.z.object({
                    feeStructureId: zod_1.z.number().int().positive(),
                }).parse({ feeStructureId });
                const deletedFee = yield feeStructureService_1.default.deleteFeeStructure(feeStructureId);
                if (deletedFee) {
                    throw new ApiError_1.default(404, "Fee structure not found");
                }
                res.status(200).json({ message: "Fee structure deleted successfully" });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = FeeStructureController;
