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
import logo from "../assets/logo.png";
import { UserRole } from "../utils/types";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/features/authSlice";
import { AppDispatch } from "../redux/store";
import { useState } from "react";

interface SidebarProps {
  role: UserRole;
}

export function Sidebar({ role }: SidebarProps) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const logout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  const menuItems =
    role === UserRole.MAIN_ADMIN
      ? [
          { icon: LayoutDashboard, label: "Dashboard", value: "" },
          { icon: User, label: "Students", value: "students" },
          { icon: GraduationCap, label: "Teachers", value: "teachers" },
          { icon: BookOpen, label: "My Classes", value: "classes" },
          { icon: Calendar, label: "TimeTable", value: "timetable" },
          // {
          //   icon: BarChart,
          //   label: "Analytics",
          //   value: "analytics",
          // },
          { icon: Bell, label: "Announcements", value: "announcements" },
          {
            icon: MessageSquareWarning,
            label: "Reports",
            value: "reports",
          },
          { icon: Settings, label: "Settings", value: "settings" },
        ]
      : role === UserRole.TEACHER
      ? [{ icon: Users, label: "Students", value: "students" }]
      : [
          { icon: User, label: "My Profile", value: "profile" },
          { icon: BookOpen, label: "My Classes", value: "classes" },
          { icon: Calendar, label: "My Attendance", value: "attendance" },
          { icon: DollarSign, label: "My Fees", value: "fees" },
          { icon: Bell, label: "Announcements", value: "announcements" },
        ];

  return (
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
              {/* <span>{item.label}</span> */}
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
  );
}
