import React, { createContext, useState, ReactNode } from "react";
import {
  ClassWork,
  Fee,
  Attendance,
  Announcement,
  Report,
} from "../utils/types";

interface AppContextProps {
  classWork: ClassWork[];
  fees: Fee[];
  attendance: Attendance[];
  announcements: Announcement[];
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
  getClassWork: (classId: string) => ClassWork[];
  reports: Report[];
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
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

  const reports: Report[] = [
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
  ];

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
  const getClassWork = (classId: string) =>
    classWork.filter((cw) => cw.classId === classId);

  return (
    <AppContext.Provider
      value={{
        classWork,
        fees,
        attendance,
        announcements,
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
        getClassWork,
        reports,
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
