import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface CollapsibleCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const CollapsibleCard: React.FC<CollapsibleCardProps> = ({
  title,
  children,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`w-full mx-auto bg-white rounded-lg shadow-lg p-4 ${className}`}
    >
      {/* Header Section */}
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-lg font-semibold text-black">{title}</h2>
        <button className="p-2 bg-gray-00 rounded">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      {/* Collapsible Content */}
      {isOpen && (
        <div className="mt-4 bg-gray-100 rounded-lg p-4">{children}</div>
      )}
    </div>
  );
};

export default CollapsibleCard;
