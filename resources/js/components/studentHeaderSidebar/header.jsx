import { LogOut, Menu } from "lucide-react";
import { router } from "@inertiajs/react";
import { useStudent } from "@/contexts/StudentContext";

export default function Header({ toggleSidebar }) {
  const { student, loading } = useStudent();

  const handleLogout = () => {
    router.post("/student-logout");
  };

  return (
    <header className="bg-white shadow px-4 py-3 sm:px-6 flex justify-between items-center sticky top-0 z-30">
      {/* Left side - Menu button and Title */}
      <div className="flex items-center gap-4">
        {/* Mobile menu toggle */}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-gray-100 transition lg:hidden"
          title="Toggle menu"
        >
          <Menu className="w-6 h-6 text-gray-600" />
        </button>
        <div className="text-lg font-bold text-blue-600 sm:text-xl">
          Student Dashboard
        </div>
      </div>

      {/* Right side - Student info */}
      <div className="flex items-center gap-4">
        {loading ? (
          <span className="text-gray-500">Loading...</span>
        ) : (
          <>
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-gray-800">{student?.name}</p>
              <p className="text-xs text-gray-500">{student?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 rounded-full hover:bg-gray-100 transition"
              title="Logout"
            >
              <LogOut className="w-5 h-5 text-gray-600" />
            </button>
          </>
        )}
      </div>
    </header>
  );
}
