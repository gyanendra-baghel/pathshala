import React, { useRef } from "react";
import PricingCard from "./PricingCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pricings: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 300; // Adjust scroll amount as needed
      current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };
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
      <h1 className="text-3xl font-bold mb-2 text-center">
        Simple, Transparent Pricing
      </h1>
      <p className="text-gray-400 mb-8">
        Choose the perfect plan for your school
      </p>
      <div className="relative flex items-center space-x-4 w-full max-w-4xl mx-auto">
        {/* Left Scroll Button */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 shadow-lg rounded-full"
        >
          <ChevronLeft size={24} />
        </button>
        {/* Pricing Cards */}
        <div
          className="flex space-x-2 overflow-x-auto scrollbar-hide scroll-smooth"
          ref={scrollRef}
          style={{ scrollBehavior: "smooth", scrollbarWidth: "none" }}
        >
          {plans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>
        {/* Right Scroll Button */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 shadow-lg rounded-full"
        >
          <ChevronRight size={24} />
        </button>
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
