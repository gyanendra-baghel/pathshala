import React from "react";

interface PricingCardProps {
  plan: string;
  price: string;
  description: string;
  features: { text: string; included: boolean }[];
  buttonText: string;
  isHighlighted: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({
  plan,
  price,
  description,
  features,
  buttonText,
  isHighlighted,
}) => (
  <div
    className={`bg-white rounded-lg p-10 shadow-lg ${
      isHighlighted ? "border-2 border-blue-500" : ""
    }`}
  >
    <div className="relative">
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full">
        {plan}
      </div>
    </div>
    <div className="text-center mt-6">
      <div className="text-4xl font-bold">{price}</div>
      <div className="text-gray-400">{description}</div>
    </div>
    <ul className="mt-6 space-y-4">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center">
          <i
            className={`fas fa-${feature.included ? "check" : "times"} text-${
              feature.included ? "green" : "red"
            }-500 mr-2`}
          ></i>
          <span
            className={`${
              !feature.included ? "text-gray-500 line-through" : ""
            }`}
          >
            {feature.text}
          </span>
        </li>
      ))}
    </ul>
    <button className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">
      {buttonText}
    </button>
  </div>
);

export default PricingCard;
