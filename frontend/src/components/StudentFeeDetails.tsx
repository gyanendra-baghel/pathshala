import React from "react";
import { Link } from "react-router-dom";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachMonthOfInterval,
} from "date-fns";
import { Fee } from "../utils/types";
import { useAppContext } from "../context/AppContext";
import { getMonthlyFees } from "../services/feeService";

interface StudentFeeDetailsProps {
  studentId: string;
}

const StudentFeeDetails: React.FC<StudentFeeDetailsProps> = ({ studentId }) => {
  const { fees } = useAppContext();
  const studentFees = fees.filter((fee) => fee.studentId === studentId);

  const getLast12Months = () => {
    const now = new Date();
    const start = startOfMonth(now);
    const end = endOfMonth(now);
    return eachMonthOfInterval({
      start: new Date(start.setMonth(start.getMonth() - 11)),
      end,
    });
  };

  const statusColors: Record<Fee["status"], string> = {
    paid: "bg-green-100 text-green-800 border-green-200",
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    unpaid: "bg-red-100 text-red-800 border-red-200",
  };
  return (
    <div className="flex-grow m-3">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Fees Status</h3>
          <Link
            to={`/admin/pay-fee/${studentId}`}
            className="text-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            Pay Fee
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {getLast12Months().map((month) => {
            const monthKey = format(month, "MMMM yyyy");
            const feeStatus: Fee["status"] =
              getMonthlyFees(studentId, fees)[monthKey]?.status || "unpaid";
            return (
              <div
                key={monthKey}
                className={`p-4 rounded-lg shadow text-center ${statusColors[feeStatus]}`}
              >
                <h3 className="font-semibold">{format(month, "MMMM")}</h3>
                <p className="text-sm">{format(month, "yyyy")}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mt-8 mb-4">Fees History</h3>
        <div className="grid gap-4">
          {studentFees.map((fee) => (
            <div key={fee.id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">{fee.description}</h3>
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    fee.status === "paid"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {fee.status}
                </span>
              </div>
              <p className="text-gray-600">Amount: ${fee.amount}</p>
              <p className="text-gray-600">Due Date: {fee.dueDate}</p>
              <div className="flex gap-2 mt-2">
                <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                  Toggle Status
                </button>
                <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentFeeDetails;
