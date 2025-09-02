import { useBaseContext } from '@/contexts/adminContext';
import AdminLayout from '@/Layouts/AdminLayout';
import React from 'react';
import AttendanceHierarchy from './AttendanceHierarchy'; // 👈 don’t forget to import it

export default function AttendanceChart() {
  const { admin } = useBaseContext();

  if (!admin?.id) {
    return <p className="text-center p-4">Loading Admin Data...</p>;
  }

  return <AttendanceHierarchy adminId={admin.id} />;
}

AttendanceChart.layout = (page) => <AdminLayout>{page}</AdminLayout>;
