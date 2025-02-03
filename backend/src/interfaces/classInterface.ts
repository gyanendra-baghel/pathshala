// src/interfaces/classInterface.ts
export interface Class {
  id?: number;
  name: string;
  schoolId: number; // Foreign key from School
  createdAt?: Date;
  updatedAt?: Date;
}
