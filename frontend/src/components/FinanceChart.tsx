import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import API from "../utils/api";
import { Fee } from "../utils/types";

interface FormatedFee {
  date: string;
  amount: number;
}

const FinanceChart = () => {
  const [fees, setFees] = useState<FormatedFee[]>([]);
  const [filteredData, setFilteredData] = useState<FormatedFee[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const fetchFees = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await API.get("/fees");
        if (response.status === 200) {
          const fees = response.data as Fee[];
          const formattedData = fees.map((fee) => ({
            date: new Date(fee.createdAt).toISOString().split("T")[0], // Format date as YYYY-MM-DD
            amount: fee.amount,
          }));
          setFees(formattedData);
        }
      } catch (error) {
        console.error("Error fetching fees:", error);
      }
      setLoading(false);
    };

    fetchFees();
  }, []);

  // Filter data when date range changes
  useEffect(() => {
    if (!startDate || !endDate) {
      setFilteredData(fees);
      return;
    }

    const filtered = fees
      .filter((fee) => {
        return fee.date >= startDate && fee.date <= endDate;
      })
      .splice(0, 6); // Limit to 6 data points

    setFilteredData(filtered);
  }, [startDate, endDate, fees]);

  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">Finance</h1>
        {/* Date Range Filter */}
        <div className="flex items-center gap-1">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border p-1 rounded-md"
          />
          -
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border p-1 rounded-md"
          />
        </div>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading data...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <ResponsiveContainer width="100%" height={350}>
          <LineChart
            data={filteredData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
            <XAxis
              dataKey="date"
              tickFormatter={(date) => new Date(date).toLocaleDateString()}
              axisLine={false}
              tick={{ fill: "#4B5563" }}
              tickLine={false}
              tickMargin={10}
            />
            <YAxis
              axisLine={false}
              tick={{ fill: "#4B5563" }}
              tickLine={false}
              tickMargin={20}
            />
            <Tooltip
              labelFormatter={(label) => new Date(label).toLocaleDateString()}
            />
            <Legend align="center" verticalAlign="top" />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#4CAF50"
              strokeWidth={4}
              name="Income"
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default FinanceChart;
