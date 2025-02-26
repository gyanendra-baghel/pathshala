import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import AccessDenied from "../components/utils/AccessDenied";
import AdminDashboard from "./admin/AdminDashboard";
import TeacherBoard from "./teacher/TeacherBoard";
import Announcements from "./Announcements";

const Dashboard: React.FC = () => {
  const { user, loading } = useSelector((state: RootState) => state.auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <AccessDenied />;
  }

  return (
    <>
      {user.role === "MAIN_ADMIN" ? <AdminDashboard /> : null}
      {user.role === "TEACHER" ? <TeacherBoard /> : null}
      {user.role === "STUDENT" ? <Announcements /> : null}
    </>
  );
};

export default Dashboard;
