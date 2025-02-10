import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface AccordianCardProps {
  children: React.ReactNode;
}

const AccordianCard: React.FC<AccordianCardProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 bg-gray-200 rounded-full"
      >
        {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
      </button>

      {isOpen && <div className="p-4 bg-gray-100 mt-4">{children}</div>}
    </div>
  );
};

export default AccordianCard;
