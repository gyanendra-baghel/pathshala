import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  createAnnouncement,
  deleteAnnouncementById,
  getAnnouncementById,
  getAnnouncements,
  updateAnnouncementById,
} from "../controllers/announcementController";

const router = Router();

// Create Announcement
router.post("/", authMiddleware, createAnnouncement);

// Get All Announcements
router.get("/", authMiddleware, getAnnouncements);

// Get Announcement by ID
router.get("/:id", authMiddleware, getAnnouncementById);

// Update Announcement by ID
router.put("/:id", authMiddleware, updateAnnouncementById);

// Delete Announcement by ID
router.delete("/:id", authMiddleware, deleteAnnouncementById);

export default router;
