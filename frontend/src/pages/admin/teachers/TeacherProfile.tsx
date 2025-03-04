import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Teacher } from "../../../utils/types";
import API from "../../../utils/api";
import { Form, Formik } from "formik";
import InputField from "../../../components/form/InputField";
import LoadingCard from "../../../components/ui/LoadingCard";
import { ArrowLeft } from "lucide-react";

const TeacherProfile: React.FC = () => {
  const navigate = useNavigate();
  const { teacherId } = useParams<{ teacherId: string }>();
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTeacher = async () => {
      setLoading(true);
      try {
        const response = await API.get(`/teachers/${teacherId}`);
        if (response.status === 200) {
          setTeacher(response.data);
        }
      } catch (error) {
        console.error("Error fetching teacher", error);
      }
      setLoading(false);
    };
    fetchTeacher();
  }, [teacherId]);

  if (loading) {
    return <LoadingCard />;
  }

  const handleGoBack = () => {
    navigate(-1);
  };

  if (!teacher) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-6">
        <h2 className="text-2xl text-red-500 mb-4">{"Teacher not found"}</h2>
        <button
          onClick={handleGoBack}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          <ArrowLeft className="mr-2" /> Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold mb-6">Teacher Profile</h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>

      <Formik initialValues={teacher} onSubmit={() => {}}>
        {() => (
          <Form>
            <InputField name="name" label="Name" readOnly={!isEditing} />
            <InputField name="email" label="Email" readOnly={!isEditing} />
            <InputField name="phone" label="Phone" readOnly={!isEditing} />
            <InputField name="address" label="Address" readOnly={!isEditing} />
            <InputField
              name="dob"
              label="Date of Birth"
              readOnly={!isEditing}
            />
            <div className={`flex justify-end ${isEditing ? "" : "hidden"}`}>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TeacherProfile;
