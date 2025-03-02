import React, { useEffect } from "react";
import { Announcement } from "../utils/types";
import API from "../utils/api";

const AnnouncementSection: React.FC = () => {
  const [announcements, setAnnouncements] = React.useState<Announcement[]>([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await API.get("/announcements");
        if (response.status === 200) {
          const data = response.data;
          if (typeof data == "object") {
            setAnnouncements(
              data
                .sort(
                  (a: Announcement, b: Announcement) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                )
                .slice(0, 2)
            );
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAnnouncements();
  }, []);

  return (
    <div className="space-y-4 bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold">Latest Announcements</h2>
      <div className="grid gap-4">
        {announcements.length === 0 && (
          <div className="text-gray-600 text-center">No announcements</div>
        )}
        {announcements.map((announcement) => (
          <div key={announcement.id} className="bg-gray-50 p-4">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{announcement.title}</h3>
              {announcement.important && (
                <span className="px-2 py-1 rounded text-sm bg-red-100 text-red-800">
                  Important
                </span>
              )}
            </div>
            <p className="text-gray-600 mt-2">{announcement.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementSection;
