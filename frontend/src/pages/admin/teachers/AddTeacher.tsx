import React, { useState } from "react";
import { TeacherData, ValidationErrors } from "../../../utils/types";

const AddTeacherPage: React.FC = () => {
  const [teacher, setTeacher] = useState<TeacherData>({
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      gender: "male",
    },
    professionalInfo: {
      employeeId: "",
      joiningDate: "",
      qualification: "",
      experience: 0,
      specialization: [],
      department: "",
      designation: "",
      subjects: [],
    },
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
    documents: {},
    credentials: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Available options for dropdowns
  const departments = [
    "Science",
    "Mathematics",
    "English",
    "History",
    "Computer Science",
  ];
  const designations = [
    "Teacher",
    "Senior Teacher",
    "Head of Department",
    "Coordinator",
  ];
  const subjects = [
    "Physics",
    "Chemistry",
    "Biology",
    "Mathematics",
    "English",
    "History",
    "Computer Science",
  ];

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    // Personal Info Validation
    if (!teacher.personalInfo.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!teacher.personalInfo.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!teacher.personalInfo.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(teacher.personalInfo.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!teacher.personalInfo.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    // Professional Info Validation
    if (!teacher.professionalInfo.employeeId.trim()) {
      newErrors.employeeId = "Employee ID is required";
    }
    if (!teacher.professionalInfo.joiningDate) {
      newErrors.joiningDate = "Joining date is required";
    }
    if (!teacher.professionalInfo.qualification.trim()) {
      newErrors.qualification = "Qualification is required";
    }
    if (!teacher.professionalInfo.department) {
      newErrors.department = "Department is required";
    }
    if (!teacher.professionalInfo.designation) {
      newErrors.designation = "Designation is required";
    }
    if (teacher.professionalInfo.subjects.length === 0) {
      newErrors.subjects = "At least one subject must be selected";
    }

    // Credentials Validation
    if (!teacher.credentials.password) {
      newErrors.password = "Password is required";
    } else if (teacher.credentials.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (teacher.credentials.password !== teacher.credentials.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    section: keyof TeacherData,
    field: string,
    value: string | string[] | number | File | File[]
  ) => {
    setTeacher((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleFileChange = (
    section: "personalInfo" | "documents",
    field: string,
    files: FileList | null
  ) => {
    if (!files) return;

    if (field === "certificates") {
      handleInputChange(section, field, Array.from(files));
    } else {
      handleInputChange(section, field, files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Created new teacher:", teacher);
      // Show success message or redirect
    } catch (error) {
      console.error("Error creating teacher:", error);
      // Show error message
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Add New Teacher</h1>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-4 py-2 border rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="teacherForm"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
          >
            {isSubmitting ? "Adding..." : "Add Teacher"}
          </button>
        </div>
      </div>

      <form id="teacherForm" onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                First Name *
              </label>
              <input
                type="text"
                value={teacher.personalInfo.firstName}
                onChange={(e) =>
                  handleInputChange("personalInfo", "firstName", e.target.value)
                }
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Last Name *
              </label>
              <input
                type="text"
                value={teacher.personalInfo.lastName}
                onChange={(e) =>
                  handleInputChange("personalInfo", "lastName", e.target.value)
                }
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email *</label>
              <input
                type="email"
                value={teacher.personalInfo.email}
                onChange={(e) =>
                  handleInputChange("personalInfo", "email", e.target.value)
                }
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone *</label>
              <input
                type="tel"
                value={teacher.personalInfo.phone}
                onChange={(e) =>
                  handleInputChange("personalInfo", "phone", e.target.value)
                }
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Date of Birth *
              </label>
              <input
                type="date"
                value={teacher.personalInfo.dateOfBirth}
                onChange={(e) =>
                  handleInputChange(
                    "personalInfo",
                    "dateOfBirth",
                    e.target.value
                  )
                }
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Gender</label>
              <select
                value={teacher.personalInfo.gender}
                onChange={(e) =>
                  handleInputChange("personalInfo", "gender", e.target.value)
                }
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleFileChange("personalInfo", "photo", e.target.files)
                }
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Professional Information */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">
            Professional Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Employee ID *
              </label>
              <input
                type="text"
                value={teacher.professionalInfo.employeeId}
                onChange={(e) =>
                  handleInputChange(
                    "professionalInfo",
                    "employeeId",
                    e.target.value
                  )
                }
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
              {errors.employeeId && (
                <p className="text-red-500 text-sm mt-1">{errors.employeeId}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Joining Date *
              </label>
              <input
                type="date"
                value={teacher.professionalInfo.joiningDate}
                onChange={(e) =>
                  handleInputChange(
                    "professionalInfo",
                    "joiningDate",
                    e.target.value
                  )
                }
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
              {errors.joiningDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.joiningDate}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Qualification *
              </label>
              <input
                type="text"
                value={teacher.professionalInfo.qualification}
                onChange={(e) =>
                  handleInputChange(
                    "professionalInfo",
                    "qualification",
                    e.target.value
                  )
                }
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
              {errors.qualification && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.qualification}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Experience (years)
              </label>
              <input
                type="number"
                min="0"
                value={teacher.professionalInfo.experience}
                onChange={(e) =>
                  handleInputChange(
                    "professionalInfo",
                    "experience",
                    parseInt(e.target.value) || 0
                  )
                }
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Department *
              </label>
              <select
                value={teacher.professionalInfo.department}
                onChange={(e) =>
                  handleInputChange(
                    "professionalInfo",
                    "department",
                    e.target.value
                  )
                }
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
              {errors.department && (
                <p className="text-red-500 text-sm mt-1">{errors.department}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Designation *
              </label>
              <select
                value={teacher.professionalInfo.designation}
                onChange={(e) =>
                  handleInputChange(
                    "professionalInfo",
                    "designation",
                    e.target.value
                  )
                }
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              >
                <option value="">Select Designation</option>
                {designations.map((desig) => (
                  <option key={desig} value={desig}>
                    {desig}
                  </option>
                ))}
              </select>
              {errors.designation && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.designation}
                </p>
              )}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Subjects *
              </label>
              <select
                multiple
                value={teacher.professionalInfo.subjects}
                onChange={(e) =>
                  handleInputChange(
                    "professionalInfo",
                    "subjects",
                    Array.from(
                      e.target.selectedOptions,
                      (option) => option.value
                    )
                  )
                }
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                size={4}
              >
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
              <p className="text-sm text-gray-500 mt-1">
                Hold Ctrl/Cmd to select multiple options.
              </p>{" "}
              {errors.subjects && (
                <p className="text-red-500 text-sm mt-1">{errors.subjects}</p>
              )}{" "}
            </div>{" "}
          </div>{" "}
        </div>
        {/* Address Information */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Address</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Street *</label>
              <input
                type="text"
                value={teacher.address.street}
                onChange={(e) =>
                  handleInputChange("address", "street", e.target.value)
                }
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">City *</label>
              <input
                type="text"
                value={teacher.address.city}
                onChange={(e) =>
                  handleInputChange("address", "city", e.target.value)
                }
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">State *</label>
              <input
                type="text"
                value={teacher.address.state}
                onChange={(e) =>
                  handleInputChange("address", "state", e.target.value)
                }
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Zip Code *
              </label>
              <input
                type="text"
                value={teacher.address.zipCode}
                onChange={(e) =>
                  handleInputChange("address", "zipCode", e.target.value)
                }
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Country *
              </label>
              <input
                type="text"
                value={teacher.address.country}
                onChange={(e) =>
                  handleInputChange("address", "country", e.target.value)
                }
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Documents */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Documents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Resume</label>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) =>
                  handleFileChange("documents", "resume", e.target.files)
                }
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Certificates
              </label>
              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.png"
                onChange={(e) =>
                  handleFileChange("documents", "certificates", e.target.files)
                }
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">ID Proof</label>
              <input
                type="file"
                accept=".pdf,.jpg,.png"
                onChange={(e) =>
                  handleFileChange("documents", "idProof", e.target.files)
                }
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Credentials */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Credentials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email *</label>
              <input
                type="email"
                value={teacher.credentials.email}
                onChange={(e) =>
                  handleInputChange("credentials", "email", e.target.value)
                }
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Password *
              </label>
              <input
                type="password"
                value={teacher.credentials.password}
                onChange={(e) =>
                  handleInputChange("credentials", "password", e.target.value)
                }
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Confirm Password *
              </label>
              <input
                type="password"
                value={teacher.credentials.confirmPassword}
                onChange={(e) =>
                  handleInputChange(
                    "credentials",
                    "confirmPassword",
                    e.target.value
                  )
                }
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddTeacherPage;
