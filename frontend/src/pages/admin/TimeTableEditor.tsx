// import React, { useState } from "react";
// import { useAppContext } from "../../context/AppContext";
// import { Class, Teacher, Student } from "../../types";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// const TimetableEditor: React.FC = () => {
//   const { classes, teachers, students, addClass, updateClass, removeClass } =
//     useAppContext();
//   const [selectedClass, setSelectedClass] = useState<Class | null>(null);
//   const [name, setName] = useState("");
//   const [subject, setSubject] = useState("");
//   const [teacherId, setTeacherId] = useState("");
//   const [grade, setGrade] = useState("");
//   const [description, setDescription] = useState("");
//   const [classStudents, setClassStudents] = useState<string[]>([]);
//   const [timetable, setTimetable] = useState<{
//     [key: string]: { [day: string]: Class[] };
//   }>({
//     "09:00 - 10:00": {
//       Monday: [],
//       Tuesday: [],
//       Wednesday: [],
//       Thursday: [],
//       Friday: [],
//     },
//     "10:00 - 11:00": {
//       Monday: [],
//       Tuesday: [],
//       Wednesday: [],
//       Thursday: [],
//       Friday: [],
//     },
//     "11:00 - 12:00": {
//       Monday: [],
//       Tuesday: [],
//       Wednesday: [],
//       Thursday: [],
//       Friday: [],
//     },
//     "12:00 - 01:00": {
//       Monday: [],
//       Tuesday: [],
//       Wednesday: [],
//       Thursday: [],
//       Friday: [],
//     },
//     "01:00 - 02:00": {
//       Monday: [],
//       Tuesday: [],
//       Wednesday: [],
//       Thursday: [],
//       Friday: [],
//     },
//     "02:00 - 03:00": {
//       Monday: [],
//       Tuesday: [],
//       Wednesday: [],
//       Thursday: [],
//       Friday: [],
//     },
//     "03:00 - 04:00": {
//       Monday: [],
//       Tuesday: [],
//       Wednesday: [],
//       Thursday: [],
//       Friday: [],
//     },
//   });

//   const handleAddClass = (e: React.FormEvent) => {
//     e.preventDefault();
//     const newClass: Class = {
//       id: Date.now().toString(),
//       name,
//       subject,
//       teacherId,
//       grade,
//       description,
//       students: classStudents,
//     };
//     addClass(newClass);
//     resetForm();
//   };

//   const handleEditClass = (class_: Class) => {
//     setSelectedClass(class_);
//     setName(class_.name);
//     setSubject(class_.subject);
//     setTeacherId(class_.teacherId);
//     setGrade(class_.grade);
//     setDescription(class_.description);
//     setClassStudents(class_.students);
//   };

//   const handleUpdateClass = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!selectedClass) return;
//     const updatedClass: Class = {
//       ...selectedClass,
//       name,
//       subject,
//       teacherId,
//       grade,
//       description,
//       students: classStudents,
//     };
//     updateClass(updatedClass);
//     resetForm();
//   };

//   const handleRemoveClass = (id: string) => {
//     removeClass(id);
//   };

//   const resetForm = () => {
//     setSelectedClass(null);
//     setName("");
//     setSubject("");
//     setTeacherId("");
//     setGrade("");
//     setDescription("");
//     setClassStudents([]);
//   };

//   const toggleStudentSelection = (studentId: string) => {
//     setClassStudents((prev) =>
//       prev.includes(studentId)
//         ? prev.filter((id) => id !== studentId)
//         : [...prev, studentId]
//     );
//   };

//   const onDragEnd = (result: any) => {
//     const { source, destination } = result;
//     if (!destination) return;

//     const sourceTime = source.droppableId.split("-")[0];
//     const sourceDay = source.droppableId.split("-")[1];
//     const destinationTime = destination.droppableId.split("-")[0];
//     const destinationDay = destination.droppableId.split("-")[1];

//     const sourceClasses = Array.from(timetable[sourceTime][sourceDay]);
//     const [movedClass] = sourceClasses.splice(source.index, 1);

//     const destinationClasses = Array.from(
//       timetable[destinationTime][destinationDay]
//     );
//     destinationClasses.splice(destination.index, 0, movedClass);

//     setTimetable({
//       ...timetable,
//       [sourceTime]: {
//         ...timetable[sourceTime],
//         [sourceDay]: sourceClasses,
//         [destinationDay]: destinationClasses,
//       },
//     });
//   };

//   return (
//     <div className="space-y-4">
//       <h2 className="text-2xl font-bold">Timetable Editor</h2>
//       <form
//         onSubmit={selectedClass ? handleUpdateClass : handleAddClass}
//         className="space-y-4"
//       >
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Class Name
//           </label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="mt-1 block w-full px-4 py-2 border rounded-lg"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Subject
//           </label>
//           <input
//             type="text"
//             value={subject}
//             onChange={(e) => setSubject(e.target.value)}
//             className="mt-1 block w-full px-4 py-2 border rounded-lg"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Teacher
//           </label>
//           <select
//             value={teacherId}
//             onChange={(e) => setTeacherId(e.target.value)}
//             className="mt-1 block w-full px-4 py-2 border rounded-lg"
//             required
//           >
//             <option value="">Select Teacher</option>
//             {teachers.map((teacher) => (
//               <option key={teacher.id} value={teacher.id}>
//                 {teacher.name}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Grade
//           </label>
//           <input
//             type="text"
//             value={grade}
//             onChange={(e) => setGrade(e.target.value)}
//             className="mt-1 block w-full px-4 py-2 border rounded-lg"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Description
//           </label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="mt-1 block w-full px-4 py-2 border rounded-lg"
//             rows={4}
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Students
//           </label>
//           <div className="grid grid-cols-2 gap-2 mt-1">
//             {students.map((student) => (
//               <div key={student.id} className="flex items-center">
//                 <input
//                   type="checkbox"
//                   checked={classStudents.includes(student.id)}
//                   onChange={() => toggleStudentSelection(student.id)}
//                   className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
//                 />
//                 <label className="ml-2 text-sm text-gray-900">
//                   {student.name}
//                 </label>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div>
//           <button
//             type="submit"
//             className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
//           >
//             {selectedClass ? "Update Class" : "Add Class"}
//           </button>
//         </div>
//       </form>
//       <h3 className="text-xl font-semibold mt-8 mb-4">Timetable</h3>
//       <DragDropContext onDragEnd={onDragEnd}>
//         <table className="min-w-full bg-white">
//           <thead>
//             <tr>
//               <th className="py-2 px-4 border-b">Time</th>
//               <th className="py-2 px-4 border-b">Monday</th>
//               <th className="py-2 px-4 border-b">Tuesday</th>
//               <th className="py-2 px-4 border-b">Wednesday</th>
//               <th className="py-2 px-4 border-b">Thursday</th>
//               <th className="py-2 px-4 border-b">Friday</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Object.keys(timetable).map((time) => (
//               <tr key={time}>
//                 <td className="py-2 px-4 border-b">{time}</td>
//                 {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
//                   (day) => (
//                     <Droppable
//                       droppableId={`${time}-${day}`}
//                       key={`${time}-${day}`}
//                     >
//                       {(provided) => (
//                         <td
//                           ref={provided.innerRef}
//                           {...provided.droppableProps}
//                           className="py-2 px-4 border-b"
//                         >
//                           {timetable[time][day].map((class_, index) => (
//                             <Draggable
//                               key={class_.id}
//                               draggableId={class_.id}
//                               index={index}
//                             >
//                               {(provided) => (
//                                 <div
//                                   ref={provided.innerRef}
//                                   {...provided.draggableProps}
//                                   {...provided.dragHandleProps}
//                                   className="mb-2 p-2 bg-gray-100 rounded-lg shadow"
//                                 >
//                                   <h5 className="font-semibold">
//                                     {class_.name}
//                                   </h5>
//                                   <p className="text-gray-600">
//                                     Subject: {class_.subject}
//                                   </p>
//                                   <p className="text-gray-600">
//                                     Teacher:{" "}
//                                     {
//                                       teachers.find(
//                                         (t) => t.id === class_.teacherId
//                                       )?.name
//                                     }
//                                   </p>
//                                   <p className="text-gray-600">
//                                     Grade: {class_.grade}
//                                   </p>
//                                   <p className="text-gray-600">
//                                     Description: {class_.description}
//                                   </p>
//                                   <p className="text-gray-600">
//                                     Students:{" "}
//                                     {class_.students
//                                       .map(
//                                         (id) =>
//                                           students.find((s) => s.id === id)
//                                             ?.name
//                                       )
//                                       .join(", ")}
//                                   </p>
//                                 </div>
//                               )}
//                             </Draggable>
//                           ))}
//                           {provided.placeholder}
//                         </td>
//                       )}
//                     </Droppable>
//                   )
//                 )}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </DragDropContext>
//     </div>
//   );
// };

// export default TimetableEditor;
