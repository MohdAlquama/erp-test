'use client';
import React, { useState } from 'react';
import { StudentProvider } from '@/contexts/StudentContext';
import StudentSidebar from '@/components/studentHeaderSidebar/Sidebar';
import StudentHeader from '@/components/studentHeaderSidebar/Header';

export default function StudentLayout({ children, student }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <StudentProvider>
      <div className="flex min-h-screen bg-gray-100">
        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={closeSidebar}
          />
        )}

        <StudentSidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
        <div className="flex-1 flex flex-col lg:ml-64">
          <StudentHeader toggleSidebar={toggleSidebar} student={student} />
          <main className="mt-20 p-6">{children}</main>
        </div>
      </div>
    </StudentProvider>
  );
}
