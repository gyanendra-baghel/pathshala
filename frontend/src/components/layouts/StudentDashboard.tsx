import { Outlet } from "react-router-dom";
import { Sidebar } from "../Sidebar";
import { useAuth } from "../../hooks/useAuth";
import AccessDenied from "../AccessDenied";

export function StudentDashboard() {
  const { user } = useAuth();

  if (!user || user.role !== "student") {
    return <AccessDenied />;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role="student" />
      <div className="flex-1 p-8 bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
}
