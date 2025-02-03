import React from "react";

const Booking: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="flex justify-center items-center">
        <div className="m-4 max-w-lg">
          <h1 className="text-3xl font-bold mb-4">
            Experience Pathashala in Action
          </h1>
          <p className="mb-8">
            Schedule a personalized demo to see how Pathashala can transform
            your school's management system.
          </p>
          <form className="space-y-4">
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="school-name"
              >
                School Name
              </label>
              <input
                className="w-full p-3 border rounded"
                type="text"
                id="school-name"
                placeholder="Enter your school name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email Address
              </label>
              <input
                className="w-full p-3 border border-gray-700 rounded"
                type="email"
                id="email"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="phone">
                Phone Number
              </label>
              <input
                className="w-full p-3 border border-gray-700 rounded"
                type="tel"
                id="phone"
                placeholder="Enter your phone number"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="students"
              >
                Number of Students
              </label>
              <select
                className="w-full p-3 border border-gray-700 rounded"
                id="students"
              >
                <option>Select range</option>
                <option>1-50</option>
                <option>51-100</option>
                <option>101-200</option>
                <option>201-500</option>
                <option>500+</option>
              </select>
            </div>
            <button className="w-full p-3 bg-blue-600 rounded text-white font-bold">
              Schedule Demo
            </button>
          </form>
        </div>
        <div className="p-6 rounded shadow-lg m-4 max-w-lg">
          <h2 className="text-xl font-bold mb-4">
            What You'll Learn in the Demo:
          </h2>
          <ul className="space-y-2 mb-6">
            <li className="flex items-center">
              <i className="fas fa-check text-blue-500 mr-2"></i>
              Complete walkthrough of attendance management system
            </li>
            <li className="flex items-center">
              <i className="fas fa-check text-blue-500 mr-2"></i>
              Detailed overview of fee management and tracking
            </li>
            <li className="flex items-center">
              <i className="fas fa-check text-blue-500 mr-2"></i>
              Analytics and reporting capabilities demonstration
            </li>
            <li className="flex items-center">
              <i className="fas fa-check text-blue-500 mr-2"></i>
              Communication tools and parent portal features
            </li>
          </ul>
          <div className="flex items-center bg-blue-300 p-3 rounded">
            <i className="fas fa-bolt text-blue-500 mr-2"></i>
            The demo session typically takes 30 minutes
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
