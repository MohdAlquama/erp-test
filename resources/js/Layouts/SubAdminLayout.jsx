'use client'

import { SubAdminHeader } from '@/components/subAdminHeaderSideBar/header'
import SubAdminSidebar from '@/components/subAdminHeaderSideBar/sidebar'
import { SubContext } from '@/contexts/subContext'
import React, { useState } from 'react'


export default function SubAdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <SubContext>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SubAdminHeader toggleSidebar={toggleSidebar} />
      <SubAdminSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <main className="pt-16 md:ml-64 transition-all duration-300 p-6">
        {children}
      </main>
    </div>
    </SubContext>
  
  )
}
