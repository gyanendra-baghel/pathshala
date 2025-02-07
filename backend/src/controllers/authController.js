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
const zod_1 = require("zod");
const authService_1 = __importDefault(require("../services/authService"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
class AuthController {
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Check if email and password are provided
                const loginSchema = zod_1.z.object({
                    email: zod_1.z.string().email(),
                    role: zod_1.z.enum(["ADMIN", "TEACHER", "USER"]),
                    password: zod_1.z.string().min(6),
                });
                loginSchema.parse(req.body);
                const { email, password, role } = req.body;
                const token = yield authService_1.default.authUser(email, password, role);
                if (!token) {
                    throw new ApiError_1.default(401, "Invalid credentials");
                }
                res.status(200).json({ message: "Login Successful", token });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getMe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.status(200).json({
                message: "Authenticated",
                user: req.user,
            });
        });
    }
}
exports.default = AuthController;
