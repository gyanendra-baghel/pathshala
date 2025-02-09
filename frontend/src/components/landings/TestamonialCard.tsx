import React from "react";

const TestamonialCard: React.FC = () => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md m-4">
      <div className="flex items-center mb-4">
        <div className="bg-green-100 p-2 rounded-full">
          <i className="fas fa-quote-left text-green-500"></i>
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-medium">Mrs. Priya Sharma</h3>
          <p className="text-gray-400">Administrator, Modern School</p>
        </div>
      </div>
      <p className="mb-4">
        "The analytics and reporting features have given us valuable insights
        into our school's performance. The customer support team is always there
        when we need them."
      </p>
      <div className="flex">
        <i className="fas fa-star text-yellow-500"></i>
        <i className="fas fa-star text-yellow-500"></i>
        <i className="fas fa-star text-yellow-500"></i>
        <i className="fas fa-star text-yellow-500"></i>
        <i className="fas fa-star text-yellow-500"></i>
      </div>
    </div>
  );
};

export default TestamonialCard;
