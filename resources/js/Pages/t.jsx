// // pages/admin/Dashboard.jsx (if using file-based routing)

// // import React from 'react';
// // import AdminLayout from '@/Layouts/AdminLayout';
// // import { useBaseContext } from '@/contexts/adminContext';

// // const Dashboard = () => {
// //   const { admin } = useBaseContext();

// //   return (
// //       <div className="p-6">
// //         {admin && admin.name ? (
// //           <>
// //             <h1 className="text-2xl font-bold mb-4">Welcome, {admin.name}!</h1>
// //             <h1 className="text-2xl font-bold mb-4">id, {admin.id}!</h1>
// //             <p className="text-gray-600">This is your admin dashboard.</p>
// //             {/* You can add charts, stats, or tables here */}
// //           </>
// //         ) : (
// //           <>
// //             <h1 className="text-2xl font-bold mb-4">Welcome to the Admin Dashboard</h1>
// //             <p className="text-gray-600">Please log in to access your dashboard.</p>
// //           </>
// //         )}
// //       </div>
// //   );
// // };

// // export default Dashboard;


// // // Assign layout
// // Dashboard.layout = (page) => <AdminLayout>{page}</AdminLayout>;


// import React, { useEffect, useState } from 'react';
// import axiosInstance from '@/utils/axiosInstance';
// import AdminLayout from '@/Layouts/AdminLayout';
// import { useBaseContext } from '@/contexts/adminContext';

// const Dashboard = () => {
//   const { admin } = useBaseContext();
//   const [teacherCount, setTeacherCount] = useState(null);

//   useEffect(() => {
//     if (admin?.id) {
//       axiosInstance.get(`/teachers/${admin.id}/count`)
//         .then(res => {
//           setTeacherCount(res.data.count);
//         })
//         .catch(err => {
//           console.error('Error fetching teacher count:', err);
//         });
//     }
//   }, [admin?.id]);

//   return (
//     <div className="p-6">
//       {admin && admin.name ? (
//         <>
//           <h1 className="text-2xl font-bold mb-4">Welcome, {admin.name}!</h1>
//           <p className="text-gray-600">ID: {admin.id}</p>
//           <p className="text-gray-600">Total Teachers: {teacherCount ?? 'Loading...'}</p>
//         </>
//       ) : (
//         <>
//           <h1 className="text-2xl font-bold mb-4">Welcome to the Admin Dashboard</h1>
//           <p className="text-gray-600">Please log in to access your dashboard.</p>
//         </>
//       )}
//     </div>
//   );
// };

// export default Dashboard;

// // Assign layout
// Dashboard.layout = (page) => <AdminLayout>{page}</AdminLayout>;

// // import React, { useState } from 'react';
// // import { 
// //   Users, UserPlus, UserMinus, School, Edit, Home, UserX, 
// //   Ban, Hash, TrendingUp, Printer, Filter, User, Camera, 
// //   UserCheck, Bus, DollarSign, Upload, TrendingDown, 
// //   CreditCard, Settings, BookOpen, Megaphone, Shield, 
// //   Clock, GraduationCap, Calendar, Search, Bell, 
// //   BarChart3, PieChart, Activity, FileText, Eye,
// //   ChevronDown, ChevronRight, Plus, Download
// // } from 'lucide-react';
// // import AdminLayout from '@/Layouts/AdminLayout';

// // const StudentManagementDashboard = () => {
// //   const [activeTab, setActiveTab] = useState('overview');
// //   const [expandedSections, setExpandedSections] = useState({});
// //   const [searchTerm, setSearchTerm] = useState('');

// //   const toggleSection = (section) => {
// //     setExpandedSections(prev => ({
// //       ...prev,
// //       [section]: !prev[section]
// //     }));
// //   };

// //   // Mock data for dashboard
// //   const stats = [
// //     { title: 'Total Students', value: '2,847', change: '+12%', icon: Users, color: 'blue' },
// //     { title: 'Active Students', value: '2,691', change: '+5%', icon: UserCheck, color: 'green' },
// //     { title: 'Suspended', value: '45', change: '-8%', icon: UserX, color: 'yellow' },
// //     { title: 'Blocked Accounts', value: '111', change: '-15%', icon: Ban, color: 'red' }
// //   ];

// //   const recentActivities = [
// //     { action: 'Student Added', student: 'John Doe', time: '2 mins ago', type: 'success' },
// //     { action: 'Profile Updated', student: 'Sarah Smith', time: '15 mins ago', type: 'info' },
// //     { action: 'Account Suspended', student: 'Mike Wilson', time: '1 hour ago', type: 'warning' },
// //     { action: 'ID Card Generated', student: 'Emma Johnson', time: '2 hours ago', type: 'success' }
// //   ];

// //   const permissionGroups = {
// //     'Student Management': {
// //       icon: Users,
// //       color: 'blue',
// //       permissions: [
// //         { name: 'View Students', action: 'StudentManagementViewStudents', icon: Eye },
// //         { name: 'Add Student', action: 'StudentManagementAddStudent', icon: UserPlus },
// //         { name: 'Edit Student', action: 'StudentManagementEditStudent', icon: Edit },
// //         { name: 'Delete Student', action: 'StudentManagementDeleteStudent', icon: UserMinus },
// //         { name: 'View Profile', action: 'StudentManagementViewProfile', icon: User },
// //         { name: 'Update Guardian', action: 'StudentManagementUpdateGuardian', icon: Shield }
// //       ]
// //     },
// //     'Academic Management': {
// //       icon: GraduationCap,
// //       color: 'purple',
// //       permissions: [
// //         { name: 'Assign Roll Number', action: 'StudentManagementAssignRoll', icon: Hash },
// //         { name: 'Promote Student', action: 'StudentManagementPromoteStudent', icon: TrendingUp },
// //         { name: 'Demote Student', action: 'StudentManagementDemoteStudent', icon: TrendingDown },
// //         { name: 'View Exam Results', action: 'StudentManagementViewExamResult', icon: BookOpen },
// //         { name: 'View Attendance', action: 'StudentManagementViewAttendance', icon: Clock },
// //         { name: 'Add Previous School', action: 'StudentManagementAddPreviousSchool', icon: School }
// //       ]
// //     },
// //     'Account Management': {
// //       icon: Settings,
// //       color: 'green',
// //       permissions: [
// //         { name: 'Suspend Student', action: 'StudentManagementSuspendStudent', icon: UserX },
// //         { name: 'Block Account', action: 'StudentManagementBlockAccount', icon: Ban },
// //         { name: 'Unblock Account', action: 'StudentManagementUnblockAccount', icon: UserCheck },
// //         { name: 'Reinstate Student', action: 'StudentManagementReinstateStudent', icon: UserCheck },
// //         { name: 'Reset Password', action: 'StudentManagementResetPassword', icon: Settings }
// //       ]
// //     },
// //     'Hostel & Transport': {
// //       icon: Home,
// //       color: 'orange',
// //       permissions: [
// //         { name: 'Assign Hostel', action: 'StudentManagementAssignHostel', icon: Home },
// //         { name: 'Remove Hostel', action: 'StudentManagementRemoveHostel', icon: Home },
// //         { name: 'Assign Transport', action: 'StudentManagementAssignTransport', icon: Bus }
// //       ]
// //     },
// //     'Media & Documents': {
// //       icon: Camera,
// //       color: 'pink',
// //       permissions: [
// //         { name: 'Edit Profile Picture', action: 'StudentManagementEditProfilePicture', icon: Camera },
// //         { name: 'Upload Photo', action: 'StudentManagementUploadPhoto', icon: Upload },
// //         { name: 'Generate ID Card', action: 'StudentManagementGenerateIDCard', icon: CreditCard },
// //         { name: 'Print List', action: 'StudentManagementPrintList', icon: Printer }
// //       ]
// //     },
// //     'Financial Management': {
// //       icon: DollarSign,
// //       color: 'emerald',
// //       permissions: [
// //         { name: 'View Fee Status', action: 'StudentManagementViewFeeStatus', icon: DollarSign }
// //       ]
// //     },
// //     'Filters & Reports': {
// //       icon: Filter,
// //       color: 'indigo',
// //       permissions: [
// //         { name: 'Filter by Class', action: 'StudentManagementFilterByClass', icon: Filter },
// //         { name: 'Filter by Section', action: 'StudentManagementFilterBySection', icon: Filter },
// //         { name: 'Filter by Batch', action: 'StudentManagementFilterByBatch', icon: Filter }
// //       ]
// //     },
// //     'Communication': {
// //       icon: Megaphone,
// //       color: 'red',
// //       permissions: [
// //         { name: 'Send Announcement', action: 'StudentManagementSendAnnouncement', icon: Megaphone },
// //         { name: 'View Guardian', action: 'StudentManagementViewGuardian', icon: Shield }
// //       ]
// //     }
// //   };

// //   const quickActions = [
// //     { name: 'Add New Student', icon: UserPlus, color: 'blue', action: 'add-student' },
// //     { name: 'Generate Reports', icon: FileText, color: 'green', action: 'generate-reports' },
// //     { name: 'Bulk Upload', icon: Upload, color: 'purple', action: 'bulk-upload' },
// //     { name: 'Send Announcement', icon: Megaphone, color: 'red', action: 'send-announcement' }
// //   ];

// //   return (
// //     <AdminLayout>
// //        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
// //       {/* Header */}
// //       <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
// //         <div className="px-6 py-4">
// //           <div className="flex items-center justify-between">
// //             <div>
// //               <h1 className="text-2xl font-bold text-gray-900">Student Management System</h1>
// //               <p className="text-sm text-gray-600 mt-1">Comprehensive student administration portal</p>
// //             </div>
// //             <div className="flex items-center space-x-4">
// //               <div className="relative">
// //                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
// //                 <input
// //                   type="text"
// //                   placeholder="Search students..."
// //                   value={searchTerm}
// //                   onChange={(e) => setSearchTerm(e.target.value)}
// //                   className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                 />
// //               </div>
// //               <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full">
// //                 <Bell className="w-5 h-5" />
// //                 <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Navigation Tabs */}
// //       <div className="bg-white border-b border-gray-200">
// //         <nav className="px-6">
// //           <div className="flex space-x-8">
// //             {['overview', 'permissions', 'reports', 'settings'].map((tab) => (
// //               <button
// //                 key={tab}
// //                 onClick={() => setActiveTab(tab)}
// //                 className={`py-4 px-1 relative ${
// //                   activeTab === tab
// //                     ? 'text-blue-600 border-b-2 border-blue-600'
// //                     : 'text-gray-500 hover:text-gray-700'
// //                 }`}
// //               >
// //                 {tab.charAt(0).toUpperCase() + tab.slice(1)}
// //               </button>
// //             ))}
// //           </div>
// //         </nav>
// //       </div>

// //       <div className="p-6">
// //         {activeTab === 'overview' && (
// //           <div className="space-y-6">
// //             {/* Stats Cards */}
// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// //               {stats.map((stat, index) => (
// //                 <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
// //                   <div className="flex items-center justify-between">
// //                     <div>
// //                       <p className="text-sm font-medium text-gray-600">{stat.title}</p>
// //                       <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
// //                       <p className={`text-sm mt-1 ${
// //                         stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
// //                       }`}>
// //                         {stat.change} from last month
// //                       </p>
// //                     </div>
// //                     <div className={`p-3 rounded-full bg-${stat.color}-100`}>
// //                       <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
// //                     </div>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>

// //             {/* Quick Actions */}
// //             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
// //               <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
// //               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
// //                 {quickActions.map((action, index) => (
// //                   <button
// //                     key={index}
// //                     className={`p-4 rounded-lg border-2 border-dashed border-${action.color}-200 hover:border-${action.color}-400 hover:bg-${action.color}-50 transition-all group`}
// //                   >
// //                     <action.icon className={`w-8 h-8 text-${action.color}-600 mx-auto mb-2 group-hover:scale-110 transition-transform`} />
// //                     <p className={`text-sm font-medium text-${action.color}-700`}>{action.name}</p>
// //                   </button>
// //                 ))}
// //               </div>
// //             </div>

// //             {/* Recent Activities & Charts */}
// //             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //               {/* Recent Activities */}
// //               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
// //                 <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
// //                 <div className="space-y-4">
// //                   {recentActivities.map((activity, index) => (
// //                     <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
// //                       <div className={`w-2 h-2 rounded-full ${
// //                         activity.type === 'success' ? 'bg-green-500' :
// //                         activity.type === 'warning' ? 'bg-yellow-500' :
// //                         activity.type === 'info' ? 'bg-blue-500' : 'bg-gray-500'
// //                       }`} />
// //                       <div className="flex-1">
// //                         <p className="text-sm font-medium text-gray-900">{activity.action}</p>
// //                         <p className="text-xs text-gray-600">{activity.student}</p>
// //                       </div>
// //                       <span className="text-xs text-gray-500">{activity.time}</span>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>

// //               {/* Charts Placeholder */}
// //               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
// //                 <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Statistics</h3>
// //                 <div className="h-64 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center">
// //                   <div className="text-center">
// //                     <BarChart3 className="w-12 h-12 text-blue-500 mx-auto mb-2" />
// //                     <p className="text-gray-600">Interactive charts would be displayed here</p>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         {activeTab === 'permissions' && (
// //           <div className="space-y-6">
// //             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
// //               <h3 className="text-lg font-semibold text-gray-900 mb-6">Student Management Permissions</h3>
              
// //               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //                 {Object.entries(permissionGroups).map(([groupName, group]) => (
// //                   <div key={groupName} className="border border-gray-200 rounded-lg overflow-hidden">
// //                     <button
// //                       onClick={() => toggleSection(groupName)}
// //                       className={`w-full px-4 py-3 bg-${group.color}-50 hover:bg-${group.color}-100 flex items-center justify-between transition-colors`}
// //                     >
// //                       <div className="flex items-center space-x-3">
// //                         <group.icon className={`w-5 h-5 text-${group.color}-600`} />
// //                         <span className="font-medium text-gray-900">{groupName}</span>
// //                         <span className={`text-xs bg-${group.color}-100 text-${group.color}-700 px-2 py-1 rounded-full`}>
// //                           {group.permissions.length}
// //                         </span>
// //                       </div>
// //                       {expandedSections[groupName] ? 
// //                         <ChevronDown className="w-4 h-4 text-gray-500" /> : 
// //                         <ChevronRight className="w-4 h-4 text-gray-500" />
// //                       }
// //                     </button>
                    
// //                     {expandedSections[groupName] && (
// //                       <div className="bg-white">
// //                         {group.permissions.map((permission, index) => (
// //                           <div key={index} className="px-4 py-3 border-t border-gray-100 hover:bg-gray-50 flex items-center justify-between">
// //                             <div className="flex items-center space-x-3">
// //                               <permission.icon className="w-4 h-4 text-gray-500" />
// //                               <span className="text-sm font-medium text-gray-900">{permission.name}</span>
// //                             </div>
// //                             <button className={`px-3 py-1 text-xs rounded-full bg-${group.color}-100 text-${group.color}-700 hover:bg-${group.color}-200 transition-colors`}>
// //                               Configure
// //                             </button>
// //                           </div>
// //                         ))}
// //                       </div>
// //                     )}
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         {activeTab === 'reports' && (
// //           <div className="space-y-6">
// //             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
// //               <h3 className="text-lg font-semibold text-gray-900 mb-6">Reports & Analytics</h3>
              
// //               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //                 <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
// //                   <PieChart className="w-8 h-8 text-blue-600 mb-3" />
// //                   <h4 className="font-semibold text-gray-900 mb-2">Student Distribution</h4>
// //                   <p className="text-sm text-gray-600 mb-4">View students by class, section, and batch</p>
// //                   <button className="w-full bg-blue-50 text-blue-700 py-2 px-4 rounded-lg hover:bg-blue-100 transition-colors">
// //                     Generate Report
// //                   </button>
// //                 </div>

// //                 <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
// //                   <Activity className="w-8 h-8 text-green-600 mb-3" />
// //                   <h4 className="font-semibold text-gray-900 mb-2">Attendance Analytics</h4>
// //                   <p className="text-sm text-gray-600 mb-4">Detailed attendance patterns and trends</p>
// //                   <button className="w-full bg-green-50 text-green-700 py-2 px-4 rounded-lg hover:bg-green-100 transition-colors">
// //                     View Analytics
// //                   </button>
// //                 </div>

// //                 <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
// //                   <FileText className="w-8 h-8 text-purple-600 mb-3" />
// //                   <h4 className="font-semibold text-gray-900 mb-2">Academic Performance</h4>
// //                   <p className="text-sm text-gray-600 mb-4">Exam results and grade analysis</p>
// //                   <button className="w-full bg-purple-50 text-purple-700 py-2 px-4 rounded-lg hover:bg-purple-100 transition-colors">
// //                     Download Report
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         {activeTab === 'settings' && (
// //           <div className="space-y-6">
// //             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
// //               <h3 className="text-lg font-semibold text-gray-900 mb-6">System Settings</h3>
              
// //               <div className="space-y-6">
// //                 <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
// //                   <div>
// //                     <h4 className="font-medium text-gray-900">Automatic Backup</h4>
// //                     <p className="text-sm text-gray-600">Enable automatic daily backups</p>
// //                   </div>
// //                   <label className="relative inline-flex items-center cursor-pointer">
// //                     <input type="checkbox" className="sr-only peer" defaultChecked />
// //                     <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
// //                   </label>
// //                 </div>

// //                 <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
// //                   <div>
// //                     <h4 className="font-medium text-gray-900">Email Notifications</h4>
// //                     <p className="text-sm text-gray-600">Send email alerts for important events</p>
// //                   </div>
// //                   <label className="relative inline-flex items-center cursor-pointer">
// //                     <input type="checkbox" className="sr-only peer" defaultChecked />
// //                     <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
// //                   </label>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //     </AdminLayout>
   
// //   );
// // };

// // export default StudentManagementDashboard;


import React, { useEffect, useState } from 'react';
import axiosInstance from '@/utils/axiosInstance';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { useBaseContext } from '@/contexts/adminContext';
import AdminLayout from '@/Layouts/AdminLayout';

const COLORS = ['#10B981', '#EF4444'];

const AdminDashboardPage = () => {
  const { admin } = useBaseContext();
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    monthlyRegistrations: [],
  });

  useEffect(() => {
    if (admin?.id) {
      axiosInstance
        .get(`/admin/teachers/${admin.id}/count`)
        .then((res) => setStats(res.data))
        .catch((err) => console.error('Error loading teacher data:', err));
    }
  }, [admin]);

  const pieData = [
    { name: 'Active', value: stats.active },
    { name: 'Inactive', value: stats.inactive },
  ];

  return (
      <div className="p-6 md:p-10 space-y-10 bg-gray-50 min-h-screen">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800"> Dashboard</h1>
          <p className="text-gray-500 mt-1">Overview of teacher performance and trends</p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StatCard title="Total Teachers" value={stats.total} icon="👨‍🏫" bg="bg-indigo-100" />
          <StatCard title="Active Teachers" value={stats.active} icon="✅" bg="bg-green-100" />
          <StatCard title="Inactive Teachers" value={stats.inactive} icon="🚫" bg="bg-red-100" />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">📈 Monthly Registrations</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.monthlyRegistrations}>
                <XAxis dataKey="month" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" radius={[5, 5, 0, 0]} fill="#6366F1" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">📊 Status Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
  );
};

// Redesigned stat card
const StatCard = ({ title, value, icon, bg }) => (
  <div className={`p-6 rounded-2xl shadow-md hover:shadow-lg transition-all ${bg}`}>
    <div className="flex items-center justify-between">
      <div>
        <h4 className="text-gray-600 text-sm font-medium">{title}</h4>
        <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
      </div>
      <div className="text-4xl">{icon}</div>
    </div>
  </div>
);

export default AdminDashboardPage;

// Set AdminLayout
AdminDashboardPage.layout = (page) => <AdminLayout>{page}</AdminLayout>;
