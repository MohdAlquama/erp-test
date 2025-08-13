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
  LabelList
} from "recharts";

export default function TeacherDashboard() {
  const { teacherData } = useTeacher();
  const [batches, setBatches] = useState([]);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    if (!teacherData?.id || !teacherData?.admin_id) return;

    const fetchBatches = async () => {
      try {
        const batchRes = await axiosInstance.get(`/teacher/${teacherData.admin_id}/batches`);
        setBatches(batchRes.data);
      } catch (error) {
        console.error("Error fetching batches:", error);
      }
    };

    const fetchAttendance = async () => {
      try {
        const attendanceRes = await axiosInstance.get(
          `/teacher/attendance/all/${teacherData.id}/${teacherData.admin_id}`
        );
        setAttendance(attendanceRes.data.data);
      } catch (error) {
        console.error("Error fetching attendance:", error);
      }
    };

    fetchBatches();
    fetchAttendance();
  }, [teacherData]);

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

  const todayStr = new Date().toISOString().split("T")[0];
  const todayAttendance = attendance.filter(a => a.date === todayStr);
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
    // Format date nicely for XAxis (e.g. Aug 10)
    const formattedDate = date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    weekStatsByDay.push({ date: formattedDate, present: stats.present, absent: stats.absent });
  }

  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const monthAttendance = attendance.filter(a => {
    const d = new Date(a.date);
    return d.getFullYear() === currentYear && d.getMonth() === currentMonth;
  });
  const monthStats = getAttendanceStats(monthAttendance);

  const monthStatsByBatch = batches.map(batch => {
    const batchData = monthAttendance.filter(a => a.batch_id === batch.id);
    const stats = getAttendanceStats(batchData);
    return { batch: batch.name, present: stats.present, absent: stats.absent };
  });

  return (
    <main className="flex-1 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Teacher Dashboard</h2>
          <p className="text-gray-600 mb-6">
            Manage your classes, students, and courses from this central dashboard.
          </p>

          {/* Today's Attendance */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white shadow-lg">
              <h3 className="text-lg font-semibold mb-2">Today's Present</h3>
              <p className="text-4xl font-extrabold">{todayStats.present}</p>
            </div>
            <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-6 text-white shadow-lg">
              <h3 className="text-lg font-semibold mb-2">Today's Absent</h3>
              <p className="text-4xl font-extrabold">{todayStats.absent}</p>
            </div>
          </div>

          {/* Weekly Attendance Chart */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Weekly Attendance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={weekStatsByDay}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip
                  contentStyle={{ backgroundColor: '#333', borderRadius: 5 }}
                  formatter={(value, name) => [value, name.charAt(0).toUpperCase() + name.slice(1)]}
                />
                <Legend wrapperStyle={{ fontWeight: 'bold', fontSize: 14 }} />
                <Bar
                  dataKey="present"
                  stackId="a"
                  fill="#10B981"
                  isAnimationActive={true}
                  radius={[6, 6, 0, 0]}
                >
                  <LabelList dataKey="present" position="top" />
                </Bar>
                <Bar
                  dataKey="absent"
                  stackId="a"
                  fill="#EF4444"
                  isAnimationActive={true}
                  radius={[6, 6, 0, 0]}
                >
                  <LabelList dataKey="absent" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Monthly Attendance Summary */}
          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-lg font-semibold mb-2">This Month Present</h3>
              <p className="text-5xl font-extrabold text-green-700">{monthStats.present}</p>
            </div>
            <div className="bg-red-50 p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-lg font-semibold mb-2">This Month Absent</h3>
              <p className="text-5xl font-extrabold text-red-700">{monthStats.absent}</p>
            </div>
          </div>

          {/* Monthly Attendance by Batch */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Monthly Attendance by Batch</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={monthStatsByBatch}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="batch" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip
                  contentStyle={{ backgroundColor: '#333', borderRadius: 5 }}
                  formatter={(value, name) => [value, name.charAt(0).toUpperCase() + name.slice(1)]}
                />
                <Legend wrapperStyle={{ fontWeight: 'bold', fontSize: 14 }} />
                <Bar
                  dataKey="present"
                  fill="#22C55E"
                  isAnimationActive={true}
                  radius={[6, 6, 0, 0]}
                >
                  <LabelList dataKey="present" position="top" />
                </Bar>
                <Bar
                  dataKey="absent"
                  fill="#EF4444"
                  isAnimationActive={true}
                  radius={[6, 6, 0, 0]}
                >
                  <LabelList dataKey="absent" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </main>
  );
}

TeacherDashboard.layout = (page) => <TeacherLayout>{page}</TeacherLayout>;

// import React, { useEffect, useState } from "react";
// import { useTeacher } from "@/contexts/TeacherContext";
// import TeacherLayout from "@/Layouts/TeacherLayout";
// import axiosInstance from "@/utils/axiosInstance";
// import {
//   PolarAngleAxis,
//   PolarGrid,
//   PolarRadiusAxis,
//   Radar,
//   RadarChart,
//   Tooltip as ReTooltip,
//   ResponsiveContainer,
//   Legend,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   PieChart,
//   Pie,
//   Cell,
// } from "recharts";

// export default function TeacherDashboard() {
//   const { teacherData } = useTeacher();
//   const [batches, setBatches] = useState([]);
//   const [attendance, setAttendance] = useState([]);

//   useEffect(() => {
//     if (!teacherData?.id || !teacherData?.admin_id) return;

//     const fetchBatches = async () => {
//       try {
//         const batchRes = await axiosInstance.get(
//           `/teacher/${teacherData.admin_id}/batches`
//         );
//         setBatches(batchRes.data);
//       } catch (error) {
//         console.error("Error fetching batches:", error);
//       }
//     };

//     const fetchAttendance = async () => {
//       try {
//         const attendanceRes = await axiosInstance.get(
//           `/teacher/attendance/all/${teacherData.id}/${teacherData.admin_id}`
//         );
//         setAttendance(attendanceRes.data.data);
//       } catch (error) {
//         console.error("Error fetching attendance:", error);
//       }
//     };

//     fetchBatches();
//     fetchAttendance();
//   }, [teacherData]);

//   // Filter attendance by date range
//   const filterAttendanceByDateRange = (startDate, endDate) =>
//     attendance.filter((record) => {
//       const recDate = new Date(record.date);
//       return recDate >= startDate && recDate <= endDate;
//     });

//   // Get stats helper
//   const getAttendanceStats = (filteredData) => {
//     const presentCount = filteredData.filter((a) => a.status === "present")
//       .length;
//     const absentCount = filteredData.filter((a) => a.status === "absent")
//       .length;
//     return { present: presentCount, absent: absentCount };
//   };

//   const todayStr = new Date().toISOString().split("T")[0];
//   const todayAttendance = attendance.filter((a) => a.date === todayStr);
//   const todayStats = getAttendanceStats(todayAttendance);

//   const todayPolarData = [
//     { status: "Present", value: todayStats.present },
//     { status: "Absent", value: todayStats.absent },
//   ];

//   // Weekly range
//   const today = new Date();
//   const lastWeek = new Date(today);
//   lastWeek.setDate(today.getDate() - 6);
//   const weekAttendance = filterAttendanceByDateRange(lastWeek, today);

//   // Prepare weekly line chart data grouped by date (all batches combined)
//   const weekLineData = [];
//   for (let i = 0; i < 7; i++) {
//     const date = new Date(lastWeek);
//     date.setDate(lastWeek.getDate() + i);
//     const dateStr = date.toISOString().split("T")[0];
//     const filtered = weekAttendance.filter((a) => a.date === dateStr);
//     const stats = getAttendanceStats(filtered);
//     const formattedDate = date.toLocaleDateString(undefined, {
//       month: "short",
//       day: "numeric",
//     });
//     weekLineData.push({
//       date: formattedDate,
//       Present: stats.present,
//       Absent: stats.absent,
//     });
//   }

//   // Weekly attendance by batch for pie chart (show present count by batch)
//   // Aggregate per batch for present vs absent
//   const weekStatsByBatch = batches.map((batch) => {
//     const batchData = weekAttendance.filter((a) => a.batch_id === batch.id);
//     const stats = getAttendanceStats(batchData);
//     return {
//       batch: batch.name,
//       present: stats.present,
//       absent: stats.absent,
//     };
//   });

//   // Pie data example for batch present counts (you can switch to absent or add a toggle)
//   const pieData = weekStatsByBatch.map(({ batch, present }) => ({
//     name: batch,
//     value: present,
//   }));

//   const COLORS = [
//     "#0088FE",
//     "#00C49F",
//     "#FFBB28",
//     "#FF8042",
//     "#AA3377",
//     "#33AA77",
//     "#7788AA",
//   ];

//   return (
//     <main className="flex-1 p-4 lg:p-6">
//       <div className="max-w-7xl mx-auto">
//         <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">
//             Teacher Dashboard
//           </h2>
//           <p className="text-gray-600 mb-6">
//             Manage your classes, students, and courses from this central
//             dashboard.
//           </p>

//           {/* Polar Area Chart for Today's Attendance */}
//           <div className="mb-8">
//             <h3 className="text-xl font-semibold mb-3">Today's Attendance</h3>
//             <ResponsiveContainer width="100%" height={300}>
//               <RadarChart cx="50%" cy="50%" outerRadius="80%" data={todayPolarData}>
//                 <PolarGrid />
//                 <PolarAngleAxis dataKey="status" />
//                 <PolarRadiusAxis angle={30} domain={[0, Math.max(...todayPolarData.map(d => d.value)) + 5]} />
//                 <Radar
//                   name="Students"
//                   dataKey="value"
//                   stroke="#8884d8"
//                   fill="#8884d8"
//                   fillOpacity={0.6}
//                   animationDuration={1500}
//                 />
//                 <ReTooltip />
//               </RadarChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Line Chart for Weekly Attendance Trends */}
//           <div className="mb-8">
//             <h3 className="text-xl font-semibold mb-3">Weekly Attendance Trends</h3>
//             <ResponsiveContainer width="100%" height={300}>
//               <LineChart data={weekLineData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
//                 <XAxis dataKey="date" />
//                 <YAxis allowDecimals={false} />
//                 <ReTooltip />
//                 <Legend verticalAlign="top" height={36} />
//                 <Line
//                   type="monotone"
//                   dataKey="Present"
//                   stroke="#10B981"
//                   activeDot={{ r: 8 }}
//                   strokeWidth={3}
//                   animationDuration={1500}
//                 />
//                 <Line
//                   type="monotone"
//                   dataKey="Absent"
//                   stroke="#EF4444"
//                   strokeWidth={3}
//                   animationDuration={1500}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Pie Chart for Weekly Attendance by Batch */}
//           <div className="mb-8">
//             <h3 className="text-xl font-semibold mb-3">
//               Weekly Present Students by Batch
//             </h3>
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie
//                   data={pieData}
//                   dataKey="value"
//                   nameKey="name"
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={100}
//                   fill="#8884d8"
//                   label={({ name, percent }) =>
//                     `${name} (${(percent * 100).toFixed(0)}%)`
//                   }
//                   animationDuration={1500}
//                 >
//                   {pieData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <ReTooltip />
//                 <Legend verticalAlign="bottom" height={36} />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

// TeacherDashboard.layout = (page) => <TeacherLayout>{page}</TeacherLayout>;
