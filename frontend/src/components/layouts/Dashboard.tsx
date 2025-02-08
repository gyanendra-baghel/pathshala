import { Outlet } from "react-router-dom";
import { Sidebar } from "../Sidebar";
import AccessDenied from "../AccessDenied";
import { UserRole } from "../../utils/types";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface DashboardProps {
  roles: UserRole[];
}

const Dashboard: React.FC<DashboardProps> = ({ roles }) => {
  const { user, loading } = useSelector((state: RootState) => state.auth);

  if (loading) {
    return <div>Loading...</div>;
  }

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
