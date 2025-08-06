import React, { useState } from 'react';
import { BaseProvider } from '@/contexts/adminContext';
import { Menu, Bell, Search, User } from 'lucide-react';
import Sidebar from '@/components/admin/Sidebar'; // ✅ import your new Sidebar
import { Link } from '@inertiajs/react';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <BaseProvider>
      <div className="flex min-h-screen bg-gray-50">
        {/* ✅ Sidebar */}
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Main Content */}
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
