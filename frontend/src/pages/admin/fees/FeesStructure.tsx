import React, { useEffect, useState } from "react";
import { FeeStructure } from "../../../utils/types";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import InputField from "../../../components/form/InputField";
import SelectField from "../../../components/form/SelectField";

const validationSchema = Yup.object().shape({
  gradeId: Yup.number().required("Grade is required"),
  description: Yup.string(),
  amount: Yup.number().required("Amount is required"),
});

const FeesStructure: React.FC = () => {
  const { feeStructures } = useSelector(
    (state: RootState) => state.feeStructure
  );
  const { grades } = useSelector((state: RootState) => state.grade);
  const [selectionGrades, setSelectionGrades] = useState<
    { value: string; label: string }[]
  >([]);

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

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-4">
      <h2 className="text-2xl font-bold mb-6">Fee Structure</h2>
      <Formik
        initialValues={{ gradeId: "", description: "", amount: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("values", values);
        }}
      >
        {() => (
          <Form className="mx-auto">
            <SelectField
              label="Grade"
              name="gradeId"
              options={selectionGrades}
            />
            <InputField
              label="Description"
              name="description"
              placeholder="Enter description"
            />
            <InputField
              label="Amount"
              name="amount"
              placeholder="Enter amount"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Add Fee Structure
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <h3 className="text-xl font-semibold mt-8 mb-4">
        Existing Fee Structures
      </h3>
      <div className="grid gap-4">
        {feeStructures.map((feeStructure: FeeStructure) => (
          <div key={feeStructure.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{feeStructure.gradeId}</h3>
                <p className="text-gray-600">{feeStructure.description}</p>
                <p className="text-gray-600">₹{feeStructure.amount}</p>
              </div>
              <div className="flex gap-2">
                <button className="text-blue-600 hover:text-blue-800">
                  Edit
                </button>
                <button className="text-red-600 hover:text-red-800">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeesStructure;
