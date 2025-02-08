import React from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import InputField from "../../components/form/InputField";
import { useDispatch } from "react-redux";
import { addGrade } from "../../redux/features/gradeSlice";
import { AppDispatch } from "../../redux/store";

// Validation schema for Grade
const gradeSchema = yup.object().shape({
  name: yup.string().required("Grade name is required"),
});

const AddGradePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (
    values: { name: string },
    { resetForm }: { resetForm: () => void }
  ) => {
    dispatch(addGrade({ name: values.name }));
    resetForm();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add New Grade</h1>
      <Formik
        initialValues={{ name: "" }}
        validationSchema={gradeSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <InputField name="name" label="Grade Name" />
            <div className="flex justify-between">
              <button
                type="reset"
                className="bg-gray-300 px-4 py-2 rounded mt-4"
              >
                Reset
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
              >
                Add Grade
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddGradePage;
