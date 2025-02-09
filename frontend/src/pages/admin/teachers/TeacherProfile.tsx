import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Teacher } from "../../../utils/types";
import API from "../../../utils/api";
import { Form, Formik } from "formik";
import InputField from "../../../components/form/InputField";

const TeacherProfile: React.FC = () => {
  const { teacherId } = useParams<{ teacherId: string }>();
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchTeacher = async () => {
      const response = await API.get(`/teachers/${teacherId}`);
      if (response.status === 200) {
        setTeacher(response.data);
      }
    };
    fetchTeacher();
  }, [teacherId]);

  if (!teacherId || !teacher) {
    return <div>Loading...</div>;
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
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TeacherProfile;
