import React, { useState } from "react";
import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import InputField from "../../../components/form/InputField";
import { Fee } from "../../../utils/types";
import API from "../../../utils/api";

const feeSchema = Yup.object().shape({
  amount: Yup.number()
    .required("Amount is required")
    .positive("Amount must be positive")
    .typeError("Amount must be a number"),
  description: Yup.string().optional(),
});

interface FeePaymentProps {
  studentId: string;
  showFeePayment: boolean;
  setShowFeePayment: (value: boolean) => void;
  onSuccess?: () => void; // Optional callback for successful submission
}

const FeePayment: React.FC<FeePaymentProps> = ({
  studentId,
  showFeePayment, // Fixed typo
  setShowFeePayment,
  onSuccess,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!studentId) {
    return null; // Return null instead of rendering a div when component shouldn't be shown
  }

  const handleSubmit = async (
    values: Fee,
    { resetForm }: FormikHelpers<Fee>
  ) => {
    try {
      setIsSubmitting(true);

      const payload = {
        ...values,
        studentId: parseInt(studentId),
        amount: Number(values.amount), // Ensure amount is a number
      };

      const response = await API.post("/fees", payload);

      if (response.status === 201) {
        resetForm();
        setShowFeePayment(false);
        onSuccess?.(); // Call success callback if provided
      }
    } catch (error) {
      console.error("Error submitting fee payment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setShowFeePayment(false);
  };

  // Early return if modal shouldn't be shown
  if (!showFeePayment) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 p-4 z-50 flex items-center justify-center"
      onClick={handleClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <h2 className="text-xl font-semibold mb-4">Record Fee Payment</h2>

        <Formik
          initialValues={{
            studentId,
            amount: 0,
            description: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={feeSchema}
        >
          {({ isValid, dirty }) => (
            <Form className="space-y-4">
              <InputField
                name="amount"
                label="Amount"
                type="number"
                placeholder="Enter payment amount"
              />

              <InputField
                name="description"
                label="Description"
                placeholder="Optional payment description"
                type="textarea"
              />

              <div className="mt-6 flex justify-between">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
                  onClick={handleClose}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting || !isValid || !dirty}
                >
                  {isSubmitting ? "Processing..." : "Pay Fee"}
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
