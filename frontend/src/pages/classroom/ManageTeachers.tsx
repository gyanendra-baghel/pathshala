import { useEffect, useState } from "react";
import { Trash2, UserPlus } from "lucide-react";
import { useParams } from "react-router-dom";
import API from "../../utils/api";
import { Teacher } from "../../utils/types";

const ManageTeacher = () => {
  const { classId } = useParams<{ classId: string }>();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [teacherId, setTeacherId] = useState<string>("");

  useEffect(() => {
    // Fetch students from the API
    const fetchTeachers = async () => {
      if (!classId) return;
      try {
        const response = await API.get(`/subjects/${classId}/teachers`);
        if (response.status == 200) {
          setTeachers(response.data);
        }
      } catch (error) {
        console.error("Error fetching students", error);
      }
    };
    fetchTeachers();
  }, [classId]);

  const addTeacher = async () => {
    if (!teacherId) return;
    try {
      const response = await API.post(`/subjects/${classId}/teachers`, {
        teacherId: parseInt(teacherId),
      });

      if (response.status === 201) {
        const teacher = response.data.teacher as Teacher;
        setTeachers([...teachers, teacher]);
        setTeacherId("");
      }
    } catch (error) {
      console.error("Error adding student", error);
    }
  };

  // Remove a teacher
  const removeTeacher = async (teacherId?: string) => {
    if (!teacherId) return;
    try {
      const response = await API.delete(
        `/subjects/${classId}/teachers/${teacherId}`
      );
      if (response.status === 204) {
        setTeachers(teachers.filter((teacher) => teacher.id !== teacherId));
      }
    } catch (error) {
      console.error("Error removing student", error);
    }
  };

  if (!classId) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="max-w-3xl mx-auto bg-white p-5 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-4">Classroom Management</h2>
          <p className="text-red-500">Classroom ID not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-5 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">Classroom Management</h2>
        <div className="flex items-center gap-3 mb-4">
          <input
            type="text"
            placeholder="Teacher Id"
            value={teacherId}
            onChange={(e) => setTeacherId(e.target.value)}
            className="w-full p-2 border rounded-md mb-4"
          />

          <button
            onClick={addTeacher}
            className="mb-4 flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            <UserPlus size={18} /> Add
          </button>
        </div>
        {/* Teachers List */}
        <h3 className="text-lg font-semibold mb-2">Enrolled Teachers</h3>
        <div className="space-y-3">
          {teachers.length === 0 && (
            <p className="text-gray-500">No teachers enrolled</p>
          )}
          {teachers.map((teacher) => (
            <div
              key={teacher.id}
              className="flex items-center justify-between p-3 border rounded-lg bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <div>
                  <p className="font-semibold">{teacher.name}</p>
                  <p className="text-gray-500 text-sm">ID: {teacher.id}</p>
                </div>
              </div>
              <button
                onClick={() => removeTeacher(teacher.id)}
                className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageTeacher;
