import React, { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import { Attendance, Student, SubjectStudent } from "../../utils/types";
import API from "../../utils/api";
import { useParams } from "react-router-dom";

const ClassAttendence: React.FC = () => {
  const { classId } = useParams<{ classId: string }>();
  const [students, setStudents] = useState<Student[]>([]);
  const today = new Date().toISOString().split("T")[0];
  const attendance: Attendance[] = [];

  useEffect(() => {
    const fetchStudents = async () => {
      if (!classId) return;
      try {
        const response = await API.get(`/subjects/${classId}/students`);
        if (response.status == 200) {
          if (response.data.length > 0) {
            const students = response.data.map(
              (data: SubjectStudent) => data.student
            );
            console.log("Students", students);
            setStudents(students);
          }
        }
      } catch (error) {
        console.error("Error fetching students", error);
      }
    };
    fetchStudents();
  }, [classId]);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Mark Today's Attendance</h2>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Student Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Roll Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Today's Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student) => {
              const todayRecord = attendance.find(
                (a) => a.studentId === student.id && a.date === today
              );
              return (
                <tr key={student.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {student.firstName} {student.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {student.rollNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        todayRecord?.status === "present"
                          ? "bg-green-100 text-green-800"
                          : todayRecord?.status === "absent"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {todayRecord?.status || "Not Marked"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      // onClick={() => toggleAttendance(student.id)}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {todayRecord?.status === "present" ? (
                        <X className="w-4 h-4 mr-1" />
                      ) : (
                        <Check className="w-4 h-4 mr-1" />
                      )}
                      {todayRecord?.status === "present"
                        ? "Mark Absent"
                        : "Mark Present"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassAttendence;
