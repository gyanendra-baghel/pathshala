import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ClassWork, Subject } from "../../utils/types";
import { Calendar, Clock, Paperclip } from "lucide-react";
import API from "../../utils/api";
import CollapsibleCard from "../../components/ui/CollapsibleCard";

const ClassroomDetails: React.FC = () => {
  const { classId } = useParams<{ classId: string }>();
  const [classroom, setClassroom] = useState<Subject | null>(null);
  const [classWorks, setClassWorks] = useState<ClassWork[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"ASSIGNMENT" | "MATERIAL">("ASSIGNMENT");
  const [dueDate, setDueDate] = useState("");
  const [attachments, setAttachments] = useState<FileList | null>(null);

  useEffect(() => {
    const fetchClassroom = async () => {
      const response = await API.get(`/subjects/${classId}`);
      if (response.status === 200) {
        setClassroom(response.data);
        setClassWorks(response.data.sobjectWorks);
      }
    };
    fetchClassroom();
  }, [classId]);

  if (!classId || !classroom) {
    return <div>Classroom not found</div>;
  }

  const handleAddClassWork = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!classId) return;

    // Create a FormData object
    const formData = new FormData();
    formData.append("classId", classId);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("type", type);

    if (type === "ASSIGNMENT") {
      formData.append("dueDate", dueDate);
    }

    // Append files to FormData
    if (attachments) {
      Array.from(attachments).forEach((file) => {
        formData.append("attachments", file);
      });
    }

    try {
      const response = await API.post(
        `/subjects/${classId}/subjectworks`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        setClassWorks([...classWorks, response.data]);
        setTitle("");
        setDescription("");
        setType("ASSIGNMENT");
        setDueDate("");
        setAttachments(null);
      }
    } catch (error) {
      console.error("Error adding classwork:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{classroom.name}</h2>
        <Link to={`/c/${classroom.id}/attendance`}>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Attendance
          </button>
        </Link>
      </div>
      <p className="text-gray-600">{classroom.description}</p>
      <CollapsibleCard title="Add Work/Task">
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
                setType(e.target.value as "ASSIGNMENT" | "MATERIAL")
              }
              className="mt-1 block w-full px-4 py-2 border rounded-lg"
              required
            >
              <option value="ASSIGNMENT">Assignment</option>
              <option value="MATERIAL">Material</option>
            </select>
          </div>
          {type === "ASSIGNMENT" && (
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
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Attachments
            </label>
            <input
              type="file"
              multiple
              onChange={(e) => setAttachments(e.target.files)}
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
      </CollapsibleCard>
      <div>
        <h3 className="text-xl font-semibold mb-4">Classwork</h3>
        <div className="grid gap-4">
          {classWorks.map((work) => (
            <div key={work.id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium">{work.title}</h4>
                  <p className="text-gray-600 mt-1">{work.description}</p>
                  {work.type === "ASSIGNMENT" && (
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Due: {work.dueDate}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {work.points || 0} points
                      </span>
                    </div>
                  )}
                  {work.attachments.length > 0 && (
                    <div className="flex items-center gap-2 mt-2">
                      {work.attachments.map((attachment, index) => (
                        <a
                          href={attachment}
                          key={attachment}
                          target="_blank"
                          className="flex items-center gap-1 text-blue-500 hover:text-blue-700"
                          download
                        >
                          <Paperclip className="w-4 h-4" />
                          <span className="text-sm">
                            attachment {index + 1}
                          </span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    work.type === "ASSIGNMENT"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {work.type === "ASSIGNMENT" ? "Assignment" : "Material"}
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
