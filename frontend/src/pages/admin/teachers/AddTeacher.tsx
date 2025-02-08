import React, { useEffect } from "react";
import * as yup from "yup";
import { Form, Formik } from "formik";
import InputField from "../../../components/form/InputField";
import SelectField from "../../../components/form/SelectField";
import { DEFAULT_TEACHER_DETAILS } from "../../../utils/constants";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

// Validation schema
const teacherSchema = yup.object().shape({
  name: yup.string().required("First name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
  phone: yup.string().required("Phone number is required"),
  address: yup.string(),
  gender: yup.string().oneOf(["MALE", "FEMALE", "OTHER"]),
  subjects: yup.array().of(yup.number().required()),
});

const AddTeacherPage: React.FC = () => {
  const { subjects } = useSelector((state: RootState) => state.subject);
  const [selectedSubjects, setSelectedSubjects] = React.useState<
    { label: string; value: string }[]
  >([]);

  useEffect(() => {
    setSelectedSubjects(
      subjects.map((subject) => ({
        label: subject.name,
        value: subject.id,
      }))
    );
  }, [subjects]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Add New Teacher</h1>
        <Formik
          initialValues={{ ...DEFAULT_TEACHER_DETAILS, subjects: [] }}
          validationSchema={teacherSchema}
          onSubmit={() => {}}
        >
          {({ values, setFieldValue, errors, touched }) => (
            <Form>
              <InputField name="name" label="Name" />
              <InputField name="email" label="Email" />
              <InputField name="password" label="Password" />
              <InputField name="phone" label="Phone" />
              <InputField name="address" label="Address" />
              <SelectField
                name="gender"
                label="Gender"
                options={[{ value: "MALE", label: "MALE" }]}
              />
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Subjects
                </label>
                <select
                  multiple
                  className="w-full border p-2 rounded"
                  value={values.subjects}
                  onChange={(event) => {
                    const selectedValues = Array.from(
                      event.target.selectedOptions,
                      (option) => option.value
                    );
                    setFieldValue("subjects", selectedValues);
                  }}
                >
                  {selectedSubjects.map((subject) => (
                    <option key={subject.value} value={subject.value}>
                      {subject.label}
                    </option>
                  ))}
                </select>
                {errors.subjects && touched.subjects && (
                  <p className="text-red-500 text-sm mt-1">{errors.subjects}</p>
                )}
              </div>
              {/* <SelectField name="subjects" label="Subjects" options={[]} /> */}
              <div className="flex justify-between">
                <button
                  type="reset"
                  className="bg-gray-300 text-white px-4 py-2 rounded mt-4"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                >
                  Add Teacher
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddTeacherPage;
