export enum UserRole {
  MAIN_ADMIN = "MAIN_ADMIN",
  ADMIN = "ADMIN",
  TEACHER = "TEACHER",
  STUDENT = "STUDENT",
}

export interface JWTUser {
  userId: number;
  role: UserRole;
  schoolId: number;
}
