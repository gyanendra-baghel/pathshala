import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Plus, Users, Book, GraduationCap } from "lucide-react";
import { UserRole } from "../../utils/types";

const Classroom: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { subjects } = useSelector((state: RootState) => state.subject);

  if (!user) return <Navigate to="/login" />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Classes</h1>
          <p className="text-gray-500 mt-1">
            Manage your subjects and grade assignments
          </p>
        </div>

        {[UserRole.MAIN_ADMIN, UserRole.TEACHER].includes(user.role) && (
          <div className="flex flex-wrap gap-3">
            <Link
              to="/classes/add-subject"
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition-colors focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Subject
            </Link>

            <Link
              to="/classes/add"
              className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg shadow hover:bg-emerald-700 transition-colors focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Grade
            </Link>
          </div>
        )}
      </div>

      {subjects.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-12 text-center">
          <GraduationCap className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            No subjects yet
          </h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Get started by adding your first subject to organize your classes
            and students
          </p>
          <Link
            to="/classes/add-subject"
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Your First Subject
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject) => (
            <div
              key={subject.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {subject.name}
                  </h3>
                  <div className="bg-indigo-50 text-indigo-700 text-xs font-medium px-2.5 py-1 rounded-full">
                    {subject.gradeId || "No Grade"}
                  </div>
                </div>

                <div className="text-gray-600 mt-2 line-clamp-1">
                  {subject.description}
                </div>

                <div className="mt-4 flex items-center">
                  <Users className="w-4 h-4 text-gray-400 mr-1.5" />
                  <span className="text-sm text-gray-500">
                    {subject.students?.length || 0} Students
                  </span>
                </div>
              </div>

              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <div className="flex flex-wrap gap-3 justify-between">
                  <Link
                    to={`/c/${subject.id}`}
                    className="inline-flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                  >
                    <Book className="w-4 h-4 mr-1.5" />
                    View Details
                  </Link>

                  {[UserRole.MAIN_ADMIN, UserRole.TEACHER].includes(
                    user.role
                  ) && (
                    <div className="flex gap-4">
                      <Link
                        to={`/c/${subject.id}/students`}
                        className="text-gray-600 hover:text-indigo-600 text-sm font-medium transition-colors"
                      >
                        Students
                      </Link>
                      <Link
                        to={`/c/${subject.id}/teachers`}
                        className="text-gray-600 hover:text-indigo-600 text-sm font-medium transition-colors"
                      >
                        Teachers
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Classroom;
