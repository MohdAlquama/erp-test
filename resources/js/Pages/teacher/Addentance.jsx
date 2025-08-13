import { useTeacher } from '@/contexts/TeacherContext';
import TeacherLayout from '@/Layouts/TeacherLayout';
import axiosInstance from '@/utils/axiosInstance';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function Attendance() {
  const { teacherData } = useTeacher();
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState('');
  const [students, setStudents] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [attendanceData, setAttendanceData] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  const [loadingAttendance, setLoadingAttendance] = useState(false);

  // Fetch batches
  useEffect(() => {
    if (!teacherData?.admin_id) return;

    const fetchBatches = async () => {
      try {
        const res = await axiosInstance.get(`/teacher/${teacherData.admin_id}/batches`);
        setBatches(res.data);
      } catch (error) {
        console.error('Failed to fetch batches:', error);
      }
    };
    fetchBatches();
  }, [teacherData]);

  // Fetch students for selected batch
  useEffect(() => {
    if (!selectedBatch || !teacherData?.admin_id) {
      setStudents([]);
      setAttendanceData({});
      return;
    }

    const fetchStudents = async () => {
      setLoadingStudents(true);
      try {
        const res = await axiosInstance.get(
          `/teacher/students/admin/${teacherData.admin_id}/batch/${selectedBatch}`
        );
        setStudents(res.data.data);
      } catch (error) {
        console.error('Failed to fetch students:', error);
      }
      setLoadingStudents(false);
    };
    fetchStudents();
  }, [selectedBatch, teacherData]);

  // Fetch attendance for batch & date
  useEffect(() => {
    if (!teacherData?.id || !teacherData?.admin_id || !selectedBatch || !currentDate) {
      setAttendanceData({});
      return;
    }

    const fetchAttendance = async () => {
      setLoadingAttendance(true);
      try {
        const res = await axiosInstance.get('/teacher/attendance/filter', {
          params: {
            teacher_id: teacherData.id,
            admin_id: teacherData.admin_id,
            batch_id: selectedBatch,
            date: currentDate,
          },
        });

        const savedAttendance = res.data.data;

        const attendanceMap = {};
        savedAttendance.forEach(record => {
          attendanceMap[record.student_id] = record.status;
        });

        const initialAttendance = {};
        students.forEach(student => {
          initialAttendance[student.id] = attendanceMap[student.id] || 'present';
        });

        setAttendanceData(initialAttendance);
      } catch (error) {
        console.error('Error fetching attendance:', error);
      }
      setLoadingAttendance(false);
    };

    fetchAttendance();
  }, [teacherData, selectedBatch, currentDate, students]);

  // Handle status change
  const handleAttendanceChange = (studentId, status) => {
    setAttendanceData(prev => ({
      ...prev,
      [studentId]: status,
    }));
  };

  // Save or update attendance for one student
  const saveOrUpdateAttendance = async (studentId) => {
    const payload = {
      student_id: studentId,
      batch_id: selectedBatch,
      teacher_id: teacherData.id,
      admin_id: teacherData.admin_id,
      date: currentDate,
      status: attendanceData[studentId],
    };

    try {
      await axiosInstance.post('/teacher/attendance', payload);
      toast.success('Attendance saved successfully');
    } catch (error) {
      if (error.response && (error.response.status === 409 || error.response.status === 422)) {
        try {
          await axiosInstance.put('/teacher/attendance', payload);
          toast.success('Attendance updated successfully');
        } catch (updateError) {
          console.error('Error updating attendance:', updateError.response || updateError.message);
          toast.error('Failed to update attendance');
        }
      } else {
        console.error('Error saving attendance:', error.response || error.message);
        toast.error('Failed to save attendance');
      }
    }
  };

  // Attendance summary stats
  const getAttendanceStats = () => {
    const total = Object.keys(attendanceData).length;
    const present = Object.values(attendanceData).filter(status => status === 'present').length;
    const absent = total - present;
    return { total, present, absent };
  };

  const stats = getAttendanceStats();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mark Attendance</h1>
          <p className="text-gray-600">Select a batch and mark attendance for students</p>
        </div>

        {/* Batch and Date selectors */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Batch</label>
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
            >
              <option value="">-- Select Batch --</option>
              {batches.map(batch => (
                <option key={batch.id} value={batch.id}>{batch.name} (ID: {batch.id})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              value={currentDate}
              onChange={(e) => setCurrentDate(e.target.value)}
            />
          </div>
        </div>

        {/* Attendance summary */}
        {selectedBatch && students.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6 grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
              <div className="text-sm text-blue-800">Total Students</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{stats.present}</div>
              <div className="text-sm text-green-800">Present</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{stats.absent}</div>
              <div className="text-sm text-red-800">Absent</div>
            </div>
          </div>
        )}

        {/* Students attendance table */}
        {!loadingStudents && !loadingAttendance && students.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Students List</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 table-auto">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Student Details
                    </th>
                    <th className="px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Contact Info
                    </th>
                    <th className="px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-2 text-center text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      Attendance
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {students.map(student => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 max-w-xs break-words whitespace-normal">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{student.name}</div>
                          <div className="text-sm text-gray-500">EN: {student.enrollment_number}</div>
                        </div>
                      </td>
                      <td className="px-4 py-2 max-w-xs break-words whitespace-normal">
                        <div>
                          <div className="text-sm text-gray-900">{student.email}</div>
                          <div className="text-sm text-gray-500">{student.contact_number || 'N/A'}</div>
                        </div>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            student.status.toLowerCase() === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {student.status}
                        </span>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <div className="flex flex-wrap items-center gap-2 justify-center min-w-[200px]">
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name={`attendance-${student.id}`}
                              value="present"
                              checked={attendanceData[student.id] === 'present'}
                              onChange={(e) => handleAttendanceChange(student.id, e.target.value)}
                              className="form-radio h-4 w-4 text-green-600 focus:ring-green-500"
                            />
                            <span className="ml-2 text-sm text-green-700 font-medium">Present</span>
                          </label>

                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name={`attendance-${student.id}`}
                              value="absent"
                              checked={attendanceData[student.id] === 'absent'}
                              onChange={(e) => handleAttendanceChange(student.id, e.target.value)}
                              className="form-radio h-4 w-4 text-red-600 focus:ring-red-500"
                            />
                            <span className="ml-2 text-sm text-red-700 font-medium">Absent</span>
                          </label>

                          <button
                            type="button"
                            onClick={() => saveOrUpdateAttendance(student.id)}
                            className="ml-0 sm:ml-4 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition whitespace-nowrap"
                          >
                            Save
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Loading */}
        {(loadingStudents || loadingAttendance) && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-300 rounded w-1/4 mx-auto"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
            </div>
            <p className="mt-4 text-gray-600">Loading data...</p>
          </div>
        )}

        {/* No students found */}
        {!loadingStudents && students.length === 0 && selectedBatch && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center text-gray-600">
            No students found for this batch.
          </div>
        )}
      </div>
    </div>
  );
}

Attendance.layout = (page) => <TeacherLayout>{page}</TeacherLayout>;
