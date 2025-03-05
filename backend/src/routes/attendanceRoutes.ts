import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import AttendanceController from "../controllers/attendanceController";

const router = Router();

// Create Announcement
router.post("/", authMiddleware, AttendanceController.recordAttendance);

// Bulk create attendance records
router.post("/bulk", authMiddleware, AttendanceController.bulkCreateAttendance);

// Update attendance record
router.put("/:id", authMiddleware, AttendanceController.updateAttendance);

// Get attendance for a subject on a specific date
router.get(
  "/subject/:subjectId",
  authMiddleware,
  AttendanceController.getSubjectAttendance
);

// Get student attendance history
router.get(
  "/student/:studentId",
  authMiddleware,
  AttendanceController.getStudentAttendance
);

// Get attendance summary
router.get(
  "/summary/:studentId",
  authMiddleware,
  AttendanceController.getAttendanceSummary
);

export default router;
