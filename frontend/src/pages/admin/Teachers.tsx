import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Teacher } from "../../utils/types";
import API from "../../utils/api";
import { Plus, User } from "lucide-react";

const TeacherCard: React.FC<{ teacher: Teacher }> = ({ teacher }) => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/teacher/${teacher.id}`);
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow relative">
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
          <User className="w-8 h-8 text-indigo-600" />
        </div>
        <div className="ml-2 flex-grow">
          <h2 className="text-lg font-semibold text-gray-800 truncate">
            {teacher.name}
          </h2>
          <p className="text-sm text-gray-500 truncate">ID: {teacher.id}</p>
        </div>
      </div>

      <div className="space-y-2 text-sm mb-4">
        {teacher.subjects && (
          <div className="flex justify-between">
            <span className="text-gray-500">Subjects:</span>
            <span className="text-gray-700 font-medium truncate max-w-[50%]">
              {teacher.subjects.join(", ")}
            </span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-gray-500">Experience:</span>
          <span className="text-gray-700 font-medium">4+ years</span>
        </div>
      </div>

      <button
        onClick={handleViewProfile}
        className="w-full flex items-center justify-center bg-blue-50 text-blue-600 hover:bg-blue-100 py-2 rounded-lg transition-colors"
      >
        <User className="mr-2" size={18} />
        View Profile
      </button>
    </div>
  );
};

const Teachers: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        setIsLoading(true);
        const response = await API.get("/teachers");
        if (response.status === 200) {
          const teachers = response.data;
          const filtered = teachers.filter((teacher: Teacher) =>
            teacher.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setFilteredTeachers(filtered);
        }
      } catch (error) {
        console.error("Error fetching teachers", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeachers();
  }, [searchQuery]);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search teachers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <Link
          to="/teachers/add"
          className="bg-blue-500 text-white p-2.5 rounded-full hover:bg-blue-600 transition-colors"
        >
          <Plus size={24} />
        </Link>
      </div>

      {isLoading ? (
        <div className="text-center text-gray-500">Loading teachers...</div>
      ) : filteredTeachers.length === 0 ? (
        <div className="text-center text-gray-500">No teachers found</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredTeachers.map((teacher) => (
            <TeacherCard key={teacher.id} teacher={teacher} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Teachers;
