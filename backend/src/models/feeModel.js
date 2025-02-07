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
const database_1 = __importDefault(require("../config/database"));
class FeeModel {
    // Gee all fees of the school
    static getAllSchoolFee(schoolId) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.default.fee.findMany();
            // {where: { schoolId },}
        });
    }
    // add a new fee to the student
    static addFee(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.default.fee.create({
                data,
            });
        });
    }
    // get fee by ID
    static getFeeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.default.fee.findUnique({
                where: { id },
            });
        });
    }
    // update fee
    static updateFee(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.default.fee.update({
                where: { id },
                data,
            });
        });
    }
    // delete fee
    static deleteFee(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.default.fee.delete({
                where: { id },
            });
        });
    }
}
exports.default = FeeModel;
