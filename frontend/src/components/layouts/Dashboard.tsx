import { Outlet } from "react-router-dom";
import { Sidebar } from "../Sidebar";
import AccessDenied from "../AccessDenied";
import { useEffect } from "react";
import { UserRole } from "../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { authenticateUser } from "../../redux/features/authSlice";

interface DashboardProps {
  roles: UserRole[];
}

const Dashboard: React.FC<DashboardProps> = ({ roles }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(authenticateUser());
  }, [dispatch]);

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
