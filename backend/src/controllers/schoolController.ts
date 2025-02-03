import { Request, Response } from "express";
import { SchoolService } from "../services/schoolService";
import { z } from "zod";

class SchoolController {
  // Create a new school
  static async createSchool(req: Request, res: Response): Promise<void> {
    try {
      const schoolData = req.body; // Data from the request body
      const SchoolWithAdminRegistrationSchema = z.object({
        school: z.object({
          name: z.string().min(3).max(100),
          contactEmail: z.string().email(),
          contactPhone: z.string().regex(/^[+]?[\d\s()-]{10,15}$/),
          schoolBoard: z.enum(["CBSE", "ICSE", "STATE_BOARD", "OTHER"]),
          address: z.object({
            street: z.string(),
            city: z.string(),
            state: z.string(),
            country: z.string(),
            postalCode: z.string(),
          }),
        }),

        admin: z.object({
          firstName: z.string().min(2).max(50),
          lastName: z.string().min(2).max(50),
          email: z.string().email(),
          password: z.string().min(8).max(50), // Add password complexity if needed
          phone: z.string().regex(/^[+]?[\d\s()-]{10,15}$/),
        }),
      });

      // Validate the request body
      const schoolAdmin =
        SchoolWithAdminRegistrationSchema.safeParse(schoolData);

      if (!schoolAdmin.success) {
        res
          .status(400)
          .json({ message: "Invalid data", errors: schoolAdmin.error });
        return;
      }
      const school = await SchoolService.createSchool(schoolData);
      res.status(201).json(school);
    } catch (error) {
      res.status(500).json({ message: "Failed to create school", error });
    }
  }

  // Get all schools
  static async getAllSchools(req: Request, res: Response) {
    try {
      const schools = await SchoolService.getAllSchools();
      res.status(200).json(schools);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch schools", error });
    }
  }

  // Get a school by ID
  static async getSchoolById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const school = await SchoolService.getSchoolById(parseInt(id));
      if (school) {
        res.status(200).json(school);
      } else {
        res.status(404).json({ message: "School not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch school", error });
    }
  }

  // Update a school by ID
  static async updateSchool(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const schoolData = req.body;
      const updatedSchool = await SchoolService.updateSchool(
        parseInt(id),
        schoolData
      );
      if (updatedSchool) {
        res.status(200).json(updatedSchool);
      } else {
        res.status(404).json({ message: "School not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to update school", error });
    }
  }

  // Delete a school by ID
  static async deleteSchool(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletedSchool = await SchoolService.deleteSchool(parseInt(id));
      if (deletedSchool) {
        res.status(200).json({ message: "School deleted successfully" });
      } else {
        res.status(404).json({ message: "School not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to delete school", error });
    }
  }
}

export default SchoolController;
