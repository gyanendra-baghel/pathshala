import React from "react";
import { Link } from "react-router-dom";

const UnderProduction: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="p-8 rounded-lg text-center">
        <h1 className="text-3xl font-bold mb-4">Page Under Production</h1>
        <p className="text-gray-600 mb-8">
          We're working hard to bring you this page. Please check back later.
        </p>
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

export default UnderProduction;
