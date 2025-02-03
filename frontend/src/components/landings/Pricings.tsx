import React from "react";
import PricingCard from "./PricingCard";

const Pricings: React.FC = () => {
  const plans = [
    {
      plan: "Basic",
      price: "₹999/month",
      description: "Perfect for small schools",
      features: [
        { text: "Up to 500 students", included: true },
        { text: "Basic attendance system", included: true },
        { text: "Fee management", included: true },
        { text: "Advanced analytics", included: false },
      ],
      buttonText: "Start Free Trial",
      isHighlighted: false,
    },
    {
      plan: "Pro",
      price: "₹1999/month",
      description: "Best for growing schools",
      features: [
        { text: "Up to 2000 students", included: true },
        { text: "Advanced attendance system", included: true },
        { text: "Complete fee management", included: true },
        { text: "Basic analytics", included: true },
      ],
      buttonText: "Start Free Trial",
      isHighlighted: true,
    },
    {
      plan: "Enterprise",
      price: "₹4999/month",
      description: "For large institutions",
      features: [
        { text: "Unlimited students", included: true },
        { text: "Premium attendance system", included: true },
        { text: "Advanced fee management", included: true },
        { text: "Premium analytics", included: true },
      ],
      buttonText: "Contact Sales",
      isHighlighted: false,
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <h1 className="text-3xl font-bold mb-2">Simple, Transparent Pricing</h1>
      <p className="text-gray-400 mb-8">
        Choose the perfect plan for your school
      </p>
      <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
        {plans.map((plan, index) => (
          <PricingCard key={index} {...plan} />
        ))}
      </div>
      <div className="mt-8 text-gray-400 text-center">
        <p>All plans include:</p>
        <div className="flex space-x-4 mt-2">
          <div className="flex items-center">
            <i className="fas fa-check text-blue-500 mr-2"></i>
            <span>24/7 Support</span>
          </div>
          <div className="flex items-center">
            <i className="fas fa-check text-blue-500 mr-2"></i>
            <span>Free Updates</span>
          </div>
          <div className="flex items-center">
            <i className="fas fa-check text-blue-500 mr-2"></i>
            <span>Data Security</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricings;
