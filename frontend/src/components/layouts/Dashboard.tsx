import { Outlet } from "react-router-dom";
import { Sidebar } from "../Sidebar";
import { useAuth } from "../../hooks/useAuth";
import AccessDenied from "../AccessDenied";
import { useEffect } from "react";
import { UserRole } from "../../utils/types";

interface DashboardProps {
  roles: UserRole[];
}

const Dashboard: React.FC<DashboardProps> = ({ roles }) => {
  const { user, authenticate } = useAuth();

  useEffect(() => {
    if (!user) {
      authenticate();
    }
  });

  if (!user || !roles.includes(user.role)) {
    return <AccessDenied />;
  }
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar role={roles[0]} />
      <div className="flex-1 p-8 bg-gray-50 overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
