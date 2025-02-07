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
exports.FeeStructureModel = void 0;
const database_1 = __importDefault(require("../config/database"));
class FeeStructureModel {
    // Create a new fee structure
    static createFeeStructure(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.default.feeStructure.create({
                data,
            });
        });
    }
    // Get fee structures for a class
    static getFeeStructuresByGrade(gradeId) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.default.feeStructure.findMany({
                where: { gradeId },
            });
        });
    }
    // Get fee structure by ID
    static getFeeStructureById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.default.feeStructure.findUnique({
                where: { id },
            });
        });
    }
    // Update fee structure
    static updateFeeStructure(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.default.feeStructure.update({
                where: { id },
                data,
            });
        });
    }
    // Delete fee structure
    static deleteFeeStructure(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.default.feeStructure.delete({
                where: { id },
            });
        });
    }
}
exports.FeeStructureModel = FeeStructureModel;
