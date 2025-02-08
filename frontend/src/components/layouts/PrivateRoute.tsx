import { Outlet, useLocation } from "react-router-dom";
import AccessDenied from "../AccessDenied";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { authenticateUser } from "../../redux/features/authSlice";
import { LandingPage } from "../../pages/Home";
import { fetchFeeStructures } from "../../redux/features/feeStructureSlice";
import { fetchGrades } from "../../redux/features/gradeSlice";
import { UserRole } from "../../utils/types";
import { fetchSubjects } from "../../redux/features/subjectSlice";

const PrivateRoute: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const { user, loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(authenticateUser());
  }, [dispatch]);

  useEffect(() => {
    if (user && user.role === UserRole.MAIN_ADMIN) {
      dispatch(fetchFeeStructures());
      dispatch(fetchGrades());
      dispatch(fetchSubjects());
    }
  }, [dispatch, user]);

  if (!user && location.pathname == "/") {
    return <LandingPage />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <AccessDenied />;
  }
  return <Outlet />;
};

export default PrivateRoute;
