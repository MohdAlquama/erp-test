import Header from "@/components/studentHeaderSidebar/header";
import Sidebar from "@/components/studentHeaderSidebar/sidebar";
import { StudentProvider } from "@/contexts/StudentContext";
import React, { useState } from "react";

export default function StudentLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <StudentProvider>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        <div className="flex flex-col flex-1">
          <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
          <main className="flex-1 p-4 sm:p-6 overflow-y-auto">{children}</main>
        </div>
      </div>
    </StudentProvider>
  );
}
