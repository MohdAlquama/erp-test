'use client';
import React from 'react';
import { Link, usePage, useForm } from '@inertiajs/react';
import { LayoutDashboard, BookOpen, CalendarCheck, User, LogOut, FileSearch ,Send,Route} from 'lucide-react';

export default function StudentSidebar({ isOpen, closeSidebar }) {
  const { url } = usePage();
  const { post } = useForm();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/student/dashboard' },
    { icon: BookOpen, label: 'My Courses', href: '/student/mycourses' },
    { icon: CalendarCheck, label: 'Attendance', href: '/student/attendance' },
    { icon: FileSearch, label: 'Admit Card', href: '/student/admitCard' },
    { icon: Send , label: 'My Result', href: '/student/my-result' },
    { icon: Route, label: 'Syllabus', href: '/student/syllabus' },
    { icon: User, label: 'Icard', href: '/student/icard' }
  ];

  const handleLogout = () => {
    post(route('student.logout')); // ✅ will call backend logout route
  };

  return (
    <aside
      className={`fixed top-0 left-0 z-30 h-screen w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
        <span className="text-xl font-bold text-indigo-600">Student Panel</span>
        <button className="lg:hidden text-gray-600 hover:text-gray-800" onClick={closeSidebar}>
          <LogOut className="h-6 w-6" />
        </button>
      </div>

      <nav className="p-4">
        {menuItems.map((item) => {
          const isActive = url.startsWith(item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-2 rounded-lg mb-2 transition-colors duration-200 ${
                isActive ? 'bg-indigo-500 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={closeSidebar}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 mt-6 transition-colors duration-200"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </nav>
    </aside>
  );
}
