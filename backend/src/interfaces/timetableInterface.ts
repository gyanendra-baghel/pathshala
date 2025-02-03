// src/interfaces/timetableInterface.ts
export interface Timetable {
  id?: number;
  classId: number; // Foreign key from Class
  subject: string;
  teacherId: number; // Foreign key from Teacher (assuming a Teacher model exists)
  dayOfWeek:
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday";
  startTime: string; // Using string for time in "HH:mm" format
  endTime: string;
  createdAt?: Date;
  updatedAt?: Date;
}
