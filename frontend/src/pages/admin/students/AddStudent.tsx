import React from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import InputField from "../../../components/form/InputField";
import { Form, Formik } from "formik";
import { DEFAULT_STUDENT_DETAILS } from "../../../utils/constatnt";
import { Button } from "../../../components/ui/button";
import API from "../../../utils/api";

const StudentSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  dob: Yup.date().required("Date of birth is required"),
  grade: Yup.string().required("Grade is required"),
  rollNumber: Yup.string(),
  email: Yup.string().email("Invalid email").required("Email is required"),
  adhaarNumber: Yup.string().matches(/^\d{12}$/, "Aadhaar must be 12 digits"),
  samagraId: Yup.string(),
  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
});

const AddStudent: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values: typeof DEFAULT_STUDENT_DETAILS) => {
    await API.post("/students", values);
    navigate("/admin/students");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add Student</h2>
      <Formik
        initialValues={DEFAULT_STUDENT_DETAILS}
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
            <InputField label="Grade" name="grade" placeholder="Enter grade" />
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
              label="Aadhaar Number"
              name="adhaarNumber"
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
