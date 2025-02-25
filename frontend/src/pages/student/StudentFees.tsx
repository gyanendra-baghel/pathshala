import React from "react";
import { Fee } from "../../utils/types";

const StudentFees: React.FC = () => {
  const fees: Fee[] = [];
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Fees</h2>
      <div className="grid gap-4">
        {fees.map((fee) => (
          <div key={fee.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">{fee.description}</h3>
              <span
                className={`px-2 py-1 rounded text-sm ${
                  fee.status === "PAID"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {fee.status}
              </span>
            </div>
            <p className="text-gray-600">Amount: ${fee.amount}</p>
            {/* <p className="text-gray-600">Due Date: {fee.dueDate}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentFees;
