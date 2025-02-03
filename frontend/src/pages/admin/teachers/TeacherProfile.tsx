import React, { useState } from "react";
import { useAppContext } from "../../../context/AppContext";
import { useParams } from "react-router-dom";
import { TeacherData } from "../../../utils/types";

const TeacherProfile: React.FC = () => {
  // const { teacherId } = useParams<{ teacherId: string }>();

  // const { teachers } = useAppContext();
  const teacher: TeacherData = {
    personalInfo: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      dateOfBirth: "1985-06-15",
      gender: "male",
      photo: undefined, // File object for photo if available
    },
    professionalInfo: {
      employeeId: "EMP12345",
      joiningDate: "2020-08-01",
      qualification: "M.Sc. in Mathematics",
      experience: 10,
      specialization: ["Algebra", "Calculus"],
      department: "Mathematics",
      designation: "Senior Teacher",
      subjects: ["Mathematics", "Statistics"],
    },
    address: {
      street: "123 Main St",
      city: "Springfield",
      state: "IL",
      zipCode: "62704",
      country: "USA",
    },
    documents: {
      resume: undefined, // File object for resume if available
      certificates: [], // Array of File objects for certificates if available
      idProof: undefined, // File object for ID proof if available
    },
    credentials: {
      email: "john.doe@example.com",
      password: "securePassword123",
      confirmPassword: "securePassword123",
    },
  };

  // const [isEditing, setIsEditing] = useState(false);
  // const [name, setName] = useState(teacher?.name || "");
  // const [email, setEmail] = useState(teacher?.email || "");
  // const [subjects, setSubjects] = useState(teacher?.subjects.join(", ") || "");

  // if (!teacherId || !teacher) {
  //   return <div>Teacher not found</div>;
  // }

  // const handleEdit = () => {
  //   setIsEditing(true);
  // };

  // const handleSave = () => {
  //   setIsEditing(false);
  //   // You can add API call here to update the teacher data
  //   console.log("Updated teacher data:", {
  //     name,
  //     email,
  //     subjects: subjects.split(",").map((subject) => subject.trim()),
  //   });
  // const updatedTeacher: Teacher = {
  //       ...currentTeacher,
  //       name,
  //       email,
  //       subjects: subjects.split(",").map((subject) => subject.trim()),
  //     };
  //     updateTeacher(updatedTeacher);

  // const handleRemoveTeacher = (id: string) => {
  //   removeTeacher(id);
  // };
  // };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Teacher Profile</h1>

      {/* Personal Information */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
        <div className="flex items-center gap-6 mb-4">
          {teacher.personalInfo.photoUrl && (
            <img
              src={teacher.personalInfo.photoUrl}
              alt="Profile Photo"
              className="w-24 h-24 rounded-full object-cover border"
            />
          )}
          <div>
            <p>
              <strong>Name:</strong> {teacher.personalInfo.firstName}{" "}
              {teacher.personalInfo.lastName}
            </p>
            <p>
              <strong>Email:</strong> {teacher.personalInfo.email}
            </p>
            <p>
              <strong>Phone:</strong> {teacher.personalInfo.phone}
            </p>
            <p>
              <strong>Date of Birth:</strong> {teacher.personalInfo.dateOfBirth}
            </p>
            <p>
              <strong>Gender:</strong> {teacher.personalInfo.gender}
            </p>
          </div>
        </div>
      </section>

      {/* Professional Information */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Professional Information</h2>
        <p>
          <strong>Employee ID:</strong> {teacher.professionalInfo.employeeId}
        </p>
        <p>
          <strong>Joining Date:</strong> {teacher.professionalInfo.joiningDate}
        </p>
        <p>
          <strong>Qualification:</strong>{" "}
          {teacher.professionalInfo.qualification}
        </p>
        <p>
          <strong>Experience:</strong> {teacher.professionalInfo.experience}{" "}
          years
        </p>
        <p>
          <strong>Specialization:</strong>{" "}
          {teacher.professionalInfo.specialization.join(", ")}
        </p>
        <p>
          <strong>Department:</strong> {teacher.professionalInfo.department}
        </p>
        <p>
          <strong>Designation:</strong> {teacher.professionalInfo.designation}
        </p>
        <p>
          <strong>Subjects:</strong>{" "}
          {teacher.professionalInfo.subjects.join(", ")}
        </p>
      </section>

      {/* Address Information */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Address</h2>
        <p>
          <strong>Street:</strong> {teacher.address.street}
        </p>
        <p>
          <strong>City:</strong> {teacher.address.city}
        </p>
        <p>
          <strong>State:</strong> {teacher.address.state}
        </p>
        <p>
          <strong>ZIP Code:</strong> {teacher.address.zipCode}
        </p>
        <p>
          <strong>Country:</strong> {teacher.address.country}
        </p>
      </section>

      {/* Documents */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Documents</h2>
        {teacher.documents.resumeUrl && (
          <p>
            <strong>Resume:</strong>{" "}
            <a
              href={teacher.documents.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              View Resume
            </a>
          </p>
        )}
        {teacher.documents.certificatesUrls &&
          teacher.documents.certificatesUrls.length > 0 && (
            <p>
              <strong>Certificates:</strong>{" "}
              {teacher.documents.certificatesUrls.map((url, index) => (
                <a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline mr-2"
                >
                  Certificate {index + 1}
                </a>
              ))}
            </p>
          )}
        {teacher.documents.idProofUrl && (
          <p>
            <strong>ID Proof:</strong>{" "}
            <a
              href={teacher.documents.idProofUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              View ID Proof
            </a>
          </p>
        )}
      </section>
    </div>
  );
};

export default TeacherProfile;
