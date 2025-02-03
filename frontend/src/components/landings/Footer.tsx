import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h2 className="text-xl font-bold mb-2">Pathashala</h2>
            <p className="mb-4">
              Transforming school management with innovative digital solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-white">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-white">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h2 className="text-xl font-bold mb-2">Quick Links</h2>
            <ul>
              <li className="mb-2">
                <a href="#" className="text-white">
                  Features
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-white">
                  Pricing
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-white">
                  Request Demo
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-white">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h2 className="text-xl font-bold mb-2">Features</h2>
            <ul>
              <li className="mb-2">
                <a href="#" className="text-white">
                  Attendance Management
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-white font-bold">
                  Fee Management
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-white">
                  Student Portal
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-white">
                  Reports & Analytics
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h2 className="text-xl font-bold mb-2">Contact Info</h2>
            <ul>
              <li className="mb-2">
                <i className="fas fa-map-marker-alt mr-2"></i>123 Tech Park,
                Bangalore, India
              </li>
              <li className="mb-2">
                <i className="fas fa-envelope mr-2"></i>support@pathashala.com
              </li>
              <li className="mb-2">
                <i className="fas fa-phone mr-2"></i>+91 123 456 7890
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-4 text-center">
          <p>© 2024 Pathashala. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="#" className="text-white">
              Privacy Policy
            </a>
            <a href="#" className="text-white">
              Terms of Service
            </a>
            <a href="#" className="text-white">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
