import { useEffect, useState } from "react";
import { Trash2, UserPlus } from "lucide-react";
import { useParams } from "react-router-dom";
import API from "../../utils/api";
import { Student, SubjectStudent } from "../../utils/types";

const ManageStudent = () => {
  const { classId } = useParams<{ classId: string }>();
  const [students, setStudents] = useState<Student[]>([]);
  // const [requests, setRequests] = useState([]);
  const [studentId, setStudentId] = useState("");

  useEffect(() => {
    // Fetch students from the API
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

  const addStudent = async () => {
    if (!studentId) return;
    try {
      const response = await API.post(`/subjects/${classId}/students`, {
        studentId: parseInt(studentId),
      });

      if (response.status === 201) {
        const student = response.data.student as Student;
        console.log("Students", student);
        setStudents([...students, student]);
        setStudentId("");
      }
    } catch (error) {
      console.error("Error adding student", error);
    }
  };

  // Remove a student
  const removeStudent = async (studentId?: string) => {
    if (!studentId) return;
    try {
      const response = await API.delete(
        `/subjects/${classId}/students/${studentId}`
      );
      if (response.status === 204) {
        setStudents(students.filter((student) => student.id !== studentId));
      }
    } catch (error) {
      console.error("Error removing student", error);
    }
  };

  // Accept student request
  // const acceptRequest = (id) => {
  //   const student = requests.find((req) => req.id === id);
  //   setStudents([...students, student]);
  //   setRequests(requests.filter((req) => req.id !== id));
  // };

  // // Reject student request
  // const rejectRequest = (id) => {
  //   setRequests(requests.filter((req) => req.id !== id));
  // };

  if (!classId) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="max-w-3xl mx-auto bg-white p-5 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-4">Classroom Management</h2>
          <p className="text-red-500">Classroom ID not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-5 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">Classroom Management</h2>
        <div className="flex items-center gap-3 mb-4">
          <input
            type="text"
            placeholder="Student Id"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="w-full p-2 border rounded-md mb-4"
          />

          <button
            onClick={addStudent}
            className="mb-4 flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            <UserPlus size={18} /> Add
          </button>
        </div>
        {/* Student List */}
        <h3 className="text-lg font-semibold mb-2">Enrolled Students</h3>
        <div className="space-y-3">
          {students.length === 0 && (
            <p className="text-gray-500">No students enrolled</p>
          )}
          {students.map((student) => (
            <div
              key={student.id}
              className="flex items-center justify-between p-3 border rounded-lg bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <img
                  src={student.photo}
                  alt={student.name}
                  className="w-10 h-10 rounded-full border"
                />
                <div>
                  <p className="font-semibold">
                    {student.firstName + " " + student.lastName}
                  </p>
                  <p className="text-gray-500 text-sm">ID: {student.id}</p>
                  <p className="text-gray-500 text-sm">
                    Enrollment No: {student.rollNumber}
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeStudent(student.id)}
                className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        {/* Join Requests */}
        {/* {requests.length > 0 && (
          <>
            <h3 className="text-lg font-semibold mt-6 mb-2">Join Requests</h3>
            <div className="space-y-3">
              {requests.map((req) => (
                <div
                  key={req.id}
                  className="flex items-center justify-between p-3 border rounded-lg bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={req.image}
                      alt={req.name}
                      className="w-10 h-10 rounded-full border"
                    />
                    <div>
                      <p className="font-semibold">{req.name}</p>
                      <p className="text-gray-500 text-sm">
                        Roll No: {req.rollNo}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => acceptRequest(req.id)}
                      className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
                    >
                      <UserCheck size={18} />
                    </button>
                    <button
                      onClick={() => rejectRequest(req.id)}
                      className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                    >
                      <UserX size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )} */}
      </div>
    </div>
  );
};

export default ManageStudent;
