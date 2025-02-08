import { Router } from "express";
import TeacherController from "../controllers/teacherController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", authMiddleware, TeacherController.createTeacher);
router.get("/", authMiddleware, TeacherController.getTeachersBySchool);
router.get("/:id", authMiddleware, TeacherController.getTeacherById);
router.put("/:id", authMiddleware, TeacherController.updateTeacher);
router.delete("/:id", authMiddleware, TeacherController.deleteTeacher);

export default router;
