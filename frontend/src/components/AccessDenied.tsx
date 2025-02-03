import React from "react";
import { Link } from "react-router-dom";

const AccessDenied: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied</h1>
      <p className="text-lg text-gray-700 mb-8">
        You do not have permission to view this page.
      </p>
      <div>
        <Link
          to="/"
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default AccessDenied;
