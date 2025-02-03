import React, { createContext, useState, ReactNode } from "react";
import {
  Student,
  Teacher,
  Class,
  ClassWork,
  Fee,
  Attendance,
  Announcement,
  FeeStructure,
  Report,
} from "../utils/types";

interface AppContextProps {
  students: Student[];
  teachers: Teacher[];
  classes: Class[];
  classWork: ClassWork[];
  fees: Fee[];
  attendance: Attendance[];
  announcements: Announcement[];
  addStudent: (student: Student) => void;
  updateStudent: (student: Student) => void;
  removeStudent: (id: string) => void;
  addTeacher: (teacher: Teacher) => void;
  updateTeacher: (teacher: Teacher) => void;
  removeTeacher: (id: string) => void;
  addClass: (class_: Class) => void;
  updateClass: (class_: Class) => void;
  removeClass: (id: string) => void;
  addClassWork: (classWork: ClassWork) => void;
  updateClassWork: (classWork: ClassWork) => void;
  removeClassWork: (id: string) => void;
  addFee: (fee: Fee) => void;
  updateFee: (fee: Fee) => void;
  removeFee: (id: string) => void;
  addAttendance: (attendance: Attendance) => void;
  updateAttendance: (attendance: Attendance) => void;
  toggleAttendance: (id: string) => void;
  removeAttendance: (id: string) => void;
  addAnnouncement: (announcement: Announcement) => void;
  updateAnnouncement: (announcement: Announcement) => void;
  removeAnnouncement: (id: string) => void;
  getStudentAttendance: (studentId: string) => Attendance[];
  getTeacherClasses: (teacherId: string) => Class[];
  getClassWork: (classId: string) => ClassWork[];
  feeStructures: FeeStructure[];
  addFeeStructure: (feeStructure: Omit<FeeStructure, "id">) => void;
  reports: Report[];
  updateFeeStructure: (updatedFeeStructure: FeeStructure) => void;
  removeFeeStructure: (id: string) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [feeStructures, setFeeStructures] = useState<FeeStructure[]>([
    { id: "1", grade: "10th", description: "Tuition Fee", amount: 500 },
    { id: "2", grade: "11th", description: "Tuition Fee", amount: 600 },
    { id: "3", grade: "12th", description: "Tuition Fee", amount: 700 },
  ]);
  const [students, setStudents] = useState<Student[]>([
    {
      id: "1",
      name: "John Doe",
      class: "10th",
      rollNumber: "1001",
      email: "john@example.com",
      adhaarNumber: "123456789012",
      samagraId: "1234567890",
      photo: "https://randomuser.me/api/portraits",
      fatherAdhaarNumber: "123456789012",
    },
    {
      id: "2",
      name: "Jane Smith",
      class: "10th",
      rollNumber: "1002",
      email: "jane@example.com",
      adhaarNumber: "123456789012",
      samagraId: "1234567890",
      photo: "https://randomuser.me/api/portraits",
      fatherAdhaarNumber: "123456789012",
    },
  ]);

  const [teachers, setTeachers] = useState<Teacher[]>([
    {
      id: "1",
      name: "Dr. Smith",
      email: "smith@school.com",
      subjects: ["Mathematics", "Physics"],
    },
    {
      id: "2",
      name: "Mrs. Johnson",
      email: "johnson@school.com",
      subjects: ["English", "Literature"],
    },
  ]);

  const [classes, setClasses] = useState<Class[]>([
    {
      id: "1",
      name: "Mathematics 101",
      subject: "Mathematics",
      teacherId: "1",
      grade: "10th",
      description: "Basic algebra and geometry concepts",
      students: ["1", "2"],
    },
    {
      id: "2",
      name: "English Literature",
      subject: "English",
      teacherId: "2",
      grade: "10th",
      description: "Classic literature and writing skills",
      students: ["1"],
    },
  ]);

  const [classWork, setClassWork] = useState<ClassWork[]>([
    {
      id: "1",
      classId: "1",
      title: "Quadratic Equations Assignment",
      description: "Complete exercises 1-10 from Chapter 3",
      type: "assignment",
      dueDate: "2024-03-20",
      points: 100,
      attachments: ["worksheet.pdf"],
      createdAt: "2024-03-15",
    },
    {
      id: "2",
      classId: "1",
      title: "Study Material: Algebraic Expressions",
      description: "Reference material for upcoming test",
      type: "material",
      attachments: ["notes.pdf", "examples.pdf"],
      createdAt: "2024-03-14",
    },
  ]);

  const [fees, setFees] = useState<Fee[]>([
    {
      id: "1",
      studentId: "1",
      amount: 1000,
      dueDate: "2024-04-01",
      status: "pending",
      description: "Tuition Fee",
    },
    {
      id: "2",
      studentId: "1",
      amount: 500,
      dueDate: "2024-03-15",
      status: "paid",
      description: "Library Fee",
    },
  ]);

  const [attendance, setAttendance] = useState<Attendance[]>([
    { id: "1", studentId: "1", date: "2024-03-10", status: "present" },
    { id: "2", studentId: "1", date: "2024-03-11", status: "absent" },
  ]);

  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: "1",
      title: "Annual Day Celebration",
      content: "Annual day will be celebrated on March 25th",
      date: "2024-03-01",
      important: true,
    },
    {
      id: "2",
      title: "Parent Teacher Meeting",
      content: "PTM scheduled for next weekend",
      date: "2024-03-05",
      important: false,
    },
  ]);

  const [reports, setReports] = useState<Report[]>([
    {
      id: "1",
      title: "Bullying Incident",
      description: "My child was bullied in the playground.",
      date: "2023-10-01",
      parentName: "John Doe",
      studentName: "Jane Doe",
      grade: "5th",
    },
    {
      id: "2",
      title: "Homework Issue",
      description: "The homework assigned is too difficult.",
      date: "2023-10-02",
      parentName: "Mary Smith",
      studentName: "Tom Smith",
      grade: "6th",
    },
    // Add more reports as needed
  ]);

  const addStudent = (student: Student) => setStudents([...students, student]);
  const updateStudent = (updatedStudent: Student) =>
    setStudents(
      students.map((student) =>
        student.id === updatedStudent.id ? updatedStudent : student
      )
    );
  const removeStudent = (id: string) =>
    setStudents(students.filter((student) => student.id !== id));

  const addTeacher = (teacher: Teacher) => setTeachers([...teachers, teacher]);
  const updateTeacher = (updatedTeacher: Teacher) =>
    setTeachers(
      teachers.map((teacher) =>
        teacher.id === updatedTeacher.id ? updatedTeacher : teacher
      )
    );
  const removeTeacher = (id: string) =>
    setTeachers(teachers.filter((teacher) => teacher.id !== id));

  const addClass = (class_: Class) => setClasses([...classes, class_]);
  const updateClass = (updatedClass: Class) =>
    setClasses(
      classes.map((class_) =>
        class_.id === updatedClass.id ? updatedClass : class_
      )
    );
  const removeClass = (id: string) =>
    setClasses(classes.filter((class_) => class_.id !== id));

  const addClassWork = (cw: ClassWork) => setClassWork([...classWork, cw]);
  const updateClassWork = (updatedClassWork: ClassWork) =>
    setClassWork(
      classWork.map((cw) =>
        cw.id === updatedClassWork.id ? updatedClassWork : cw
      )
    );
  const removeClassWork = (id: string) =>
    setClassWork(classWork.filter((cw) => cw.id !== id));

  const addFee = (fee: Fee) => setFees([...fees, fee]);
  const updateFee = (updatedFee: Fee) =>
    setFees(fees.map((fee) => (fee.id === updatedFee.id ? updatedFee : fee)));
  const removeFee = (id: string) =>
    setFees(fees.filter((fee) => fee.id !== id));

  const addAttendance = (at: Attendance) => setAttendance([...attendance, at]);
  const updateAttendance = (updatedAttendance: Attendance) =>
    setAttendance(
      attendance.map((att) =>
        att.id === updatedAttendance.id ? updatedAttendance : att
      )
    );
  const toggleAttendance = (id: string) =>
    setAttendance(
      attendance.map((att) =>
        att.id === id
          ? { ...att, status: att.status === "present" ? "absent" : "present" }
          : att
      )
    );
  const removeAttendance = (id: string) =>
    setAttendance(attendance.filter((att) => att.id !== id));

  const addAnnouncement = (announcement: Announcement) =>
    setAnnouncements([...announcements, announcement]);
  const updateAnnouncement = (updatedAnnouncement: Announcement) =>
    setAnnouncements(
      announcements.map((ann) =>
        ann.id === updatedAnnouncement.id ? updatedAnnouncement : ann
      )
    );
  const removeAnnouncement = (id: string) =>
    setAnnouncements(announcements.filter((ann) => ann.id !== id));

  const getStudentAttendance = (studentId: string) =>
    attendance.filter((a) => a.studentId === studentId);
  const getTeacherClasses = (teacherId: string) =>
    classes.filter((c) => c.teacherId === teacherId);
  const getClassWork = (classId: string) =>
    classWork.filter((cw) => cw.classId === classId);

  const addFeeStructure = (feeStructure: Omit<FeeStructure, "id">) => {
    setFeeStructures([
      ...feeStructures,
      { ...feeStructure, id: Date.now().toString() },
    ]);
  };

  const updateFeeStructure = (updatedFeeStructure: FeeStructure) => {
    setFeeStructures(
      feeStructures.map((fs) =>
        fs.id === updatedFeeStructure.id ? updatedFeeStructure : fs
      )
    );
  };

  const removeFeeStructure = (id: string) => {
    setFeeStructures(feeStructures.filter((fs) => fs.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        students,
        teachers,
        classes,
        classWork,
        fees,
        attendance,
        announcements,
        addStudent,
        updateStudent,
        removeStudent,
        addTeacher,
        updateTeacher,
        removeTeacher,
        addClass,
        updateClass,
        removeClass,
        addClassWork,
        updateClassWork,
        removeClassWork,
        addFee,
        updateFee,
        removeFee,
        addAttendance,
        updateAttendance,
        toggleAttendance,
        removeAttendance,
        addAnnouncement,
        updateAnnouncement,
        removeAnnouncement,
        getStudentAttendance,
        getTeacherClasses,
        getClassWork,
        feeStructures,
        addFeeStructure,
        reports,
        updateFeeStructure,
        removeFeeStructure,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
