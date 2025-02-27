import { FeeStructure, Gender, Student, Teacher, UserRole } from "./types";

export const DEFAULT_STUDENT_DETAILS: Student = {
  firstName: "",
  lastName: "",
  name: "",
  dob: "",
  role: UserRole.STUDENT,
  grade: undefined,
  rollNumber: "",
  email: "",
  aadharNumber: "",
  samagraId: "",
  photo: "",
  address: "",
  fatherName: "",
  motherName: "",
  phoneNumber: "",
};

export const DEFAULT_TEACHER_DETAILS: Teacher = {
  name: "",
  email: "",
  password: undefined,
  role: UserRole.TEACHER,
  phone: "",
  address: "",
  gender: Gender.MALE,
  subjects: [],
};

export const DEFAULT_FEE_STRUCTURE: FeeStructure = {
  tuitionFee: 0,
  transportFee: 0,
  mealFee: 0,
  libraryFee: 0,
  frequency: "ONCE",
  description: "",
  startDate: "",
  endDate: "",
};
