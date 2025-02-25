import React from "react";
import { Report } from "../../utils/types";

const Reports: React.FC = () => {
  const reports: Report[] = [
    {
      id: "1",
      title: "Bullying Incident",
      description: "My child was bullied in the playground.",
      date: "2023-10-01",
      parentName: "John Doe",
      studentName: "Jane Doe",
      grade: "5th",
    },
    {
      id: "2",
      title: "Homework Issue",
      description: "The homework assigned is too difficult.",
      date: "2023-10-02",
      parentName: "Mary Smith",
      studentName: "Tom Smith",
      grade: "6th",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Parent Reports</h2>
      <div className="grid gap-4">
        {reports.length === 0 ? (
          <p className="text-gray-600">No reports available.</p>
        ) : (
          reports.map((report) => (
            <div key={report.id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">{report.title}</h3>
                <span className="text-gray-500">{report.date}</span>
              </div>
              <p className="text-gray-600 mb-4">{report.description}</p>
              <div className="flex items-center gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Parent Name:
                  </label>
                  <span className="text-gray-700">{report.parentName}</span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Student Name:
                  </label>
                  <span className="text-gray-700">{report.studentName}</span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Grade:
                  </label>
                  <span className="text-gray-700">{report.grade}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Reports;
