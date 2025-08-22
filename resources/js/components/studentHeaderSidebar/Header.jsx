'use client';
import React from 'react';
import { Menu, User } from 'lucide-react';

export default function StudentHeader({ toggleSidebar, student }) {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm flex items-center justify-between px-6 z-10 lg:ml-64">
      <button
        className="lg:hidden text-gray-600 hover:text-gray-800"
        onClick={toggleSidebar}
      >
        <Menu className="h-6 w-6" />
      </button>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
            <User className="h-5 w-5 text-indigo-600" />
          </div>
          <span className="font-medium text-gray-700">{student?.name || 'Student'}</span>
        </div>
      </div>
    </header>
  );
}
