import { Outlet } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import {
  LogOut,
  User,
  Calendar,
  DollarSign,
  Bell,
  BookOpen,
  Users,
  GraduationCap,
  LayoutDashboard,
  Settings,
  MessageSquareWarning,
} from "lucide-react";
import logo from "../../assets/logo.png";
import { UserRole } from "../../utils/types";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/features/authSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { useState } from "react";
import { useSelector } from "react-redux";

const MainDashboard: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const logout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  const menuItems = (() => {
    switch (user?.role) {
      case UserRole.MAIN_ADMIN:
        return [
          { icon: LayoutDashboard, label: "Dashboard", value: "" },
          { icon: User, label: "Students", value: "students" },
          { icon: GraduationCap, label: "Teachers", value: "teachers" },
          { icon: BookOpen, label: "My Classes", value: "classes" },
          { icon: Calendar, label: "TimeTable", value: "timetable" },
          { icon: Bell, label: "Announcements", value: "announcements" },
          { icon: MessageSquareWarning, label: "Reports", value: "reports" },
          { icon: Settings, label: "Settings", value: "settings" },
        ];
      case UserRole.TEACHER:
        return [
          { icon: LayoutDashboard, label: "Dashboard", value: "" },
          { icon: Users, label: "Students", value: "students" },
          { icon: BookOpen, label: "My Classes", value: "classes" },
          { icon: Calendar, label: "Attendance", value: "attendance" },
          { icon: Bell, label: "Announcements", value: "announcements" },
        ];
      case UserRole.STUDENT:
        return [
          { icon: LayoutDashboard, label: "Dashboard", value: "" },
          { icon: BookOpen, label: "My Classes", value: "classes" },
          { icon: Calendar, label: "My Attendance", value: "attendance" },
          { icon: DollarSign, label: "My Fees", value: "fees" },
          { icon: Bell, label: "Announcements", value: "announcements" },
        ];
      default:
        return [];
    }
  })();

  return (
    <div className="flex h-screen bg-gray-100">
      <div
        className={
          "h-screen flex flex-col justify-between bg-blue-800 text-white" +
          (open ? " w-60" : " w-14")
        }
      >
        <div className="flex w-full flex-col">
          <div className="flex my-4">
            <img
              src={logo}
              alt="Pathshala"
              className="w-8 h-8 mx-3"
              onClick={() => {
                setOpen(!open);
              }}
            />
            {open && <h1 className="text-xl font-bold">Pathshala</h1>}
          </div>
          <nav className="">
            {menuItems.map((item) => (
              <Link
                key={item.value}
                to={`/${item.value}`}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors
              ${
                window.location.pathname.includes(item.value)
                  ? "bg-indigo-700 text-white"
                  : "hover:bg-indigo-700/50"
              }`}
              >
                <item.icon className="w-6 h-6" />
                {open && <span>{item.label}</span>}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-col ">
          <Link to="/profile" className="flex items-center gap-3 px-4 py-2 ">
            <User className="w-6 h-6" />
            {open && <span>Profile</span>}
          </Link>
          <button
            className="flex items-center gap-3 px-4 py-2 text-red-300 hover:text-red-200"
            onClick={() => logout()}
          >
            <LogOut className="w-6 h-6" />
            {open && <span>Logout</span>}
          </button>
        </div>
      </div>
      <div className="flex-1 p-2 bg-gray-50 overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  );
};

export default MainDashboard;
