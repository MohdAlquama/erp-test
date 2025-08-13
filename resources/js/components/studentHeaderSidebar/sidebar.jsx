import { Link, router } from "@inertiajs/react";
import { LayoutDashboard, BookOpen, Settings, LogOut } from "lucide-react";
import { useStudent } from "@/contexts/StudentContext";

export default function Sidebar() {
  const { student, loading } = useStudent();

  const handleLogout = () => {
    router.post("/student-logout");
  };

  return (
    <aside className="bg-white shadow-lg w-64 min-h-screen flex flex-col">
      {/* Profile section */}
      <div className="p-6 border-b">
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <>
            <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-lg font-bold">
              {student?.name?.charAt(0) || "S"}
            </div>
            <p className="mt-3 font-semibold text-gray-800">
              {student?.name}
            </p>
            <p className="text-sm text-gray-500">{student?.email}</p>
          </>
        )}
      </div>

      {/* Navigation links */}
      <nav className="flex-1 p-4 space-y-2">
        <Link
          href="/student/dashboard"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 text-gray-700 transition"
        >
          <LayoutDashboard className="w-5 h-5" />
          Dashboard
        </Link>

        <Link
          href="/student/courses"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 text-gray-700 transition"
        >
          <BookOpen className="w-5 h-5" />
          My Courses
        </Link>

        <Link
          href="/student/admit-card-detail"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 text-gray-700 transition"
        >
          <Settings className="w-5 h-5" />
          Admit Card
        </Link>
      </nav>

      {/* Logout button */}
      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 w-full rounded-lg hover:bg-red-50 text-red-600 transition"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
