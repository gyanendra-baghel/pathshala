import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import API from "../../utils/api";

const Students: React.FC = () => {
  const { students } = useAppContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterGrade, setFilterGrade] = useState("");
  const [filteredStudents, setFilteredStudents] = useState(students);

  useEffect(() => {
    async function fetchData() {
      const response = await API.get("/students");
      if (response.status === 200) {
        setFilteredStudents(response.data);
      }
    }
    fetchData();
  }, [searchQuery]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="mb-4 flex items-center justify-center gap-4">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-96 px-4 py-2 border rounded-lg"
          />
          <select
            value={filterGrade}
            onChange={(e) => setFilterGrade(e.target.value)}
            className="p-2 border rounded-lg"
          >
            <option value="">All Grades</option>
            <option value="10th">10th</option>
            <option value="11th">11th</option>
            <option value="12th">12th</option>
            {/* Add more grade options as needed */}
          </select>
        </div>
        <Link
          to="/students/add"
          className="text-center mt-4 block bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          Add Student
        </Link>
      </div>
      <div className="grid grid-cols-4 md:grid-cols-4 gap-4">
        {filteredStudents.map((student) => (
          <div
            key={student.id}
            className="bg-white p-4 rounded shadow-sm border max-w-96"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <img
                  src="https://placehold.co/50x50"
                  alt="Student profile"
                  className="rounded-full w-12 h-12 mr-4"
                />
                <div>
                  <h2 className="text-lg font-semibold">
                    {student.firstName + " " + student.lastName}
                  </h2>
                  <p className="text-gray-500">ID: {student.id}</p>
                </div>
              </div>
              <Link to={`/student/${student.id}`}>
                <ExternalLink className="text-blue-600" />
              </Link>
            </div>
            {student.grade && (
              <div className="mb-4 flex items-center justify-between">
                <p className="text-gray-500">Class:</p>
                <p className="text-gray-700">{student.grade.name}</p>
              </div>
            )}
            <div className="mb-4 flex items-center justify-between">
              <p className="text-gray-500">Attendance:</p>
              <p className={` text-lg`}>A+</p>
            </div>
            <div className="flex space-x-2"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Students;
