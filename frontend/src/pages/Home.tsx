import { Link } from "react-router-dom";
import Footer from "../components/landings/Footer";
import Header from "../components/landings/Header";
import Features from "../components/landings/Features";
import Pricings from "../components/landings/Pricings";
import Working from "../components/landings/Working";
import Testamonial from "../components/landings/Testamonials";
import Booking from "../components/landings/Booking";

export function LandingPage() {
  return (
    <div className="">
      <Header />
      <div className="bg-gray-900 text-white">
        <div className="flex justify-center items-center h-screen pt-20">
          <div className="md:w-1/2 p-5">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Transform Your School Management with{" "}
              <span className="text-blue-500">Pathashala</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-6">
              Streamline your school operations with our comprehensive platform.
              From attendance tracking to fee management, we've got everything
              covered.
            </p>
            <div className="flex space-x-4 mb-6">
              <Link to="/register">
                <button className="bg-blue-600 text-white px-6 py-3 rounded text-lg">
                  Get Started
                </button>
              </Link>
              <button className="bg-gray-800 text-white px-6 py-3 rounded text-lg">
                Learn More
              </button>
            </div>
            <div className="hidden items-center space-x-2 text-green-500 mb-6 md:flex">
              <i className="fas fa-check"></i>
              <span>No Credit Card Required</span>
            </div>
            <div className="hidden items-center space-x-2 text-green-500 md:flex">
              <i className="fas fa-check"></i>
              <span>14-Day Free Trial</span>
            </div>
          </div>
          <div className="mt-12 bg-gray-900 p-6 rounded-lg shadow-lg hidden md:block">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-800 p-8 rounded w-80">
                <span className="text-blue-500 text-3xl font-bold">98%</span>
                <p>Attendance Rate</p>
              </div>
              <div className="bg-gray-800 p-8 rounded">
                <span className="text-green-500 text-3xl font-bold">100%</span>
                <p>Fee Collection</p>
              </div>
              <div className="bg-gray-800 p-8 rounded">
                <span className="text-purple-500 text-3xl font-bold">500+</span>
                <p>Schools Trust Us</p>
              </div>
              <div className="bg-gray-800 p-8 rounded">
                <span className="text-orange-500 text-3xl font-bold">24/7</span>
                <p>Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Features />
      <Working />
      <Pricings />
      <Testamonial />
      <Booking />
      <Footer />
    </div>
  );
}
