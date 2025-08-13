// import React, { useState } from 'react';
// import { X, Plus, Edit2, Trash2 } from 'lucide-react';
// import AdminLayout from '@/Layouts/AdminLayout';

// const StudentManagementDashboard = () => {
//     // let {admin} = useBaseContext(); // Assuming useBaseContext provides admin context
//   const isAdmin = true; // Replaced useBaseContext with static boolean

//   // Fake data for students and batches
//   const [students, setStudents] = useState([
//     { id: 1, name: 'John Doe', email: 'john@example.com', enrollment_number: 'EN001', contact_number: '1234567890', status: 'Active', batch_ids: ['1', '2'] },
//     { id: 2, name: 'Jane Smith', email: 'jane@example.com', enrollment_number: 'EN002', contact_number: '0987654321', status: 'Active', batch_ids: ['2'] },
//     { id: 3, name: 'Bob Johnson', email: 'bob@example.com', enrollment_number: 'EN003', contact_number: '5555555555', status: 'Inactive', batch_ids: ['1'] },
//   ]);

//   const [batches] = useState([
//     { id: 1, name: 'Batch A' },
//     { id: 2, name: 'Batch B' },
//     { id: 3, name: 'Batch C' },
//   ]);

//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterStatus, setFilterStatus] = useState('All');
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     enrollment_number: '',
//     contact_number: '',
//     password: '',
//     status: 'Active',
//     batch_ids: [],
//   });
//   const [editingStudent, setEditingStudent] = useState(null);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleMultiSelectChange = (e, field) => {
//     const values = Array.from(e.target.selectedOptions, (option) => option.value);
//     setFormData((prev) => ({ ...prev, [field]: values }));
//   };

//   const validateForm = () => {
//     if (!formData.name || !formData.email || !formData.enrollment_number) {
//       alert('Name, Email, and Enrollment Number are required');
//       return false;
//     }
//     if (formData.contact_number && !/^\d{10}$/.test(formData.contact_number)) {
//       alert('Contact number must be a valid 10-digit number');
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = () => {
//     if (!validateForm()) return;

//     const payload = {
//       name: formData.name,
//       email: formData.email,
//       enrollment_number: formData.enrollment_number,
//       contact_number: formData.contact_number,
//       status: formData.status,
//       batch_ids: formData.batch_ids,
//       ...(!editingStudent && { password: formData.password }),
//     };

//     if (editingStudent) {
//       setStudents((prev) =>
//         prev.map((s) => (s.id === editingStudent.id ? { ...s, ...payload } : s))
//       );
//     } else {
//       setStudents((prev) => [
//         ...prev,
//         { ...payload, id: prev.length + 1 }, // Simple ID generation
//       ]);
//     }

//     setDrawerOpen(false);
//     handleClose();
//   };

//   const handleEdit = (student) => {
//     setEditingStudent(student);
//     setFormData({
//       name: student.name,
//       email: student.email,
//       enrollment_number: student.enrollment_number,
//       contact_number: student.contact_number || '',
//       password: '',
//       status: student.status || 'Active',
//       batch_ids: student.batch_ids?.map((id) => id.toString()) || [],
//     });
//     setDrawerOpen(true);
//   };

//   const handleDelete = (id) => {
//     if (window.confirm('Are you sure you want to delete this student?')) {
//       setStudents((prev) => prev.filter((s) => s.id !== id));
//     }
//   };

//   const handleClose = () => {
//     setDrawerOpen(false);
//     setEditingStudent(null);
//     setFormData({
//       name: '',
//       email: '',
//       enrollment_number: '',
//       contact_number: '',
//       password: '',
//       status: 'Active',
//       batch_ids: [],
//     });
//   };

//   const filteredStudents = students.filter((s) => {
//     const matchesSearch =
//       s.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       s.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       s.enrollment_number?.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus = filterStatus === 'All' || s.status === filterStatus;
//     return matchesSearch && matchesStatus;
//   });

//   const StatusBadge = ({ status }) => (
//     <span
//       className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
//         status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//       }`}
//     >
//       {status}
//     </span>
//   );

//   return (
//     <div className="p-4">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold">Student Management</h2>
//         {isAdmin && (
//           <button
//             onClick={() => setDrawerOpen(true)}
//             className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-1"
//           >
//             <Plus size={16} />
//             Add Student
//           </button>
//         )}
//       </div>

//       {/* Search & Filter */}
//       <div className="flex gap-3 mb-4">
//         <input
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           placeholder="Search by name, email, or enrollment..."
//           className="p-2 border rounded"
//         />
//         <select
//           value={filterStatus}
//           onChange={(e) => setFilterStatus(e.target.value)}
//           className="p-2 border rounded"
//         >
//           <option value="All">All</option>
//           <option value="Active">Active</option>
//           <option value="Inactive">Inactive</option>
//         </select>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto rounded-lg shadow border">
//         <table className="min-w-full bg-white divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Enrollment No.</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Batches</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
//               {isAdmin && (
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
//               )}
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {filteredStudents.map((s) => (
//               <tr key={s.id}>
//                 <td className="px-6 py-4">{s.name}</td>
//                 <td className="px-6 py-4">{s.email}</td>
//                 <td className="px-6 py-4">{s.enrollment_number}</td>
//                 <td className="px-6 py-4">{s.contact_number || '-'}</td>
//                 <td className="px-6 py-4 space-x-1">
//                   {s.batch_ids?.map((id, i) => {
//                     const batch = batches.find((b) => b.id === parseInt(id));
//                     return (
//                       <span key={i} className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
//                         {batch?.name || id}
//                       </span>
//                     );
//                   })}
//                 </td>
//                 <td className="px-6 py-4">
//                   <StatusBadge status={s.status} />
//                 </td>
//                 {isAdmin && (
//                   <td className="px-6 py-4 space-x-2">
//                     <button onClick={() => handleEdit(s)} className="text-blue-600 hover:text-blue-900">
//                       <Edit2 size={16} />
//                     </button>
//                     <button onClick={() => handleDelete(s.id)} className="text-red-600 hover:text-red-900">
//                       <Trash2 size={16} />
//                     </button>
//                   </td>
//                 )}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Drawer */}
//       {drawerOpen && isAdmin && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-30 flex justify-end z-50"
//           onClick={handleClose}
//         >
//           <div
//             className="w-full max-w-md bg-white h-full p-6 overflow-y-auto"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-bold">{editingStudent ? 'Edit Student' : 'Add Student'}</h3>
//               <button onClick={handleClose}>
//                 <X />
//               </button>
//             </div>
//             <div className="space-y-4">
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border rounded"
//               />
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border rounded"
//               />
//               {!editingStudent && (
//                 <input
//                   type="password"
//                   name="password"
//                   placeholder="Password"
//                   value={formData.password}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border rounded"
//                 />
//               )}
//               <input
//                 type="text"
//                 name="enrollment_number"
//                 placeholder="Enrollment Number"
//                 value={formData.enrollment_number}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border rounded"
//               />
//               <input
//                 type="text"
//                 name="contact_number"
//                 placeholder="Contact Number"
//                 value={formData.contact_number}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border rounded"
//               />
//               <select
//                 name="status"
//                 value={formData.status}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border rounded"
//               >
//                 <option value="Active">Active</option>
//                 <option value="Inactive">Inactive</option>
//               </select>
//               <div>
//                 <label className="block mb-1 text-sm font-medium">Batches</label>
//                 <select
//                   multiple
//                   value={formData.batch_ids}
//                   onChange={(e) => handleMultiSelectChange(e, 'batch_ids')}
//                   className="w-full p-2 border rounded h-32"
//                 >
//                   {batches.map((batch) => (
//                     <option key={batch.id} value={batch.id.toString()}>
//                       {batch.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <button
//                 onClick={handleSubmit}
//                 className="bg-blue-500 text-white w-full py-2 rounded"
//               >
//                 {editingStudent ? 'Update Student' : 'Add Student'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };


// export default StudentManagementDashboard;
// StudentManagementDashboard.Layout = (page) => <AdminLayout>{page}</AdminLayout>;


import AdminLayout from '@/Layouts/AdminLayout';
import React from 'react'

function student() {
  return (
    <div>
      cfbg
    </div>
  )
}

export default student
student.Layout = (page) => <AdminLayout>{page}</AdminLayout>;