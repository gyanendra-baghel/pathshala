import { NextFunction, Request, Response } from "express";
import { SchoolService } from "../services/schoolService";
import { z } from "zod";
import ApiError from "../utils/ApiError";

class SchoolController {
  // Create a new school
  static async createSchool(req: Request, res: Response, next: NextFunction) {
    try {
      const SchoolWithAdminRegistrationSchema = z.object({
        school: z.object({
          name: z.string().min(3).max(100),
          email: z.string().email(),
          phone: z.string().regex(/^[+]?[\d\s()-]{10,15}$/),
          schoolBoard: z.enum(["CBSE", "ICSE", "STATE_BOARD", "OTHER"]),
          address: z.string().min(10).max(100),
          postalCode: z.string().regex(/^\d{6}$/),
        }),

        admin: z.object({
          name: z.string().min(2).max(50),
          email: z.string().email(),
          password: z.string().min(8).max(50), // Add password complexity if needed
          phoneNumber: z.string().regex(/^[+]?[\d\s()-]{10,15}$/),
        }),
      });

      // Validate the request body
      const schoolData = SchoolWithAdminRegistrationSchema.parse(req.body);

      const school = await SchoolService.createSchool(schoolData);
      res.status(201).json(school);
    } catch (error) {
      next(error);
    }
  }

  // Get all schools
  static async getAllSchools(req: Request, res: Response, next: NextFunction) {
    try {
      const schools = await SchoolService.getAllSchools();
      res.status(200).json(schools);
    } catch (error) {
      next(error);
    }
  }

  // Get a school by ID
  static async getSchoolById(req: Request, res: Response, next: NextFunction) {
    try {
      const schoolId = z.coerce.number().positive().parse(req.params.id);

      const school = await SchoolService.getSchoolById(schoolId);
      if (!school) {
        throw new ApiError(404, "School not found");
      }
      res.status(200).json(school);
    } catch (error) {
      next(error);
    }
  }

  // Update a school by ID
  static async updateSchool(req: Request, res: Response, next: NextFunction) {
    try {
      const schoolId = z.coerce.number().positive().parse(req.params.id);

      const SchoolUpdateSchema = z.object({
        name: z.string().min(3).max(100).optional(),
        email: z.string().email().optional(),
        phone: z
          .string()
          .regex(/^[+]?[\d\s()-]{10,15}$/)
          .optional(),
        schoolBoard: z
          .enum(["CBSE", "ICSE", "STATE_BOARD", "OTHER"])
          .optional(),
        address: z.string().min(10).max(100).optional(),
        postalCode: z
          .string()
          .regex(/^\d{6}$/)
          .optional(),
      });
      const schoolData = SchoolUpdateSchema.parse(req.body);
      const updatedSchool = await SchoolService.updateSchool(
        schoolId,
        schoolData
      );
      if (!updatedSchool) {
        throw new ApiError(404, "School not found");
      }
      res.status(200).json(updatedSchool);
    } catch (error) {
      next(error);
    }
  }

  // Delete a school by ID
  static async deleteSchool(req: Request, res: Response, next: NextFunction) {
    try {
      const schoolId = z.coerce.number().positive().parse(req.params.id);

      const deletedSchool = await SchoolService.deleteSchool(schoolId);
      if (!deletedSchool) {
        throw new ApiError(404, "School not found");
      }
      res.status(200).json({ message: "School deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

export default SchoolController;
