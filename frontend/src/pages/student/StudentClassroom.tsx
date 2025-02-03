import React from "react";
import { useAppContext } from "../../context/AppContext";

const StudentClassroom: React.FC = () => {
  const { classes, teachers } = useAppContext();
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">My Classes</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {classes
          .filter((c) => c.students.includes("1"))
          .map((class_) => (
            <div
              key={class_.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold">{class_.name}</h3>
                <p className="text-gray-600 mt-1">{class_.description}</p>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">Grade: {class_.grade}</p>
                  <p className="text-sm text-gray-500">
                    Teacher:{" "}
                    {teachers.find((t) => t.id === class_.teacherId)?.name}
                  </p>
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-50 border-t">
                <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                  View Classwork
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default StudentClassroom;
