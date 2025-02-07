import { Outlet } from "react-router-dom";
import { Sidebar } from "../Sidebar";
import AccessDenied from "../AccessDenied";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { UserRole } from "../../utils/types";

export function StudentDashboard() {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user || user.role !== UserRole.STUDENT) {
    return <AccessDenied />;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role={UserRole.STUDENT} />
      <div className="flex-1 p-8 bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
}
