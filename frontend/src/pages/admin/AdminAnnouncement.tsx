import React, { useEffect, useState } from "react";
import { Announcement } from "../../utils/types";
import API from "../../utils/api";

const AdminAnnouncement: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [important, setImportant] = useState(false);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await API.get("/announcements");
        if (response.status === 200) {
          console.log(response.data);
          setAnnouncements(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAnnouncements();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newAnnouncement = {
      title,
      description: content,
      important,
    };

    const response = await API.post("/announcements", newAnnouncement);
    if (response.status === 201) {
      setAnnouncements([...announcements, response.data]);
      setTitle("");
      setContent("");
      setImportant(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Create New Announcement</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border rounded-lg"
            rows={4}
            required
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={important}
            onChange={(e) => setImportant(e.target.checked)}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-900">
            Mark as important
          </label>
        </div>
        <div>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Create Announcement
          </button>
        </div>
      </form>
      <h2 className="text-2xl font-bold mt-8 mb-4">Previous Announcements</h2>
      <div className="space-y-4">
        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className="bg-gray-100 p-4 rounded-lg shadow"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{announcement.title}</h3>
              {announcement.important && (
                <span className="px-2 py-1 text-sm bg-red-100 text-red-800 rounded">
                  Important
                </span>
              )}
            </div>
            <p className="text-gray-700 mt-2">{announcement.description}</p>
            <p className="text-gray-500 text-sm mt-2">
              Posted on: {announcement.createdAt}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAnnouncement;
