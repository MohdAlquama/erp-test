import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import {
  Menu,
  X,
  Home,
  Users,
  BookOpen,
  BarChart3,
  Settings,
  Bell,
  User,
  LogOut,
} from "lucide-react";
import { TeacherProvider, useTeacher } from "@/contexts/TeacherContext";
import { Toaster } from 'react-hot-toast';
const LayoutContent = ({ children }) => {
  const { teacherData } = useTeacher();
  const { url } = usePage(); // gives current URL, useful to mark active menu
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/teacher/dashboard" },
    { icon: BarChart3, label: "Addentance", href: "/teacher/addentance" },
    { icon: BookOpen, label: "Courses", href: "/courses" },
    { icon: BarChart3, label: "Grades", href: "/grades" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">EduTeach</span>
          </div>
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            {menuItems.map(({ icon: IconComponent, label, href }) => {
              const isActive = url === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                      isActive
                        ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                    }`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="font-medium">{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
          <button
            onClick={() => alert("Logout clicked")}
            className="flex items-center space-x-3 px-4 py-3 w-full text-gray-600 hover:bg-gray-50 hover:text-gray-800 rounded-lg transition-colors duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-4 lg:px-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>
              <p className="text-sm text-gray-500 hidden sm:block">
                Welcome back, {teacherData?.name ?? "Teacher"}!
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-gray-600" />
              </div>
              <span className="hidden sm:block text-sm font-medium text-gray-700">
                {teacherData?.name ?? "John Doe"}
              </span>
            </div>
          </div>
        </header>

        {/* Render children content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

const TeacherLayout = ({ children }) => {
  return (
    <TeacherProvider>
            <Toaster position="top-right" />
      <LayoutContent>{children}</LayoutContent>
    </TeacherProvider>
  );
};

export default TeacherLayout;
