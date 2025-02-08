import { Gender, Student, Teacher } from "./types";

export const DEFAULT_STUDENT_DETAILS: Student = {
  id: "",
  firstName: "",
  lastName: "",
  dob: "",
  grade: undefined,
  rollNumber: "",
  email: "",
  adhaarNumber: "",
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
  phone: "",
  address: "",
  gender: Gender.MALE,
  subjects: [],
};
