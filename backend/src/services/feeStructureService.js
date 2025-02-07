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
Object.defineProperty(exports, "__esModule", { value: true });
const feeStructureModel_1 = require("../models/feeStructureModel");
class FeeStructureService {
    // Create a new fee structure
    static createFeeStructure(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return feeStructureModel_1.FeeStructureModel.createFeeStructure(data);
        });
    }
    // Get fee structures for a specific grade
    static getFeeStructuresByGrade(gradeId) {
        return __awaiter(this, void 0, void 0, function* () {
            return feeStructureModel_1.FeeStructureModel.getFeeStructuresByGrade(gradeId);
        });
    }
    // Get a fee structure by ID
    static getFeeStructureById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return feeStructureModel_1.FeeStructureModel.getFeeStructureById(id);
        });
    }
    // Update a fee structure
    static updateFeeStructure(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return feeStructureModel_1.FeeStructureModel.updateFeeStructure(id, data);
        });
    }
    // Delete a fee structure
    static deleteFeeStructure(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return feeStructureModel_1.FeeStructureModel.deleteFeeStructure(id);
        });
    }
}
exports.default = FeeStructureService;
