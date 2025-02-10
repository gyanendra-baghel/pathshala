import { useState } from "react";
import { Plus, Trash2, UserPlus, UserCheck, UserX } from "lucide-react";

const ManageStudent = () => {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Aman Gupta",
      rollNo: "21BCS045",
      image: "https://via.placeholder.com/50",
    },
    {
      id: 2,
      name: "Riya Sharma",
      rollNo: "21BCS078",
      image: "https://via.placeholder.com/50",
    },
  ]);

  const [requests, setRequests] = useState([
    {
      id: 3,
      name: "Rohan Verma",
      rollNo: "21BCS120",
      image: "https://via.placeholder.com/50",
    },
  ]);

  const [search, setSearch] = useState("");

  // Add a new student (for demo purposes, adds a fixed student)
  const addStudent = () => {
    const newStudent = {
      id: students.length + 1,
      name: "New Student",
      rollNo: `21BCS0${students.length + 1}`,
      image: "https://via.placeholder.com/50",
    };
    setStudents([...students, newStudent]);
  };

  // Remove a student
  const removeStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  // Accept student request
  const acceptRequest = (id) => {
    const student = requests.find((req) => req.id === id);
    setStudents([...students, student]);
    setRequests(requests.filter((req) => req.id !== id));
  };

  // Reject student request
  const rejectRequest = (id) => {
    setRequests(requests.filter((req) => req.id !== id));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-5 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">Classroom Management</h2>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border rounded-md mb-4"
        />

        {/* Add Student Button */}
        <button
          onClick={addStudent}
          className="mb-4 flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          <Plus size={18} /> Add Student
        </button>

        {/* Student List */}
        <h3 className="text-lg font-semibold mb-2">Enrolled Students</h3>
        <div className="space-y-3">
          {students
            .filter((s) => s.name.toLowerCase().includes(search.toLowerCase()))
            .map((student) => (
              <div
                key={student.id}
                className="flex items-center justify-between p-3 border rounded-lg bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={student.image}
                    alt={student.name}
                    className="w-10 h-10 rounded-full border"
                  />
                  <div>
                    <p className="font-semibold">{student.name}</p>
                    <p className="text-gray-500 text-sm">
                      Roll No: {student.rollNo}
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
        {requests.length > 0 && (
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
        )}
      </div>
    </div>
  );
};

export default ManageStudent;
