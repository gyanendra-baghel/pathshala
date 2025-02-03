// src/interfaces/studentInterface.ts
export interface Student {
  id?: number;
  firstName: string;
  lastName: string;
  rollNumber: string;
  classId: number; // Foreign key from Class
  schoolId: number; // Foreign key from School
  dateOfBirth: Date;
  gender: "Male" | "Female" | "Other";
  address: string;
  contactNumber: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}
