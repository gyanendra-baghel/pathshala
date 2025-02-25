// import React, { useState } from "react";
// import {
//   format,
//   startOfMonth,
//   endOfMonth,
//   eachDayOfInterval,
//   addMonths,
//   subMonths,
//   isSameDay,
//   isFuture,
// } from "date-fns";
// import { useParams } from "react-router-dom";
// import { Attendance } from "../../utils/types";
// import { useSelector } from "react-redux";
// import { RootState } from "../../redux/store";

// const Attendance: React.FC = () => {
//   const [classes, setClasses] = useState<Class[]>([]);
//   const { userId } = useParams<{ userId: string }>();
//   const {students} = useSelector((state:RootState) => state.);
//   const { students, teachers, classes } = useAppContext();
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//   const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
//   const [searchQuery, setSearchQuery] = useState<string>("");

//   const attendance:Attendance[] = [];

//   const daysInMonth = eachDayOfInterval({
//     start: startOfMonth(currentMonth),
//     end: endOfMonth(currentMonth),
//   });

//   const handleDateClick = (date: Date) => {
//     if (!isFuture(date)) {
//       setSelectedDate(date);
//     }
//   };

//   const handlePreviousMonth = () => {
//     setCurrentMonth(subMonths(currentMonth, 1));
//   };

//   const handleNextMonth = () => {
//     setCurrentMonth(addMonths(currentMonth, 1));
//   };

//   const getAttendanceForDate = (date: Date) => {
//     return attendance.filter((att) => isSameDay(new Date(att.date), date));
//   };

//   const getClassesForDate = (date: Date) => {
//     return classes.filter((class_) => isSameDay(new Date(class_.date), date));
//   };

//   const getAttendanceStatusForDate = (date: Date) => {
//     const attendanceForDate = getAttendanceForDate(date);
//     if (attendanceForDate.length === 0) return "none";

//     const allPresent = attendanceForDate.every(
//       (att) => att.status === "present"
//     );
//     const allAbsent = attendanceForDate.every((att) => att.status === "absent");

//     if (allPresent) return "present";
//     if (allAbsent) return "absent";
//     return "partial";
//   };

//   const filteredStudents = students.filter((student) =>
//     student.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const filteredTeachers = teachers.filter((teacher) =>
//     teacher.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="flex space-x-4">
//       <div className="flex-1 space-y-4">
//         <div className="flex justify-between items-center mb-4">
//           <button
//             onClick={handlePreviousMonth}
//             className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
//           >
//             Previous Month
//           </button>
//           <h3 className="text-xl font-semibold">
//             {format(currentMonth, "MMMM yyyy")}
//           </h3>
//           <button
//             onClick={handleNextMonth}
//             className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
//           >
//             Next Month
//           </button>
//         </div>
//         <div className="grid grid-cols-7 gap-2">
//           {daysInMonth.map((day) => {
//             const status = getAttendanceStatusForDate(day);
//             const isFutureDate = isFuture(day);
//             return (
//               <div
//                 key={day.toISOString()}
//                 className={`p-2 rounded-lg cursor-pointer text-center ${
//                   selectedDate && isSameDay(day, selectedDate)
//                     ? "bg-indigo-100"
//                     : status === "present"
//                     ? "bg-green-100"
//                     : status === "partial"
//                     ? "bg-yellow-100"
//                     : status === "absent"
//                     ? "bg-red-100"
//                     : "bg-white"
//                 } ${isFutureDate ? "cursor-not-allowed opacity-50" : ""}`}
//                 onClick={() => handleDateClick(day)}
//               >
//                 {format(day, "d")}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//       {selectedDate && (
//         <div className="flex-1 space-y-4">
//           <h3 className="text-xl font-semibold mt-8 mb-4">
//             Attendance for {format(selectedDate, "MMMM d, yyyy")}
//           </h3>
//           <div className="grid gap-4">
//             {getAttendanceForDate(selectedDate)
//               .filter(
//                 (att) =>
//                   filteredStudents.some(
//                     (student) => student.id === att.studentId
//                   ) ||
//                   filteredTeachers.some(
//                     (teacher) => teacher.id === att.teacherId
//                   )
//               )
//               .map((att) => (
//                 <div key={att.id} className="bg-white p-4 rounded-lg shadow">
//                   <div className="flex justify-between items-center">
//                     <h3 className="font-semibold">
//                       {students.find((s) => s.id === att.studentId)?.name ||
//                         teachers.find((t) => t.id === att.teacherId)?.name}
//                     </h3>
//                     <span
//                       className={`px-2 py-1 rounded text-sm ${
//                         att.status === "present"
//                           ? "bg-green-100 text-green-800"
//                           : "bg-red-100 text-red-800"
//                       }`}
//                     >
//                       {att.status}
//                     </span>
//                   </div>
//                   <p className="text-gray-600">Date: {att.date}</p>
//                 </div>
//               ))}
//           </div>
//           <h3 className="text-xl font-semibold mt-8 mb-4">
//             Classes for {format(selectedDate, "MMMM d, yyyy")}
//           </h3>
//           <div className="grid gap-4">
//             {getClassesForDate(selectedDate).map((class_) => (
//               <div key={class_.id} className="bg-white p-4 rounded-lg shadow">
//                 <h3 className="font-semibold">{class_.name}</h3>
//                 <p className="text-gray-600">Subject: {class_.subject}</p>
//                 <p className="text-gray-600">Grade: {class_.grade}</p>
//                 <p className="text-gray-600">
//                   Teacher:{" "}
//                   {teachers.find((t) => t.id === class_.teacherId)?.name}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Attendance;
