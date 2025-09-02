// import React, { useEffect, useState } from "react";
// import { UserCircle, CalendarCheck, FileText, Users } from "lucide-react";
// import axiosInstance from "@/utils/axiosInstance";

// export default function AdminDashboard() {
//   const [stats, setStats] = useState({
//     total: 0,
//     active: 0,
//     inactive: 0,
//     studentsTotal: 0,
//     studentsActive: 0,
//     studentsInactive: 0,
//     totalBatches: 0,
//     totalClassRooms: 0,
//     totalAtmitCard: 0,
//   });

//   const adminId = 8; // <-- dynamically set this from context/session

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const [
//           totalRes,
//           activeRes,
//           inactiveRes,
//           studentsTotalRes,
//           studentsActiveRes,
//           studentsInactiveRes,
//           totalBatchesRes,
//           totalClassRoomsRes,
//           totalAtmitCardRes,
//         ] = await Promise.all([
//           axiosInstance.get(`/admin/${adminId}/total-teachers-count`),
//           axiosInstance.get(`/admin/${adminId}/active-teachers-count`),
//           axiosInstance.get(`/admin/${adminId}/inactive-teachers-count`),
//           axiosInstance.get(`/admin/${adminId}/total-students-count`),
//           axiosInstance.get(`/admin/${adminId}/active-students-count`),
//           axiosInstance.get(`/admin/${adminId}/inactive-students-count`),
//           axiosInstance.get(`/admin/${adminId}/totalBatch`),
//           axiosInstance.get(`/admin/${adminId}/totalClassRooms`),
//           axiosInstance.get(`/admin/${adminId}/totalAtmitCard`),
//         ]);

//         setStats({
//           total: totalRes.data.totalTeachersCount,
//           active: activeRes.data.activeTeachersCount,
//           inactive: inactiveRes.data.inactiveTeachersCount,
//           studentsTotal: studentsTotalRes.data.totalStudentsCount,
//           studentsActive: studentsActiveRes.data.activeStudentsCount,
//           studentsInactive: studentsInactiveRes.data.inactiveStudentsCount,
//           totalBatches: totalBatchesRes.data.totalBatches,
//           totalClassRooms: totalClassRoomsRes.data.totalExamRomm,
//           totalAtmitCard: totalAtmitCardRes.data.totalAtmitCard,
//         });
//       } catch (error) {
//         console.error("Error fetching stats:", error);
//       }
//     };

//     fetchStats();
//   }, [adminId]);

//   return (
//     <div className="space-y-6 p-4 bg-gradient-to-r from-gray-100 to-gray-200 min-h-screen">
//       {/* Page Header */}
//       <div className="p-6 bg-white shadow rounded-xl">
//         <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
//           Welcome, Admin
//         </h1>
//         <p className="text-gray-600 dark:text-gray-300">
//           Here’s an overview of your activity
//         </p>
//       </div>

//       {/* Teachers Stats */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex items-center gap-4">
//           <UserCircle className="w-12 h-12 text-indigo-600" />
//           <div>
//             <p className="text-sm text-gray-500 dark:text-gray-400">
//               Total Teachers
//             </p>
//             <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
//               {stats.total}
//             </h3>
//           </div>
//         </div>

//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex items-center gap-4">
//           <CalendarCheck className="w-12 h-12 text-green-600" />
//           <div>
//             <p className="text-sm text-gray-500 dark:text-gray-400">
//               Active Teachers
//             </p>
//             <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
//               {stats.active}
//             </h3>
//           </div>
//         </div>

//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex items-center gap-4">
//           <FileText className="w-12 h-12 text-red-600" />
//           <div>
//             <p className="text-sm text-gray-500 dark:text-gray-400">
//               Inactive Teachers
//             </p>
//             <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
//               {stats.inactive}
//             </h3>
//           </div>
//         </div>
//       </div>

//       {/* Students Stats */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex items-center gap-4">
//           <Users className="w-12 h-12 text-indigo-600" />
//           <div>
//             <p className="text-sm text-gray-500 dark:text-gray-400">
//               Total Students
//             </p>
//             <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
//               {stats.studentsTotal}
//             </h3>
//           </div>
//         </div>

//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex items-center gap-4">
//           <CalendarCheck className="w-12 h-12 text-green-600" />
//           <div>
//             <p className="text-sm text-gray-500 dark:text-gray-400">
//               Active Students
//             </p>
//             <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
//               {stats.studentsActive}
//             </h3>
//           </div>
//         </div>

//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex items-center gap-4">
//           <FileText className="w-12 h-12 text-red-600" />
//           <div>
//             <p className="text-sm text-gray-500 dark:text-gray-400">
//               Inactive Students
//             </p>
//             <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
//               {stats.studentsInactive}
//             </h3>
//           </div>
//         </div>
//       </div>

//       {/* new */}

//        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex items-center gap-4">
//           <Users className="w-12 h-12 text-indigo-600" />
//           <div>
//             <p className="text-sm text-gray-500 dark:text-gray-400">
//               Total Batches
//             </p>
//             <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
//               {stats.totalBatches}
//             </h3>
//           </div>
//         </div>

//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex items-center gap-4">
//           <CalendarCheck className="w-12 h-12 text-green-600" />
//           <div>
//             <p className="text-sm text-gray-500 dark:text-gray-400">
//               Total Exam Class Rooms
//             </p>
//             <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
//               {stats.totalClassRooms}
//             </h3>
//           </div>
//         </div>

//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex items-center gap-4">
//           <FileText className="w-12 h-12 text-red-600" />
//           <div>
//             <p className="text-sm text-gray-500 dark:text-gray-400">
//               total Admit Card Designs
//             </p>
//             <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
//               {stats.totalAtmitCard}
//             </h3>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Use layout
// import AdminLayout from "@/Layouts/AdminLayout";
// AdminDashboard.layout = (page) => <AdminLayout>{page}</AdminLayout>;
import React, { useEffect, useState , Suspense} from "react";
import AdminLayout from "@/Layouts/AdminLayout";
// import AdminAttendance from "./attendance/AdminAttendance";
import AttendanceHierarchy from "./attendance/AttendanceHierarchy";
import { useBaseContext } from "@/contexts/adminContext";
import {
  UserCircle,
  CalendarCheck,
  FileText,
  Users,
  Layers,
  School,
  IdCard,
} from "lucide-react";
import axiosInstance from "@/utils/axiosInstance";
import { motion } from "framer-motion";

export default function AdminDashboard() {
    const { admin } = useBaseContext();
  
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    studentsTotal: 0,
    studentsActive: 0,
    studentsInactive: 0,
    totalBatches: 0,
    totalClassRooms: 0,
    totalAtmitCard: 0,
    totalPresentToday: 0,
    totalAbsentToday: 0,
  });

const AdminAttendance = React.lazy(() => import("./attendance/AdminAttendance"));
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [
          totalRes,
          activeRes,
          inactiveRes,
          studentsTotalRes,
          studentsActiveRes,
          studentsInactiveRes,
          totalBatchesRes,
          totalClassRoomsRes,
          totalAtmitCardRes,
          totalPresentTodayRes,
          totalAbsentTodayRes,
        ] = await Promise.all([
          axiosInstance.get(`/admin/${admin.id}/total-teachers-count`),
          axiosInstance.get(`/admin/${admin.id}/active-teachers-count`),
          axiosInstance.get(`/admin/${admin.id}/inactive-teachers-count`),
          axiosInstance.get(`/admin/${admin.id}/total-students-count`),
          axiosInstance.get(`/admin/${admin.id}/active-students-count`),
          axiosInstance.get(`/admin/${admin.id}/inactive-students-count`),
          axiosInstance.get(`/admin/${admin.id}/totalBatch`),
          axiosInstance.get(`/admin/${admin.id}/totalClassRooms`),
          axiosInstance.get(`/admin/${admin.id}/totalAtmitCard`),
          axiosInstance.get(`/admin/${admin.id}/totalPresentToday`),
          axiosInstance.get(`/admin/${admin.id}/totalAbsentToday`),
        ]);

        setStats({
          total: totalRes.data.totalTeachersCount,
          active: activeRes.data.activeTeachersCount,
          inactive: inactiveRes.data.inactiveTeachersCount,
          studentsTotal: studentsTotalRes.data.totalStudentsCount,
          studentsActive: studentsActiveRes.data.activeStudentsCount,
          studentsInactive: studentsInactiveRes.data.inactiveStudentsCount,
          totalBatches: totalBatchesRes.data.totalBatches,
          totalClassRooms: totalClassRoomsRes.data.totalExamRomm,
          totalAtmitCard: totalAtmitCardRes.data.totalAtmitCard,
          totalPresentToday: totalPresentTodayRes.data.totalPresentToday,
          totalAbsentToday: totalAbsentTodayRes.data.totalAbsentToday,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, [admin?.id]);

  const cards = [
    {
      title: "Total Teachers",
      value: stats.total,
      icon: <UserCircle className="w-8 h-8 text-indigo-600" />,
      color: "from-indigo-50 to-indigo-100",
    },
    {
      title: "Active Teachers",
      value: stats.active,
      icon: <CalendarCheck className="w-8 h-8 text-green-600" />,
      color: "from-green-50 to-green-100",
    },
    {
      title: "Inactive Teachers",
      value: stats.inactive,
      icon: <FileText className="w-8 h-8 text-red-600" />,
      color: "from-red-50 to-red-100",
    },
    {
      title: "Total Students",
      value: stats.studentsTotal,
      icon: <Users className="w-8 h-8 text-purple-600" />,
      color: "from-purple-50 to-purple-100",
    },
    {
      title: "Active Students",
      value: stats.studentsActive,
      icon: <CalendarCheck className="w-8 h-8 text-emerald-600" />,
      color: "from-emerald-50 to-emerald-100",
    },
    {
      title: "Inactive Students",
      value: stats.studentsInactive,
      icon: <FileText className="w-8 h-8 text-orange-600" />,
      color: "from-orange-50 to-orange-100",
    },
    {
      title: "Total Batches",
      value: stats.totalBatches,
      icon: <Layers className="w-8 h-8 text-pink-600" />,
      color: "from-pink-50 to-pink-100",
    },
    {
      title: "Exam Class Rooms",
      value: stats.totalClassRooms,
      icon: <School className="w-8 h-8 text-cyan-600" />,
      color: "from-cyan-50 to-cyan-100",
    },
    {
      title: "Admit Card Designs",
      value: stats.totalAtmitCard,
      icon: <IdCard className="w-8 h-8 text-yellow-600" />,
      color: "from-yellow-50 to-yellow-100",
    },
    {
      title: "Present Today",
      value: stats.totalPresentToday,
      icon: <CalendarCheck className="w-8 h-8 text-lime-600" />,
      color: "from-lime-50 to-lime-100",
    },
    {
      title: "Absent Today",
      value: stats.totalAbsentToday,
      icon: <FileText className="w-8 h-8 text-rose-600" />,
      color: "from-rose-50 to-rose-100",
    },
  ];

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 min-h-screen">
      {/* Page Header */}
      <div className="p-8 bg-white shadow-xl rounded-2xl">
        <h1 className="text-3xl font-bold text-gray-800">Welcome, Admin 👋</h1>
        <p className="text-gray-600 mt-2">
          Here’s a quick glance at your institute’s performance.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className={`rounded-2xl shadow-md bg-gradient-to-br ${card.color} p-6 flex items-center gap-4`}
          >
            <div className="p-3 bg-white rounded-full shadow">{card.icon}</div>
            <div>
              <p className="text-sm text-gray-500">{card.title}</p>
              <h3 className="text-2xl font-bold text-gray-800">
                {card.value ?? 0}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>

  

      <Suspense fallback={<p className="text-center p-4">Loading Attendance...</p>}>
      <AdminAttendance adminId={admin.id} />
    </Suspense>
     
    </div>
  );
}




AdminDashboard.layout = (page) => <AdminLayout>{page}</AdminLayout>;
