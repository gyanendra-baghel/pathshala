export enum UserRole {
  MAIN_ADMIN = "MAIN_ADMIN",
  TEACHER = "TEACHER",
  STUDENT = "STUDENT",
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

export interface Subject {
  id: string;
  name: string;
  description?: string;
  gradeId?: string;
  teacherId?: string;
  students?: string[]; // student IDs
}

export interface Student {
  id?: string;
  firstName: string;
  lastName: string;
  dob: string;
  grade?: Grade;
  rollNumber: string;
  email: string;
  aadharNumber: string;
  samagraId: string;
  photo: string;
  address: string;
  fatherName: string;
  motherName: string;
  phoneNumber: string;
}

export interface Grade {
  id: string;
  name: string;
  students: string[]; // student IDs
  teacherId: string;
}

export interface Teacher {
  id?: string;
  name: string;
  dob?: string;
  email: string;
  password?: string;
  address: string;
  phone?: string;
  gender?: Gender;
  subjects: number[];
}

export interface Class {
  id: string;
  name: string;
  subject: string;
  teacherId: string;
  grade: string;
  description: string;
  students: string[]; // student IDs
}

export interface ClassWork {
  id: string;
  classId: string;
  title: string;
  description: string;
  type: "assignment" | "material" | "question";
  dueDate?: string;
  points?: number;
  attachments: string[];
  createdAt: string;
}

export interface Fee {
  id: string;
  studentId: string;
  amount: number;
  dueDate: string;
  status: "paid" | "pending" | "unpaid";
  description: string;
}

export interface Attendance {
  id: string;
  studentId: string;
  date: string;
  status: "present" | "absent";
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  important: boolean;
}

export interface User {
  id: string;
  role: UserRole;
  name: string;
  email: string;
}

export interface FeeStructure {
  id?: string;
  gradeId: number | string;
  description?: string;
  amount: number | string;
}

export interface Report {
  id: string;
  title: string;
  description: string;
  date: string;
  parentName: string;
  studentName: string;
  grade: string;
}

export interface TeacherData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    gender: "male" | "female" | "other";
    photo?: File;
  };
  professionalInfo: {
    employeeId: string;
    joiningDate: string;
    qualification: string;
    experience: number;
    specialization: string[];
    department: string;
    designation: string;
    subjects: string[];
  };
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  documents: {
    resume?: File;
    certificates?: File[];
    idProof?: File;
  };
  credentials: {
    email: string;
    password: string;
    confirmPassword: string;
  };
}

export interface ValidationErrors {
  [key: string]: string;
}

export interface TeacherProfileProps {
  teacher: {
    personalInfo: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      dateOfBirth: string;
      gender: "male" | "female" | "other";
      photoUrl?: string;
    };
    professionalInfo: {
      employeeId: string;
      joiningDate: string;
      qualification: string;
      experience: number;
      specialization: string[];
      department: string;
      designation: string;
      subjects: string[];
    };
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
    documents: {
      resumeUrl?: string;
      certificatesUrls?: string[];
      idProofUrl?: string;
    };
  };
}
