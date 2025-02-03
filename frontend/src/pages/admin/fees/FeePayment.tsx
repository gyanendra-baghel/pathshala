import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../../../context/AppContext";

const FeePayment: React.FC = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const { students, feeStructures, addFee } = useAppContext();
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState<"paid" | "pending">("pending");

  const student = students.find((s) => s.id === studentId);
  const feeStructure = feeStructures.find((fs) => fs.grade === student?.class);
  console.log(feeStructure);

  if (!student) {
    return <div>Student not found</div>;
  }

  const handleAddFee = (e: React.FormEvent) => {
    e.preventDefault();
    addFee({
      id: Date.now().toString(),
      studentId: student.id,
      amount: parseFloat(amount),
      dueDate,
      status,
      description,
    });
    setDescription("");
    setAmount("");
    setDueDate("");
    setStatus("pending");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Fee Payment</h2>
      <form onSubmit={handleAddFee} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Due Date
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as "paid" | "pending")}
            className="mt-1 block w-full px-4 py-2 border rounded-lg"
          >
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
          </select>
        </div>
        <div>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Add Fee
          </button>
        </div>
      </form>
      {feeStructure && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Fee Structure</h3>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-600">Grade: {feeStructure.grade}</p>
            <p className="text-gray-600">
              Description: {feeStructure.description}
            </p>
            <p className="text-gray-600">Amount: ₹{feeStructure.amount}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeePayment;
