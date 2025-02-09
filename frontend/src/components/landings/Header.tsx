import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Header: React.FC = () => {
  return (
    <nav className="fixed top-0 w-screen flex justify-between items-center p-6 bg-gray-900 text-white z-50">
      <Link to="/" className="flex items-center text-2xl font-bold ml-2">
        <img src={logo} alt="Pathshala" className="w-8 h-8" />
        <p className="ml-2">Pathashala</p>
      </Link>
      <div className="space-x-6 hidden lg:flex">
        <a href="#" className="text-white">
          Home
        </a>
        <a href="#" className="text-white">
          Features
        </a>
        <a href="#" className="text-white">
          Pricing
        </a>
        <a href="#" className="text-white">
          How It Works
        </a>
      </div>
      <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded">
        Get Demo
      </Link>
    </nav>
  );
};

export default Header;
