import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import MainDashboard from "./components/layouts/MainDashboard";
import TeacherClassroom from "./pages/classroom/Classroom";
import Teachers from "./pages/admin/Teachers";
import Students from "./pages/admin/Students";
import ClassAttendence from "./pages/classroom/ClassAttendence";
import StudentAttendence from "./pages/student/StudentAttendence";
import StudentFees from "./pages/student/StudentFees";
import Announcements from "./pages/Announcements";
// import Attendance from "./pages/admin/Attendance";
import ClassroomDetails from "./pages/classroom/ClassroomDetails";
import Assignments from "./pages/classroom/Assignments";
import Profile from "./pages/Profile";
import StudentProfile from "./pages/admin/students/StudentProfile";
import AddStudent from "./pages/admin/students/AddStudent";
import Dashboard from "./pages/Dashboard";
import TeacherProfile from "./pages/admin/teachers/TeacherProfile";
import Settings from "./pages/admin/Settings";
import UnderProduction from "./components/utils/UnderProduction";
import Reports from "./pages/admin/Reports";
import ErrorPage from "./components/utils/ErrorPage";
import Register from "./pages/Register";
import AddTeacherPage from "./pages/admin/teachers/AddTeacher";
import { UserRole } from "./utils/types";
import AuthUser from "./components/utils/AuthUser";
import AddGradePage from "./pages/grades/AddGrade";
import AddSubjectPage from "./pages/grades/AddSubject";
import ManageStudent from "./pages/classroom/ManageStudents";
import AuthRole from "./components/utils/AuthRole";
import ManageTeacher from "./pages/classroom/ManageTeachers";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<AuthUser element={<MainDashboard />} />}>
        <Route element={<AuthRole roles={[UserRole.MAIN_ADMIN]} />}>
          <Route path="students/add" element={<AddStudent />} />
          <Route path="teachers" element={<Teachers />} />
          <Route path="teacher/:teacherId" element={<TeacherProfile />} />
          <Route path="teachers/add" element={<AddTeacherPage />} />
          <Route path="settings" element={<Settings />} />
          <Route path="c/:classId/teachers" element={<ManageTeacher />} />
          <Route path="reports" element={<Reports />} />
          <Route path="timetable" element={<UnderProduction />} />
          <Route path="analytics" element={<UnderProduction />} />
        </Route>
        <Route
          element={<AuthRole roles={[UserRole.MAIN_ADMIN, UserRole.TEACHER]} />}
        >
          <Route path="students" element={<Students />} />
          <Route path="student/:studentId" element={<StudentProfile />} />
          <Route path="classes/add" element={<AddGradePage />} />
          <Route path="classes/add-subject" element={<AddSubjectPage />} />
          <Route path="c/:classId/students" element={<ManageStudent />} />
          <Route path="attendance" element={<StudentAttendence />} />
          {/* <Route path="attendance/:studentId" element={<Attendance />} /> */}
        </Route>
        <Route element={<AuthRole roles={[UserRole.STUDENT]} />}>
          <Route path="fees" element={<StudentFees />} />
        </Route>
        <Route
          element={
            <AuthRole
              roles={[UserRole.MAIN_ADMIN, UserRole.TEACHER, UserRole.STUDENT]}
            />
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="c/:classId" element={<ClassroomDetails />} />
          <Route path="c/:classId/assignments" element={<Assignments />} />
          <Route path="c/:classId/attendance" element={<ClassAttendence />} />
          <Route path="classes" element={<TeacherClassroom />} />
          <Route path="profile" element={<Profile />} />
          <Route path="announcements" element={<Announcements />} />
        </Route>
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
