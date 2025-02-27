import React from "react";
import { Form, Formik } from "formik";
import InputField from "../../../components/form/InputField";
import * as Yup from "yup";
import { Fee } from "../../../utils/types";
import API from "../../../utils/api";

const feeSchema = Yup.object().shape({
  amount: Yup.number().required("Amount is required"),
  description: Yup.string().optional(),
});

interface FeePaymentProps {
  studentId: string;
  showFeePaymant: boolean;
  setShowFeePayment: (value: boolean) => void;
}

const FeePayment: React.FC<FeePaymentProps> = ({
  studentId,
  showFeePaymant,
  setShowFeePayment,
}) => {
  if (!studentId) {
    return <div>Student not found</div>;
  }

  const handleSubmit = async (values: Fee) => {
    values.studentId = parseInt(studentId.toString());
    console.log(values);
    const response = await API.post("/fees", values);
    if (response.status === 201) {
      setShowFeePayment(false);
    }
  };

  return (
    <div
      className={`absolute left-0 top-0 w-full h-full bg-black/50 p-8 shadow-lg overflow-y-auto flex items-center justify-center ${
        showFeePaymant ? "" : "hidden"
      }`}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <Formik
          initialValues={{
            studentId,
            amount: 0,
            description: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={feeSchema}
        >
          {() => (
            <Form>
              <InputField name="amount" label="Amount" type="number" />
              <InputField name="description" label="Description" />
              <div className="mt-4 flex justify-between">
                <button
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                  onClick={() => setShowFeePayment(false)}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Pay Fee
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FeePayment;
