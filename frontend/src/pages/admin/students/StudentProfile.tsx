import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../../../context/AppContext";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachMonthOfInterval,
} from "date-fns";
import InputField from "../../../components/InputField";
import { Fee, Student } from "../../../utils/types";
import { studentSchema } from "../../../utils/model";
import { Megaphone, PencilLine, Trash2 } from "lucide-react";
import ImageUploadField from "../../../components/ImageUploadField";
import { getMonthlyFees } from "../../../services/feeService";
import ErrorPage from "../../../components/layouts/ErrorPage";

// TODO: Add Parents Details
// TODO: Are you confirm before delete
// TODO: Add Address Details

const StudentDetails: React.FC = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const { students, fees, updateFee, removeFee, updateStudent, removeStudent } =
    useAppContext();
  const navigate = useNavigate();

  const student = students.find((s) => s.id === studentId);
  const studentFees = fees.filter((fee) => fee.studentId === studentId);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [details, setDetails] = useState<Student>({
    id: student?.id || "",
    name: student?.name || "",
    class: student?.class || "",
    rollNumber: student?.rollNumber || "",
    email: student?.email || "",
    adhaarNumber: student?.adhaarNumber || "",
    samagraId: student?.samagraId || "",
    photo: student?.photo || "",
    fatherAdhaarNumber: student?.fatherAdhaarNumber || "",
  });

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as HTMLElement)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!studentId || !student) {
    return <ErrorPage message="Student Not Found" />;
  }

  const handleUpdateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    updateStudent({ ...details });
    setIsEditing(false);
  };

  const handleRemoveStudent = () => {
    removeStudent(studentId);
    navigate("/admin/students");
  };

  const getLast12Months = () => {
    const now = new Date();
    const start = startOfMonth(now);
    const end = endOfMonth(now);
    return eachMonthOfInterval({
      start: new Date(start.setMonth(start.getMonth() - 11)),
      end,
    });
  };

  const getStatusColor = (status: Fee["status"]) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-red-100 text-red-800 border-red-200";
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  return (
    <div className="mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between">
        <div className="flex-grow m-3">
          <div className="flex items-center justify-between">
            <ImageUploadField
              label="profile"
              name="Profile"
              onChange={() => {}}
            />
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <div className="flex flex-col items-center justify-center w-5 h-5">
                  <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                  <div className="w-1 h-1 bg-gray-600 rounded-full my-0.5"></div>
                  <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                </div>
              </button>
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                  <ul className="py-1">
                    <li>
                      <Link
                        to={`/admin/attendance/${student.id}`}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        {" "}
                        <Megaphone className="mr-2" />
                        Attendence
                      </Link>
                    </li>
                    <li>
                      {!isEditing && (
                        <button
                          onClick={() => setIsEditing(true)}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        >
                          <PencilLine className="text-black mr-2" />
                          Edit
                        </button>
                      )}
                    </li>
                    <li>
                      <button
                        onClick={handleRemoveStudent}
                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 flex items-center"
                      >
                        <Trash2 className="text-red-500 mr-2" />
                        Delete
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <form
            onSubmit={handleUpdateStudent}
            className="grid grid-cols-2 gap-4"
          >
            {studentSchema.map((field) => (
              <InputField
                key={field.name}
                label={field.label}
                name={field.name}
                value={details[field.name]}
                onChange={handleInputChange}
                readOnly={!isEditing}
                required={field.required || false}
              />
            ))}
            {isEditing && (
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            )}
          </form>
          <h2>Parent Details</h2>
          <InputField
            label="Mobile Number"
            name="mobile-no"
            value=""
            onChange={(e) => {}}
            readOnly={false}
            required={true}
          />
          <InputField
            label="Father Name"
            name="father-name"
            value=""
            onChange={(e) => {}}
            readOnly={false}
            required={true}
          />
        </div>
        <div className="flex-grow m-3">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Fees Status</h3>
              <Link
                to={`/admin/pay-fee/${student.id}`}
                className="text-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              >
                Pay Fee
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {getLast12Months().map((month) => {
                const monthKey = format(month, "MMMM yyyy");
                const feeStatus: Fee["status"] =
                  getMonthlyFees(student.id, fees)[monthKey]?.status ||
                  "unpaid";
                return (
                  <div
                    key={monthKey}
                    className={`p-4 rounded-lg shadow text-center ${getStatusColor(
                      feeStatus
                    )}`}
                  >
                    <h3 className="font-semibold">{format(month, "MMMM")}</h3>
                    <p className="text-sm">{format(month, "yyyy")}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-semibold mt-8 mb-4">Fees History</h3>
            <div className="grid gap-4">
              {studentFees.map((fee) => (
                <div key={fee.id} className="bg-white p-4 rounded-lg shadow">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">{fee.description}</h3>
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        fee.status === "paid"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {fee.status}
                    </span>
                  </div>
                  <p className="text-gray-600">Amount: ${fee.amount}</p>
                  <p className="text-gray-600">Due Date: {fee.dueDate}</p>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() =>
                        updateFee({
                          ...fee,
                          status: fee.status === "paid" ? "pending" : "paid",
                        })
                      }
                      className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                    >
                      Toggle Status
                    </button>
                    <button
                      onClick={() => removeFee(fee.id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
