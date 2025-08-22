// import React from 'react';
// import { Download, Filter, MoreHorizontal, User, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
// import StudentLayout from '@/Layouts/StudentLayout';
// import { usePage } from '@inertiajs/react';

// const StudentDashboard = () => {
//   
//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-7xl mx-auto space-y-6">

//         {/* Student Details Card */}
//         <div className="bg-white rounded-2xl p-6 shadow-sm">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-xl font-semibold text-gray-800">Student Details</h2>

//           </div>

//           <div className="flex items-start gap-6 mb-8">
//             <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
// <img 
//   src={student?.profile_image ? `/storage/${student.profile_image}` : "/default-avatar.png"} 
//   alt={student?.name || "Student"} 
//   className="w-full h-full object-cover"
// />


//             </div>
//             <div>
//               <h3 className="text-2xl font-bold text-gray-800 mb-4">{student.name}</h3>
//               <div className="grid grid-cols-4 gap-8 text-sm">
//                 <div>
//                   <p className="text-gray-500 mb-1">ID</p>
//                   <p className="font-medium">ID: {student.enrollment_number}</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-500 mb-1">Number</p>
//                   <p className="font-medium">{student.contact_number}</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-500 mb-1">Email</p>
//                   <p className="font-medium">{student.email}</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-500 mb-1">Father Name</p>
//                   <p className="font-medium">{student.father_name}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Attendance Stats */}
//           <div className="grid grid-cols-4 gap-6">
//             <div className="text-center">
//               <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
//                 <CheckCircle className="text-blue-500" size={24} />
//               </div>
//               <div className="text-2xl font-bold text-gray-800">13 Days</div>
//               <div className="text-sm text-gray-500">Total Attendance</div>
//             </div>
//             <div className="text-center">
//               <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
//                 <Clock className="text-green-500" size={24} />
//               </div>
//               <div className="text-2xl font-bold text-gray-800">7 Days</div>
//               <div className="text-sm text-gray-500">Late Attendance</div>
//             </div>
//             <div className="text-center">
//               <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
//                 <AlertTriangle className="text-orange-500" size={24} />
//               </div>
//               <div className="text-2xl font-bold text-gray-800">1 Days</div>
//               <div className="text-sm text-gray-500">Undertime Attendance</div>
//             </div>
//             <div className="text-center">
//               <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
//                 <User className="text-red-500" size={24} />
//               </div>
//               <div className="text-2xl font-bold text-gray-800">2 Days</div>
//               <div className="text-sm text-gray-500">Total Absent</div>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

//           {/* Class Days Card */}
//           <div className="bg-white rounded-2xl p-6 shadow-sm">
//             <h3 className="text-lg font-semibold text-gray-800 mb-2">Class Days</h3>
//             <p className="text-sm text-gray-500 mb-4">Class days for Monthly</p>
//             <div className="text-4xl font-bold text-gray-800">23 Days</div>
//           </div>

//           {/* Attendance Rate Card */}
//           <div className="bg-white rounded-2xl p-6 shadow-sm">
//             <h3 className="text-lg font-semibold text-gray-800 mb-2">Attendance Rate</h3>
//             <p className="text-sm text-gray-500 mb-4">This Year</p>
//             <div className="text-4xl font-bold text-gray-800 mb-6">56%</div>

//             <div className="space-y-4">
//               <p className="text-sm font-medium text-gray-700">Monthly Rate</p>
//               <div className="flex gap-2">
//                 <div className="bg-blue-500 text-white px-3 py-2 rounded-lg text-sm font-medium">
//                   January 57%
//                 </div>
//                 <div className="bg-orange-400 text-white px-3 py-2 rounded-lg text-sm font-medium">
//                   February 55%
//                 </div>
//                 <div className="bg-green-400 text-white px-3 py-2 rounded-lg text-sm font-medium">
//                   March 60%
//                 </div>
//               </div>
//             </div>

//             <div className="mt-4 p-3 bg-gray-50 rounded-lg">
//               <p className="text-xs text-gray-600">
//                 💡 Caleb White's monthly attendance rate highlights his consistent commitment to attending classes.
//               </p>
//             </div>
//           </div>

//           {/* Summary Card */}
//           <div className="bg-white rounded-2xl p-6 shadow-sm">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-semibold text-gray-800">Summary - Caleb White</h3>
//               <button>
//                 <MoreHorizontal size={20} className="text-gray-400" />
//               </button>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div className="bg-blue-500 rounded-2xl p-4 text-white text-center">
//                 <div className="text-2xl font-bold mb-2">13</div>
//                 <div className="flex items-center justify-center gap-2 text-sm">
//                   <CheckCircle size={16} />
//                   Attendance
//                 </div>
//               </div>
//               <div className="bg-green-500 rounded-2xl p-4 text-white text-center">
//                 <div className="text-2xl font-bold mb-2">07</div>
//                 <div className="flex items-center justify-center gap-2 text-sm">
//                   <Clock size={16} />
//                   Late
//                 </div>
//               </div>
//               <div className="bg-orange-400 rounded-2xl p-4 text-white text-center">
//                 <div className="text-2xl font-bold mb-2">01</div>
//                 <div className="flex items-center justify-center gap-2 text-sm">
//                   <AlertTriangle size={16} />
//                   Undertime
//                 </div>
//               </div>
//               <div className="bg-red-500 rounded-2xl p-4 text-white text-center">
//                 <div className="text-2xl font-bold mb-2">02</div>
//                 <div className="flex items-center justify-center gap-2 text-sm">
//                   <User size={16} />
//                   Absent
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Top Attendance Students */}
//         <div className="bg-white rounded-2xl p-6 shadow-sm">
//           <div className="flex justify-between items-center mb-6">
//             <h3 className="text-lg font-semibold text-gray-800">Top Attendance Students</h3>
//             <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors">
//               <Filter size={16} />
//               Filter
//             </button>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="text-left text-sm text-gray-500">
//                   <th className="pb-4">Number</th>
//                   <th className="pb-4">Name</th>
//                   <th className="pb-4">ID</th>
//                   <th className="pb-4">Progress</th>
//                 </tr>
//               </thead>
//               <tbody className="space-y-4">
//                 <tr className="border-t">
//                   <td className="py-4">
//                     <div className="flex items-center gap-3">
//                       <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-medium">
//                         01
//                       </div>
//                     </div>
//                   </td>
//                   <td className="py-4">
//                     <div className="flex items-center gap-3">
//                       <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
//                         <img src="/api/placeholder/32/32" alt="Student" className="w-full h-full object-cover" />
//                       </div>
//                       <span className="font-medium">Duxton Farmer</span>
//                     </div>
//                   </td>
//                   <td className="py-4 text-gray-600">2020-4535</td>
//                   <td className="py-4">
//                     <div className="flex items-center gap-3">
//                       <div className="flex-1 bg-gray-200 rounded-full h-2">
//                         <div className="bg-blue-500 h-2 rounded-full" style={{width: '91%'}}></div>
//                       </div>
//                       <span className="text-sm font-medium">91%</span>
//                     </div>
//                   </td>
//                 </tr>
//                 <tr className="border-t">
//                   <td className="py-4">
//                     <div className="flex items-center gap-3">
//                       <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm font-medium">
//                         02
//                       </div>
//                     </div>
//                   </td>
//                   <td className="py-4">
//                     <div className="flex items-center gap-3">
//                       <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
//                         <img src="/api/placeholder/32/32" alt="Student" className="w-full h-full object-cover" />
//                       </div>
//                       <span className="font-medium">Todd Dye</span>
//                     </div>
//                   </td>
//                   <td className="py-4 text-gray-600">2017-4718</td>
//                   <td className="py-4">
//                     <div className="flex items-center gap-3">
//                       <div className="flex-1 bg-gray-200 rounded-full h-2">
//                         <div className="bg-blue-500 h-2 rounded-full" style={{width: '91%'}}></div>
//                       </div>
//                       <span className="text-sm font-medium">91%</span>
//                     </div>
//                   </td>
//                 </tr>
//                 <tr className="border-t">
//                   <td className="py-4">
//                     <div className="flex items-center gap-3">
//                       <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-sm font-medium">
//                         03
//                       </div>
//                     </div>
//                   </td>
//                   <td className="py-4">
//                     <div className="flex items-center gap-3">
//                       <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
//                         <img src="/api/placeholder/32/32" alt="Student" className="w-full h-full object-cover" />
//                       </div>
//                       <span className="font-medium">Julia Willis</span>
//                     </div>
//                   </td>
//                   <td className="py-4 text-gray-600">2017-4723</td>
//                   <td className="py-4">
//                     <div className="flex items-center gap-3">
//                       <div className="flex-1 bg-gray-200 rounded-full h-2">
//                         <div className="bg-blue-500 h-2 rounded-full" style={{width: '90%'}}></div>
//                       </div>
//                       <span className="text-sm font-medium">90%</span>
//                     </div>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ✅ FIXED LAYOUT PROPERTY
// StudentDashboard.layout = (page) => <StudentLayout>{page}</StudentLayout>;

// export default StudentDashboard;

// import React, { useEffect, useState } from 'react';
// import { Download, Filter, MoreHorizontal, User, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
// import StudentLayout from '@/Layouts/StudentLayout';
// import { usePage } from '@inertiajs/react';
// import axiosInstance from '@/utils/axiosInstance';

// const StudentDashboard = () => {
//   const { props } = usePage();
//   const { student } = props;
//   const [monthlyRates, setMonthlyRates] = useState(null); // store only first month

//   useEffect(() => {
//     axiosInstance
//       .get("/student/get-attendance")
//       .then((response) => {
//         const attendanceData = response.data;

//         // Group by month-year
//         const monthlyStats = {};
//         attendanceData.forEach((a) => {
//           const month = new Date(a.date).toLocaleString("en-US", {
//             month: "long",
//             year: "numeric",
//           });

//           if (!monthlyStats[month]) {
//             monthlyStats[month] = { total: 0, present: 0, absent: 0 };
//           }

//           monthlyStats[month].total += 1;
//           if (a.status === "present") monthlyStats[month].present += 1;
//           if (a.status === "absent") monthlyStats[month].absent += 1;
//         });

//         // Convert into array
//         const monthlyRatesArray = Object.entries(monthlyStats).map(
//           ([month, stats]) => ({
//             month,
//             total: stats.total,
//             present: stats.present,
//             absent: stats.absent,
//             rate: ((stats.present / stats.total) * 100).toFixed(2),
//           })
//         );

//         // ✅ store only first item
//         if (monthlyRatesArray.length > 0) {
//           setMonthlyRates(monthlyRatesArray[0]);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching attendance data:", error);
//       });
//   }, []);
//   console.log("fgnfgs",monthlyRates);
  
//   return (
//     <div className="min-h-screen bg-gray-100 p-3 sm:p-6">
//       <div className="max-w-7xl mx-auto space-y-6">

//         {/* Student Details Card */}
//         <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//             <h2 className="text-xl font-semibold text-gray-800">Student Details</h2>

//           </div>

//           <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-8">
//             <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
//               <img
//                 src={student?.profile_image ? `/storage/${student.profile_image}` : "/default-avatar.png"}
//                 alt={student?.name || "Student"}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             <div className="flex-1 min-w-0">
//               <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">{student.name}</h3>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 text-sm">
//                 <div>
//                   <p className="text-gray-500 mb-1">enrollment Number</p>
//                   <p className="font-medium">ID:{student.enrollment_number}</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-500 mb-1">Number</p>
//                   <p className="font-medium">{student.contact_number}</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-500 mb-1">Email</p>
//                   <p className="font-medium">{student.email}</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-500 mb-1">father name</p>
//                   <p className="font-medium">{student.father_name}</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-500 mb-1">Session</p>
//                   <p className="font-medium">{student.session}</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-500 mb-1">Dob</p>
//                   <p className="font-medium">
//                     {new Date(student.dob).toLocaleDateString("en-IN", {
//                       year: "numeric",
//                       month: "long",
//                       day: "numeric"
//                     })}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Attendance Stats */}

//                     {
//           monthlyRates.map( (rate, index) => (
// <div>
//               <p>{rate}</p> <p>{index}</p>

// </div>
//           ))  
//                     }

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             <div className="text-center">
//               <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
//                 <CheckCircle className="text-blue-500" size={24} />
//               </div>
              
//               <div className="text-2xl font-bold text-gray-800">55</div>
//               <div className="text-sm text-gray-500">Total Attendance</div>
//             </div>
//             <div className="text-center">
//               <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
//                 <Clock className="text-green-500" size={24} />
//               </div>
//               <div className="text-2xl font-bold text-gray-800">7 Days</div>
//               <div className="text-sm text-gray-500">Late Attendance</div>
//             </div>
//             <div className="text-center">
//               <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
//                 <AlertTriangle className="text-orange-500" size={24} />
//               </div>
//               <div className="text-2xl font-bold text-gray-800">1 Days</div>
//               <div className="text-sm text-gray-500">Undertime Attendance</div>
//             </div>
//             <div className="text-center">
//               <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
//                 <User className="text-red-500" size={24} />
//               </div>
//               <div className="text-2xl font-bold text-gray-800">2 Days</div>
//               <div className="text-sm text-gray-500">Total Absent</div>
//             </div>
//           </div>
//         </div>


//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

//           {/* Class Days Card */}
//           <div className="bg-white rounded-2xl p-6 shadow-sm">
//             <h3 className="text-lg font-semibold text-gray-800 mb-2">Class Days</h3>
//             <p className="text-sm text-gray-500 mb-4">Class days for Monthly</p>
//             <div className="text-4xl font-bold text-gray-800">23 Days</div>
//           </div>

//           {/* Attendance Rate Card */}
//           <div className="bg-white rounded-2xl p-6 shadow-sm">
//             <h3 className="text-lg font-semibold text-gray-800 mb-2">Attendance Rate</h3>
//             <p className="text-sm text-gray-500 mb-4">This Year</p>
//             <div className="text-4xl font-bold text-gray-800 mb-6">56%</div>

//             <div className="space-y-4">
//               <p className="text-sm font-medium text-gray-700">Monthly Rate</p>
//               <div className="flex flex-wrap gap-2">
//                 <div className="bg-blue-500 text-white px-3 py-2 rounded-lg text-sm font-medium">
//                   January 57%
//                 </div>
//                 <div className="bg-orange-400 text-white px-3 py-2 rounded-lg text-sm font-medium">
//                   February 55%
//                 </div>
//                 <div className="bg-green-400 text-white px-3 py-2 rounded-lg text-sm font-medium">
//                   March 60%
//                 </div>
//               </div>
//             </div>

//             <div className="mt-4 p-3 bg-gray-50 rounded-lg">
//               <p className="text-xs text-gray-600">
//                 💡 Caleb White's monthly attendance rate highlights his consistent commitment to attending classes.
//               </p>
//             </div>
//           </div>

//           {/* Summary Card */}
//           <div className="bg-white rounded-2xl p-6 shadow-sm">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-semibold text-gray-800">Summary - Caleb White</h3>
//               <button>
//                 <MoreHorizontal size={20} className="text-gray-400" />
//               </button>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div className="bg-blue-500 rounded-2xl p-4 text-white text-center">
//                 <div className="text-2xl font-bold mb-2">13</div>
//                 <div className="flex items-center justify-center gap-2 text-sm">
//                   <CheckCircle size={16} />
//                   Attendance
//                 </div>
//               </div>
//               <div className="bg-green-500 rounded-2xl p-4 text-white text-center">
//                 <div className="text-2xl font-bold mb-2">07</div>
//                 <div className="flex items-center justify-center gap-2 text-sm">
//                   <Clock size={16} />
//                   Late
//                 </div>
//               </div>
//               <div className="bg-orange-400 rounded-2xl p-4 text-white text-center">
//                 <div className="text-2xl font-bold mb-2">01</div>
//                 <div className="flex items-center justify-center gap-2 text-sm">
//                   <AlertTriangle size={16} />
//                   Undertime
//                 </div>
//               </div>
//               <div className="bg-red-500 rounded-2xl p-4 text-white text-center">
//                 <div className="text-2xl font-bold mb-2">02</div>
//                 <div className="flex items-center justify-center gap-2 text-sm">
//                   <User size={16} />
//                   Absent
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Top Attendance Students */}
//         <div className="bg-white rounded-2xl p-6 shadow-sm">
//           <div className="flex justify-between items-center mb-6">
//             <h3 className="text-lg font-semibold text-gray-800">Top Attendance Students</h3>
//             <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors">
//               <Filter size={16} />
//               Filter
//             </button>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="text-left text-sm text-gray-500">
//                   <th className="pb-4">Number</th>
//                   <th className="pb-4">Name</th>
//                   <th className="pb-4">ID</th>
//                   <th className="pb-4">Progress</th>
//                 </tr>
//               </thead>
//               <tbody className="space-y-4">
//                 <tr className="border-t">
//                   <td className="py-4">
//                     <div className="flex items-center gap-3">
//                       <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-medium">
//                         01
//                       </div>
//                     </div>
//                   </td>
//                   <td className="py-4">
//                     <div className="flex items-center gap-3">
//                       <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
//                         <img src="/api/placeholder/32/32" alt="Student" className="w-full h-full object-cover" />
//                       </div>
//                       <span className="font-medium">Duxton Farmer</span>
//                     </div>
//                   </td>
//                   <td className="py-4 text-gray-600">2020-4535</td>
//                   <td className="py-4">
//                     <div className="flex items-center gap-3">
//                       <div className="flex-1 bg-gray-200 rounded-full h-2">
//                         <div className="bg-blue-500 h-2 rounded-full" style={{ width: '91%' }}></div>
//                       </div>
//                       <span className="text-sm font-medium">91%</span>
//                     </div>
//                   </td>
//                 </tr>
//                 <tr className="border-t">
//                   <td className="py-4">
//                     <div className="flex items-center gap-3">
//                       <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm font-medium">
//                         02
//                       </div>
//                     </div>
//                   </td>
//                   <td className="py-4">
//                     <div className="flex items-center gap-3">
//                       <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
//                         <img src="/api/placeholder/32/32" alt="Student" className="w-full h-full object-cover" />
//                       </div>
//                       <span className="font-medium">Todd Dye</span>
//                     </div>
//                   </td>
//                   <td className="py-4 text-gray-600">2017-4718</td>
//                   <td className="py-4">
//                     <div className="flex items-center gap-3">
//                       <div className="flex-1 bg-gray-200 rounded-full h-2">
//                         <div className="bg-blue-500 h-2 rounded-full" style={{ width: '91%' }}></div>
//                       </div>
//                       <span className="text-sm font-medium">91%</span>
//                     </div>
//                   </td>
//                 </tr>
//                 <tr className="border-t">
//                   <td className="py-4">
//                     <div className="flex items-center gap-3">
//                       <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-sm font-medium">
//                         03
//                       </div>
//                     </div>
//                   </td>
//                   <td className="py-4">
//                     <div className="flex items-center gap-3">
//                       <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
//                         <img src="/api/placeholder/32/32" alt="Student" className="w-full h-full object-cover" />
//                       </div>
//                       <span className="font-medium">Julia Willis</span>
//                     </div>
//                   </td>
//                   <td className="py-4 text-gray-600">2017-4723</td>
//                   <td className="py-4">
//                     <div className="flex items-center gap-3">
//                       <div className="flex-1 bg-gray-200 rounded-full h-2">
//                         <div className="bg-blue-500 h-2 rounded-full" style={{ width: '90%' }}></div>
//                       </div>
//                       <span className="text-sm font-medium">90%</span>
//                     </div>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentDashboard;
// StudentDashboard.layout = (page) => <StudentLayout>{page}</StudentLayout>;

import React, { useEffect, useState } from 'react';
import { CheckCircle, Clock, AlertTriangle, User, Filter, MoreHorizontal } from 'lucide-react';
import StudentLayout from '@/Layouts/StudentLayout';
import { usePage } from '@inertiajs/react';
import axiosInstance from '@/utils/axiosInstance';

const StudentDashboard = () => {
  const { props } = usePage();
  const { student } = props;
  const [monthlyRates, setMonthlyRates] = useState([]); // Initialize as empty array
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  console.log(student);
  
  useEffect(() => {
    setIsLoading(true);
    axiosInstance
      .get(`/student/get-attendance/${student.enrollment_number}/${student.admin_id}`)
      .then((response) => {
        const attendanceData = response.data;
        const monthlyStats = {};
        attendanceData.forEach((a) => {
          const month = new Date(a.date).toLocaleString("en-US", {
            month: "long",
            year: "numeric",
          });
          if (!monthlyStats[month]) {
            monthlyStats[month] = { total: 0, present: 0, absent: 0 };
          }
          monthlyStats[month].total += 1;
          if (a.status === "present") monthlyStats[month].present += 1;
          if (a.status === "absent") monthlyStats[month].absent += 1;
        });
        const monthlyRatesArray = Object.entries(monthlyStats).map(([month, stats]) => ({
          month,
          total: stats.total,
          present: stats.present,
          absent: stats.absent,
          rate: ((stats.present / stats.total) * 100).toFixed(2),
        }));
        setMonthlyRates(monthlyRatesArray);
      })
      .catch((error) => {
        console.error("Error fetching attendance data:", error);
        setError("Failed to load attendance data. Please try again later.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-3 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Student Details Card */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Student Details</h2>
          </div>
          <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-8">
            <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
              <img
                src={student?.profile_image ? `/storage/${student.profile_image}` : "/default-avatar.png"}
                alt={`Profile picture of ${student?.name || "Student"}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">{student.name}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 text-sm">
                <div>
                  <p className="text-gray-500 mb-1">Enrollment Number</p>
                  <p className="font-medium">ID: {student.enrollment_number}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Number</p>
                  <p className="font-medium">{student.contact_number}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Email</p>
                  <p className="font-medium">{student.email}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Father's Name</p>
                  <p className="font-medium">{student.father_name}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Session</p>
                  <p className="font-medium">{student.session}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Date of Birth</p>
                  <p className="font-medium">
                    {new Date(student.dob).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Attendance Stats - Commented Out */}
          {/*
          {isLoading && <div className="text-center">Loading...</div>}
          {error && <div className="text-red-500 text-center">{error}</div>}
          {!isLoading && !error && monthlyRates.length > 0 && (
            <div className="mb-6">
              {monthlyRates.map((rate, index) => (
                <div key={index} className="text-center">
                  <p className="text-gray-700">
                    {rate.month}: {rate.rate}% (Present: {rate.present}, Absent: {rate.absent}, Total: {rate.total})
                  </p>
                </div>
              ))}
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="text-blue-500" size={24} />
              </div>
              <div className="text-2xl font-bold text-gray-800">
                {monthlyRates.length > 0 ? monthlyRates[0].present : "N/A"}
              </div>
              <div className="text-sm text-gray-500">Total Attendance</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="text-green-500" size={24} />
              </div>
              <div className="text-2xl font-bold text-gray-800">7 Days</div>
              <div className="text-sm text-gray-500">Late Attendance</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <AlertTriangle className="text-orange-500" size={24} />
              </div>
              <div className="text-2xl font-bold text-gray-800">1 Day</div>
              <div className="text-sm text-gray-500">Undertime Attendance</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <User className="text-red-500" size={24} />
              </div>
              <div className="text-2xl font-bold text-gray-800">
                {monthlyRates.length > 0 ? monthlyRates[0].absent : "N/A"}
              </div>
              <div className="text-sm text-gray-500">Total Absent</div>
            </div>
          </div>
          */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Class Days Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Class Days</h3>
            <p className="text-sm text-gray-500 mb-4">Class days for Monthly</p>
            <div className="text-4xl font-bold text-gray-800">
              {monthlyRates.length > 0 ? monthlyRates[0].total : "N/A"} Days
            </div>
          </div>
          {/* Attendance Rate Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Attendance Rate</h3>
            <p className="text-sm text-gray-500 mb-4">This Year</p>
            <div className="text-4xl font-bold text-gray-800 mb-6">
              {monthlyRates.length > 0
                ? (
                    monthlyRates.reduce((sum, rate) => sum + parseFloat(rate.rate), 0) /
                    monthlyRates.length
                  ).toFixed(2)
                : "N/A"}
              %
            </div>
            <div className="space-y-4">
              <p className="text-sm font-medium text-gray-700">Monthly Rate</p>
              <div className="flex flex-wrap gap-2">
                {monthlyRates.map((rate, index) => (
                  <div
                    key={index}
                    className="bg-blue-500 text-white px-3 py-2 rounded-lg text-sm font-medium"
                  >
                    {rate.month} {rate.rate}%
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600">
                💡 {student.name}'s monthly attendance rate highlights their consistent commitment to attending classes.
              </p>
            </div>
          </div>
          {/* Summary Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Summary - {student.name}</h3>
              <button aria-label="More options">
                <MoreHorizontal size={20} className="text-gray-400" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-500 rounded-2xl p-4 text-white text-center">
                <div className="text-2xl font-bold mb-2">
                  {monthlyRates.length > 0 ? monthlyRates[0].present : "N/A"}
                </div>
                <div className="flex items-center justify-center gap-2 text-sm">
                  <CheckCircle size={16} />
                  Attendance
                </div>
              </div>
              {/* <div className="bg-green-500 rounded-2xl p-4 text-white text-center">
                <div className="text-2xl font-bold mb-2">7</div>
                <div className="flex items-center justify-center gap-2 text-sm">
                  <Clock size={16} />
                  Late
                </div>
              </div> */}
              {/* <div className="bg-orange-400 rounded-2xl p-4 text-white text-center">
                <div className="text-2xl font-bold mb-2">1</div>
                <div className="flex items-center justify-center gap-2 text-sm">
                  <AlertTriangle size={16} />
                  Undertime
                </div>
              </div> */}
              <div className="bg-red-500 rounded-2xl p-4 text-white text-center">
                <div className="text-2xl font-bold mb-2">
                  {monthlyRates.length > 0 ? monthlyRates[0].absent : "N/A"}
                </div>
                <div className="flex items-center justify-center gap-2 text-sm">
                  <User size={16} />
                  Absent
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Top Attendance Students */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Top Attendance Students</h3>
            <button
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors"
              aria-label="Filter students"
            >
              <Filter size={16} />
              Filter
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500">
                  <th className="pb-4">Number</th>
                  <th className="pb-4">Name</th>
                  <th className="pb-4">ID</th>
                  <th className="pb-4">Progress</th>
                </tr>
              </thead>
              <tbody className="space-y-4">
                <tr className="border-t">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-medium">
                        01
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
                        <img
                          src="/api/placeholder/32/32"
                          alt="Duxton Farmer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="font-medium">Duxton Farmer</span>
                    </div>
                  </td>
                  <td className="py-4 text-gray-600">2020-4535</td>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '91%' }}></div>
                      </div>
                      <span className="text-sm font-medium">91%</span>
                    </div>
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm font-medium">
                        02
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
                        <img
                          src="/api/placeholder/32/32"
                          alt="Todd Dye"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="font-medium">Todd Dye</span>
                    </div>
                  </td>
                  <td className="py-4 text-gray-600">2017-4718</td>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '91%' }}></div>
                      </div>
                      <span className="text-sm font-medium">91%</span>
                    </div>
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-sm font-medium">
                        03
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
                        <img
                          src="/api/placeholder/32/32"
                          alt="Julia Willis"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="font-medium">Julia Willis</span>
                    </div>
                  </td>
                  <td className="py-4 text-gray-600">2017-4723</td>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                      </div>
                      <span className="text-sm font-medium">90%</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

StudentDashboard.layout = (page) => <StudentLayout>{page}</StudentLayout>;

export default StudentDashboard;