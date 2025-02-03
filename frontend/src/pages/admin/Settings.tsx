import React, { useState } from "react";

interface Section {
  title: string;
  description: string;
  component: JSX.Element;
}

const Settings: React.FC = () => {
  const [activeSection, setActiveSection] =
    useState<string>("General Settings");
  const [emailNotifications, setEmailNotifications] = useState<boolean>(true);
  const [smsNotifications, setSmsNotifications] = useState<boolean>(true);
  const [paymentReceipts, setPaymentReceipts] = useState<boolean>(true);

  const sections: Record<string, Section> = {
    "General Settings": {
      title: "General Settings",
      description: "Manage your basic system preferences.",
      component: (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">General Settings</h2>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              School Name
            </label>
            <input
              type="text"
              value="Delhi Public School"
              className="w-full p-2 border border-gray-300 rounded"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Academic Year
            </label>
            <input
              type="text"
              value="2023-24"
              className="w-full p-2 border border-gray-300 rounded bg-gray-100"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Currency Format
            </label>
            <input
              type="text"
              value="₹ (INR)"
              className="w-full p-2 border border-gray-300 rounded bg-gray-100"
              readOnly
            />
          </div>
        </div>
      ),
    },
    "Payment Gateway": {
      title: "Payment Gateway",
      description: "Manage your payment gateway configurations.",
      component: (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Payment Gateway</h2>
          <div className="mb-4 flex justify-between items-center p-4 bg-gray-100 rounded">
            <div>
              <p className="font-medium">Razorpay</p>
              <p className="text-gray-500">Connected</p>
            </div>
            <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded">
              Configure
            </button>
          </div>
          <div className="flex justify-between items-center p-4 bg-gray-100 rounded">
            <div>
              <p className="font-medium">Stripe</p>
              <p className="text-gray-500">Not connected</p>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              Connect
            </button>
          </div>
        </div>
      ),
    },
    Notifications: {
      title: "Notification Settings",
      description: "Configure how notifications are sent to users.",
      component: (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-medium">Email Notifications</h3>
              <p className="text-gray-500">Send fee reminders via email</p>
            </div>
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={() => setEmailNotifications(!emailNotifications)}
            />
          </div>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-medium">SMS Notifications</h3>
              <p className="text-gray-500">Send fee reminders via SMS</p>
            </div>
            <input
              type="checkbox"
              checked={smsNotifications}
              onChange={() => setSmsNotifications(!smsNotifications)}
            />
          </div>
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium">Payment Receipts</h3>
              <p className="text-gray-500">Auto-send receipts after payment</p>
            </div>
            <input
              type="checkbox"
              checked={paymentReceipts}
              onChange={() => setPaymentReceipts(!paymentReceipts)}
            />
          </div>
        </div>
      ),
    },
    "Automation Rules": {
      title: "Automation Rules",
      description: "Set up automated actions for your system.",
      component: (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Automation Rules</h2>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-medium">Late Fee Calculation</h3>
              <p className="text-gray-500">Automatically calculate late fees</p>
            </div>
            <a href="#" className="text-blue-500">
              Configure Rules
            </a>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium">Payment Reminders</h3>
              <p className="text-gray-500">Schedule automated reminders</p>
            </div>
            <a href="#" className="text-blue-500">
              Set Schedule
            </a>
          </div>
        </div>
      ),
    },
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-2">Settings</h1>
      <p className="text-gray-600 mb-6">
        {sections[activeSection].description}
      </p>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 mb-6 md:mb-0">
          <ul className="space-y-4">
            {Object.keys(sections).map((section) => (
              <li
                key={section}
                className={`cursor-pointer ${
                  activeSection === section
                    ? "text-blue-600 font-semibold"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveSection(section)}
              >
                {section}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full md:w-3/4">
          {sections[activeSection].component}
        </div>
      </div>
    </div>
  );
};

export default Settings;
