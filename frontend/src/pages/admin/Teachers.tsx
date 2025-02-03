import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";

const Teachers: React.FC = () => {
  const { teachers } = useAppContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSubject, setFilterSubject] = useState("");

  const filteredTeachers = teachers.filter((teacher) => {
    return (
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filterSubject === "" || teacher.subjects.includes(filterSubject))
    );
  });

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
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            className="p-2 border rounded-lg"
          >
            <option value="">All Subjects</option>
            <option value="Math">Math</option>
            <option value="Science">Science</option>
            <option value="English">English</option>
            {/* Add more subject options as needed */}
          </select>
        </div>
        <Link
          to="/admin/teachers/add"
          className="text-center mt-4 block bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          Add Teacher
        </Link>
      </div>
      <div className="grid grid-cols-4 md:grid-cols-4 gap-4">
        {filteredTeachers.map((teacher) => (
          <div
            key={teacher.id}
            className="bg-white p-4 rounded shadow-sm border max-w-96"
          >
            <div className="flex items-center mb-4">
              <img
                src="https://placehold.co/50x50"
                alt="Teacher profile"
                className="rounded-full w-12 h-12 mr-4"
              />
              <div>
                <h2 className="text-lg font-semibold">{teacher.name}</h2>
                <p className="text-gray-500">ID: {teacher.id}</p>
              </div>
              <div className="ml-auto">
                <i className="fas fa-ellipsis-v text-gray-500"></i>
              </div>
              <Link to={`/admin/teacher/${teacher.id}`}>
                <button className="border border-blue-500 text-blue-500 px-4 py-2 rounded">
                  View Profile
                </button>
              </Link>
            </div>
            <div className="mb-4 flex items-center justify-between">
              <p className="text-gray-500">Subject:</p>
              <p className="text-gray-700">{teacher.subjects.join(", ")}</p>
            </div>
            <div className="mb-4 flex items-center justify-between">
              <p className="text-gray-500">Experience:</p>
              <p className={` text-lg`}>4+ years</p>
            </div>
            <div className="flex space-x-2"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teachers;
