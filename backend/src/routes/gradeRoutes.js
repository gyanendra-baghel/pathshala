"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gradeController_1 = __importDefault(require("../controllers/gradeController"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const types_1 = require("../types/types");
const router = (0, express_1.Router)();
// Create a new grade
router.post("/", authMiddleware_1.authMiddleware, (0, authMiddleware_1.roleMiddleware)([types_1.UserRole.ADMIN]), gradeController_1.default.createGrade);
// Get all grades for a specific school
router.get("/school/:sid", authMiddleware_1.authMiddleware, (0, authMiddleware_1.roleMiddleware)([types_1.UserRole.ADMIN, types_1.UserRole.TEACHER]), gradeController_1.default.getGradesBySchool);
// Get a specific grade by ID
router.get("/:id", authMiddleware_1.authMiddleware, (0, authMiddleware_1.roleMiddleware)([types_1.UserRole.ADMIN, types_1.UserRole.TEACHER]), gradeController_1.default.getGradeById);
// Update grade information
router.put("/:id", authMiddleware_1.authMiddleware, (0, authMiddleware_1.roleMiddleware)([types_1.UserRole.ADMIN]), gradeController_1.default.updateGrade);
// Delete a grade by ID
router.delete("/:id", 
// authMiddleware,
// roleMiddleware([UserRole.ADMIN]),
gradeController_1.default.deleteGrade);
exports.default = router;
