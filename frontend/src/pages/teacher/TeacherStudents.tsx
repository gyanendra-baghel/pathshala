import React from "react";
import { useAppContext } from "../../context/AppContext";

const TeacherStudents: React.FC = () => {
  const { students } = useAppContext();
  return (
    <>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search students..."
            className="p-2 border rounded w-1/2"
          />
          <div className="flex items-center space-x-4">
            <select className="p-2 border rounded">
              <option>All Classes</option>
            </select>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              + Add Student
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {students.map((student) => (
            <div
              key={student.id}
              className="bg-white p-4 rounded shadow-sm border"
            >
              <div className="flex items-center mb-4">
                <img
                  src="https://placehold.co/50x50"
                  alt="Student avatar"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h2 className="text-lg font-semibold">{student.name}</h2>
                  <p className="text-gray-500">ID: {student.id}</p>
                </div>
                <div className="ml-auto">
                  <i className="fas fa-ellipsis-v text-gray-500"></i>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-gray-500">Class:</p>
                <p className="text-gray-700">{student.class}</p>
              </div>
              <div className="mb-4">
                <p className="text-gray-500">Attendance:</p>
                <p className={`${student.attendanceColor}`}>
                  {student.attendance}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-gray-500">Average Grade:</p>
                <p className={`${student.gradeColor}`}>{student.grade}</p>
              </div>
              <div className="flex space-x-2">
                <button className="border border-blue-500 text-blue-500 px-4 py-2 rounded">
                  View Profile
                </button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                  Contact Parent
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mt-4">
          <p className="text-gray-500">Showing 1 to 3 of 30 students</p>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border rounded">Previous</button>
            <button className="px-3 py-1 border rounded bg-blue-500 text-white">
              1
            </button>
            <button className="px-3 py-1 border rounded">2</button>
            <button className="px-3 py-1 border rounded">3</button>
            <button className="px-3 py-1 border rounded">Next</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherStudents;
