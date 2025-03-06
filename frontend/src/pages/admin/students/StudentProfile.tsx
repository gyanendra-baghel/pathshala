import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { MenuCard, MenuItem } from "../../../components/ui/MenuCard";
import InputField from "../../../components/form/InputField";
import { Student } from "../../../utils/types";
import { HandCoins, Megaphone, PencilLine, Trash2 } from "lucide-react";
import ImageUploadField from "../../../components/ImageUploadField";
import ErrorPage from "../../../components/utils/ErrorPage";
import API from "../../../utils/api";
import { DEFAULT_STUDENT_DETAILS } from "../../../utils/constants";
import { useSelector } from "react-redux";
import SelectField from "../../../components/form/SelectField";
import { RootState } from "../../../redux/store";
import FeePayment from "../fees/FeePayment";
import StudentFeeStructure from "../../../components/StudentFeeStructure";

const StudentSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  dob: Yup.date().required("Date of birth is required"),
  gradeId: Yup.number().required("Grade is required"),
  rollNumber: Yup.string(),
  email: Yup.string().email("Invalid email").required("Email is required"),
  adhaarNumber: Yup.string().matches(/^\d{12}$/, "Aadhaar must be 12 digits"),
  samagraId: Yup.string(),
  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
});

const StudentDetails: React.FC = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const { grades } = useSelector((state: RootState) => state.grade);
  const [selectionGrades, setSelectionGrades] = React.useState<
    { value: string; label: string }[]
  >([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [student, setStudent] = useState<Student>(DEFAULT_STUDENT_DETAILS);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [showFeePayment, setShowFeePayment] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (grades) {
      setSelectionGrades(
        grades.map((grade) => ({
          value: grade.id,
          label: grade.name,
        }))
      );
    }
  }, [grades]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get(`/students/${studentId}`);
        if (response.status === 200) {
          setStudent(response.data as Student);
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoaded(true);
    };
    fetchData();
  }, [studentId]);

  const menuItems: MenuItem[] = [
    {
      label: "Attendence",
      icon: <Megaphone className="mr-2" />, // Example icon
      onClick: () => navigate(`/admin/students/${studentId}/attendence`),
    },
    {
      label: "Edit",
      icon: <PencilLine className="text-black mr-2" />,
      onClick: () => setIsEditing((prev) => !prev),
    },
    {
      label: "Delete",
      icon: <Trash2 className="text-red-500 mr-2" />,
      onClick: () => handleRemoveStudent(),
      className: "text-red-500",
    },
    {
      label: "Pay Fee",
      icon: <HandCoins className="mr-2" />,
      onClick: () => setShowFeePayment(true),
    },
  ];

  if (!isLoaded || selectionGrades.length === 0) {
    return <div>Loading...</div>;
  } else if (!studentId || !student) {
    return <ErrorPage message="Student Not Found" />;
  }

  const handleRemoveStudent = () => {
    navigate("/admin/students");
  };

  const handleSubmit = (values: typeof DEFAULT_STUDENT_DETAILS) => {
    console.log("Form Submitted:", values);
    setIsEditing(false);
  };

  return (
    <div className="mx-auto">
      <MenuCard title="Student Details" menuItems={menuItems}>
        <div className="flex items-center justify-between">
          <ImageUploadField
            label="profile"
            name="Profile"
            onChange={() => {}}
          />
        </div>
        <Formik
          initialValues={student}
          validationSchema={StudentSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="mx-auto md:grid md:grid-cols-2 md:gap-4">
              <InputField
                label="First Name"
                name="firstName"
                placeholder="Enter first name"
                readOnly={!isEditing}
              />
              <InputField
                label="Last Name"
                name="lastName"
                placeholder="Enter last name"
                readOnly={!isEditing}
              />
              <InputField
                label="Date of Birth"
                name="dob"
                type="date"
                readOnly={!isEditing}
              />
              <SelectField
                label="Grade"
                name="gradeId"
                options={selectionGrades}
                readOnly={!isEditing}
              />
              <InputField
                label="Roll Number"
                name="rollNumber"
                placeholder="Enter roll number"
                readOnly={!isEditing}
              />
              <InputField
                label="Email"
                name="email"
                type="email"
                placeholder="Enter email"
                readOnly={!isEditing}
              />
              <InputField
                label="Aadhaar Number"
                name="adhaarNumber"
                placeholder="Enter Aadhaar number"
                readOnly={!isEditing}
              />
              <InputField
                label="Samagra ID"
                name="samagraId"
                placeholder="Enter Samagra ID"
                readOnly={!isEditing}
              />
              <InputField
                label="Phone Number"
                name="phoneNumber"
                type="tel"
                placeholder="Enter phone number"
                readOnly={!isEditing}
              />
              {isEditing && (
                <div className="col-span-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md"
                  >
                    Submit
                  </button>
                </div>
              )}
            </Form>
          )}
        </Formik>
      </MenuCard>
      <StudentFeeStructure studentId={studentId} />
      <FeePayment
        studentId={studentId}
        showFeePayment={showFeePayment}
        setShowFeePayment={setShowFeePayment}
      />
    </div>
  );
};

export default StudentDetails;
