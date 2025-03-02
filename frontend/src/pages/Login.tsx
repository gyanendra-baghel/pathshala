import React, { useEffect, useState } from "react";
import { School, User, Users, Shield, Eye, EyeOff } from "lucide-react";
import { UserRole } from "../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { loginUser } from "../redux/features/authSlice";

export const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { error, loading } = useSelector((state: RootState) => state.auth);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<UserRole>(UserRole.MAIN_ADMIN);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  useEffect(() => {
    if (role === UserRole.STUDENT) {
      setEmail("amit.sharma@example.com");
      setPassword("securePass123");
    } else if (role === UserRole.TEACHER) {
      setEmail("durgesh.tripathiec2021@indoreinstitute.com");
      setPassword("Gyanendra12@");
    } else {
      setEmail("rahul.sharma@greenwoodschool.com");
      setPassword("SecurePass@123");
    }
  }, [role]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password, role }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getRoleIcon = () => {
    switch (role) {
      case UserRole.STUDENT:
        return <User className="h-5 w-5 text-indigo-600" />;
      case UserRole.TEACHER:
        return <Users className="h-5 w-5 text-indigo-600" />;
      default:
        return <Shield className="h-5 w-5 text-indigo-600" />;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100">
      <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-xl transition-all">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-indigo-100 flex items-center justify-center rounded-full mb-2">
            <School className="h-8 w-8 text-indigo-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to access your school dashboard
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div className="rounded-lg border border-gray-200 p-4 bg-gray-50">
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                I am a
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setRole(UserRole.MAIN_ADMIN)}
                  className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
                    role === UserRole.MAIN_ADMIN
                      ? "bg-indigo-50 border-indigo-300"
                      : "border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  <Shield
                    className={`h-6 w-6 ${
                      role === UserRole.MAIN_ADMIN
                        ? "text-indigo-600"
                        : "text-gray-500"
                    }`}
                  />
                  <span
                    className={`text-sm mt-1 ${
                      role === UserRole.MAIN_ADMIN
                        ? "font-medium text-indigo-700"
                        : "text-gray-600"
                    }`}
                  >
                    Admin
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole(UserRole.TEACHER)}
                  className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
                    role === UserRole.TEACHER
                      ? "bg-indigo-50 border-indigo-300"
                      : "border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  <Users
                    className={`h-6 w-6 ${
                      role === UserRole.TEACHER
                        ? "text-indigo-600"
                        : "text-gray-500"
                    }`}
                  />
                  <span
                    className={`text-sm mt-1 ${
                      role === UserRole.TEACHER
                        ? "font-medium text-indigo-700"
                        : "text-gray-600"
                    }`}
                  >
                    Teacher
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole(UserRole.STUDENT)}
                  className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
                    role === UserRole.STUDENT
                      ? "bg-indigo-50 border-indigo-300"
                      : "border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  <User
                    className={`h-6 w-6 ${
                      role === UserRole.STUDENT
                        ? "text-indigo-600"
                        : "text-gray-500"
                    }`}
                  />
                  <span
                    className={`text-sm mt-1 ${
                      role === UserRole.STUDENT
                        ? "font-medium text-indigo-700"
                        : "text-gray-600"
                    }`}
                  >
                    Student
                  </span>
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email address
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <div className="text-gray-400">{getRoleIcon()}</div>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative rounded-md shadow-sm">
                <input
                  id="password"
                  name="password"
                  required
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pr-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="••••••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-700"
              >
                Remember me for 30 days
              </label>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-md bg-red-50 border border-red-200">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Need an account?{" "}
          <button
            type="button"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Create one here
          </button>
        </p>
      </div>
    </div>
  );
};
