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

export interface School {
  id: string;
  name: string;
  address: string;
  postalCode: string;
  schoolBoard: string;
  phone: string;
  email: string;
  logo?: string;
  website?: string;
  established?: string;
  principal?: string;
  vicePrincipal?: string;
}

export interface Subject {
  id: string;
  name: string;
  description?: string;
  gradeId?: string;
  teacherId?: string;
  students?: Student[]; // student IDs
}

export interface SubjectStudent {
  id: string;
  subjectId: string;
  student: Student;
}

export interface User {
  id?: string;
  role: UserRole;
  name: string;
  email: string;
  phone: string;
  password: string;
  schoolId: string;
  school?: School;
}

export interface Student extends User {
  firstName: string;
  lastName: string;
  role: UserRole.STUDENT;
  dob: string;
  gradeId: string;
  grade?: Grade;
  rollNumber: string;
  aadharNumber: string;
  samagraId: string;
  photo: string;
  address: string;
  fatherName: string;
  motherName: string;
  phoneNumber: string;
}

export interface Teacher extends User {
  dob?: string;
  role: UserRole.TEACHER;
  address: string;
  gender?: Gender;
  subjects: number[];
}

export interface Grade {
  id: string;
  name: string;
  students?: string[]; // student IDs
  teacherId?: string;
}

export interface ClassRoom {
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
  type: "ASSIGNMENT" | "MATERIAL";
  dueDate?: string;
  points?: number;
  attachments: string[];
  createdAt: string;
}

export interface Fee {
  id?: number;
  studentId: number | string;
  feeStructureId?: number | string;
  amount: number;
  description: string;
  status?: string;
  createdAt: string;
  student?: Student;
  feeStructure?: FeeStructure;
}

export interface Attendance {
  id: string;
  studentId: string;
  date: string;
  status: "PRESENT" | "ABSENT" | "LATE";
}

export interface Announcement {
  id: string;
  title: string;
  description: string;
  date: string;
  important: boolean;
  createdAt: string;
}

export interface FeeStructure {
  id?: string;
  tuitionFee: number;
  transportFee: number;
  mealFee: number;
  libraryFee: number;
  frequency: "YEARLY" | "MONTHLY" | "ONCE";
  description: string;
  startDate: string;
  endDate: string;
}

export interface Report {
  id?: string;
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
