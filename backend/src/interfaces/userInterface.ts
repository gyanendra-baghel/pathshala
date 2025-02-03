// src/interfaces/userInterface.ts
export interface User {
  id?: number;
  username: string;
  password: string;
  role: "admin" | "teacher" | "student";
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}
