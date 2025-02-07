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
const adminModel_1 = __importDefault(require("../models/adminModel"));
class AdminService {
    static getAdmins() {
        return __awaiter(this, void 0, void 0, function* () {
            return adminModel_1.default.getAdmins();
        });
    }
    static getAdminById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return adminModel_1.default.getAdminById(id);
        });
    }
    static getAdminByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = adminModel_1.default.getAdminByEmail(email);
            if (!admin) {
                throw new Error("Admin not found");
            }
            return admin;
        });
    }
    static getAdminByEmailAndPassword(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield adminModel_1.default.getAdminByEmail(email);
            if (!admin) {
                throw new Error("Admin not found");
            }
            if (admin.password !== password) {
                throw new Error("Invalid password");
            }
            return admin;
        });
    }
    static createAdmin(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return adminModel_1.default.createAdmin(data);
        });
    }
    static updateAdmin(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return adminModel_1.default.updateAdmin(id, data);
        });
    }
    static deleteAdmin(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return adminModel_1.default.deleteAdmin(id);
        });
    }
}
exports.default = AdminService;
