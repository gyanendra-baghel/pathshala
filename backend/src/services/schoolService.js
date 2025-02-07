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
exports.SchoolService = void 0;
const adminModel_1 = __importDefault(require("../models/adminModel"));
const schoolModel_1 = require("../models/schoolModel");
const ApiError_1 = __importDefault(require("../utils/ApiError"));
class SchoolService {
    // Create a new school
    static createSchool(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const school = yield schoolModel_1.SchoolModel.createSchool(data.school);
            data.admin.schoolId = school.id;
            const admin = yield adminModel_1.default.createAdmin(data.admin);
            return { school, admin };
        });
    }
    // Get all schools
    static getAllSchools() {
        return __awaiter(this, void 0, void 0, function* () {
            return schoolModel_1.SchoolModel.getAllSchools();
        });
    }
    // Get a specific school by ID
    static getSchoolById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const school = yield schoolModel_1.SchoolModel.getSchoolById(id);
            return school;
        });
    }
    // Update school information
    static updateSchool(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const school = SchoolService.getSchoolById(id);
            if (!school) {
                throw new ApiError_1.default(400, "School Not Found");
            }
            return yield schoolModel_1.SchoolModel.updateSchool(id, data);
        });
    }
    // Delete a school
    static deleteSchool(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const school = SchoolService.getSchoolById(id);
            if (!school) {
                throw new ApiError_1.default(400, "School Not Found");
            }
            return yield schoolModel_1.SchoolModel.deleteSchool(id);
        });
    }
}
exports.SchoolService = SchoolService;
