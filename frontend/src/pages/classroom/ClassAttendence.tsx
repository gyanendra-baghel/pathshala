import React, { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import { Attendance, Student } from "../../utils/types";
import API from "../../utils/api";
import { useParams } from "react-router-dom";

const ClassAttendance: React.FC = () => {
  const { classId } = useParams<{ classId: string }>();
  const [students, setStudents] = useState<Student[]>([]);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const today = new Date().toISOString().split("T")[0];
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      if (!classId) return;
      try {
        const response = await API.get(`/subjects/${classId}/students`);
        if (response.status === 200 && response.data.length > 0) {
          setStudents(response.data);
        }
      } catch (error) {
        console.error("Error fetching students", error);
      }
    };

    const fetchTodayAttendance = async () => {
      if (!classId) return;
      try {
        const response = await API.get(
          `/attendance/subject/${classId}?date=${today}`
        );
        if (response.status === 200) {
          setAttendance(response.data);
        }
      } catch (error) {
        console.error("Error fetching attendance", error);
      }
    };

    fetchStudents();
    fetchTodayAttendance();
  }, [classId, today]);

  const toggleAttendance = async (studentId: string | undefined) => {
    if (!studentId || !classId) return;
    try {
      // Find existing attendance record for this student today
      const existingRecord = attendance.find(
        (a) => a.studentId === studentId && a.date === today
      );

      let updatedAttendance: Attendance;

      if (existingRecord) {
        // Toggle status
        const newStatus =
          existingRecord.status === "PRESENT" ? "ABSENT" : "PRESENT";

        // Update via API
        const response = await API.put(`/attendance/${existingRecord.id}`, {
          status: newStatus,
        });

        if (response.status == 200) {
          updatedAttendance = {
            ...existingRecord,
            status: newStatus,
          };
        }
      } else {
        // Create new attendance record
        const response = await API.post("/attendance", {
          studentId,
          subjectId: parseInt(classId),
          date: today,
          status: "PRESENT",
        });

        updatedAttendance = response.data;
      }

      // Update local state
      setAttendance((prevAttendance) => {
        const filteredAttendance = prevAttendance.filter(
          (a) => a.studentId !== studentId || a.date !== today
        );
        return [...filteredAttendance, updatedAttendance];
      });
    } catch (error) {
      console.error("Error updating attendance", error);
    }
  };

  const submitAttendance = async () => {
    setIsSubmitting(true);
    try {
      // Ensure all students have an attendance record
      const missingAttendance = students
        .filter(
          (student) =>
            !attendance.some(
              (a) => a.studentId === student.id && a.date === today
            )
        )
        .map((student) => ({
          studentId: student.id,
          classId,
          date: today,
          status: "ABSENT",
        }));

      if (missingAttendance.length > 0) {
        await API.post("/attendance/bulk", missingAttendance);
      }
    } catch (error) {
      console.error("Error submitting attendance", error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
                (a) => a.studentId === student.id
              );
              return (
                <tr key={student.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {student.firstName} {student.lastName} {student.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {student.rollNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        todayRecord?.status === "PRESENT"
                          ? "bg-green-100 text-green-800"
                          : todayRecord?.status === "ABSENT"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {todayRecord?.status || "Not Marked"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleAttendance(student.id)}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {todayRecord?.status === "PRESENT" ? (
                        <X className="w-4 h-4 mr-1" />
                      ) : (
                        <Check className="w-4 h-4 mr-1" />
                      )}
                      {todayRecord?.status === "PRESENT"
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
      <div className="flex justify-end mt-4">
        <button
          onClick={submitAttendance}
          disabled={isSubmitting}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Submit Attendance"}
        </button>
      </div>
    </div>
  );
};

export default ClassAttendance;
