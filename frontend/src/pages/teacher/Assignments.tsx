import React from "react";

const Assignments: React.FC = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <select className="border border-gray-300 rounded px-4 py-2">
            <option>All Classes</option>
          </select>
          <select className="border border-gray-300 rounded px-4 py-2">
            <option>All Status</option>
          </select>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          + Create Assignment
        </button>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <div className="text-blue-500 text-2xl font-bold">12</div>
          <div className="text-gray-500">Active</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="text-yellow-500 text-2xl font-bold">5</div>
          <div className="text-gray-500">Due Soon</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="text-green-500 text-2xl font-bold">28</div>
          <div className="text-gray-500">Submitted</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="text-red-500 text-2xl font-bold">3</div>
          <div className="text-gray-500">Late</div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="bg-white p-4 rounded shadow">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-file-alt text-blue-500"></i>
                <div className="text-blue-500 font-bold">
                  Mathematics Assignment #4
                </div>
              </div>
              <div className="text-gray-500">Grade 10-A • Due Oct 25, 2023</div>
              <div className="text-gray-700">
                Complete exercises 12-15 from Chapter 3: Quadratic Equations
              </div>
            </div>
            <div className="text-right">
              <div className="text-gray-500">Submissions</div>
              <div className="text-blue-500 font-bold">15/30</div>
              <a href="#" className="text-blue-500">
                View Details
              </a>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-file-alt text-yellow-500"></i>
                <div className="text-yellow-500 font-bold">
                  Physics Lab Report
                </div>
              </div>
              <div className="text-gray-500">Grade 11-B • Due Oct 27, 2023</div>
              <div className="text-gray-700">
                Write a detailed report on the pendulum experiment conducted in
                class
              </div>
            </div>
            <div className="text-right">
              <div className="text-gray-500">Submissions</div>
              <div className="text-yellow-500 font-bold">8/25</div>
              <a href="#" className="text-blue-500">
                View Details
              </a>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-check-circle text-green-500"></i>
                <div className="text-green-500 font-bold">Chemistry Quiz</div>
              </div>
              <div className="text-gray-500">
                Grade 10-C • Completed Oct 20, 2023
              </div>
              <div className="text-gray-700">
                Quiz on Chemical Bonding and Molecular Structure
              </div>
            </div>
            <div className="text-right">
              <div className="text-gray-500">Average Score</div>
              <div className="text-green-500 font-bold">85%</div>
              <a href="#" className="text-blue-500">
                View Results
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-between items-center">
        <div className="text-gray-500">Showing 1 to 3 of 12 assignments.</div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 border border-gray-300 rounded">
            Previous
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded bg-blue-500 text-white">
            1
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded">
            2
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded">
            3
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Assignments;
