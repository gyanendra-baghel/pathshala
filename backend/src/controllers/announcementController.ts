import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import AnnouncentService from "../services/announcementService";
import ApiError from "../utils/ApiError";

export const createAnnouncement = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new ApiError(401, "Unauthorized access. No token provided.");
    }
    req.body.schoolId = req.user.schoolId;
    const announcementSchema = z.object({
      title: z.string().min(1).max(255),
      description: z.string().min(1).max(255),
      schoolId: z.number().positive(),
    });

    const announcementData = announcementSchema.parse(req.body);
    const announcement = await AnnouncentService.createAnnouncement(
      announcementData
    );
    if (!announcement) {
      throw new ApiError(400, "Failed to create announcement");
    }
    res.status(201).json(announcement);
  } catch (error) {
    next(error);
  }
};

export const getAnnouncements = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new ApiError(401, "Unauthorized access. No token provided.");
    }
    const schoolId = req.user.schoolId;
    const announcements = await AnnouncentService.getAnnouncements(schoolId);
    res.status(200).json(announcements);
  } catch (error) {
    next(error);
  }
};

export const getAnnouncementById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new ApiError(401, "Unauthorized access. No token provided.");
    }
    const announcementId = z.number().positive().parse(parseInt(req.params.id));
    const announcement = await AnnouncentService.getAnnouncementById(
      announcementId
    );
    if (!announcement) {
      throw new ApiError(404, "Announcement not found");
    }
    res.status(200).json(announcement);
  } catch (error) {
    next(error);
  }
};

export const updateAnnouncementById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new ApiError(401, "Unauthorized access. No token provided.");
    }
    const announcementId = z.number().positive().parse(parseInt(req.params.id));
    const announcementSchema = z.object({
      title: z.string().min(1).max(255),
      description: z.string().min(1).max(255),
    });

    const announcementData = announcementSchema.parse(req.body);
    const announcement = await AnnouncentService.updateAnnouncementById(
      announcementId,
      announcementData
    );
    if (!announcement) {
      throw new ApiError(400, "Failed to update announcement");
    }
    res.status(200).json(announcement);
  } catch (error) {
    next(error);
  }
};

export const deleteAnnouncementById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new ApiError(401, "Unauthorized access. No token provided.");
    }
    const announcementId = z.number().positive().parse(parseInt(req.params.id));
    const announcement = await AnnouncentService.deleteAnnouncementById(
      announcementId
    );
    if (!announcement) {
      throw new ApiError(400, "Failed to delete announcement");
    }
    res.status(204).json(announcement);
  } catch (error) {
    next(error);
  }
};
