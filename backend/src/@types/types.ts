export enum UserRole {
  ADMIN = "ADMIN",
  TEACHER = "TEACHER",
  STUDENT = "STUDENT",
}

export interface JWTUser {
  userId: number;
  role: UserRole;
  schoolId: number;
}
