import React from "react";
import { useAppContext } from "../context/AppContext";

const Announcement: React.FC = () => {
  const { announcements } = useAppContext();

  // Sort announcements by date in descending order and get the newest 5
  const newestAnnouncements = announcements
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-4 bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold">Latest Announcements</h2>
      <div className="grid gap-4">
        {newestAnnouncements.map((announcement) => (
          <div key={announcement.id} className="bg-gray-50 p-4">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{announcement.title}</h3>
              {announcement.important && (
                <span className="px-2 py-1 rounded text-sm bg-red-100 text-red-800">
                  Important
                </span>
              )}
            </div>
            <p className="text-gray-600 mt-2">{announcement.content}</p>
            <p className="text-gray-500 text-sm mt-2">
              Posted on: {announcement.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcement;
