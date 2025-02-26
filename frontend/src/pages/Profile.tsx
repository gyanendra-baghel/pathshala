import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Form, Formik } from "formik";
import InputField from "../components/form/InputField";
import AccessDenied from "../components/utils/AccessDenied";
import { User } from "../utils/types";
import { MenuCard } from "../components/ui/MenuCard";
import { EditIcon } from "lucide-react";

const Profile: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isEditing, setIsEditing] = React.useState(false);

  const handleSave = (values: User) => {
    // You can add API call here to update the student data
    console.log("Updated student data:", values);
  };

  const menuItems = [
    {
      label: "Edit",
      icon: <EditIcon />,
      onClick: () => setIsEditing(true),
    },
  ];

  if (!user) return <AccessDenied />;

  return (
    <div className="max-w-4xl mx-auto">
      <MenuCard title="Profile" menuItems={menuItems}>
        <div className="space-y-4">
          <Formik initialValues={user} onSubmit={handleSave}>
            {() => (
              <Form>
                <InputField name="email" label="Email" readOnly={true} />
                <InputField
                  name="phoneNumber"
                  label="Phone"
                  readOnly={!isEditing}
                />
                <InputField
                  name="password"
                  label="Password"
                  type="password"
                  readOnly={!isEditing}
                />
                {isEditing && (
                  <div className="flex justify-between">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="bg-gray-300 text-white px-4 py-2 rounded mt-4"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                    >
                      Save
                    </button>
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </MenuCard>
    </div>
  );
};

export default Profile;
