import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import Dashboard from "./components/layouts/Dashboard";
import TeacherClassroom from "./pages/teacher/TeacherClassroom";
import Teachers from "./pages/admin/Teachers";
import Students from "./pages/admin/Students";
import FeesStructure from "./pages/admin/fees/FeesStructure";
import ClassAttendence from "./pages/teacher/ClassAttendence";
import StudentAnnoncement from "./pages/student/StudentAnnoncement";
import StudentAttendence from "./pages/student/StudentAttendence";
import StudentClassroom from "./pages/student/StudentClassroom";
import StudentFees from "./pages/student/StudentFees";
import AdminAnnouncement from "./pages/admin/AdminAnnouncement";
import Attendance from "./pages/admin/Attendance";
import ClassroomDetails from "./pages/teacher/ClassroomDetails";
import TeacherBoard from "./pages/teacher/TeacherBoard";
import Assignments from "./pages/teacher/Assignments";
import TeacherStudents from "./pages/teacher/TeacherStudents";
import Profile from "./pages/Profile";
import StudentProfile from "./pages/admin/students/StudentProfile";
import FeePayment from "./pages/admin/fees/FeePayment";
import AddStudent from "./pages/admin/students/AddStudent";
import AdminDashboard from "./pages/admin/AdminDashboard";
import TeacherProfile from "./pages/admin/teachers/TeacherProfile";
import Settings from "./pages/admin/Settings";
import UnderProduction from "./components/layouts/UnderProduction";
import Reports from "./pages/admin/Reports";
import ErrorPage from "./components/layouts/ErrorPage";
import Register from "./pages/Register";
import AddTeacherPage from "./pages/admin/teachers/AddTeacher";
import { UserRole } from "./utils/types";
import PrivateRoute from "./components/layouts/PrivateRoute";
import AddGradePage from "./pages/grades/AddGrade";
import AddSubjectPage from "./pages/grades/subjects/AddSubject";
import ManageStudent from "./pages/admin/classroom/ManageStudents";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/" element={<Dashboard roles={[UserRole.MAIN_ADMIN]} />}>
          <Route index element={<AdminDashboard />} />
          <Route path="students" element={<Students />} />
          <Route path="students/add" element={<AddStudent />} />
          <Route path="student/:studentId" element={<StudentProfile />} />
          <Route path="teachers" element={<Teachers />} />
          <Route path="teacher/:teacherId" element={<TeacherProfile />} />
          <Route path="teachers/add" element={<AddTeacherPage />} />
          <Route path="fees-structure" element={<FeesStructure />} />
          <Route path="pay-fee/:studentId" element={<FeePayment />} />
          <Route path="settings" element={<Settings />} />
          <Route path="reports" element={<Reports />} />
          <Route path="timetable" element={<UnderProduction />} />
          <Route path="analytics" element={<UnderProduction />} />
          <Route path="classes" element={<TeacherClassroom />} />
          <Route path="classes/add" element={<AddGradePage />} />
          <Route path="classes/add-subject" element={<AddSubjectPage />} />
          <Route path="c/:classId" element={<ClassroomDetails />} />
          <Route path="c/:classId/assignments" element={<Assignments />} />
          <Route path="c/:classId/attendance" element={<ClassAttendence />} />
          <Route path="c/:classId/students" element={<ManageStudent />} />
          <Route path="attendance" element={<StudentAttendence />} />
          <Route path="attendance/:userId" element={<Attendance />} />
          <Route path="announcements" element={<AdminAnnouncement />} />
        </Route>
        <Route
          path="/teacher"
          element={<Dashboard roles={[UserRole.TEACHER]} />}
        >
          <Route index element={<TeacherBoard />} />
          <Route path="students" element={<TeacherStudents />} />
        </Route>
        <Route
          path="/student"
          element={
            <Dashboard roles={[UserRole.STUDENT, UserRole.MAIN_ADMIN]} />
          }
        >
          <Route index element={<StudentAnnoncement />} />
          <Route path="announcements" element={<StudentAnnoncement />} />
          <Route path="classes" element={<StudentClassroom />} />
          <Route path="fees" element={<StudentFees />} />
        </Route>
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
