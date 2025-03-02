import { useState, useEffect } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
  AlignLeft,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { logoutUser } from "../../redux/features/authSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { UserRole } from "../../utils/types";

const MainDashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  // State for sidebar visibility
  const [isMiniSidebar, setIsMiniSidebar] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Close mobile sidebar when route changes
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  // Handle logout
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  // Toggle sidebar states
  const toggleDesktopSidebar = () => setIsMiniSidebar(!isMiniSidebar);
  const toggleMobileSidebar = () => setIsMobileOpen(!isMobileOpen);

  // Generate menu items based on user role
  const menuItems = (() => {
    switch (user?.role) {
      case UserRole.MAIN_ADMIN:
        return [
          { icon: LayoutDashboard, label: "Dashboard", path: "" },
          { icon: User, label: "Students", path: "students" },
          { icon: GraduationCap, label: "Teachers", path: "teachers" },
          { icon: BookOpen, label: "My Classes", path: "classes" },
          { icon: Calendar, label: "TimeTable", path: "timetable" },
          { icon: Bell, label: "Announcements", path: "announcements" },
          { icon: MessageSquareWarning, label: "Reports", path: "reports" },
          { icon: Settings, label: "Settings", path: "settings" },
        ];
      case UserRole.TEACHER:
        return [
          { icon: LayoutDashboard, label: "Dashboard", path: "" },
          { icon: Users, label: "Students", path: "students" },
          { icon: BookOpen, label: "My Classes", path: "classes" },
          { icon: Calendar, label: "Attendance", path: "attendance" },
          { icon: Bell, label: "Announcements", path: "announcements" },
        ];
      case UserRole.STUDENT:
        return [
          { icon: LayoutDashboard, label: "Dashboard", path: "" },
          { icon: BookOpen, label: "My Classes", path: "classes" },
          { icon: Calendar, label: "My Attendance", path: "attendance" },
          { icon: DollarSign, label: "My Fees", path: "fees" },
          { icon: Bell, label: "Announcements", path: "announcements" },
        ];
      default:
        return [];
    }
  })();

  // Check if a menu item is active
  const isActive = (path: string) => {
    if (path === "" && location.pathname === "/") return true;
    return path !== "" && location.pathname.includes(`/${path}`);
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleMobileSidebar}
        ></div>
      )}

      {/* Mobile Toggle Button */}
      <button
        onClick={toggleMobileSidebar}
        className="md:hidden fixed top-4 left-4 z-20 p-2 bg-white rounded-full shadow-md text-blue-800 hover:bg-gray-100 transition-colors"
        aria-label="Toggle sidebar"
      >
        <AlignLeft size={20} />
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed md:relative z-40 h-full bg-blue-800 text-white shadow-lg transition-all duration-300 ease-in-out
          ${
            isMobileOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
          ${isMiniSidebar ? "md:max-w-16" : "md:w-64"}
          w-64
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo & Toggle Area */}
          <div className="flex items-center p-3 justify-between">
            <div className="flex items-center">
              <img
                src="/logo.png"
                alt="Pathshala Logo"
                className="w-10 h-10 object-contain"
              />
              <h1
                className={`ml-3 text-xl font-bold ${
                  isMiniSidebar ? "md:hidden" : ""
                }`}
              >
                Pathshala
              </h1>
            </div>

            {/* Desktop Toggle Button */}
            <button
              onClick={toggleDesktopSidebar}
              className="hidden absolute z-50 top-0 -right-3 md:flex text-white bg-indigo-700 p-2 rounded-full"
              aria-label={isMiniSidebar ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isMiniSidebar ? (
                <ChevronRight size={18} />
              ) : (
                <ChevronLeft size={18} />
              )}
            </button>

            {/* Mobile Close Button */}
            <button
              onClick={toggleMobileSidebar}
              className="md:hidden text-white hover:bg-indigo-700 p-2 rounded-full"
              aria-label="Close sidebar"
            >
              <ChevronLeft size={18} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 mt-1 overflow-y-auto">
            <ul className="px-2 space-y-1">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={`/${item.path}`}
                    className={`
                      flex items-center px-4 py-3 rounded-lg transition-colors
                      ${
                        isActive(item.path)
                          ? "bg-indigo-700 text-white"
                          : "hover:bg-indigo-700/50 text-gray-200"
                      }
                    `}
                  >
                    <item.icon size={20} className="flex-shrink-0" />
                    <span
                      className={`${isMiniSidebar ? "ml-3 md:hidden" : "ml-3"}`}
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* User Actions */}
          <div className="border-t border-indigo-700 p-2 space-y-1">
            <Link
              to="/profile"
              className="flex items-center px-4 py-3 rounded-lg transition-colors hover:bg-indigo-700/50 text-gray-200"
            >
              <User size={20} className="flex-shrink-0" />
              <span className={`${isMiniSidebar ? "ml-3 md:hidden" : "ml-3"}`}>
                Profile
              </span>
            </Link>

            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-3 rounded-lg transition-colors text-red-300 hover:bg-red-800/30 hover:text-red-200"
            >
              <LogOut size={20} className="flex-shrink-0" />
              <span className={`${isMiniSidebar ? "ml-3 md:hidden" : "ml-3"}`}>
                Logout
              </span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default MainDashboard;
