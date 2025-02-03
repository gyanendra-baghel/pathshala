// import prisma from "../config/database";

// export class TimetableModel {
//   // Create a new timetable entry
//   static async createTimetable(data: any) {
//     return prisma.timetable.create({
//       data,
//     });
//   }

//   // Get all timetables for a grade
//   static async getTimetableByGrade(gradeId: number) {
//     return prisma.timetable.findMany({
//       where: { gradeId },
//     });
//   }

//   // Get a specific timetable entry by ID
//   static async getTimetableById(id: number) {
//     return prisma.timetable.findUnique({
//       where: { id },
//     });
//   }

//   // Update timetable entry
//   static async updateTimetable(id: number, data: any) {
//     return prisma.timetable.update({
//       where: { id },
//       data,
//     });
//   }

//   // Delete timetable entry
//   static async deleteTimetable(id: number) {
//     return prisma.timetable.delete({
//       where: { id },
//     });
//   }
// }
