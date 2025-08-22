import React, { useEffect, useState } from "react";
import { useTeacher } from "@/contexts/TeacherContext";
import TeacherLayout from "@/Layouts/TeacherLayout";
import axiosInstance from "@/utils/axiosInstance";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from "recharts";
import {
  Users,
  UserCheck,
  UserX,
  BookOpen,
  TrendingUp,
  Calendar,
  Award,
  Clock
} from "lucide-react";

export default function TeacherDashboard() {
  const { teacherData } = useTeacher();
  const [batches, setBatches] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!teacherData?.id || !teacherData?.admin_id) {
      setIsLoading(false);
      return;
    }

    const fetchAttendance = async () => {
      try {
        const attendanceRes = await axiosInstance.get(
          `/teacher/attendances/${teacherData.admin_id}/${teacherData.id}`
        );
        setAttendance(attendanceRes.data.data);

        // Extract unique batches from attendance data
        const uniqueBatches = [];
        const batchMap = new Map();
        attendanceRes.data.data.forEach(record => {
          const batchKey = `${record.batch_name}-${record.grade}-${record.section}`;
          if (!batchMap.has(batchKey)) {
            batchMap.set(batchKey, {
              name: `${record.batch_name} - ${record.grade}${record.section}`,
              batch_name: record.batch_name,
              grade: record.grade,
              section: record.section
            });
          }
        });
        setBatches(Array.from(batchMap.values()));
      } catch (error) {
        console.error("Error fetching attendance:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAttendance();
  }, [teacherData]);

  // Adjust date to IST timezone
  const getISTDateString = () => {
    const date = new Date();
    // Adjust to IST (UTC+5:30)
    const istOffset = 5.5 * 60 * 60 * 1000; // 5 hours 30 minutes in milliseconds
    const istDate = new Date(date.getTime() + istOffset);
    return istDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  };

  const filterAttendanceByDateRange = (startDate, endDate) =>
    attendance.filter(record => {
      const recDate = new Date(record.date);
      return recDate >= startDate && recDate <= endDate;
    });

  const getAttendanceStats = (filteredData) => {
    const presentCount = filteredData.filter(a => a.status === "present").length;
    const absentCount = filteredData.filter(a => a.status === "absent").length;
    return { present: presentCount, absent: absentCount };
  };

  const todayStr = getISTDateString();
  console.log("Today’s date (IST):", todayStr); // Debug log
  console.log("Attendance data:", attendance); // Debug log
  const todayAttendance = attendance.filter(a => a.date === todayStr);
  console.log("Today’s attendance:", todayAttendance); // Debug log
  const todayStats = getAttendanceStats(todayAttendance);

  const today = new Date();
  const lastWeek = new Date(today);
  lastWeek.setDate(today.getDate() - 6);

  const weekAttendance = filterAttendanceByDateRange(lastWeek, today);
  const weekStatsByDay = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(lastWeek);
    date.setDate(lastWeek.getDate() + i);
    const dateStr = date.toISOString().split("T")[0];
    const dayRecords = weekAttendance.filter(a => a.date === dateStr);
    const stats = getAttendanceStats(dayRecords);
    const formattedDate = date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    const total = stats.present + stats.absent;
    const attendanceRate = total > 0 ? ((stats.present / total) * 100).toFixed(1) : 0;
    weekStatsByDay.push({
      date: formattedDate,
      present: stats.present,
      absent: stats.absent,
      total: total,
      rate: parseFloat(attendanceRate)
    });
  }

  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const monthAttendance = attendance.filter(a => {
    const d = new Date(a.date);
    return d.getFullYear() === currentYear && d.getMonth() === currentMonth;
  });
  const monthStats = getAttendanceStats(monthAttendance);

  const monthStatsByBatch = batches.map(batch => {
    const batchData = monthAttendance.filter(a =>
      a.batch_name === batch.batch_name &&
      a.grade === batch.grade &&
      a.section === batch.section
    );
    const stats = getAttendanceStats(batchData);
    const total = stats.present + stats.absent;
    const rate = total > 0 ? ((stats.present / total) * 100).toFixed(1) : 0;
    const uniqueStudents = new Set(batchData.map(a => a.student_enrollment_number)).size;
    return {
      batch: batch.name,
      present: stats.present,
      absent: stats.absent,
      total: total,
      rate: parseFloat(rate),
      students: uniqueStudents
    };
  });

  const todayPieData = [
    { name: 'Present', value: todayStats.present, color: '#10B981' },
    { name: 'Absent', value: todayStats.absent, color: '#EF4444' }
  ];

  const totalStudents = new Set(attendance.map(a => a.student_enrollment_number)).size;
  const totalPresent = monthStats.present;
  const totalAbsent = monthStats.absent;
  const overallRate = (totalPresent + totalAbsent) > 0 ? ((totalPresent / (totalPresent + totalAbsent)) * 100).toFixed(1) : 0;

  const todayBatchData = batches.map(batch => {
    const batchToday = todayAttendance.filter(a =>
      a.batch_name === batch.batch_name &&
      a.grade === batch.grade &&
      a.section === batch.section
    );
    const stats = getAttendanceStats(batchToday);
    return {
      batch: batch.name,
      present: stats.present,
      absent: stats.absent,
      total: stats.present + stats.absent
    };
  });

  const weeklyBatchData = batches.map(batch => {
    const batchWeek = weekAttendance.filter(a =>
      a.batch_name === batch.batch_name &&
      a.grade === batch.grade &&
      a.section === batch.section
    );
    const stats = getAttendanceStats(batchWeek);
    const total = stats.present + stats.absent;
    const rate = total > 0 ? ((stats.present / total) * 100).toFixed(1) : 0;
    return {
      batch: batch.name,
      present: stats.present,
      absent: stats.absent,
      total: total,
      rate: parseFloat(rate)
    };
  });

  const yearAttendance = attendance.filter(a => {
    const d = new Date(a.date);
    return d.getFullYear() === currentYear;
  });
  const yearlyBatchData = batches.map(batch => {
    const batchYear = yearAttendance.filter(a =>
      a.batch_name === batch.batch_name &&
      a.grade === batch.grade &&
      a.section === batch.section
    );
    const stats = getAttendanceStats(batchYear);
    const total = stats.present + stats.absent;
    const rate = total > 0 ? ((stats.present / total) * 100).toFixed(1) : 0;
    const uniqueStudents = new Set(batchYear.map(a => a.student_enrollment_number)).size;
    return {
      batch: batch.name,
      present: stats.present,
      absent: stats.absent,
      total: total,
      rate: parseFloat(rate),
      students: uniqueStudents
    };
  });

  const StatCard = ({ title, value, icon: Icon, color, bgColor, textColor }) => (
    <div className={`${bgColor} rounded-2xl p-6 text-white shadow-lg transform hover:scale-105 transition-all duration-300`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/80 text-sm font-medium">{title}</p>
          <p className={`text-3xl font-bold ${textColor || 'text-white'} mt-2`}>{value}</p>
        </div>
        <div className={`${color} p-3 rounded-xl bg-white/20`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <main className="flex-1 p-4 lg:p-6 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <p>Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 p-4 lg:p-6 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold text-gray-800">Teacher Dashboard</h1>
            <div className="flex items-center space-x-2 text-gray-500">
              <Clock size={18} />
              <span className="text-sm">{new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
          </div>
          <p className="text-gray-600 text-lg">
            Welcome back! Here's your attendance overview and class insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Students"
            value={totalStudents}
            icon={Users}
            color="bg-blue-500"
            bgColor="bg-gradient-to-br from-blue-500 to-blue-600"
          />
          <StatCard
            title="Today's Present"
            value={todayStats.present}
            icon={UserCheck}
            color="bg-green-500"
            bgColor="bg-gradient-to-br from-green-500 to-green-600"
          />
          <StatCard
            title="Today's Absent"
            value={todayStats.absent}
            icon={UserX}
            color="bg-red-500"
            bgColor="bg-gradient-to-br from-red-500 to-red-600"
          />
          <StatCard
            title="Monthly Rate"
            value={`${overallRate}%`}
            icon={TrendingUp}
            color="bg-purple-500"
            bgColor="bg-gradient-to-br from-purple-500 to-purple-600"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Calendar className="mr-2 text-blue-500" size={24} />
              Today's Batch Performance
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={todayBatchData} margin={{ top: 20, right: 30, left: 0, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="batch"
                  tick={{ fontSize: 10 }}
                  stroke="#6B7280"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis stroke="#6B7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                  }}
                />
                <Legend />
                <Bar dataKey="present" fill="#10B981" radius={[4, 4, 0, 0]} name="Present" />
                <Bar dataKey="absent" fill="#EF4444" radius={[4, 4, 0, 0]} name="Absent" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <TrendingUp className="mr-2 text-green-500" size={24} />
              Today's Overall Status
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={todayPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {todayPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <BookOpen className="mr-2 text-purple-500" size={24} />
            Weekly Attendance Analysis
          </h3>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold mb-3 text-gray-700">Daily Trend</h4>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={weekStatsByDay}>
                  <defs>
                    <linearGradient id="colorPresent" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="present"
                    stroke="#10B981"
                    fillOpacity={1}
                    fill="url(#colorPresent)"
                    strokeWidth={3}
                  />
                  <Area
                    type="monotone"
                    dataKey="absent"
                    stroke="#EF4444"
                    fillOpacity={0.6}
                    fill="#EF4444"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-3 text-gray-700">Batch Performance</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyBatchData} margin={{ top: 20, right: 30, left: 0, bottom: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="batch"
                    tick={{ fontSize: 10 }}
                    stroke="#6B7280"
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis stroke="#6B7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Bar dataKey="rate" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Attendance %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Calendar className="mr-2 text-indigo-500" size={24} />
              Monthly Batch Performance
            </h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={monthStatsByBatch} margin={{ top: 20, right: 30, left: 0, bottom: 80 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="batch"
                  tick={{ fontSize: 10 }}
                  stroke="#6B7280"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis stroke="#6B7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                  }}
                  formatter={(value, name) => [value, name.charAt(0).toUpperCase() + name.slice(1)]}
                />
                <Legend />
                <Bar
                  dataKey="present"
                  fill="#22C55E"
                  radius={[4, 4, 0, 0]}
                  name="Present"
                />
                <Bar
                  dataKey="absent"
                  fill="#EF4444"
                  radius={[4, 4, 0, 0]}
                  name="Absent"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Award className="mr-2 text-orange-500" size={24} />
              Yearly Batch Overview
            </h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={yearlyBatchData} margin={{ top: 20, right: 30, left: 0, bottom: 80 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="batch"
                  tick={{ fontSize: 10 }}
                  stroke="#6B7280"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis stroke="#6B7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                  }}
                  formatter={(value, name) => [
                    name === 'rate' ? `${value}%` : value,
                    name === 'rate' ? 'Attendance Rate' : name.charAt(0).toUpperCase() + name.slice(1)
                  ]}
                />
                <Legend />
                <Bar
                  dataKey="total"
                  fill="#8B5CF6"
                  radius={[4, 4, 0, 0]}
                  name="Total Attendance"
                />
                <Bar
                  dataKey="rate"
                  fill="#F59E0B"
                  radius={[4, 4, 0, 0]}
                  name="Success Rate %"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <TrendingUp className="mr-2 text-blue-500" size={24} />
              Monthly Batch Summary
            </h3>
            <div className="space-y-4">
              {monthStatsByBatch.map((batch, index) => (
                <div key={index} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-semibold text-gray-800">{batch.batch}</h4>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      batch.rate >= 80 ? 'bg-green-100 text-green-800' :
                      batch.rate >= 60 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {batch.rate}%
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-green-600 font-bold text-lg">{batch.present}</div>
                      <div className="text-gray-500">Present</div>
                    </div>
                    <div className="text-center">
                      <div className="text-red-600 font-bold text-lg">{batch.absent}</div>
                      <div className="text-gray-500">Absent</div>
                    </div>
                    <div className="text-center">
                      <div className="text-blue-600 font-bold text-lg">{batch.students}</div>
                      <div className="text-gray-500">Students</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <Award className="mr-2 text-yellow-500" size={24} />
              Yearly Batch Performance
            </h3>
            <div className="space-y-4">
              {yearlyBatchData.map((batch, index) => (
                <div key={index} className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-200">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-semibold text-gray-800">{batch.batch}</h4>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      batch.rate >= 80 ? 'bg-green-100 text-green-800' :
                      batch.rate >= 60 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {batch.rate}%
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-3 text-sm">
                    <div className="text-center">
                      <div className="text-green-600 font-bold text-lg">{batch.present}</div>
                      <div className="text-gray-500">Present</div>
                    </div>
                    <div className="text-center">
                      <div className="text-red-600 font-bold text-lg">{batch.absent}</div>
                      <div className="text-gray-500">Absent</div>
                    </div>
                    <div className="text-center">
                      <div className="text-blue-600 font-bold text-lg">{batch.total}</div>
                      <div className="text-gray-500">Total</div>
                    </div>
                    <div className="text-center">
                      <div className="text-purple-600 font-bold text-lg">{batch.students}</div>
                      <div className="text-gray-500">Students</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <Users className="mr-2 text-green-500" size={24} />
            Student Performance Overview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white text-center">
              <div className="text-3xl font-bold mb-2">{totalStudents}</div>
              <div className="text-blue-100">Total Students</div>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white text-center">
              <div className="text-3xl font-bold mb-2">{monthStats.present}</div>
              <div className="text-green-100">Monthly Present</div>
            </div>
            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white text-center">
              <div className="text-3xl font-bold mb-2">{monthStats.absent}</div>
              <div className="text-red-100">Monthly Absent</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white text-center">
              <div className="text-3xl font-bold mb-2">{overallRate}%</div>
              <div className="text-purple-100">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

TeacherDashboard.layout = (page) => <TeacherLayout>{page}</TeacherLayout>;