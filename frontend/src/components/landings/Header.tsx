import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 w-screen flex justify-between items-center p-3 bg-gray-900 text-white z-50">
      <nav className="container mx-auto flex justify-between items-center bg-gray-900 text-white z-50">
        <Link to="/" className="flex items-center text-2xl font-bold ml-2">
          <img src="/logo.png" alt="Pathshala" className="w-8 h-8" />
          <p className="ml-2">Pathashala</p>
        </Link>

        <Link
          to="/login"
          className="bg-blue-600 text-white px-6 py-2 rounded-full"
        >
          Login
        </Link>
      </nav>
    </header>
  );
};

export default Header;
