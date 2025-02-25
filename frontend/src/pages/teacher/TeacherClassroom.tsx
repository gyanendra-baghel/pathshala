import { Plus } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const TeacherClassroom: React.FC = () => {
  const { subjects } = useSelector((state: RootState) => state.subject);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Classes</h2>
        <div className="flex justify-between items-center space-x-2">
          <Link
            to="/classes/add-subject"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Subject
          </Link>
          <Link
            to="/classes/add"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Grade
          </Link>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {subjects.map((subject) => (
          <div
            key={subject.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold">{subject.name}</h3>
              <p className="text-gray-600 mt-1">{subject.description}</p>

              <div className="mt-4">
                {subject.gradeId && (
                  <p className="text-sm text-gray-500">
                    Grade: {subject.gradeId}
                  </p>
                )}
                {subject.students && (
                  <p className="text-sm text-gray-500">
                    Students: {subject.students.length}
                  </p>
                )}
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t">
              <div className="flex gap-4">
                <Link to={`/c/${subject.id}`}>
                  <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                    View Details
                  </button>
                </Link>
                <Link to={`/c/${subject.id}/students`}>
                  <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                    Manage Students
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherClassroom;
