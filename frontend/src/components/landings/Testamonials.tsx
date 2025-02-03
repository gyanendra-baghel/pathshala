import React from "react";
import TestamonialCard from "./TestamonialCard";

const Testamonials: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold">
          Trusted by Schools Across India
        </h2>
        <p className="mt-4 text-lg text-gray-400">
          See what school administrators are saying about Pathashala
        </p>
      </div>
      <div className="mt-10 flex items-center justify-center w-full">
        <TestamonialCard />
        <TestamonialCard />
        <TestamonialCard />
      </div>
      <div className="mt-10 text-center">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
          Read More Success Stories →
        </button>
      </div>
    </div>
  );
};

export default Testamonials;
