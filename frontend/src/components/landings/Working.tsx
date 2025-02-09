import React from "react";

const Working: React.FC = () => {
  return (
    <div className="flex flex-col items-center py-12 mx-auto bg-gray-900  text-white ">
      <h1 className="text-3xl font-boldmb-2">How Pathashala Works</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Get started with our platform in three simple steps
      </p>
      <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8">
        <div className="flex flex-col items-center text-center max-w-64">
          <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <span className="text-xl font-bold">1</span>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">
            Register Your School
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Fill out a simple registration form with your school details and
            create your account
          </p>
          <div className="bg-gray-800 p-4 rounded-lg text-left">
            <p className="text-white">
              <i className="fas fa-check text-blue-500 dark:text-blue-300 mr-2"></i>
              Basic school information
            </p>
            <p className="text-white">
              <i className="fas fa-check text-blue-500 dark:text-blue-300 mr-2"></i>
              Contact details
            </p>
            <p className="text-white">
              <i className="fas fa-check text-blue-500 dark:text-blue-300 mr-2"></i>
              Choose your plan
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center text-center max-w-64">
          <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <span className="text-xl font-bold">2</span>
          </div>
          <h2 className="text-xl font-semibold text-white dark:text-gray-200 mb-2">
            Set Up Your Profile
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Complete your profile by adding necessary details and documents
          </p>
          <div className="bg-gray-800 text-white p-4 rounded-lg text-left">
            <p>
              <i className="fas fa-check text-blue-500 dark:text-blue-300 mr-2"></i>
              Add school logo
            </p>
            <p>
              <i className="fas fa-check text-blue-500 dark:text-blue-300 mr-2"></i>
              Upload documents
            </p>
            <p>
              <i className="fas fa-check text-blue-500 dark:text-blue-300 mr-2"></i>
              Verify email
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center text-center max-w-64">
          <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <span className="text-xl font-bold">3</span>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">
            Start Using Pathashala
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Explore the features and start managing your school efficiently
          </p>
          <div className="bg-gray-800 text-white p-4 rounded-lg text-left">
            <p>
              <i className="fas fa-check text-blue-500 dark:text-blue-300 mr-2"></i>
              Manage students
            </p>
            <p>
              <i className="fas fa-check text-blue-500 dark:text-blue-300 mr-2"></i>
              Track attendance
            </p>
            <p>
              <i className="fas fa-check text-blue-500 dark:text-blue-300 mr-2"></i>
              Generate reports
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Working;
