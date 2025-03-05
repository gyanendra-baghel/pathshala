import { Outlet, useLocation } from "react-router-dom";
import AccessDenied from "./AccessDenied";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { authenticateUser } from "../../redux/features/authSlice";
import { LandingPage } from "../../pages/Home";
import { fetchGrades } from "../../redux/features/gradeSlice";
import { fetchSubjects } from "../../redux/features/subjectSlice";
import LoadingCard from "../ui/LoadingCard";
import { fetchStudents } from "../../redux/features/studentSlice";
import { fetchTeachers } from "../../redux/features/teacherSlice";

interface AuthUserProps {
  element: React.ReactNode;
}

const AuthUser: React.FC<AuthUserProps> = ({ element }) => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const { user, loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(authenticateUser());
  }, [dispatch]);

  useEffect(() => {
    if (!user) return;
    if (["MAIN_ADMIN"].includes(user.role)) {
      dispatch(fetchTeachers());
    }
    if (["MAIN_ADMIN", "TEACHER"].includes(user.role)) {
      dispatch(fetchStudents());
    }
    dispatch(fetchGrades());
    dispatch(fetchSubjects());
  }, [dispatch, user]);

  if (loading) {
    return <LoadingCard />;
  } else if (!user && location.pathname == "/") {
    return <LandingPage />;
  } else if (!user) {
    return <AccessDenied />;
  }
  return React.cloneElement(element as React.ReactElement, {}, <Outlet />);
};

export default AuthUser;
