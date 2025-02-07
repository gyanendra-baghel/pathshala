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
exports.SchoolModel = void 0;
const client_1 = require("@prisma/client");
const database_1 = __importDefault(require("../config/database"));
class SchoolModel {
    // Create a new school
    static createSchool(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (data.schoolBoard == "CBSE") {
                data.schoolBoard = client_1.SchoolBoard.CBSE;
            }
            else if (data.schoolBoard == "ICSE") {
                data.schoolBoard = client_1.SchoolBoard.ICSE;
            }
            else if (data.schoolBoard == "State Board") {
                data.schoolBoard = client_1.SchoolBoard.STATE_BOARD;
            }
            else {
                data.schoolBoard = client_1.SchoolBoard.OTHER;
            }
            if (!data.config) {
                data.config = {};
            }
            const school = yield database_1.default.school.create({ data, include: {} });
            return school;
        });
    }
    // Get all schools
    static getAllSchools() {
        return __awaiter(this, void 0, void 0, function* () {
            const schools = yield database_1.default.school.findMany();
            return schools;
        });
    }
    // Get a specific school by ID
    static getSchoolById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const school = yield database_1.default.school.findUnique({
                where: { id },
            });
            return school;
        });
    }
    // Update a school by ID
    static updateSchool(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const school = yield database_1.default.school.update({
                where: { id },
                data,
            });
            return school;
        });
    }
    // Delete a school by ID
    static deleteSchool(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const school = yield database_1.default.school.delete({
                where: { id },
            });
            return school;
        });
    }
}
exports.SchoolModel = SchoolModel;
