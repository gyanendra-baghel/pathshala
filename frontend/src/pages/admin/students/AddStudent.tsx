import React, { useEffect } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import InputField from "../../../components/form/InputField";
import { Form, Formik } from "formik";
import { DEFAULT_STUDENT_DETAILS } from "../../../utils/constants";
import { Button } from "../../../components/ui/button";
import API from "../../../utils/api";
import SelectField from "../../../components/form/SelectField";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const StudentSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  dob: Yup.date().required("Date of birth is required"),
  gradeId: Yup.number().required("Grade is required"),
  rollNumber: Yup.string(),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters"),
  aadharNumber: Yup.string().matches(/^\d{12}$/, "Aadhaar must be 12 digits"),
  samagraId: Yup.string(),
  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  fatherName: Yup.string(),
  motherName: Yup.string(),
  address: Yup.string(),
});

const AddStudent: React.FC = () => {
  const { grades } = useSelector((state: RootState) => state.grade);
  const [selectionGrades, setSelectionGrades] = React.useState<
    { value: string; label: string }[]
  >([]);
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

  const handleSubmit = async (values: typeof DEFAULT_STUDENT_DETAILS) => {
    try {
      const response = await API.post("/students", values);
      if (response.status === 201) {
        navigate("/students");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add Student</h2>
      <Formik
        initialValues={{ ...DEFAULT_STUDENT_DETAILS, password: "" }}
        validationSchema={StudentSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="mx-auto md:grid md:grid-cols-2 md:gap-4">
            <InputField
              label="First Name"
              name="firstName"
              placeholder="Enter first name"
            />
            <InputField
              label="Last Name"
              name="lastName"
              placeholder="Enter last name"
            />
            <InputField label="Date of Birth" name="dob" type="date" />
            <SelectField
              label="Grade"
              name="gradeId"
              options={selectionGrades}
            />
            <InputField
              label="Roll Number"
              name="rollNumber"
              placeholder="Enter roll number"
            />
            <InputField
              label="Email"
              name="email"
              type="email"
              placeholder="Enter email"
            />
            <InputField
              label="Password"
              name="password"
              type="password"
              placeholder="Enter password"
            />
            <InputField
              label="Aadhaar Number"
              name="aadharNumber"
              placeholder="Enter Aadhaar number"
            />
            <InputField
              label="Samagra ID"
              name="samagraId"
              placeholder="Enter Samagra ID"
            />
            <InputField
              label="Phone Number"
              name="phoneNumber"
              type="tel"
              placeholder="Enter phone number"
            />
            <InputField label="Father's Name" name="fatherName" />
            <InputField label="Mother's Name" name="motherName" />
            <InputField label="Address" name="address" />
            <div className="col-span-2 flex items-center justify-between">
              <Button type="reset" variant="destructive">
                Clear
              </Button>
              <Button type="submit" variant="default">
                Submit
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddStudent;
