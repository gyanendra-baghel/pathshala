// src/interfaces/schoolInterface.ts
export interface School {
  id?: number;
  name: string;
  address: string;
  contactNumber: string;
  email: string;
  website?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
