import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import InputField from "../../../components/form/InputField";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { addSubject } from "../../../redux/features/subjectSlice";
import SelectField from "../../../components/form/SelectField";
import { useSelector } from "react-redux";

// Validation schema for Subject
const subjectSchema = yup.object().shape({
  name: yup.string().required("Subject name is required"),
  description: yup.string(),
});

const AddSubjectPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { grades } = useSelector((state: RootState) => state.grade);
  const [gradeOptions, setGradeOptions] = React.useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    setGradeOptions(
      grades.map((grade) => ({ value: grade.id, label: grade.name }))
    );
  }, [grades]);

  const handleSubmit = (values: {
    name: string;
    description: string;
    gradeId: string;
  }) => {
    dispatch(addSubject(values));
    console.log("Subject Submitted:", values);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add New Subject</h1>
      <Formik
        initialValues={{ name: "", description: "", gradeId: "" }}
        validationSchema={subjectSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <InputField name="name" label="Subject Name" />
            <InputField name="description" label="Description" />
            <SelectField name="gradeId" label="Grade" options={gradeOptions} />
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
                Add Subject
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddSubjectPage;
