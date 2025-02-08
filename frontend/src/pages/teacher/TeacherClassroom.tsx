import { Calendar, Clock, Paperclip, Plus } from "lucide-react";
import React from "react";
import { useAppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const TeacherClassroom: React.FC = () => {
  const { classWork } = useAppContext();
  const { subjects } = useSelector((state: RootState) => state.subject);
  const getClassWork = (classId: string) => {
    return classWork.filter((cw) => cw.classId === classId);
  };

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
                <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                  Manage Students
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {subjects.map((subject) => (
        <div key={subject.id} className="mt-8 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">
              {subject.name} - Classwork
            </h3>
            <div className="flex gap-2">
              <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                <Plus className="w-4 h-4 mr-2" />
                Assignment
              </button>
              <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Material
              </button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {getClassWork(subject.id).map((work) => (
              <div key={work.id} className="p-4 border-b last:border-b-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium">{work.title}</h4>
                    <p className="text-gray-600 mt-1">{work.description}</p>
                    {work.type === "assignment" && (
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          Due: {work.dueDate}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {work.points} points
                        </span>
                      </div>
                    )}
                    {work.attachments.length > 0 && (
                      <div className="flex items-center gap-2 mt-2">
                        <Paperclip className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-500">
                          {work.attachments.length} attachment
                          {work.attachments.length !== 1 ? "s" : ""}
                        </span>
                      </div>
                    )}
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      work.type === "assignment"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {work.type === "assignment" ? "Assignment" : "Material"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeacherClassroom;
