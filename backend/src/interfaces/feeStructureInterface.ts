// src/interfaces/feeStructureInterface.ts
export interface FeeStructure {
  id?: number;
  classId: number; // Foreign key from Class
  feeAmount: number;
  feeType: "Tuition" | "Exam" | "Library" | "Sports" | "Other";
  dueDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
