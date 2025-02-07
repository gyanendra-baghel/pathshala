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
const app_1 = __importDefault(require("../../src/app"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const supertest_1 = __importDefault(require("supertest"));
const config_1 = __importDefault(require("../../src/config/config"));
describe("authMiddleware", () => {
    it("should return 401 if no token is provided", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get("/api/auth/");
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message", "Unauthorized access. Token missing.");
    }));
    it("should return 401 if an invalid token is provided", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .get("/api/auth/")
            .set("Authorization", "Bearer invalidtoken");
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message", "Unauthorized access. Invalid token.");
    }));
    it("should return 200 if a valid token is provided", () => __awaiter(void 0, void 0, void 0, function* () {
        const token = jsonwebtoken_1.default.sign({ userId: 1, role: "USER" }, config_1.default.app.jwtSecret);
        const response = yield (0, supertest_1.default)(app_1.default)
            .get("/api/auth/")
            .set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message", "Authenticated");
        expect(response.body).toHaveProperty("user");
        expect(response.body.user).toHaveProperty("userId", 1);
        expect(response.body.user).toHaveProperty("role", "USER");
    }));
});
