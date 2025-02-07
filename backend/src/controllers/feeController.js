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
const feeService_1 = __importDefault(require("../services/feeService"));
const zod_1 = require("zod");
const ApiError_1 = __importDefault(require("../utils/ApiError"));
class FeeController {
    // Get all fees of the school
    static getAllSchoolFee(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.user) {
                    throw new ApiError_1.default(401, "Unauthorized access. No token provided.");
                }
                const { schoolId } = req.user;
                zod_1.z.number().positive().parse(schoolId);
                const fees = yield feeService_1.default.getAllSchoolFee(schoolId);
                res.status(200).json(fees);
            }
            catch (error) {
                next(error);
            }
        });
    }
    // Get fee by id
    static getFeeById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const feeId = parseInt(id);
                zod_1.z.number().positive().parse(feeId);
                const fee = yield feeService_1.default.getFeeById(feeId);
                res.status(200).json(fee);
            }
            catch (error) {
                next(error);
            }
        });
    }
    // Create a fee
    static createFee(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const feeData = req.body;
                const feeSchema = zod_1.z.object({
                    studentId: zod_1.z.number().positive(),
                    feeStructureId: zod_1.z.number().positive(),
                    status: zod_1.z.enum(["PAID", "UNPAID", "PARTIAL"]),
                    amount: zod_1.z.number().positive(),
                });
                feeSchema.parse(feeData);
                const fee = yield feeService_1.default.addFee(feeData);
                res.status(201).json(fee);
            }
            catch (error) {
                next(error);
            }
        });
    }
    // Update a fee
    static updateFee(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const feeId = parseInt(id);
                zod_1.z.number().positive().parse(feeId);
                const feeData = req.body;
                const feeSchema = zod_1.z.object({
                    studentId: zod_1.z.number().positive(),
                    feeStructureId: zod_1.z.number().positive(),
                    status: zod_1.z.enum(["PAID", "UNPAID", "PARTIAL"]),
                    amount: zod_1.z.number().positive(),
                });
                feeSchema.parse(feeData);
                const fee = yield feeService_1.default.updateFee(feeId, feeData);
                res.status(200).json(fee);
            }
            catch (error) {
                next(error);
            }
        });
    }
    // Delete a fee
    static deleteFee(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const feeId = parseInt(id);
                zod_1.z.number().positive().parse(feeId);
                yield feeService_1.default.deleteFee(feeId);
                res.status(204).end();
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = FeeController;
