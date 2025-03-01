import React, { useEffect, useState } from "react";
import API from "../utils/api";
import { Fee } from "../utils/types";
import ProfileImage from "./ProfileImage";

const RecentTransactions: React.FC = () => {
  const [transactions, setTransactions] = useState<Fee[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await API.get("/fees"); // Adjust the API endpoint accordingly
        if (response.status === 200) {
          setTransactions(response.data);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
      setLoading(false);
    };

    fetchTransactions();
  }, []);

  // Function to calculate time ago
  const timeAgo = (dateString: string) => {
    const time = dateString ? new Date(dateString) : new Date();
    const now = new Date();
    const diff = Math.floor((now.getTime() - time.getTime()) / 1000); // seconds

    if (diff < 60) return `${diff} sec ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return `${Math.floor(diff / 86400)} days ago`;
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Recent Fee Transactions</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading transactions...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : transactions.length === 0 ? (
        <p className="text-center text-gray-500">No recent fee transactions.</p>
      ) : (
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between"
            >
              {transaction.student && (
                <div className="flex items-center">
                  <ProfileImage
                    firstName={transaction.student.firstName}
                    size={35}
                  />
                  <div className="ml-4">
                    <p className="font-semibold">
                      {transaction.student.firstName +
                        " " +
                        transaction.student.lastName}
                    </p>
                    <p className="text-gray-500 text-xs">
                      ID: {transaction.studentId}
                    </p>
                  </div>
                </div>
              )}
              <div className="text-right">
                <p className="font-semibold">₹{transaction.amount}</p>
                <p className="text-gray-500">
                  {timeAgo(transaction.createdAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentTransactions;
