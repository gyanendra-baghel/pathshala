import React from "react";

const TeacherBoard: React.FC = () => {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-gray-600">Total Students</h2>
            <p className="text-3xl font-semibold">156</p>
          </div>
          <div className="text-blue-500 text-3xl">
            <i className="fas fa-users"></i>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-gray-600">Attendance Rate</h2>
            <p className="text-3xl font-semibold">92%</p>
          </div>
          <div className="text-green-500 text-3xl">
            <i className="fas fa-check-circle"></i>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-gray-600">Average Grade</h2>
            <p className="text-3xl font-semibold">B+</p>
          </div>
          <div className="text-yellow-500 text-3xl">
            <i className="fas fa-chart-pie"></i>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-gray-600">Pending Tasks</h2>
            <p className="text-3xl font-semibold">23</p>
          </div>
          <div className="text-red-500 text-3xl">
            <i className="fas fa-clock"></i>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <img
                src="https://placehold.co/50x50"
                alt="User avatar"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p>Sarah Johnson submitted Math Assignment #3</p>
                <p className="text-gray-500 text-sm">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <img
                src="https://placehold.co/50x50"
                alt="User avatar"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p>Michael Chen marked absent in Physics class</p>
                <p className="text-gray-500 text-sm">4 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <img
                src="https://placehold.co/50x50"
                alt="User avatar"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p>Emma Wilson scored 95% in Chemistry Quiz</p>
                <p className="text-gray-500 text-sm">Yesterday</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Today's Classes</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">Mathematics</p>
                <p className="text-gray-500 text-sm">Grade 10-A</p>
              </div>
              <p className="text-blue-500">9:00 AM</p>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">Physics</p>
                <p className="text-gray-500 text-sm">Grade 11-B</p>
              </div>
              <p className="text-blue-500">11:00 AM</p>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">Chemistry</p>
                <p className="text-gray-500 text-sm">Grade 10-C</p>
              </div>
              <p className="text-blue-500">2:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-xl font-semibold mb-4">Recent Assignments</h2>
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="pb-2">ASSIGNMENT</th>
              <th className="pb-2">CLASS</th>
              <th className="pb-2">DUE DATE</th>
              <th className="pb-2">STATUS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2">Math Problem Set #4</td>
              <td className="py-2">Grade 10-A</td>
              <td className="py-2">Oct 25, 2023</td>
              <td className="py-2">
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                  In Progress
                </span>
              </td>
            </tr>
            <tr>
              <td className="py-2">Physics Lab Report</td>
              <td className="py-2">Grade 11-B</td>
              <td className="py-2">Oct 27, 2023</td>
              <td className="py-2">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                  Completed
                </span>
              </td>
            </tr>
            <tr>
              <td className="py-2">Chemistry Quiz</td>
              <td className="py-2">Grade 10-C</td>
              <td className="py-2">Oct 30, 2023</td>
              <td className="py-2">
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded">
                  Pending
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherBoard;
