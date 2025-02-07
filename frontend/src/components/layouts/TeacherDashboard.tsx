import { useSelector } from "react-redux";
import AccessDenied from "../AccessDenied";
import { Sidebar } from "../Sidebar";
import { Link, Outlet } from "react-router-dom";
import { RootState } from "../../redux/store";
import { UserRole } from "../../utils/types";

export function TeacherDashboard() {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user || user.role !== UserRole.TEACHER) {
    return <AccessDenied />;
  }
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role={UserRole.TEACHER} />
      <div className="flex-1 p-8 bg-gray-50">
        <div className="flex items-center justify-between p-4 bg-white shadow-sm">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 border rounded-full text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>
          <div className="flex items-center space-x-4">
            <i className="fas fa-bell text-gray-500"></i>
            <Link to="/profile" className="text-gray-500">
              <img
                src="https://placehold.co/40x40"
                alt="User avatar"
                className="w-10 h-10 rounded-full"
              />
            </Link>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
