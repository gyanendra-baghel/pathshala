import React, { useEffect } from "react";
import { Fee, FeeStructure } from "../utils/types";

interface FeeRecord {
  month: string;
  tuitionFee: number;
  transportFee: number;
  totalFee: number;
  paid: number;
  status: string;
}

interface FeeTableProps {
  feeStructure: FeeStructure;
  fees: Fee[];
  classname?: string;
}

const FeeTable: React.FC<FeeTableProps> = ({
  feeStructure,
  fees,
  classname,
}) => {
  const [feesRecords, setFeesRecords] = React.useState<FeeRecord[]>([]);

  useEffect(() => {
    setFeesRecords(generateFeeRecords(feeStructure, fees));
  }, [fees]);

  const generateFeeRecords = (
    feeStructure: FeeStructure,
    transactions: Fee[]
  ) => {
    const startDate = new Date(feeStructure.startDate);
    const endDate = new Date(feeStructure.endDate);
    const records = [];

    for (
      let date = new Date(startDate);
      date <= endDate;
      date.setMonth(date.getMonth() + 1) // Move month by month
    ) {
      const monthName = date.toLocaleString("default", { month: "long" });
      const year = date.getFullYear();
      const formattedMonth = `${monthName} ${year}`;

      // Calculate total fee
      const tuitionFee = Number(feeStructure.tuitionFee);
      const transportFee = Number(feeStructure.transportFee);
      const totalFee = tuitionFee + transportFee;

      // Check if this month's fee has been paid
      const paidTransaction = transactions.find((tx) =>
        tx.description.includes(monthName)
      );
      const paidAmount = paidTransaction ? paidTransaction.amount : 0;
      const status = paidTransaction ? "PAID" : "PENDING";

      records.push({
        month: formattedMonth,
        tuitionFee,
        transportFee,
        totalFee,
        paid: paidAmount,
        status,
      });
    }

    return records;
  };

  return (
    <div className={`overflow-x-auto ${classname}`}>
      <table className="min-w-full border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-100 text-gray-700 uppercase">
          <tr>
            <th className="px-4 py-2 text-left">Month</th>
            <th className="px-4 py-2 text-left">Tuition Fee</th>
            <th className="px-4 py-2 text-left">Transport Fee</th>
            <th className="px-4 py-2 text-left">Total Fee</th>
            <th className="px-4 py-2 text-left">Paid</th>
            <th className="px-4 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {feesRecords.map((fee, index) => (
            <tr key={index} className="border-b hover:bg-gray-50 transition">
              <td className="px-4 py-2">{fee.month}</td>
              <td className="px-4 py-2">${fee.tuitionFee}</td>
              <td className="px-4 py-2">${fee.transportFee}</td>
              <td className="px-4 py-2 font-semibold">${fee.totalFee}</td>
              <td className="px-4 py-2">${fee.paid}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded text-sm font-medium ${
                    fee.status === "PAID"
                      ? "bg-green-100 text-green-700"
                      : fee.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {fee.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeeTable;
