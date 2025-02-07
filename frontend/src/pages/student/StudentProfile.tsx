import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const StudentProfile: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const student = {
    id: "1",
    name: "John Doe",
    age: 20,
    grade: "10th",
    rollNumber: "1001",
    email: "gyan@gmail.com",
  };
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(student.name);
  const [grade, setGrade] = useState(student.grade);
  const [rollNumber, setRollNumber] = useState(student.rollNumber);
  const [email, setEmail] = useState(user?.email);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // TODO: Update student data
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Student Profile</h2>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <label className="w-32 font-medium">Name:</label>
          {isEditing ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg"
            />
          ) : (
            <span className="flex-1">{name}</span>
          )}
        </div>
        <div className="flex items-center gap-4">
          <label className="w-32 font-medium">Grade:</label>
          {isEditing ? (
            <input
              type="text"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg"
            />
          ) : (
            <span className="flex-1">{grade}</span>
          )}
        </div>
        <div className="flex items-center gap-4">
          <label className="w-32 font-medium">Roll Number:</label>
          {isEditing ? (
            <input
              type="text"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg"
            />
          ) : (
            <span className="flex-1">{rollNumber}</span>
          )}
        </div>
        <div className="flex items-center gap-4">
          <label className="w-32 font-medium">Email:</label>
          {isEditing ? (
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg"
            />
          ) : (
            <span className="flex-1">{email}</span>
          )}
        </div>
        <div className="flex items-center gap-4">
          <label className="w-32 font-medium">Age:</label>
          <span className="flex-1">{student.age}</span>
        </div>
        <div className="flex justify-end gap-4 mt-6">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Save
            </button>
          ) : (
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
