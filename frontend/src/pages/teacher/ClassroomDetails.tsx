import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { ClassWork } from "../../utils/types";
import { Calendar, Clock, Paperclip } from "lucide-react";

const ClassroomDetails: React.FC = () => {
  const { classId } = useParams<{ classId: string }>();
  const { classes, students, classWork, addClassWork } = useAppContext();
  const classroom = classes.find((c) => c.id === classId);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"assignment" | "material">("assignment");
  const [dueDate, setDueDate] = useState("");
  const [points, setPoints] = useState<number | undefined>(undefined);
  const [attachments, setAttachments] = useState<string[]>([]);

  if (!classroom) {
    return <div>Classroom not found</div>;
  }

  const handleAddClassWork = (e: React.FormEvent) => {
    e.preventDefault();
    const newClassWork: ClassWork = {
      id: Date.now().toString(),
      classId: classroom.id,
      title,
      description,
      type,
      dueDate,
      points,
      attachments,
      createdAt: new Date().toISOString(),
    };
    addClassWork(newClassWork);
    setTitle("");
    setDescription("");
    setType("assignment");
    setDueDate("");
    setPoints(undefined);
    setAttachments([]);
  };

  const classStudents = students.filter((student) =>
    classroom.students.includes(student.id)
  );

  const classWorks = classWork.filter((cw) => cw.classId === classroom.id);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{classroom.name}</h2>
      <p className="text-gray-600">{classroom.description}</p>
      <div>
        <h3 className="text-xl font-semibold mb-4">Students</h3>
        <ul className="space-y-2">
          {classStudents.map((student) => (
            <li key={student.id} className="p-4 border rounded-lg bg-white">
              {student.name}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-4">Add Work/Task</h3>
        <form onSubmit={handleAddClassWork} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border rounded-lg"
              rows={4}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Type
            </label>
            <select
              value={type}
              onChange={(e) =>
                setType(e.target.value as "assignment" | "material")
              }
              className="mt-1 block w-full px-4 py-2 border rounded-lg"
              required
            >
              <option value="assignment">Assignment</option>
              <option value="material">Material</option>
            </select>
          </div>
          {type === "assignment" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Due Date
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Points
                </label>
                <input
                  type="number"
                  value={points}
                  onChange={(e) => setPoints(parseInt(e.target.value))}
                  className="mt-1 block w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
            </>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Attachments
            </label>
            <input
              type="file"
              multiple
              onChange={(e) =>
                setAttachments(
                  Array.from(e.target.files || []).map((file) => file.name)
                )
              }
              className="mt-1 block w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Add Work/Task
            </button>
          </div>
        </form>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-4">Classwork</h3>
        <div className="grid gap-4">
          {classWorks.map((work) => (
            <div key={work.id} className="bg-white p-4 rounded-lg shadow">
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
    </div>
  );
};

export default ClassroomDetails;
