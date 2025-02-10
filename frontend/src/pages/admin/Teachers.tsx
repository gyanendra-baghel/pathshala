import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Teacher } from "../../utils/types";
import API from "../../utils/api";
import { ExternalLink, Plus } from "lucide-react";

const Teachers: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  // const [filterSubject, setFilterSubject] = useState("");
  const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await API.get("/teachers");
        if (response.status === 200) {
          setFilteredTeachers(response.data);
        }
      } catch (error) {
        console.log("Error fetching teachers", error);
      }
    };
    fetchTeachers();
  }, [searchQuery]);

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <div className="mb-4 flex items-center justify-center gap-4">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-96 px-4 py-2 border rounded-lg"
          />
          {/* <select
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            className="p-2 border rounded-lg"
          >
            <option value="">All Subjects</option>
            <option value="Math">Math</option>
            <option value="Science">Science</option>
            <option value="English">English</option>
          </select> */}
        </div>
        <Link
          to="/teachers/add"
          className="fixed bottom-8 right-8 text-center bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700"
        >
          <Plus className="w-8 h-8" />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
              <Link to={`/teacher/${teacher.id}`}>
                <ExternalLink className="text-blue-600" />
              </Link>
            </div>
            {teacher.subjects && (
              <div className="mb-4 flex items-center justify-between">
                <p className="text-gray-500">Subject:</p>
                <p className="text-gray-700">{teacher.subjects.join(", ")}</p>
              </div>
            )}
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
