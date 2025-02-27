import React from "react";
import { Fee } from "../utils/types";

interface FeeTransactionTableProps {
  transactions: Fee[];
  className?: string;
}

const FeeTransactionTable: React.FC<FeeTransactionTableProps> = ({
  transactions,
  className,
}) => {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-100 text-gray-700 uppercase">
          <tr>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Description</th>
            <th className="px-4 py-2 text-left">Amount</th>
            <th className="px-4 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr
              key={transaction.id}
              className="border-b hover:bg-gray-50 transition"
            >
              <td className="px-4 py-2">
                {new Date(transaction.createdAt || "").toLocaleDateString()}
              </td>
              <td className="px-4 py-2">{transaction.description}</td>
              <td className="px-4 py-2 font-semibold">${transaction.amount}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded text-sm font-medium ${
                    transaction.status === "PAID"
                      ? "bg-green-100 text-green-700"
                      : transaction.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {transaction.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeeTransactionTable;
