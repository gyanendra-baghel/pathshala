import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { LandingPage } from "./pages/Home";
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

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<Dashboard role="admin" />}>
        <Route index path="" element={<AdminDashboard />} />
        <Route path="students" element={<Students />} />
        <Route path="students/add" element={<AddStudent />} />
        <Route path="student/:studentId" element={<StudentProfile />} />
        <Route path="teachers" element={<Teachers />} />
        <Route path="teacher/:teacherId" element={<TeacherProfile />} />
        <Route path="teachers/add" element={<AddTeacherPage />} />
        <Route path="attendance/:userId" element={<Attendance />} />
        <Route path="fees-structure" element={<FeesStructure />} />
        <Route path="announcements" element={<AdminAnnouncement />} />
        <Route path="pay-fee/:studentId" element={<FeePayment />} />
        <Route path="settings" element={<Settings />} />
        <Route path="reports" element={<Reports />} />
        <Route path="timetable" element={<UnderProduction />} />
        <Route path="analytics" element={<UnderProduction />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="/teacher" element={<Dashboard role="teacher" />}>
        <Route index path="" element={<TeacherBoard />} />
        <Route path="classes" element={<TeacherClassroom />} />
        <Route path="students" element={<TeacherStudents />} />
        <Route path="attendance" element={<ClassAttendence />} />
        <Route path="assignments" element={<Assignments />} />
        <Route path="classes/:classId" element={<ClassroomDetails />} />
      </Route>
      <Route path="/student" element={<Dashboard role="student" />}>
        <Route index path="" element={<StudentAnnoncement />} />
        <Route path="announcements" element={<StudentAnnoncement />} />
        <Route path="classes" element={<StudentClassroom />} />
        <Route path="attendance" element={<StudentAttendence />} />
        <Route path="fees" element={<StudentFees />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
