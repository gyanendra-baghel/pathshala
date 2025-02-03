import { Outlet } from "react-router-dom";
import { Sidebar } from "../Sidebar";
import { useAuth } from "../../hooks/useAuth";
import AccessDenied from "../AccessDenied";

interface DashboardProps {
  role: "admin" | "teacher" | "student";
}

const Dashboard: React.FC<DashboardProps> = ({ role }) => {
  const { user, login } = useAuth();

  if (!user || user.role !== role) {
    login("gyan@gmail.com", "admin");
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
