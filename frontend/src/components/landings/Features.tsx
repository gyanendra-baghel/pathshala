import React from "react";

const Features: React.FC = () => {
  const features = [
    {
      icon: "fas fa-clipboard-list",
      title: "Attendance Management",
      description:
        "Track student and staff attendance digitally with automated reports and notifications.",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-500",
    },
    {
      icon: "fas fa-dollar-sign",
      title: "Fee Management",
      description:
        "Streamline fee collection with automated billing, receipts, and payment tracking.",
      bgColor: "bg-green-100",
      iconColor: "text-green-500",
    },
    {
      icon: "fas fa-chart-line",
      title: "Performance Analytics",
      description:
        "Monitor academic performance with detailed analytics and progress tracking.",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-500",
    },
    {
      icon: "fas fa-calendar-alt",
      title: "Timetable Management",
      description:
        "Create and manage class schedules with conflict detection and easy updates.",
      bgColor: "bg-red-100",
      iconColor: "text-red-500",
    },
    {
      icon: "fas fa-bell",
      title: "Communication Portal",
      description:
        "Keep parents informed with automated notifications and announcements.",
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-500",
    },
    {
      icon: "fas fa-cogs",
      title: "Resource Management",
      description:
        "Efficiently manage school resources, inventory, and facilities.",
      bgColor: "bg-indigo-100",
      iconColor: "text-indigo-500",
    },
  ];
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold text-center mb-4">
        Comprehensive School Management Features
      </h1>
      <p className="text-center text-gray-600 mb-12">
        Everything you need to run your school efficiently in one platform
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-full ${feature.bgColor} mb-4`}
            >
              <i
                className={`${feature.icon} ${feature.iconColor} text-2xl`}
              ></i>
            </div>
            <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
