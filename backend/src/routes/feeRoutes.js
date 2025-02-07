"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const feeController_1 = __importDefault(require("../controllers/feeController"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
// Route to get all fees of the school
router.get("/", authMiddleware_1.authMiddleware, feeController_1.default.getAllSchoolFee);
// Route to get fee by id
router.get("/:id", authMiddleware_1.authMiddleware, feeController_1.default.getFeeById);
// Route to create a fee
router.post("/", authMiddleware_1.authMiddleware, feeController_1.default.createFee);
// Route to update fee details
router.put("/:id", authMiddleware_1.authMiddleware, feeController_1.default.updateFee);
// Route to delete a fee
router.delete("/:id", authMiddleware_1.authMiddleware, feeController_1.default.deleteFee);
exports.default = router;
