import React from "react";
import { UserRole } from "../../utils/types";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Outlet } from "react-router-dom";
import AccessDenied from "./AccessDenied";

interface AuthRoleProps {
  roles: UserRole[];
}

const AuthRole: React.FC<AuthRoleProps> = ({ roles }) => {
  const { user, loading } = useSelector((state: RootState) => state.auth);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || !roles.includes(user.role)) {
    return <AccessDenied />;
  }
  return <Outlet />;
};

export default AuthRole;
