import React from "react";
import FinanceChart from "../../components/FinanceChart";
import Announcement from "../../components/Announcement";
import RecentTransactions from "../../components/RecentTransactions";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

const AdminDashboard: React.FC = () => {
  const { students } = useSelector((state: RootState) => state.student);
  const { teachers } = useSelector((state: RootState) => state.teacher);
  return (
    <div className="">
      {/* <div className="flex items-center justify-between p-4 bg-white shadow-sm mb-4">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>
        <div className="flex items-center space-x-4">
          <i className="fas fa-bell text-gray-500"></i>
          <img
            src="https://placehold.co/40x40"
            alt="User avatar"
            className="w-10 h-10 rounded-full"
          />
        </div>
      </div> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full">
              <i className="fas fa-users text-blue-500"></i>
            </div>
            <div className="ml-4">
              <p className="text-gray-500">Total Students</p>
              <p className="text-2xl font-semibold">{students.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-full">
              <i className="fas fa-rupee-sign text-green-500"></i>
            </div>
            <div className="ml-4">
              <p className="text-gray-500">Fees Collected</p>
              <p className="text-2xl font-semibold">₹8.5L</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="bg-red-100 p-3 rounded-full">
              <i className="fas fa-exclamation-circle text-red-500"></i>
            </div>
            <div className="ml-4">
              <p className="text-gray-500">Pending Dues</p>
              <p className="text-2xl font-semibold">₹2.3L</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-full">
              <i className="fas fa-chalkboard-teacher text-purple-500"></i>
            </div>
            <div className="ml-4">
              <p className="text-gray-500">Total Teachers</p>
              <p className="text-2xl font-semibold">{teachers.length}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 w-full">
        <FinanceChart />
        <RecentTransactions />
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Pending Due Payments</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-red-100 p-3 rounded-full">
                  <span className="text-red-500 font-semibold">SK</span>
                </div>
                <div className="ml-4">
                  <p className="font-semibold">Suresh Kumar</p>
                  <p className="text-gray-500">Class XII-A</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-red-500">₹45,000</p>
                <p className="text-gray-500">Due: 15 Dec</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-pink-100 p-3 rounded-full">
                  <span className="text-pink-500 font-semibold">PG</span>
                </div>
                <div className="ml-4">
                  <p className="font-semibold">Priya Gupta</p>
                  <p className="text-gray-500">Class VIII-B</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-red-500">₹20,000</p>
                <p className="text-gray-500">Due: 20 Dec</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-red-200 p-3 rounded-full">
                  <span className="text-red-500 font-semibold">RK</span>
                </div>
                <div className="ml-4">
                  <p className="font-semibold">Raj Kumar</p>
                  <p className="text-gray-500">Class VII-A</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-red-500">₹15,000</p>
                <p className="text-gray-500">Due: 25 Dec</p>
              </div>
            </div>
          </div>
        </div>
        <Announcement />
      </div>
    </div>
  );
};

export default AdminDashboard;
