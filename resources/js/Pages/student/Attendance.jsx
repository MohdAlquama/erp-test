import { useStudent } from '@/contexts/StudentContext';
import StudentLayout from '@/Layouts/StudentLayout'
import React from 'react'
import AttendanceCharts from './AttendanceCharts';

function Attendance() {
    const { student, loading } = useStudent();
  return (
    <div>
      <AttendanceCharts student_EndrollmentNumber={student.enrollment_number} admin_id={student.admin_id}/>
    </div>
  )
}
Attendance.layout = page => <StudentLayout>{page}</StudentLayout>;
export default Attendance
