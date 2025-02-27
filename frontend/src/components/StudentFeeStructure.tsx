import React, { useEffect, useState } from "react";
import CollapsibleCard from "./ui/CollapsibleCard";
import { Form, Formik } from "formik";
import { DEFAULT_FEE_STRUCTURE } from "../utils/constants";
import InputField from "./form/InputField";
import { FeeStructure } from "../utils/types";
import * as Yup from "yup";
import API from "../utils/api";
import SelectField from "./form/SelectField";

const FeeStructureSchema = Yup.object().shape({
  tuitionFee: Yup.number().required("Tution fee is required"),
  transportFee: Yup.number().required("Transport fee is required"),
  mealFee: Yup.number().required("Meal fee is required"),
  libraryFee: Yup.number().required("Library fee is required"),
  startDate: Yup.date().required("Start date is required"),
  endDate: Yup.date().required("End date is required"),
  frequency: Yup.string().required("Frequency is required"),
  description: Yup.string(),
});

interface StudentFeeStructureProps {
  studentId: string;
}

const StudentFeeStructure: React.FC<StudentFeeStructureProps> = ({
  studentId,
}) => {
  const [feeStructure, setFeeStructure] = useState<FeeStructure | null>(null);
  const [message, setMessage] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await API.get(`/fee-structures/student/${studentId}`);
        if (response.status === 200) {
          if (response.data.startDate)
            response.data.startDate = response.data.startDate.split("T")[0];
          if (response.data.endDate)
            response.data.endDate = response.data.endDate.split("T")[0];
          if (response.data.description === null)
            response.data.description = "";
          setFeeStructure(response.data as FeeStructure);
        }
      } catch (error) {
        setMessage("Fee structure not found");
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [studentId]);

  const handleFeeStructureSubmit = async (values: FeeStructure) => {
    console.log(values);
    if (!feeStructure) {
      // Create new fee structure
      try {
        const response = await API.post("/fee-structures", {
          tuitionFee: parseInt(values.tuitionFee.toString()),
          transportFee: parseInt(values.transportFee.toString()),
          mealFee: parseInt(values.mealFee.toString()),
          libraryFee: parseInt(values.libraryFee.toString()),
          frequency: values.frequency,
          startDate: values.startDate,
          endDate: values.endDate,
          studentId,
        });
        if (response.status === 201) {
          setMessage("Fee structure created successfully");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      // Update existing fee structure
      try {
        const response = await API.put("/fee-structures/student/" + studentId, {
          tuitionFee: parseInt(values.tuitionFee.toString()),
          transportFee: parseInt(values.transportFee.toString()),
          mealFee: parseInt(values.mealFee.toString()),
          libraryFee: parseInt(values.libraryFee.toString()),
          frequency: values.frequency,
          startDate: values.startDate,
          endDate: values.endDate,
        });
        if (response.status === 200) {
          setMessage("Fee structure updated successfully");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <CollapsibleCard title="Fee Structure" className="mt-4">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Formik
          initialValues={feeStructure || DEFAULT_FEE_STRUCTURE}
          validationSchema={FeeStructureSchema}
          onSubmit={handleFeeStructureSubmit}
        >
          {({ errors, touched }) => (
            <Form className="mx-auto md:grid md:grid-cols-2 md:gap-4">
              <InputField
                label="Tuition Fee"
                name="tuitionFee"
                type="number"
                readOnly={!isEditing}
              />
              <InputField
                label="Transport Fee"
                name="transportFee"
                type="number"
                readOnly={!isEditing}
              />
              <InputField
                label="Meal Fee"
                name="mealFee"
                type="number"
                readOnly={!isEditing}
              />
              <InputField
                label="Library Fee"
                name="libraryFee"
                type="number"
                readOnly={!isEditing}
              />
              <SelectField
                label="Frequency"
                name="frequency"
                options={[
                  { value: "ONCE", label: "Once" },
                  { value: "MONTHLY", label: "Monthly" },
                  { value: "ANNUALLY", label: "Annually" },
                ]}
                readOnly={!isEditing}
              />
              <div className="col-span-2 grid grid-cols-1 gap-4">
                <InputField
                  label="Description"
                  name="description"
                  type="textarea"
                  readOnly={!isEditing}
                />
              </div>
              <div className="col-span-2 grid grid-cols-2 gap-4">
                <InputField
                  label="Start Date"
                  name="startDate"
                  type="date"
                  readOnly={!isEditing}
                />
                <InputField
                  label="End Date"
                  name="endDate"
                  type="date"
                  readOnly={!isEditing}
                />
              </div>
              {Object.keys(errors).length > 0 && touched && (
                <div className="error-summary">
                  <h4>Validation Errors:</h4>
                  <ul>
                    {Object.values(errors).map((err, index) => (
                      <li key={index}>{err}</li>
                    ))}
                  </ul>
                </div>
              )}
              <p className="col-span-2 text-center text-green-500">{message}</p>
              <div className="col-span-2 flex items-center justify-between">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                  onClick={() => setIsEditing((prev) => !prev)}
                >
                  {isEditing ? "Cancel" : "Edit"}
                </button>
                {isEditing && (
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md"
                  >
                    Submit
                  </button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      )}
    </CollapsibleCard>
  );
};

export default StudentFeeStructure;
