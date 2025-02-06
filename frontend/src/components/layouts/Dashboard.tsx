import { Outlet } from "react-router-dom";
import { Sidebar } from "../Sidebar";
import { useAuth } from "../../hooks/useAuth";
import AccessDenied from "../AccessDenied";

interface DashboardProps {
  role: "ADMIN" | "TEACHER" | "STUDENT";
}

const Dashboard: React.FC<DashboardProps> = ({ role }) => {
  const { user } = useAuth();

  if (!user || user.role !== role) {
    return <AccessDenied />;
  }
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar role={role} />
      <div className="flex-1 p-8 bg-gray-50 overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
