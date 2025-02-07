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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../src/app"));
const config_1 = __importDefault(require("../../src/config/config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
describe("StudentController", () => {
    it("should create a new student", () => __awaiter(void 0, void 0, void 0, function* () {
        const token = jsonwebtoken_1.default.sign({ userId: 1, role: "USER" }, config_1.default.app.jwtSecret);
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/api/students")
            .set("Authorization", `Bearer ${token}`)
            .send({
            firstName: "John",
            lastName: "Doe",
            rollNumber: "12345",
            classId: 1,
            schoolId: 1,
            dateOfBirth: "2005-01-01",
            gender: "Male",
            address: "123 Main St",
            contactNumber: "1234567890",
            email: "john.doe@example.com",
        });
        // expect(response.status).toBe(201);
        // expect(response.body).toHaveProperty("id");
    }));
    // it("should get all students for a specific school", async () => {
    //   const token = jwt.sign({ userId: 1, role: "USER" }, config.app.jwtSecret);
    //   const response = await request(app)
    //     .get("/api/students/school/1")
    //     .set("Authorization", `Bearer ${token}`);
    //   expect(response.status).toBe(200);
    //   expect(response.body).toBeInstanceOf(Array);
    // });
    // it("should get a student by ID", async () => {
    //   const token = jwt.sign({ userId: 1, role: "USER" }, config.app.jwtSecret);
    //   const response = await request(app)
    //     .get("/api/students/1")
    //     .set("Authorization", `Bearer ${token}`);
    //   expect(response.status).toBe(200);
    //   expect(response.body).toHaveProperty("id", 1);
    // });
    // it("should update a student", async () => {
    //   const token = jwt.sign({ userId: 1, role: "USER" }, config.app.jwtSecret);
    //   const response = await request(app)
    //     .put("/api/students/1")
    //     .set("Authorization", `Bearer ${token}`)
    //     .send({ firstName: "Jane" });
    //   expect(response.status).toBe(200);
    //   expect(response.body).toHaveProperty("firstName", "Jane");
    // });
    // it("should delete a student", async () => {
    //   const token = jwt.sign({ userId: 1, role: "USER" }, config.app.jwtSecret);
    //   const response = await request(app)
    //     .delete("/api/students/1")
    //     .set("Authorization", `Bearer ${token}`);
    //   expect(response.status).toBe(200);
    //   expect(response.body).toHaveProperty(
    //     "message",
    //     "Student deleted successfully"
    //   );
    // });
});
