import React from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { School, User } from "lucide-react";
import InputField from "../components/form/InputField";
import API from "../utils/api";

// Define the Yup validation schema
const SchoolWithAdminRegistrationSchema = Yup.object().shape({
  school: Yup.object().shape({
    name: Yup.string()
      .min(3, "School name must be at least 3 characters")
      .max(100, "School name must be less than 100 characters")
      .required("School name is required"),
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^[+]?[\d\s()-]{10,15}$/, "Please enter a valid phone number")
      .required("Phone number is required"),
    schoolBoard: Yup.string()
      .oneOf(
        ["CBSE", "ICSE", "STATE_BOARD", "OTHER"],
        "Please select a valid school board"
      )
      .required("School board is required"),
    address: Yup.string()
      .min(10, "Address must be at least 10 characters")
      .max(100, "Address must be less than 100 characters")
      .required("Address is required"),
    postalCode: Yup.string()
      .matches(/^\d{6}$/, "Postal code must be 6 digits")
      .required("Postal code is required"),
  }),
  admin: Yup.object().shape({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be less than 50 characters")
      .required("Admin name is required"),
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .max(50, "Password must be less than 50 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .required("Please confirm your password"),
    phoneNumber: Yup.string()
      .matches(/^[+]?[\d\s()-]{10,15}$/, "Please enter a valid phone number")
      .required("Phone number is required"),
  }),
  terms: Yup.boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("You must accept the terms and conditions"),
});

// Define interface for form values
interface RegistrationFormValues {
  school: {
    name: string;
    email: string;
    phone: string;
    schoolBoard: "CBSE" | "ICSE" | "STATE_BOARD" | "OTHER";
    address: string;
    postalCode: string;
  };
  admin: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
  };
  terms: boolean;
}

const SchoolRegistration: React.FC = () => {
  // Initial form values
  const initialValues: RegistrationFormValues = {
    school: {
      name: "",
      email: "",
      phone: "",
      schoolBoard: "CBSE",
      address: "",
      postalCode: "",
    },
    admin: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
    },
    terms: false,
  };

  // Define the handleSubmit function
  const handleSubmit = async (
    values: RegistrationFormValues,
    { setSubmitting, resetForm }: FormikHelpers<RegistrationFormValues>
  ) => {
    console.log("Form values:", values);

    try {
      const response = await API.post("/schools", values);
      if (response.status === 201) {
        alert("Registration successful! You can now log in.");
        setSubmitting(false);
        resetForm();
      }
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
      setSubmitting(false);
    }
  };

  interface FormSectionProps {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
  }

  const FormSection: React.FC<FormSectionProps> = ({
    title,
    icon,
    children,
  }) => (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex items-center mb-4 pb-2 border-b border-gray-200">
        {icon}
        <h2 className="text-xl font-semibold ml-2">{title}</h2>
      </div>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <School className="mx-auto h-16 w-16 text-indigo-600" />
          <h1 className="mt-3 text-3xl font-extrabold text-gray-900">
            School Registration
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Register your school and create an admin account
          </p>
        </div>

        {/* Registration Form */}
        <Formik
          initialValues={initialValues}
          validationSchema={SchoolWithAdminRegistrationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              {/* School Information */}
              <FormSection
                title="School Information"
                icon={<School className="h-6 w-6 text-indigo-500" />}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                  <InputField
                    label="School Name"
                    name="school.name"
                    placeholder="Enter school name"
                  />

                  <InputField
                    label="School Email"
                    name="school.email"
                    type="email"
                    placeholder="school@example.com"
                  />

                  <InputField
                    label="Phone Number"
                    name="school.phone"
                    placeholder="Enter phone number"
                  />

                  <div className="mb-4">
                    <label
                      htmlFor="school.schoolBoard"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      School Board
                    </label>
                    <Field
                      as="select"
                      name="school.schoolBoard"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="CBSE">CBSE</option>
                      <option value="ICSE">ICSE</option>
                      <option value="STATE_BOARD">State Board</option>
                      <option value="OTHER">Other</option>
                    </Field>
                    <ErrorMessage
                      name="school.schoolBoard"
                      component="div"
                      className="mt-1 text-sm text-red-600"
                    />
                  </div>
                </div>

                <InputField
                  label="Address"
                  name="school.address"
                  placeholder="Enter school address"
                />

                <InputField
                  label="Postal Code"
                  name="school.postalCode"
                  placeholder="Enter 6-digit postal code"
                />
              </FormSection>

              {/* Admin Information */}
              <FormSection
                title="Admin Information"
                icon={<User className="h-6 w-6 text-indigo-500" />}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                  <InputField
                    label="Admin Name"
                    name="admin.name"
                    placeholder="Enter admin name"
                  />

                  <InputField
                    label="Admin Email"
                    name="admin.email"
                    type="email"
                    placeholder="admin@example.com"
                  />

                  <InputField
                    label="Phone Number"
                    name="admin.phoneNumber"
                    placeholder="Enter phone number"
                  />

                  <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <InputField
                      label="Password"
                      name="admin.password"
                      type="password"
                      placeholder="Enter password"
                    />

                    <InputField
                      label="Confirm Password"
                      name="admin.confirmPassword"
                      type="password"
                      placeholder="Confirm password"
                    />
                  </div>
                </div>
              </FormSection>

              {/* Terms and Conditions */}
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <Field
                      id="terms"
                      name="terms"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-medium text-gray-700"
                    >
                      I agree to the{" "}
                      <a
                        href="#"
                        className="text-indigo-600 hover:text-indigo-500"
                      >
                        terms and conditions
                      </a>
                    </label>
                  </div>
                </div>
                <ErrorMessage
                  name="terms"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>Register School</>
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SchoolRegistration;
