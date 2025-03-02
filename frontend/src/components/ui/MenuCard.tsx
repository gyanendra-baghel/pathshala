import React, { useState, useRef, useEffect } from "react";

export type MenuItem = {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  className?: string;
};

type CardProps = {
  title: string;
  children: React.ReactNode;
  menuItems: MenuItem[];
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
};

const MenuCard = ({
  title,
  children,
  menuItems,
  className = "",
  headerClassName = "",
  contentClassName = "",
}: CardProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}
    >
      {/* Card Header */}
      <div
        className={`px-6 py-4 flex justify-between items-center border-b border-gray-200 ${headerClassName}`}
      >
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>

        {/* Three Dot Menu */}
        {menuItems.length > 0 && (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Menu"
            >
              <div className="flex flex-col items-center justify-center w-5 h-5">
                <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-600 rounded-full my-0.5"></div>
                <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
              </div>
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                <ul className="py-1">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <button
                        onClick={() => {
                          item.onClick();
                          setIsMenuOpen(false);
                        }}
                        className={`w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center ${
                          item.className || ""
                        }`}
                      >
                        {item.icon}
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className={`px-6 py-4 ${contentClassName}`}>{children}</div>
    </div>
  );
};

export { MenuCard, type MenuItem, type CardProps };
