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
const feeModel_1 = __importDefault(require("../models/feeModel"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
class FeeService {
    static getAllSchoolFee(schoolId) {
        return __awaiter(this, void 0, void 0, function* () {
            return feeModel_1.default.getAllSchoolFee(schoolId);
        });
    }
    static addFee(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return feeModel_1.default.addFee(data);
        });
    }
    static getFeeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return feeModel_1.default.getFeeById(id);
        });
    }
    static updateFee(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const fee = yield feeModel_1.default.getFeeById(id);
            if (!fee) {
                throw new ApiError_1.default(404, "Fee not found");
            }
            return feeModel_1.default.updateFee(id, data);
        });
    }
    static deleteFee(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const fee = yield feeModel_1.default.getFeeById(id);
            if (!fee) {
                throw new ApiError_1.default(404, "Fee not found");
            }
            return feeModel_1.default.deleteFee(id);
        });
    }
}
exports.default = FeeService;
