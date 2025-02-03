// import { Request, Response } from "express";
// import { TimetableService } from "../services/timetableService";

// export class TimetableController {
//   // Create a new timetable entry
//   static async createTimetable(req: Request, res: Response) {
//     try {
//       const timetableData = req.body;
//       const createdTimetable = await TimetableService.createTimetable(
//         timetableData
//       );
//       res.status(201).json(createdTimetable);
//     } catch (error) {
//       res.status(500).json({ message: "Failed to create timetable", error });
//     }
//   }

//   // Get all timetables for a specific grade
//   static async getTimetableByGrade(req: Request, res: Response) {
//     try {
//       const { classId } = req.params;
//       const timetables = await TimetableService.getTimetableByGrade(
//         parseInt(classId)
//       );
//       res.status(200).json(timetables);
//     } catch (error) {
//       res.status(500).json({ message: "Failed to fetch timetables", error });
//     }
//   }

//   // Get a timetable entry by ID
//   static async getTimetableById(req: Request, res: Response) {
//     try {
//       const { id } = req.params;
//       const timetable = await TimetableService.getTimetableById(parseInt(id));
//       if (timetable) {
//         res.status(200).json(timetable);
//       } else {
//         res.status(404).json({ message: "Timetable entry not found" });
//       }
//     } catch (error) {
//       res.status(500).json({ message: "Failed to fetch timetable", error });
//     }
//   }

//   // Update timetable entry
//   static async updateTimetable(req: Request, res: Response) {
//     try {
//       const { id } = req.params;
//       const timetableData = req.body;
//       const updatedTimetable = await TimetableService.updateTimetable(
//         parseInt(id),
//         timetableData
//       );
//       if (updatedTimetable) {
//         res.status(200).json(updatedTimetable);
//       } else {
//         res.status(404).json({ message: "Timetable entry not found" });
//       }
//     } catch (error) {
//       res.status(500).json({ message: "Failed to update timetable", error });
//     }
//   }

//   // Delete timetable entry by ID
//   static async deleteTimetable(req: Request, res: Response) {
//     try {
//       const { id } = req.params;
//       const deletedTimetable = await TimetableService.deleteTimetable(
//         parseInt(id)
//       );
//       if (deletedTimetable) {
//         res
//           .status(200)
//           .json({ message: "Timetable entry deleted successfully" });
//       } else {
//         res.status(404).json({ message: "Timetable entry not found" });
//       }
//     } catch (error) {
//       res.status(500).json({ message: "Failed to delete timetable", error });
//     }
//   }
// }
