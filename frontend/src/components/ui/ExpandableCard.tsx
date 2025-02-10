import { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface ExpandableCardProps {
  children: React.ReactNode;
}

const ExpandableCard: React.FC<ExpandableCardProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-start min-h-screen p-6">
      {/* Side Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 bg-gray-200 rounded-full shadow-lg"
      >
        {isOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
      </button>

      {/* Expandable Card */}
      <div
        className={`transition-all duration-300 ${
          isOpen ? "w-80 opacity-100 ml-4" : "w-0 opacity-0 overflow-hidden"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default ExpandableCard;
