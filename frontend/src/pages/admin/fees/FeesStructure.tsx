import React, { useState } from "react";
import { useAppContext } from "../../../context/AppContext";
import { FeeStructure } from "../../../utils/types";

const FeesStructure: React.FC = () => {
  const {
    feeStructures,
    addFeeStructure,
    updateFeeStructure,
    removeFeeStructure,
  } = useAppContext();
  const [grade, setGrade] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [editingFeeStructure, setEditingFeeStructure] =
    useState<FeeStructure | null>(null);

  const handleAddOrUpdateFeeStructure = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingFeeStructure) {
      updateFeeStructure({
        ...editingFeeStructure,
        grade,
        description,
        amount: parseFloat(amount),
      });
    } else {
      addFeeStructure({ grade, description, amount: parseFloat(amount) });
    }
    resetForm();
  };

  const handleEdit = (feeStructure: FeeStructure) => {
    setEditingFeeStructure(feeStructure);
    setGrade(feeStructure.grade);
    setDescription(feeStructure.description);
    setAmount(feeStructure.amount.toString());
  };

  const handleDelete = (id: string) => {
    removeFeeStructure(id);
  };

  const resetForm = () => {
    setGrade("");
    setDescription("");
    setAmount("");
    setEditingFeeStructure(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-4">
      <h2 className="text-2xl font-bold mb-6">Fee Structure</h2>
      <form onSubmit={handleAddOrUpdateFeeStructure} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Grade
          </label>
          <input
            type="text"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
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
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            {editingFeeStructure ? "Update Fee Structure" : "Add Fee Structure"}
          </button>
          {editingFeeStructure && (
            <button
              type="button"
              onClick={resetForm}
              className="ml-4 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      <h3 className="text-xl font-semibold mt-8 mb-4">
        Existing Fee Structures
      </h3>
      <div className="grid gap-4">
        {feeStructures.map((feeStructure: FeeStructure) => (
          <div key={feeStructure.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{feeStructure.grade}</h3>
                <p className="text-gray-600">{feeStructure.description}</p>
                <p className="text-gray-600">₹{feeStructure.amount}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(feeStructure)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(feeStructure.id)}
                  className="text-red-600 hover:text-red-800"
                >
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
