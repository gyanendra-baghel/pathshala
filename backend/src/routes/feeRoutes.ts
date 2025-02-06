import { Router } from "express";
import FeeController from "../controllers/feeController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

// Route to get all fees of the school
router.get("/", authMiddleware, FeeController.getAllSchoolFee);

// Route to get fee by id
router.get("/:id", authMiddleware, FeeController.getFeeById);

// Route to create a fee
router.post("/", authMiddleware, FeeController.createFee);

// Route to update fee details
router.put("/:id", authMiddleware, FeeController.updateFee);

// Route to delete a fee
router.delete("/:id", authMiddleware, FeeController.deleteFee);

export default router;
