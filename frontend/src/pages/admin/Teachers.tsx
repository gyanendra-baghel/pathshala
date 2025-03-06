import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Teacher } from "../../utils/types";
import { Plus, User } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const TeacherCard: React.FC<{ teacher: Teacher }> = ({ teacher }) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow relative overflow-hidden">
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

      <Link to={`/teacher/${teacher.id}`}>
        <button className="w-full py-2 px-3 bg-indigo-50 text-indigo-600 rounded-md text-sm font-medium text-center hover:bg-indigo-100 transition-colors">
          View Profile
        </button>
      </Link>
    </div>
  );
};

const Teachers: React.FC = () => {
  const { teachers, loading } = useSelector(
    (state: RootState) => state.teacher
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    const filtered = teachers.filter((teacher: Teacher) =>
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTeachers(filtered);
  }, [teachers, searchQuery]);

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

      {loading ? (
        <div className="text-center text-gray-500">Loading teachers...</div>
      ) : filteredTeachers.length === 0 ? (
        <div className="text-center text-gray-500">No teachers found</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTeachers.map((teacher) => (
            <TeacherCard key={teacher.id} teacher={teacher} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Teachers;
