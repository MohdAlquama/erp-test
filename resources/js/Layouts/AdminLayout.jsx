import React, { useState } from 'react';
import { BaseProvider, useBaseContext } from '@/contexts/adminContext';
import { Menu, Bell, Search, User, Home, Users, Settings, LogOut, X } from 'lucide-react';
import { Link } from '@inertiajs/react';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <BaseProvider>
      <div className="flex min-h-screen bg-gray-50">
        {/* ✅ Sidebar inline here */}
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        {/* ✅ Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-gray-200/50 sticky top-0 z-30">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={toggleSidebar}
                    className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Menu className="w-6 h-6 text-gray-700" />
                  </button>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                    <p className="text-sm text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  {/* Search Bar */}
                  <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2 max-w-md">
                    <Search className="w-4 h-4 text-gray-500 mr-2" />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="bg-transparent outline-none text-sm text-gray-700 placeholder-gray-500 w-full"
                    />
                  </div>

                  {/* Notifications */}
                  <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                  </button>

                  {/* Profile */}
                  <div className="flex items-center space-x-3 pl-3 border-l border-gray-200">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div className="hidden sm:block">
                      <p className="text-sm font-medium text-gray-900">Admin User</p>
                      <p className="text-xs text-gray-500">admin@example.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Page content */}
          {children}
        </div>
      </div>
    </BaseProvider>
  );
};

export default AdminLayout;

// -------------------------
// ✅ Sidebar (inline)
// -------------------------
const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { permissions, loading } = useBaseContext();

  if (loading) {
    return (
      <aside className="w-64 bg-gray-900 text-white p-6">
        <p>Loading menu...</p>
      </aside>
    );
  }

  const menuItems = [
    {
      label: 'Dashboard',
      href: '/admin/t',
      icon: Home,
      color: 'blue',
    },
    {
      label: 'Users',
      href: '/admin/subjects',
      icon: Users,
      color: 'green',
    }, {
          label: 'TeacherDrawer',
          href: '/admin/TeacherDrawer',
          icon: Users,
          color: 'green',
        },
    {
      label: 'Batch',
      href: '/admin/batch',
      icon: Settings,
      color: 'purple',
      permission: 'StudentManagementBatchShow',
    },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64
        bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900
        text-white shadow-2xl transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Admin Panel
                </h2>
                <p className="text-xs text-gray-400">Management Portal</p>
              </div>
            </div>
            <button
              onClick={toggleSidebar}
              className="lg:hidden text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-4 py-6 space-y-2">
          {menuItems.map(({ label, href, icon, color, permission }) =>
            !permission || permissions.includes(permission) ? (
              <SidebarLink
                key={href}
                href={href}
                icon={icon}
                label={label}
                color={color}
              />
            ) : null
          )}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <Link
            href="/logout"
            className="group flex items-center px-4 py-3 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-xl transition-all duration-200"
          >
            <LogOut className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform" />
            <span>Logout</span>
          </Link>
        </div>
      </aside>
    </>
  );
};

// ✅ Sidebar Link Component
const SidebarLink = ({ href, icon: Icon, label, color }) => {
  return (
    <Link
      href={href}
      className="group flex items-center px-4 py-3 text-sm font-medium rounded-xl hover:bg-gray-700/50 transition-all duration-200 hover:translate-x-1"
    >
      <Icon className={`w-5 h-5 mr-3 text-${color}-400 group-hover:text-${color}-300`} />
      <span className="group-hover:text-white">{label}</span>
      <div className={`ml-auto w-2 h-2 bg-${color}-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity`} />
    </Link>
  );
};
