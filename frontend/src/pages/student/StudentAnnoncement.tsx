import React from "react";
import { Announcement } from "../../utils/types";

const StudentAnnoncement: React.FC = () => {
  const announcements: Announcement[] = [];
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Announcements</h2>
      </div>
      <div className="grid gap-4">
        {announcements.map((announcement) => (
          <div key={announcement.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{announcement.title}</h3>
              {announcement.important && (
                <span className="px-2 py-1 rounded text-sm bg-red-100 text-red-800">
                  Important
                </span>
              )}
            </div>
            <p className="text-gray-600 mt-2">{announcement.description}</p>
            <p className="text-gray-500 text-sm mt-2">
              Posted on: {announcement.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentAnnoncement;
