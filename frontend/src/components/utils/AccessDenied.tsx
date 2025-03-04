import React from "react";
import { Link } from "react-router-dom";
import { Lock } from "lucide-react";

const AccessDenied: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="text-center max-w-md w-full">
        <div className="flex justify-center mb-6">
          <Lock className="text-red-500 w-16 h-16" strokeWidth={1.5} />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-3">
          Access Restricted
        </h1>
        <p className="text-gray-600 mb-6">
          You do not have the necessary permissions to access this page.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/login"
            className="
              px-4 py-2 
              bg-blue-500 
              text-white 
              rounded-md 
              hover:bg-blue-600 
              transition-colors
              flex items-center
              gap-2
            "
          >
            Sign In
          </Link>
          <Link
            to="/"
            className="
              px-4 py-2 
              bg-gray-200 
              text-gray-700 
              rounded-md 
              hover:bg-gray-300 
              transition-colors
              flex items-center
              gap-2
            "
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccessDenied;
