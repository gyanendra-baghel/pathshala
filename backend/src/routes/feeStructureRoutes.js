"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const feeStructureController_1 = __importDefault(require("../controllers/feeStructureController"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const types_1 = require("../types/types");
const router = (0, express_1.Router)();
// Route to create a fee structure (Admin only)
router.post("/", authMiddleware_1.authMiddleware, (0, authMiddleware_1.roleMiddleware)([types_1.UserRole.ADMIN]), feeStructureController_1.default.createFeeStructure);
// Route to get the fee structure for a specific class
router.get("/:gradeId", authMiddleware_1.authMiddleware, feeStructureController_1.default.getFeeStructuresByGrade);
// Route to update fee structure details (Admin only)
router.put("/:id", authMiddleware_1.authMiddleware, (0, authMiddleware_1.roleMiddleware)([types_1.UserRole.ADMIN]), feeStructureController_1.default.updateFeeStructure);
exports.default = router;
