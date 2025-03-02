import React, { useEffect, useState } from "react";
import { MenuCard, MenuItem } from "./ui/MenuCard";
import { Form, Formik } from "formik";
import InputField from "./form/InputField";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { School, UserRole } from "../utils/types";
import { EditIcon } from "lucide-react";

const SchoolDetails: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const saveSchoolDetails = (values: School) => {
    // You can add API call here to update the school data
    console.log("Updated school data:", values);
  };

  useEffect(() => {
    if (!user) return;
    if (user.role === UserRole.MAIN_ADMIN) {
      setMenuItems([
        {
          label: "Edit",
          icon: <EditIcon />,
          onClick: () => setIsEditing(true),
        },
      ]);
    }
  }, [user]);

  if (!user) return null;

  return (
    <MenuCard title="School Details" menuItems={menuItems} className="my-4">
      {user.school && (
        <div className="space-y-4">
          <Formik initialValues={user.school} onSubmit={saveSchoolDetails}>
            {() => (
              <Form>
                <InputField name="name" label="Name" readOnly={true} />
                <InputField name="email" label="Email" readOnly={true} />
                <InputField name="phone" label="Phone" readOnly={!isEditing} />
                <InputField
                  name="schoolBoard"
                  label="School Board"
                  type="text"
                  readOnly={!isEditing}
                />
                <InputField name="address" label="Address" readOnly={true} />
                <InputField
                  name="postalCode"
                  label="Postal Code"
                  type="text"
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
      )}
    </MenuCard>
  );
};

export default SchoolDetails;
