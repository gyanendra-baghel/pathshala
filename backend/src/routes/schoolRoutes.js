"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const schoolController_1 = __importDefault(require("../controllers/schoolController"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const types_1 = require("../types/types");
const router = (0, express_1.Router)();
// Route to create a new school
router.post("/", schoolController_1.default.createSchool);
// Route to get school details (Admin only)
router.get("/", authMiddleware_1.authMiddleware, (0, authMiddleware_1.roleMiddleware)([types_1.UserRole.ADMIN]), schoolController_1.default.getAllSchools);
// Route to get school details (Admin only)
router.get("/", authMiddleware_1.authMiddleware, (0, authMiddleware_1.roleMiddleware)([types_1.UserRole.ADMIN]), schoolController_1.default.getSchoolById);
// Route to update school details (Admin only)
router.put("/:id", authMiddleware_1.authMiddleware, (0, authMiddleware_1.roleMiddleware)([types_1.UserRole.ADMIN]), schoolController_1.default.updateSchool);
// Route to delete school details (Admin only)
router.delete("/:id", authMiddleware_1.authMiddleware, (0, authMiddleware_1.roleMiddleware)([types_1.UserRole.ADMIN]), schoolController_1.default.deleteSchool);
exports.default = router;
