import StudentLayout from "@/Layouts/StudentLayout";
import { useStudent } from "@/contexts/StudentContext";
import { User, Phone, Mail, MapPin } from "lucide-react";
import AttendanceCharts from "./AttendanceCharts";

export default function StudentDashboard() {
  const { student, loading } = useStudent();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="text-lg font-medium text-gray-600">Loading student info...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6 sm:p-8 border border-white/20">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Student Dashboard
              </h1>
              <p className="text-gray-600 mt-2 text-sm sm:text-base">
                Track your academic progress and stay updated
              </p>
            </div>
          </div>

          {/* Student Profile Section */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-center">
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-3xl font-bold text-white shadow-md">
                {student?.name?.charAt(0)?.toUpperCase() || "S"}
              </div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                {student?.name || "No Name Provided"}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <User size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Student ID</p>
                    <p className="font-medium text-sm sm:text-base">{student?.enrollment_number || "N/A"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <Phone size={18} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="font-medium text-sm sm:text-base">{student?.contact_number || "N/A"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Mail size={18} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="font-medium text-sm sm:text-base">{student?.email || "N/A"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                    <MapPin size={18} className="text-orange-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Address</p>
                    <p className="font-medium text-sm sm:text-base">{student?.address || "Not Provided"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Attendance Charts */}
        <AttendanceCharts student_id={student?.id} admin_id={student?.admin_id} />
      </div>
    </div>
  );
}

StudentDashboard.layout = (page) => <StudentLayout>{page}</StudentLayout>;