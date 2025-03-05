import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Plus,
  Filter,
  User,
  Phone,
  MapPin,
  ChevronDown,
  X,
  FileText,
  UserPlus,
  Download,
  RefreshCw,
} from "lucide-react";
import { Student } from "../../utils/types";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import LoadingCard from "../../components/ui/LoadingCard";

const StudentCard = ({ student }: { student: Student }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-all duration-200 flex flex-col">
      <div className="p-5">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
            <User className="w-8 h-8 text-indigo-600" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {student.firstName} {student.lastName}
            </h3>
            <div className="flex items-center text-sm text-gray-500">
              <span className="truncate">{student.rollNumber}</span>
              {student.grade && (
                <>
                  <span className="mx-1.5">•</span>
                  <span className="font-medium text-indigo-600">
                    {student.grade.name}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div className="flex items-center text-gray-600">
            <Phone className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
            <span className="truncate">
              {student.phoneNumber || "Not available"}
            </span>
          </div>

          <div className="flex items-center text-gray-600 col-span-2">
            <MapPin className="w-3.5 h-3.5 mr-1.5 text-gray-400 flex-shrink-0" />
            <span className="truncate">
              {student.address || "Address not available"}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-auto border-t border-gray-100 bg-gray-50 p-4">
        <div className="flex">
          <Link
            to={`/student/${student.id}`}
            className="flex-1 py-2 px-3 bg-indigo-50 text-indigo-600 rounded-md text-sm font-medium text-center hover:bg-indigo-100 transition-colors"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

const Students: React.FC = () => {
  const { grades } = useSelector((state: RootState) => state.grade);
  const { students, loading } = useSelector(
    (state: RootState) => state.student
  );
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalStudents, setTotalStudents] = useState(0);

  // Filter states
  const [filters, setFilters] = useState({
    grade: "",
    gender: "",
    status: "active",
  });
  const [showFilters, setShowFilters] = useState(false);

  // Generate sample student data
  useEffect(() => {
    setTotalStudents(students.length);
  }, [students]);

  // Filter students based on search query and other filters
  useEffect(() => {
    if (students.length === 0) return;
    let result = [...students];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (student) =>
          (student.firstName || "").toLowerCase().includes(query) ||
          (student.lastName || "").toLowerCase().includes(query) ||
          (student.rollNumber || "").includes(query)
      );
    }

    // Apply grade filter
    if (filters.grade) {
      result = result.filter((student) => student.gradeId === filters.grade);
    }

    // Apply gender filter (would be implemented in real app)
    // if (filters.gender) {
    //   result = result.filter(student => student.gender === filters.gender);
    // }

    setFilteredStudents(result);
  }, [students, searchQuery, filters]);

  const resetFilters = () => {
    setFilters({
      grade: "",
      gender: "",
      status: "active",
    });
    setSearchQuery("");
  };

  const handleExport = async () => {
    alert("Not Implemented");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Student Management
          </h1>
          <p className="text-gray-500 mt-1">
            {totalStudents} students enrolled
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleExport}
            className="inline-flex items-center px-3 py-2 text-sm border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>

          <Link
            to="/students/add"
            className="inline-flex items-center px-3 py-2 text-sm bg-indigo-600 rounded-lg text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Add Student
          </Link>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full py-2 px-4 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="sm:w-auto flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50"
          >
            <Filter className="w-5 h-5" />
            Filters
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                showFilters ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="grade-filter"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Grade
              </label>
              <select
                id="grade-filter"
                value={filters.grade}
                onChange={(e) =>
                  setFilters({ ...filters, grade: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="">All Grades</option>
                {grades.map((grade) => (
                  <option key={grade.id} value={grade.id}>
                    {grade.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="gender-filter"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Gender
              </label>
              <select
                id="gender-filter"
                value={filters.gender}
                onChange={(e) =>
                  setFilters({ ...filters, gender: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="">All</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="status-filter"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Status
              </label>
              <select
                id="status-filter"
                value={filters.status}
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="all">All</option>
              </select>
            </div>

            <div className="sm:col-span-3 flex justify-end">
              <button
                onClick={resetFilters}
                className="inline-flex items-center px-3 py-2 text-sm text-gray-700 hover:text-indigo-600"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Students Grid */}
      {loading ? (
        <LoadingCard />
      ) : filteredStudents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredStudents.map((student) => (
            <StudentCard key={student.id} student={student} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            No students found
          </h3>
          <p className="text-gray-500 mb-6">
            {searchQuery || filters.grade || filters.gender
              ? "Try adjusting your search or filters"
              : "Get started by adding your first student"}
          </p>
          {!searchQuery && !filters.grade && !filters.gender ? (
            <Link
              to="/students/add"
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Student
            </Link>
          ) : (
            <button
              onClick={resetFilters}
              className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg shadow hover:bg-gray-50 transition-colors"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Reset Filters
            </button>
          )}
        </div>
      )}

      {/* Fixed Add Button for Mobile */}
      <div className="sm:hidden">
        <Link
          to="/students/add"
          className="fixed bottom-6 right-6 flex items-center justify-center w-14 h-14 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 transition-colors z-10"
        >
          <Plus className="w-6 h-6" />
        </Link>
      </div>
    </div>
  );
};

export default Students;
