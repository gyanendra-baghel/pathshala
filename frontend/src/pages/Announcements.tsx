import React, { useEffect, useState } from "react";
import { Announcement } from "../utils/types";
import API from "../utils/api";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import LoadingCard from "../components/ui/LoadingCard";
import { AlertTriangle, Bell, Calendar, Plus, Send, X } from "lucide-react";
import { Field, Form, Formik } from "formik";
import InputField from "../components/form/InputField";
import * as Yup from "yup";

// Validation Schema
const AnnouncementSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .max(100, "Title must be at most 100 characters"),
  description: Yup.string()
    .required("Content is required")
    .max(1000, "Content must be at most 1000 characters"),
});

const Announcements: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setLoading(true);
        const response = await API.get("/announcements");
        if (response.status === 200) {
          // Sort announcements by creation date (newest first)
          const sortedAnnouncements = response.data.sort(
            (a: Announcement, b: Announcement) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          setAnnouncements(sortedAnnouncements);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  const handleCreateAnnouncement = async (
    values: { title: string; description: string; important: boolean },
    { resetForm, setSubmitting }: any
  ) => {
    try {
      const response = await API.post("/announcements", {
        ...values,
        createdAt: new Date().toISOString(),
      });

      if (response.status === 201) {
        // Add new announcement to the top of the list
        setAnnouncements([response.data, ...announcements]);
        resetForm();
        setIsCreating(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingCard />;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center">
          <Bell className="mr-3 text-blue-500" size={32} />
          Announcements
        </h1>
        {user?.role === "MAIN_ADMIN" && (
          <button
            onClick={() => setIsCreating(!isCreating)}
            className={`
              flex items-center px-4 py-2 rounded-lg transition-colors
              ${
                isCreating
                  ? "bg-red-50 text-red-600 hover:bg-red-100"
                  : "bg-blue-50 text-blue-600 hover:bg-blue-100"
              }
            `}
          >
            {isCreating ? (
              <>
                Cancel <X className="ml-2" size={16} />
              </>
            ) : (
              <>
                Create <Plus className="ml-2" size={16} />
              </>
            )}
          </button>
        )}
      </div>
      {/* Create Announcement Form */}
      {isCreating && user?.role === "MAIN_ADMIN" && (
        <div className="mb-8 bg-white shadow-md rounded-lg p-6">
          <Formik
            initialValues={{
              title: "",
              description: "",
              important: false,
            }}
            validationSchema={AnnouncementSchema}
            onSubmit={handleCreateAnnouncement}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <InputField label="Title" name="title" />
                <InputField
                  label="Content"
                  name="description"
                  type="textarea"
                />
                <div className="flex items-center">
                  <Field
                    type="checkbox"
                    name="important"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Mark as important
                  </label>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="
                      flex items-center 
                      bg-blue-500 text-white 
                      px-4 py-2 rounded-lg 
                      hover:bg-blue-600 
                      transition-colors
                      disabled:opacity-50
                    "
                  >
                    Create Announcement <Send className="ml-2" size={16} />
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}

      {/* Announcement List */}
      <div className="space-y-4">
        {announcements.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No announcements yet
          </div>
        ) : (
          announcements.map((announcement) => (
            <div
              key={announcement.id}
              className={`
                p-5 rounded-lg shadow-md transition-all
                ${
                  announcement.important
                    ? "bg-red-50 border-l-4 border-red-500"
                    : "bg-gray-50"
                }
              `}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  {announcement.title}
                </h3>
                {announcement.important && (
                  <span
                    className="
                    flex items-center 
                    px-2 py-1 text-sm 
                    bg-red-100 text-red-800 
                    rounded-full
                  "
                  >
                    <AlertTriangle className="mr-1" size={14} />
                    Important
                  </span>
                )}
              </div>
              <p className="text-gray-700 mb-3">{announcement.description}</p>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="mr-2" size={16} />
                {new Date(announcement.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Announcements;
