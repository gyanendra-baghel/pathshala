"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const studentController_1 = __importDefault(require("../controllers/studentController"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const types_1 = require("../types/types");
const router = (0, express_1.Router)();
// Route to create a new student (Admin only)
router.post("/", authMiddleware_1.authMiddleware, (0, authMiddleware_1.roleMiddleware)([types_1.UserRole.ADMIN]), studentController_1.default.createStudent);
// Route to get a all student in a school
router.get("/", authMiddleware_1.authMiddleware, studentController_1.default.getStudentsBySchool);
// Route to get all students in a class
router.get("/grade", authMiddleware_1.authMiddleware, (0, authMiddleware_1.roleMiddleware)([types_1.UserRole.ADMIN]), studentController_1.default.getStudentsByGrade);
// Route to get a specific student
router.get("/:id", authMiddleware_1.authMiddleware, studentController_1.default.getStudentById);
// Route to update student details (Admin only)
router.put("/:id", authMiddleware_1.authMiddleware, (0, authMiddleware_1.roleMiddleware)([types_1.UserRole.ADMIN]), studentController_1.default.updateStudent);
// Route to delete student (Admin only)
router.delete("/:id", authMiddleware_1.authMiddleware, (0, authMiddleware_1.roleMiddleware)([types_1.UserRole.ADMIN]), studentController_1.default.deleteStudent);
exports.default = router;
