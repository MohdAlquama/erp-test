// // // 'use client';

// // // import { useState } from 'react';
// // // import { Plus, Pencil, Trash2, X } from 'lucide-react';
// // // import { useSubAdmin } from '@/contexts/subContext';

// // // // Define all possible permissions
// // // const ALL_STUDENT_PERMISSIONS = [
// // //   'StudentManagementViewStudents',
// // //   'StudentManagementAddStudent',
// // //   'StudentManagementDeleteStudent',
// // //   'StudentManagementAddPreviousSchool',
// // //   'StudentManagementEditStudent',
// // //   'StudentManagementUploadPhoto',
// // //   'StudentManagementAssignRoll',
// // //   'StudentManagementDemoteStudent',
// // //   'StudentManagementPromoteStudent',
// // //   'StudentManagementGenerateIDCard',
// // //   'StudentManagementPrintList',
// // //   'StudentManagementFilterBySection',
// // //   'StudentManagementFilterByClass',
// // //   'StudentManagementFilterByBatch',
// // //   'StudentManagementViewProfile',
// // //   'StudentManagementResetPassword',
// // //   'StudentManagementEditProfilePicture',
// // //   'StudentManagementSendAnnouncement',
// // //   'StudentManagementUpdateGuardian',
// // //   'StudentManagementViewGuardian',
// // //   'StudentManagementAssignTransport',
// // //   'StudentManagementViewAttendance',
// // //   'StudentManagementViewFeeStatus',
// // //   'StudentManagementViewExamResult',
// // //   'StudentManagementBlockAccount',
// // //   'StudentManagementUnblockAccount',
// // //   'StudentManagementSuspendStudent',
// // //   'StudentManagementReinstateStudent',
// // //   'StudentManagementAssignHostel',
// // //   'StudentManagementRemoveHostel',
// // // ];

// // // export default function CreateUserPage() {
// // //   const { permissions } = useSubAdmin();

// // //   const [users, setUsers] = useState([
// // //     {
// // //       id: 1,
// // //       name: 'John Doe',
// // //       email: 'john@example.com',
// // //       role: 'College Admin',
// // //       permission: ['StudentManagementViewStudents', 'StudentManagementAddStudent'],
// // //       status: 'Active',
// // //     },
// // //   ]);

// // //   const [isFormOpen, setFormOpen] = useState(false);
// // //   const [isEditMode, setEditMode] = useState(false);
// // //   const [editingUserId, setEditingUserId] = useState(null);

// // //   const [formData, setFormData] = useState({
// // //     name: '',
// // //     email: '',
// // //     role: '',
// // //     permission: [],
// // //     status: 'Active',
// // //   });

// // //   const toggleForm = (user = null) => {
// // //     if (user) {
// // //       const { id, ...rest } = user;
// // //       setFormData(rest);
// // //       setEditingUserId(id);
// // //       setEditMode(true);
// // //     } else {
// // //       setFormData({
// // //         name: '',
// // //         email: '',
// // //         role: '',
// // //         permission: [],
// // //         status: 'Active',
// // //       });
// // //       setEditMode(false);
// // //       setEditingUserId(null);
// // //     }
// // //     setFormOpen(true);
// // //   };

// // //   const handleChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setFormData((prev) => ({
// // //       ...prev,
// // //       [name]: value,
// // //     }));
// // //   };

// // //   const handleSubmit = (e) => {
// // //     e.preventDefault();

// // //     // Basic validation
// // //     if (!formData.name || !formData.email || !formData.role) {
// // //       alert('Please fill in all required fields (Name, Email, Role).');
// // //       return;
// // //     }

// // //     if (isEditMode) {
// // //       setUsers((prev) =>
// // //         prev.map((u) => (u.id === editingUserId ? { ...u, ...formData } : u))
// // //       );
// // //       console.log('Updated user:', { id: editingUserId, ...formData });
// // //     } else {
// // //       const newUser = { id: Date.now(), ...formData };
// // //       setUsers((prev) => [...prev, newUser]);
// // //       console.log('Added new user:', newUser);
// // //     }

// // //     console.log('Current user list:', users);

// // //     setFormOpen(false);
// // //     setEditMode(false);
// // //     setEditingUserId(null);
// // //     setFormData({
// // //       name: '',
// // //       email: '',
// // //       role: '',
// // //       permission: [],
// // //       status: 'Active',
// // //     });
// // //   };

// // //   const handleDelete = (id) => {
// // //     if (confirm('Are you sure you want to delete this user?')) {
// // //       setUsers((prev) => prev.filter((user) => user.id !== id));
// // //       console.log('Deleted user with ID:', id);
// // //       console.log('Updated user list:', users);
// // //     }
// // //   };

// // //   const handlePermissionChange = (perm) => {
// // //     setFormData((prev) => {
// // //       const updated = prev.permission.includes(perm)
// // //         ? prev.permission.filter((p) => p !== perm)
// // //         : [...prev.permission, perm];
// // //       return { ...prev, permission: updated };
// // //     });
// // //   };

// // //   return (
// // //     <div className="relative w-full">
// // //       {/* User Table */}
// // //       <div className="bg-white shadow p-4 rounded-md w-full">
// // //         <div className="flex justify-between items-center mb-4">
// // //           <h2 className="text-xl font-semibold">User List</h2>

// // //           {permissions.includes('StudentManagementUserAddButton') && (
// // //             <button
// // //               onClick={() => toggleForm()}
// // //               className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
// // //             >
// // //               <Plus size={18} /> Add User
// // //             </button>
// // //           )}
// // //         </div>

// // //         <div className="overflow-x-auto">
// // //           <table className="min-w-full border text-sm text-left">
// // //             <thead className="bg-gray-100 text-gray-700">
// // //               <tr>
// // //                 <th className="py-2 px-3 border-b">Name</th>
// // //                 <th className="py-2 px-3 border-b">Email</th>
// // //                 <th className="py-2 px-3 border-b">Role</th>
// // //                 <th className="py-2 px-3 border-b">Permissions</th>
// // //                 <th className="py-2 px-3 border-b">Status</th>
// // //                 {(permissions.includes('StudentManagementUserEditButton') ||
// // //                   permissions.includes('StudentManagementUserDeleteButton')) && (
// // //                   <th className="py-2 px-3 border-b">Actions</th>
// // //                 )}
// // //               </tr>
// // //             </thead>
// // //             <tbody>
// // //               {users.map((user) => (
// // //                 <tr key={user.id} className="hover:bg-gray-50">
// // //                   <td className="py-2 px-3 border-b">{user.name}</td>
// // //                   <td className="py-2 px-3 border-b">{user.email}</td>
// // //                   <td className="py-2 px-3 border-b">{user.role}</td>
// // //                   <td className="py-2 px-3 border-b text-xs">
// // //                     {user.permission?.join(', ') || 'None'}
// // //                   </td>
// // //                   <td className="py-2 px-3 border-b">
// // //                     <span
// // //                       className={`px-2 py-1 text-xs rounded-full font-medium ${
// // //                         user.status === 'Active'
// // //                           ? 'bg-green-100 text-green-700'
// // //                           : 'bg-red-100 text-red-700'
// // //                       }`}
// // //                     >
// // //                       {user.status}
// // //                     </span>
// // //                   </td>
// // //                   {(permissions.includes('StudentManagementUserEditButton') ||
// // //                     permissions.includes('StudentManagementUserDeleteButton')) && (
// // //                     <td className="py-2 px-3 border-b flex gap-2">
// // //                       {permissions.includes('StudentManagementUserEditButton') && (
// // //                         <button
// // //                           onClick={() => toggleForm(user)}
// // //                           className="text-blue-600 hover:text-blue-800"
// // //                           title="Edit"
// // //                         >
// // //                           <Pencil size={16} />
// // //                         </button>
// // //                       )}
// // //                       {permissions.includes('StudentManagementUserDeleteButton') && (
// // //                         <button
// // //                           onClick={() => handleDelete(user.id)}
// // //                           className="text-red-600 hover:text-red-800"
// // //                           title="Delete"
// // //                         >
// // //                           <Trash2 size={16} />
// // //                         </button>
// // //                       )}
// // //                     </td>
// // //                   )}
// // //                 </tr>
// // //               ))}
// // //             </tbody>
// // //           </table>
// // //         </div>
// // //       </div>

// // //       {/* Slide Form Drawer */}
// // //       <div
// // //         className={`fixed top-0 right-0 h-full w-full sm:max-w-md bg-white shadow-lg p-6 transition-transform duration-300 z-50 ${
// // //           isFormOpen ? 'translate-x-0' : 'translate-x-full'
// // //         }`}
// // //       >
// // //         <div className="flex justify-between items-center mb-4">
// // //           <h3 className="text-lg font-semibold">
// // //             {isEditMode ? 'Edit User' : 'Add New User'}
// // //           </h3>
// // //           <button
// // //             onClick={() => setFormOpen(false)}
// // //             className="text-gray-500 hover:text-red-500"
// // //           >
// // //             <X size={20} />
// // //           </button>
// // //         </div>

// // //         <form onSubmit={handleSubmit} className="space-y-4">
// // //           <InputField label="Name" name="name" value={formData.name} onChange={handleChange} />
// // //           <InputField label="Email" name="email" value={formData.email} onChange={handleChange} type="email" />
// // //           <InputField label="Role" name="role" value={formData.role} onChange={handleChange} />

// // //           {/* Permission Checkboxes */}
// // //           {permissions.length > 0 && (
// // //             <div>
// // //               <label className="block text-sm font-medium mb-1">Permissions</label>
// // //               <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto border p-2 rounded text-sm">
// // //                 {ALL_STUDENT_PERMISSIONS.filter((perm) =>
// // //                   permissions.includes(perm)
// // //                 ).map((perm) => (
// // //                   <label key={perm} className="flex items-center gap-2 break-all">
// // //                     <input
// // //                       type="checkbox"
// // //                       checked={formData.permission?.includes(perm)}
// // //                       onChange={() => handlePermissionChange(perm)}
// // //                     />
// // //                     {perm}
// // //                   </label>
// // //                 ))}
// // //               </div>
// // //             </div>
// // //           )}

// // //           <div>
// // //             <label className="block text-sm font-medium mb-1">Status</label>
// // //             <select
// // //               name="status"
// // //               value={formData.status}
// // //               onChange={handleChange}
// // //               className="w-full border px-3 py-2 rounded"
// // //             >
// // //               <option value="Active">Active</option>
// // //               <option value="Inactive">Inactive</option>
// // //             </select>
// // //           </div>

// // //           <button
// // //             type="submit"
// // //             className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
// // //           >
// // //             {isEditMode ? 'Update User' : 'Save User'}
// // //           </button>
// // //         </form>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // // Reusable Input Field
// // // function InputField({ label, name, value, onChange, type = 'text' }) {
// // //   return (
// // //     <div>
// // //       <label className="block text-sm font-medium mb-1">{label}</label>
// // //       <input
// // //         type={type}
// // //         name={name}
// // //         value={value}
// // //         onChange={onChange}
// // //         required
// // //         className="w-full border px-3 py-2 rounded"
// // //       />
// // //     </div>
// // //   );
// // // }
// // 'use client';

// // import { useState } from 'react';
// // import { Plus, Pencil, Trash2, X } from 'lucide-react';
// // import { useSubAdmin } from '@/contexts/subContext';
// // import axiosInstance from '@/utils/axiosInstance';


// // // Define all possible permissions
// // const ALL_STUDENT_PERMISSIONS = [
// //   'StudentManagementViewStudents',
// //   'StudentManagementAddStudent',
// //   'StudentManagementDeleteStudent',
// //   'StudentManagementAddPreviousSchool',
// //   'StudentManagementEditStudent',
// //   'StudentManagementUploadPhoto',
// //   'StudentManagementAssignRoll',
// //   'StudentManagementDemoteStudent',
// //   'StudentManagementPromoteStudent',
// //   'StudentManagementGenerateIDCard',
// //   'StudentManagementPrintList',
// //   'StudentManagementFilterBySection',
// //   'StudentManagementFilterByClass',
// //   'StudentManagementFilterByBatch',
// //   'StudentManagementViewProfile',
// //   'StudentManagementResetPassword',
// //   'StudentManagementEditProfilePicture',
// //   'StudentManagementSendAnnouncement',
// //   'StudentManagementUpdateGuardian',
// //   'StudentManagementViewGuardian',
// //   'StudentManagementAssignTransport',
// //   'StudentManagementViewAttendance',
// //   'StudentManagementViewFeeStatus',
// //   'StudentManagementViewExamResult',
// //   'StudentManagementBlockAccount',
// //   'StudentManagementUnblockAccount',
// //   'StudentManagementSuspendStudent',
// //   'StudentManagementReinstateStudent',
// //   'StudentManagementAssignHostel',
// //   'StudentManagementRemoveHostel',
// // ];

// // export default function CreateUserPage() {
// //   const { subadmin,permissions } = useSubAdmin();

// //   const [users, setUsers] = useState([]);

// //   const [isFormOpen, setFormOpen] = useState(false);
// //   const [isEditMode, setEditMode] = useState(false);
// //   const [editingUserId, setEditingUserId] = useState(null);
// //   const [errors, setErrors] = useState({});

// //   const [formData, setFormData] = useState({
// //     name: '',
// //     email: '',
// //     role: 'CollegeSubadmin', // Fixed role
// //     permission: [],
// //     status: 'Active',
// //     token: '',
// //     password: '',
// //   });

// //   const toggleForm = (user = null) => {
// //     if (user) {
// //       const { id, ...rest } = user;
// //       setFormData(rest);
// //       setEditingUserId(id);
// //       setEditMode(true);
// //     } else {
      

// //       setFormData({
// //         name: '',
// //         email: '',
// //         role: 'CollegeAdmin', // Fixed role
// //         permission: [],
// //         status: 'Active',
// //         token:'',
// //       });
// //       setEditMode(false);
// //       setEditingUserId(null);
// //     }
// //     setErrors({});
// //     setFormOpen(true);
// //   };

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({
// //       ...prev,
// //       [name]: value,
// //     }));
// //     // Clear error for the field being edited
// //     setErrors((prev) => ({ ...prev, [name]: '' }));
// //   };

// //   const validateForm = () => {
// //     const newErrors = {};
// //     if (!formData.name.trim()) newErrors.name = 'Name is required';
// //     if (!formData.email.trim()) {
// //       newErrors.email = 'Email is required';
// //     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
// //       newErrors.email = 'Invalid email format';
// //     }
// //     if (!formData.permission.length) newErrors.permission = 'At least one permission is required';
// //     return newErrors;
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();

// //     const validationErrors = validateForm();
// //     if (Object.keys(validationErrors).length > 0) {
// //       setErrors(validationErrors);
// //       return;
// //     }

// //     if (isEditMode) {
// //       setUsers((prev) =>
// //         prev.map((u) => (u.id === editingUserId ? { ...u, ...formData } : u))
// //       );
// //       console.log('Updated user:', { id: editingUserId, ...formData });
// //     } else {
// //       const newUser = { id: Date.now(), ...formData };
// //       setUsers((prev) => [...prev, newUser]);
// //       console.log('Added new user:', newUser);
// //     }

// //     console.log('Current user list:', users);

// //     axiosInstance.post('/subadmin/createAdmin', {...formData,
      
// //       y:subadmin?.id})
// //       .then(response => {
// //         console.log('User created successfully:', response.data);
// //       })
// //       .catch(error => {
// //         console.error('Error creating user:', error);
// //         alert('Failed to create user. Please try again.');
// //       });
// //     setFormOpen(false);
// //     setEditMode(false);
// //     setEditingUserId(null);
// //     setFormData({
// //       name: '',
// //       email: '',
// //       role: 'College Subadmin', // Reset with fixed role
// //       permission: [],
// //       status: 'Active',
// //     });
// //     setErrors({});
// //   };

// //   const handleDelete = (id) => {
// //     if (confirm('Are you sure you want to delete this user?')) {
// //       setUsers((prev) => prev.filter((user) => user.id !== id));
// //       console.log('Deleted user with ID:', id);
// //       console.log('Updated user list:', users);
// //     }
// //   };

// //   const handlePermissionChange = (perm) => {
// //     setFormData((prev) => {
// //       const updated = prev.permission.includes(perm)
// //         ? prev.permission.filter((p) => p !== perm)
// //         : [...prev.permission, perm];
// //       return { ...prev, permission: updated };
// //     });
// //     setErrors((prev) => ({ ...prev, permission: '' }));
// //   };

 

// //   return (
// //     <div className="relative w-full">
// //       {/* User Table */}
// //       <div className="bg-white shadow p-4 rounded-md w-full">
// //         <div className="flex justify-between items-center mb-4">
// //           <h2 className="text-xl font-semibold">User List</h2>

// //           {permissions.includes('SAUserAddButton') && (
// //             <button
// //               onClick={() => toggleForm()}
// //               className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
// //             >
// //               <Plus size={18} /> Add User
// //             </button>
// //           )}
// //         </div>

// //         <div className="overflow-x-auto">
// //           <table className="min-w-full border text-sm text-left">
// //             <thead className="bg-gray-100 text-gray-700">
// //               <tr>
// //                 <th className="py-2 px-3 border-b">Name</th>
// //                 <th className="py-2 px-3 border-b">Email</th>
// //                 <th className="py-2 px-3 border-b">Role</th>
// //                 <th className="py-2 px-3 border-b">Permissions</th>
// //                 <th className="py-2 px-3 border-b">Status</th>
// //                 <th className="py-2 px-3 border-b">Token</th>


// //                 {(permissions.includes('SAUserEditButton') ||
// //                   permissions.includes('SAUserDeleteButton')) && (
// //                   <th className="py-2 px-3 border-b">Actions</th>
// //                 )}
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {users.map((user) => (
// //                 <tr key={user.id} className="hover:bg-gray-50">
// //                   <td className="py-2 px-3 border-b">{user.name}</td>
// //                   <td className="py-2 px-3 border-b">{user.email}</td>
// //                   <td className="py-2 px-3 border-b">{user.role}</td>
// //                   <td className="py-2 px-3 border-b text-xs">
// //                     {user.permission?.join(', ') }
// //                   </td>
// //                   <td className="py-2 px-3 border-b">
// //                     <span
// //                       className={`px-2 py-1 text-xs rounded-full font-medium ${
// //                         user.status === 'Active'
// //                           ? 'bg-green-100 text-green-700'
// //                           : 'bg-red-100 text-red-700'
// //                       }`}
// //                     >
// //                       {user.status}
// //                     </span>
// //                   </td>
// //                   <td className="border px-4 py-2">{user.token || '—'}</td>

// //                   {(permissions.includes('SAUserEditButton') ||
// //                     permissions.includes('SAUserDeleteButton')) && (
// //                     <td className="py-2 px-3 border-b flex gap-2">
// //                       {permissions.includes('SAUserEditButton') && (
// //                         <button
// //                           onClick={() => toggleForm(user)}
// //                           className="text-blue-600 hover:text-blue-800"
// //                           title="Edit"
// //                         >
// //                           <Pencil size={16} />
// //                         </button>
// //                       )}
// //                       {permissions.includes('SAUserDeleteButton') && (
// //                         <button
// //                           onClick={() => handleDelete(user.id)}
// //                           className="text-red-600 hover:text-red-800"
// //                           title="Delete"
// //                         >
// //                           <Trash2 size={16} />
// //                         </button>
// //                       )}
// //                     </td>
// //                   )}
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>

// //       {/* Slide Form Drawer */}
// //       <div
// //         className={`fixed top-0 right-0 h-full w-full sm:max-w-md bg-white shadow-lg p-6 transition-transform duration-300 z-50 ${
// //           isFormOpen ? 'translate-x-0' : 'translate-x-full'
// //         }`}
// //       >
// //         <div className="flex justify-between items-center mb-4">
// //           <h3 className="text-lg font-semibold">
// //             {isEditMode ? 'Edit User' : 'Add New User'}
// //           </h3>
// //           <button
// //             onClick={() => setFormOpen(false)}
// //             className="text-gray-500 hover:text-red-500"
// //           >
// //             <X size={20} />
// //           </button>
// //         </div>

// //         <form onSubmit={handleSubmit} className="space-y-4">
// //           <InputField
// //   label="Token"
// //   name="token"
// //   value={formData.token}
// //   onChange={handleChange}
// //   error={errors.token}
// // />
// //           <InputField
// //             label="Name"
// //             name="name"
// //             value={formData.name}
// //             onChange={handleChange}
// //             error={errors.name}
// //           />
// //           <InputField
// //             label="Email"
// //             name="email"
// //             value={formData.email}
// //             onChange={handleChange}
// //             type="email"
// //             error={errors.email}
// //           />
// //           <InputField
// //             label="password"
// //             name="password"
// //             value={formData.password}
// //             onChange={handleChange}
// //             type="password"
// //             error={errors.password}
// //           />
// //           <div>
// //             <label className="block text-sm font-medium mb-1">Role</label>
// //             <input
// //               type="text"
// //               name="role"
// //               value={formData.role}
// //               disabled
// //               className="w-full border px-3 py-2 rounded bg-gray-100 cursor-not-allowed"
// //             />
// //           </div>

// //           {/* Permission Checkboxes */}
// //           {permissions.length > 0 && (
// //             <div>
// //               <label className="block text-sm font-medium mb-1">Permissions</label>
// //               <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto border p-2 rounded text-sm">
// //                 {ALL_STUDENT_PERMISSIONS.filter((perm) => permissions.includes(perm)).map(
// //                   (perm) => (
// //                     <label key={perm} className="flex items-center gap-2 break-all">
// //                       <input
// //                         type="checkbox"
// //                         checked={formData.permission?.includes(perm)}
// //                         onChange={() => handlePermissionChange(perm)}
// //                       />
// //                       {perm}
// //                     </label>
// //                   )
// //                 )}
// //               </div>
// //               {errors.permission && (
// //                 <p className="text-red-500 text-xs mt-1">{errors.permission}</p>
// //               )}
// //             </div>
// //           )}

// //           <div>
// //             <label className="block text-sm font-medium mb-1">Status</label>
// //             <select
// //               name="status"
// //               value={formData.status}
// //               onChange={handleChange}
// //               className="w-full border px-3 py-2 rounded"
// //             >
// //               <option value="Active">Active</option>
// //               <option value="Inactive">Inactive</option>
// //             </select>
// //           </div>

         


// //           <button
// //             type="submit"
// //             className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
// //           >
// //             {isEditMode ? 'Update User' : 'Save User'}
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }

// // // Reusable Input Field
// // function InputField({ label, name, value, onChange, type = 'text', error }) {
// //   return (
// //     <div>
// //       <label className="block text-sm font-medium mb-1">
// //         {label} <span className="text-red-500">*</span>
// //       </label>
// //       <input
// //         type={type}
// //         name={name}
// //         value={value}
// //         onChange={onChange}
// //         required
// //         className={`w-full border px-3 py-2 rounded ${
// //           error ? 'border-red-500' : ''
// //         }`}
// //       />
// //       {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
// //     </div>
// //   );
// // }




// // import { use, useEffect, useState } from 'react';
// // import { Plus, Pencil, Trash2, X } from 'lucide-react';
// // import { useSubAdmin } from '@/contexts/subContext';
// // import axiosInstance from '@/utils/axiosInstance';

// // // Define all possible permissions
// // const ALL_STUDENT_PERMISSIONS = [
// //   'StudentManagementViewStudents',
// //   'StudentManagementAddStudent',
// //   'StudentManagementDeleteStudent',
// //   'StudentManagementAddPreviousSchool',
// //   'StudentManagementEditStudent',
// //   'StudentManagementUploadPhoto',
// //   'StudentManagementAssignRoll',
// //   'StudentManagementDemoteStudent',
// //   'StudentManagementPromoteStudent',
// //   'StudentManagementGenerateIDCard',
// //   'StudentManagementPrintList',
// //   'StudentManagementFilterBySection',
// //   'StudentManagementFilterByClass',
// //   'StudentManagementFilterByBatch',
// //   'StudentManagementViewProfile',
// //   'StudentManagementResetPassword',
// //   'StudentManagementEditProfilePicture',
// //   'StudentManagementSendAnnouncement',
// //   'StudentManagementUpdateGuardian',
// //   'StudentManagementViewGuardian',
// //   'StudentManagementAssignTransport',
// //   'StudentManagementViewAttendance',
// //   'StudentManagementViewFeeStatus',
// //   'StudentManagementViewExamResult',
// //   'StudentManagementBlockAccount',
// //   'StudentManagementUnblockAccount',
// //   'StudentManagementSuspendStudent',
// //   'StudentManagementReinstateStudent',
// //   'StudentManagementAssignHostel',
// //   'StudentManagementRemoveHostel',
// // ];

// // export default function CreateUserPage() {
// //   const { subadmin, permissions } = useSubAdmin();

// //   const [users, setUsers] = useState([]);
// //   const [isFormOpen, setFormOpen] = useState(false);
// //   const [isEditMode, setEditMode] = useState(false);
// //   const [editingUserId, setEditingUserId] = useState(null);
// //   const [errors, setErrors] = useState({});

// //   const [formData, setFormData] = useState({
// //     name: '',
// //     email: '',
// //     role: 'CollegeAdmin',
// //     permissions: [], // Changed to permissions (plural)
// //     status: 'Active',
// //     token: '',
// //     password: '',
// //   });

// //  useEffect(() => {
// //     if (!subadmin?.id) return;

// //     const fetchAdmin = async () => {
// //       try {
// //         const res = await axiosInstance.get(`/subadmin/admins/${subadmin.id}`);
// //         console.log('Fetched admin:', res.data);
// //         setAdmin(res.data);
// //       } catch (error) {
// //         console.error('Error fetching admin:', error);
// //       }
// //     };

// //     fetchAdmin();
// //   }, [subadmin?.id]);

// //   const toggleForm = (user = null) => {
// //     if (user) {
// //       const { id, ...rest } = user;
// //       setFormData(rest);
// //       setEditingUserId(id);
// //       setEditMode(true);
// //     } else {
// //       setFormData({
// //         name: '',
// //         email: '',
// //         role: 'CollegeAdmin',
// //         permissions: [],
// //         status: 'Active',
// //         token: '',
// //         password: '',
// //       });
// //       setEditMode(false);
// //       setEditingUserId(null);
// //     }
// //     setErrors({});
// //     setFormOpen(true);
// //   };

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({
// //       ...prev,
// //       [name]: value,
// //     }));
// //     setErrors((prev) => ({ ...prev, [name]: '' }));
// //   };

// //   const handlePermissionChange = (perm) => {
// //     setFormData((prev) => {
// //       const updated = prev.permissions.includes(perm)
// //         ? prev.permissions.filter((p) => p !== perm)
// //         : [...prev.permissions, perm];
// //       return { ...prev, permissions: updated };
// //     });
// //     setErrors((prev) => ({ ...prev, permissions: '' }));
// //   };

// //   const validateForm = () => {
// //     const newErrors = {};
// //     if (!formData.name.trim()) newErrors.name = 'Name is required';
// //     if (!formData.email.trim()) {
// //       newErrors.email = 'Email is required';
// //     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
// //       newErrors.email = 'Invalid email format';
// //     }
// //     if (!formData.password.trim()) newErrors.password = 'Password is required';
// //     if (!formData.token.trim()) newErrors.token = 'Token is required';
// //     if (!formData.permissions.length) newErrors.permissions = 'At least one permission is required';
// //     return newErrors;
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();

// //     const validationErrors = validateForm();
// //     if (Object.keys(validationErrors).length > 0) {
// //       setErrors(validationErrors);
// //       return;
// //     }

// //     const payload = {
// //       ...formData,
// //       y: subadmin?.id,
// //     };

// //     if (isEditMode) {
// //       // Simulate updating user in local state (for UI)
// //       setUsers((prev) =>
// //         prev.map((u) => (u.id === editingUserId ? { ...u, ...formData } : u))
// //       );
// //       console.log('Updated user:', { id: editingUserId, ...formData });
// //     } else {
// //       // Simulate adding new user in local state (for UI)
// //       const newUser = { id: Date.now(), ...formData };
// //       setUsers((prev) => [...prev, newUser]);
// //       console.log('Added new user:', newUser);

// //       // Send request to backend
// //       axiosInstance
// //         .post('/subadmin/createAdmin', payload)
// //         .then((response) => {
// //           console.log('User created successfully:', response.data);
// //           // Optionally update local state with response data
// //           setUsers((prev) =>
// //             prev.map((u) =>
// //               u.id === newUser.id ? { ...u, id: response.data.admin.id } : u
// //             )
// //           );
// //         })
// //         .catch((error) => {
// //           console.error('Error creating user:', error.response?.data || error);
// //           setErrors(error.response?.data?.errors || { general: 'Failed to create user' });
// //           alert('Failed to create user. Please check the form and try again.');
// //         });
// //     }

// //     setFormOpen(false);
// //     setEditMode(false);
// //     setEditingUserId(null);
// //     setFormData({
// //       name: '',
// //       email: '',
// //       role: 'CollegeAdmin',
// //       permissions: [],
// //       status: 'Active',
// //       token: '',
// //       password: '',
// //     });
// //     setErrors({});
// //   };

// //   const handleDelete = (id) => {
// //     if (confirm('Are you sure you want to delete this user?')) {
// //       setUsers((prev) => prev.filter((user) => user.id !== id));
// //       console.log('Deleted user with ID:', id);
// //       console.log('Updated user list:', users);
// //       // Optionally send DELETE request to backend
// //       // axiosInstance.delete(`/subadmin/deleteAdmin/${id}`)
// //     }
// //   };

// //   return (
// //     <div className="relative w-full">
// //       {/* User Table */}
// //       <div className="bg-white shadow p-4 rounded-md w-full">
// //         <div className="flex justify-between items-center mb-4">
// //           <h2 className="text-xl font-semibold">User List</h2>
// //           {permissions.includes('SAUserAddButton') && (
// //             <button
// //               onClick={() => toggleForm()}
// //               className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
// //             >
// //               <Plus size={18} /> Add User
// //             </button>
// //           )}
// //         </div>

// //         <div className="overflow-x-auto">
// //           <table className="min-w-full border text-sm text-left">
// //             <thead className="bg-gray-100 text-gray-700">
// //               <tr>
// //                 <th className="py-2 px-3 border-b">Name</th>
// //                 <th className="py-2 px-3 border-b">Email</th>
// //                 <th className="py-2 px-3 border-b">Role</th>
// //                 <th className="py-2 px-3 border-b">Permissions</th>
// //                 <th className="py-2 px-3 border-b">Status</th>
// //                 <th className="py-2 px-3 border-b">Token</th>
// //                 {(permissions.includes('SAUserEditButton') ||
// //                   permissions.includes('SAUserDeleteButton')) && (
// //                   <th className="py-2 px-3 border-b">Actions</th>
// //                 )}
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {users.map((user) => (
// //                 <tr key={user.id} className="hover:bg-gray-50">
// //                   <td className="py-2 px-3 border-b">{user.name}</td>
// //                   <td className="py-2 px-3 border-b">{user.email}</td>
// //                   <td className="py-2 px-3 border-b">{user.role}</td>
// //                   <td className="py-2 px-3 border-b text-xs">
// //                     {user.permissions?.join(', ') || 'None'}
// //                   </td>
// //                   <td className="py-2 px-3 border-b">
// //                     <span
// //                       className={`px-2 py-1 text-xs rounded-full font-medium ${
// //                         user.status === 'Active'
// //                           ? 'bg-green-100 text-green-700'
// //                           : 'bg-red-100 text-red-700'
// //                       }`}
// //                     >
// //                       {user.status}
// //                     </span>
// //                   </td>
// //                   <td className="py-2 px-3 border-b">{user.token || '—'}</td>
// //                   {(permissions.includes('SAUserEditButton') ||
// //                     permissions.includes('SAUserDeleteButton')) && (
// //                     <td className="py-2 px-3 border-b flex gap-2">
// //                       {permissions.includes('SAUserEditButton') && (
// //                         <button
// //                           onClick={() => toggleForm(user)}
// //                           className="text-blue-600 hover:text-blue-800"
// //                           title="Edit"
// //                         >
// //                           <Pencil size={16} />
// //                         </button>
// //                       )}
// //                       {permissions.includes('SAUserDeleteButton') && (
// //                         <button
// //                           onClick={() => handleDelete(user.id)}
// //                           className="text-red-600 hover:text-red-800"
// //                           title="Delete"
// //                         >
// //                           <Trash2 size={16} />
// //                         </button>
// //                       )}
// //                     </td>
// //                   )}
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>

// //       {/* Slide Form Drawer */}
// //       <div
// //         className={`fixed top-0 right-0 h-full w-full sm:max-w-md bg-white shadow-lg p-6 transition-transform duration-300 z-50 ${
// //           isFormOpen ? 'translate-x-0' : 'translate-x-full'
// //         }`}
// //       >
// //         <div className="flex justify-between items-center mb-4">
// //           <h3 className="text-lg font-semibold">
// //             {isEditMode ? 'Edit User' : 'Add New User'}
// //           </h3>
// //           <button
// //             onClick={() => setFormOpen(false)}
// //             className="text-gray-500 hover:text-red-500"
// //           >
// //             <X size={20} />
// //           </button>
// //         </div>

// //         <form onSubmit={handleSubmit} className="space-y-4">
// //           <InputField
// //             label="Token"
// //             name="token"
// //             value={formData.token}
// //             onChange={handleChange}
// //             error={errors.token}
// //           />
// //           <InputField
// //             label="Name"
// //             name="name"
// //             value={formData.name}
// //             onChange={handleChange}
// //             error={errors.name}
// //           />
// //           <InputField
// //             label="Email"
// //             name="email"
// //             value={formData.email}
// //             onChange={handleChange}
// //             type="email"
// //             error={errors.email}
// //           />
// //           <InputField
// //             label="Password"
// //             name="password"
// //             value={formData.password}
// //             onChange={handleChange}
// //             type="password"
// //             error={errors.password}
// //           />
// //           <div>
// //             <label className="block text-sm font-medium mb-1">Role</label>
// //             <input
// //               type="text"
// //               name="role"
// //               value={formData.role}
// //               disabled
// //               className="w-full border px-3 py-2 rounded bg-gray-100 cursor-not-allowed"
// //             />
// //           </div>

// //           {/* Permission Checkboxes */}
// //           {permissions.length > 0 && (
// //             <div>
// //               <label className="block text-sm font-medium mb-1">
// //                 Permissions <span className="text-red-500">*</span>
// //               </label>
// //               <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto border p-2 rounded text-sm">
// //                 {ALL_STUDENT_PERMISSIONS.filter((perm) => permissions.includes(perm)).map(
// //                   (perm) => (
// //                     <label key={perm} className="flex items-center gap-2 break-all">
// //                       <input
// //                         type="checkbox"
// //                         checked={formData.permissions.includes(perm)}
// //                         onChange={() => handlePermissionChange(perm)}
// //                       />
// //                       {perm}
// //                     </label>
// //                   )
// //                 )}
// //               </div>
// //               {errors.permissions && (
// //                 <p className="text-red-500 text-xs mt-1">{errors.permissions}</p>
// //               )}
// //             </div>
// //           )}

// //           <div>
// //             <label className="block text-sm font-medium mb-1">Status</label>
// //             <select
// //               name="status"
// //               value={formData.status}
// //               onChange={handleChange}
// //               className="w-full border px-3 py-2 rounded"
// //             >
// //               <option value="Active">Active</option>
// //               <option value="Inactive">Inactive</option>
// //             </select>
// //           </div>

// //           <button
// //             type="submit"
// //             className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
// //           >
// //             {isEditMode ? 'Update User' : 'Save User'}
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }

// // // Reusable Input Field Component
// // function InputField({ label, name, value, onChange, type = 'text', error }) {
// //   return (
// //     <div>
// //       <label className="block text-sm font-medium mb-1">
// //         {label} <span className="text-red-500">*</span>
// //       </label>
// //       <input
// //         type={type}
// //         name={name}
// //         value={value}
// //         onChange={onChange}
// //         required
// //         className={`w-full border px-3 py-2 rounded ${
// //           error ? 'border-red-500' : ''
// //         }`}
// //       />
// //       {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
// //     </div>
// //   );
// // }


// // CreateUserPage.js
// // import { useEffect, useState } from 'react';
// // import { Plus, Pencil, Trash2, X } from 'lucide-react';
// // import { useSubAdmin } from '@/contexts/subContext';
// // import axiosInstance from '@/utils/axiosInstance';
// // import Loader from '@/components/Loader';

// // const ALL_STUDENT_PERMISSIONS = [
// //   'StudentManagementViewStudents',
// //   'StudentManagementAddStudent',
// //   'StudentManagementDeleteStudent',
// //   'StudentManagementAddPreviousSchool',
// //   'StudentManagementEditStudent',
// //   'StudentManagementUploadPhoto',
// //   'StudentManagementAssignRoll',
// //   'StudentManagementDemoteStudent',
// //   'StudentManagementPromoteStudent',
// //   'StudentManagementGenerateIDCard',
// //   'StudentManagementPrintList',
// //   'StudentManagementFilterBySection',
// //   'StudentManagementFilterByClass',
// //   'StudentManagementFilterByBatch',
// //   'StudentManagementViewProfile',
// //   'StudentManagementResetPassword',
// //   'StudentManagementEditProfilePicture',
// //   'StudentManagementSendAnnouncement',
// //   'StudentManagementUpdateGuardian',
// //   'StudentManagementViewGuardian',
// //   'StudentManagementAssignTransport',
// //   'StudentManagementViewAttendance',
// //   'StudentManagementViewFeeStatus',
// //   'StudentManagementViewExamResult',
// //   'StudentManagementBlockAccount',
// //   'StudentManagementUnblockAccount',
// //   'StudentManagementSuspendStudent',
// //   'StudentManagementReinstateStudent',
// //   'StudentManagementAssignHostel',
// //   'StudentManagementRemoveHostel',
// // ];

// // export default function CreateUserPage() {
// //   const { subadmin, permissions } = useSubAdmin();

// //   const [users, setUsers] = useState([]);
// //   const [isFormOpen, setFormOpen] = useState(false);
// //   const [isEditMode, setEditMode] = useState(false);
// //   const [editingUserId, setEditingUserId] = useState(null);
// //   const [errors, setErrors] = useState({});
// //   const [adminLoading, setAdminLoading] = useState(false);

// //   const [formData, setFormData] = useState({
// //     name: '',
// //     email: '',
// //     role: 'CollegeAdmin',
// //     permissions: [],
// //     status: 'Active',
// //     token: '',
// //     password: '',
// //   });

// //   useEffect(() => {
// //     if (!subadmin?.id) return;

// //     const fetchAdmin = async () => {
// //       try {
// //         setAdminLoading(true);
// //         const res = await axiosInstance.get(`/subadmin/admins/${subadmin.id}`);
// //         console.log('Fetched admin:', res.data);
// //         setUsers(res.data);
// //       } catch (error) {
// //         console.error('Error fetching admin:', error);
// //       } finally {
// //         setAdminLoading(false);
// //       }
// //     };

// //     fetchAdmin();
// //   }, [subadmin?.id]);

// //   const toggleForm = (user = null) => {
// //     if (user) {
// //       const { id, ...rest } = user;
// //       setFormData(rest);
// //       setEditingUserId(id);
// //       setEditMode(true);
// //     } else {
// //       setFormData({
// //         name: '',
// //         email: '',
// //         role: 'CollegeAdmin',
// //         permissions: [],
// //         status: 'Active',
// //         token: '',
// //         password: '',
// //       });
// //       setEditMode(false);
// //       setEditingUserId(null);
// //     }
// //     setErrors({});
// //     setFormOpen(true);
// //   };

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({
// //       ...prev,
// //       [name]: value,
// //     }));
// //     setErrors((prev) => ({ ...prev, [name]: '' }));
// //   };

// //   const handlePermissionChange = (perm) => {
// //     setFormData((prev) => {
// //       const updated = prev.permissions.includes(perm)
// //         ? prev.permissions.filter((p) => p !== perm)
// //         : [...prev.permissions, perm];
// //       return { ...prev, permissions: updated };
// //     });
// //     setErrors((prev) => ({ ...prev, permissions: '' }));
// //   };

// //   const validateForm = () => {
// //     const newErrors = {};
// //     if (!formData.name.trim()) newErrors.name = 'Name is required';
// //     if (!formData.email.trim()) {
// //       newErrors.email = 'Email is required';
// //     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
// //       newErrors.email = 'Invalid email format';
// //     }
// //     if (!formData.password.trim()) newErrors.password = 'Password is required';
// //     if (!formData.token.trim()) newErrors.token = 'Token is required';
// //     if (!formData.permissions.length) newErrors.permissions = 'At least one permission is required';
// //     return newErrors;
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();

// //     const validationErrors = validateForm();
// //     if (Object.keys(validationErrors).length > 0) {
// //       setErrors(validationErrors);
// //       return;
// //     }

// //     const payload = {
// //       ...formData,
// //       y: subadmin?.id,
// //     };

// //     if (isEditMode) {
// //       setUsers((prev) =>
// //         prev.map((u) => (u.id === editingUserId ? { ...u, ...formData } : u))
// //       );
// //     } else {
// //       axiosInstance
// //         .post('/subadmin/createAdmin', payload)
// //         .then((response) => {
// //           const createdAdmin = response.data.admin;
// //           setUsers((prev) => [...prev, createdAdmin]);
// //         })
// //         .catch((error) => {
// //           console.error('Error creating user:', error.response?.data || error);
// //           setErrors(error.response?.data?.errors || { general: 'Failed to create user' });
// //           alert('Failed to create user. Please check the form and try again.');
// //         });
// //     }

// //     setFormOpen(false);
// //     setEditMode(false);
// //     setEditingUserId(null);
// //     setFormData({
// //       name: '',
// //       email: '',
// //       role: 'CollegeAdmin',
// //       permissions: [],
// //       status: 'Active',
// //       token: '',
// //       password: '',
// //     });
// //     setErrors({});
// //   };

// //   const handleDelete = (id) => {
// //     if (confirm('Are you sure you want to delete this user?')) {
// //       setUsers((prev) => prev.filter((user) => user.id !== id));
// //     }
// //   };

// //   return (
// //     <div className="relative w-full">
// //       <div className="bg-white shadow p-4 rounded-md w-full">
// //         <div className="flex justify-between items-center mb-4">
// //           <h2 className="text-xl font-semibold">User List</h2>
// //           {permissions.includes('SAUserAddButton') && (
// //             <button
// //               onClick={() => toggleForm()}
// //               className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
// //             >
// //               <Plus size={18} /> Add User
// //             </button>
// //           )}
// //         </div>

// //         {adminLoading ? (
// //           <Loader message="Loading users..." />
// //         ) : (
// //           <div className="overflow-x-auto">
// //             <table className="min-w-full border text-sm text-left">
// //               <thead className="bg-gray-100 text-gray-700">
// //                 <tr>
// //                   <th className="py-2 px-3 border-b">Name</th>
// //                   <th className="py-2 px-3 border-b">Email</th>
// //                   <th className="py-2 px-3 border-b">Role</th>
// //                   <th className="py-2 px-3 border-b">Permissions</th>
// //                   <th className="py-2 px-3 border-b">Status</th>
// //                   <th className="py-2 px-3 border-b">Token</th>
// //                   {(permissions.includes('SAUserEditButton') || permissions.includes('SAUserDeleteButton')) && (
// //                     <th className="py-2 px-3 border-b">Actions</th>
// //                   )}
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {users.map((user) => (
// //                   <tr key={user.id} className="hover:bg-gray-50">
// //                     <td className="py-2 px-3 border-b">{user.name}</td>
// //                     <td className="py-2 px-3 border-b">{user.email}</td>
// //                     <td className="py-2 px-3 border-b">{user.role}</td>
// //                     <td className="py-2 px-3 border-b text-xs">{user.permissions?.join(', ') || 'None'}</td>
// //                     <td className="py-2 px-3 border-b">
// //                       <span
// //                         className={`px-2 py-1 text-xs rounded-full font-medium ${
// //                           user.status === 'Active'
// //                             ? 'bg-green-100 text-green-700'
// //                             : 'bg-red-100 text-red-700'
// //                         }`}
// //                       >
// //                         {user.status}
// //                       </span>
// //                     </td>
// //                     <td className="py-2 px-3 border-b">{user.token || '—'}</td>
// //                     {(permissions.includes('SAUserEditButton') || permissions.includes('SAUserDeleteButton')) && (
// //                       <td className="py-2 px-3 border-b flex gap-2">
// //                         {permissions.includes('SAUserEditButton') && (
// //                           <button
// //                             onClick={() => toggleForm(user)}
// //                             className="text-blue-600 hover:text-blue-800"
// //                             title="Edit"
// //                           >
// //                             <Pencil size={16} />
// //                           </button>
// //                         )}
// //                         {permissions.includes('SAUserDeleteButton') && (
// //                           <button
// //                             onClick={() => handleDelete(user.id)}
// //                             className="text-red-600 hover:text-red-800"
// //                             title="Delete"
// //                           >
// //                             <Trash2 size={16} />
// //                           </button>
// //                         )}
// //                       </td>
// //                     )}
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>
// //         )}
// //       </div>

// //       <div className={`fixed top-0 right-0 h-full w-full sm:max-w-md bg-white shadow-lg p-6 transition-transform duration-300 z-50 ${isFormOpen ? 'translate-x-0' : 'translate-x-full'}`}>
// //         <div className="flex justify-between items-center mb-4">
// //           <h3 className="text-lg font-semibold">{isEditMode ? 'Edit User' : 'Add New User'}</h3>
// //           <button onClick={() => setFormOpen(false)} className="text-gray-500 hover:text-red-500">
// //             <X size={20} />
// //           </button>
// //         </div>

// //         <form onSubmit={handleSubmit} className="space-y-4">
// //           <InputField label="Token" name="token" value={formData.token} onChange={handleChange} error={errors.token} />
// //           <InputField label="Name" name="name" value={formData.name} onChange={handleChange} error={errors.name} />
// //           <InputField label="Email" name="email" value={formData.email} onChange={handleChange} type="email" error={errors.email} />
// //           <InputField label="Password" name="password" value={formData.password} onChange={handleChange} type="password" error={errors.password} />

// //           <div>
// //             <label className="block text-sm font-medium mb-1">Role</label>
// //             <input
// //               type="text"
// //               name="role"
// //               value={formData.role}
// //               disabled
// //               className="w-full border px-3 py-2 rounded bg-gray-100 cursor-not-allowed"
// //             />
// //           </div>

// //           {permissions.length > 0 && (
// //             <div>
// //               <label className="block text-sm font-medium mb-1">Permissions <span className="text-red-500">*</span></label>
// //               <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto border p-2 rounded text-sm">
// //                 {ALL_STUDENT_PERMISSIONS.filter((perm) => permissions.includes(perm)).map((perm) => (
// //                   <label key={perm} className="flex items-center gap-2 break-all">
// //                     <input
// //                       type="checkbox"
// //                       checked={formData.permissions.includes(perm)}
// //                       onChange={() => handlePermissionChange(perm)}
// //                     />
// //                     {perm}
// //                   </label>
// //                 ))}
// //               </div>
// //               {errors.permissions && (
// //                 <p className="text-red-500 text-xs mt-1">{errors.permissions}</p>
// //               )}
// //             </div>
// //           )}

// //           <div>
// //             <label className="block text-sm font-medium mb-1">Status</label>
// //             <select
// //               name="status"
// //               value={formData.status}
// //               onChange={handleChange}
// //               className="w-full border px-3 py-2 rounded"
// //             >
// //               <option value="Active">Active</option>
// //               <option value="Inactive">Inactive</option>
// //             </select>
// //           </div>

// //           <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
// //             {isEditMode ? 'Update User' : 'Save User'}
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }

// // function InputField({ label, name, value, onChange, type = 'text', error }) {
// //   return (
// //     <div>
// //       <label className="block text-sm font-medium mb-1">
// //         {label} <span className="text-red-500">*</span>
// //       </label>
// //       <input
// //         type={type}
// //         name={name}
// //         value={value}
// //         onChange={onChange}
// //         required
// //         className={`w-full border px-3 py-2 rounded ${error ? 'border-red-500' : ''}`}
// //       />
// //       {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
// //     </div>
// //   );
// // }

// // import { useEffect, useState } from 'react';
// // import { Plus, Pencil, Trash2, X } from 'lucide-react';
// // import { useSubAdmin } from '@/contexts/subContext';
// // import axiosInstance from '@/utils/axiosInstance';
// // import Loader from '@/components/Loader';

// // const ALL_STUDENT_PERMISSIONS = [
// //   'StudentManagementViewStudents',
// //   'StudentManagementAddStudent',
// //   'StudentManagementDeleteStudent',
// //   'StudentManagementAddPreviousSchool',
// //   'StudentManagementEditStudent',
// //   'StudentManagementUploadPhoto',
// //   'StudentManagementAssignRoll',
// //   'StudentManagementDemoteStudent',
// //   'StudentManagementPromoteStudent',
// //   'StudentManagementGenerateIDCard',
// //   'StudentManagementPrintList',
// //   'StudentManagementFilterBySection',
// //   'StudentManagementFilterByClass',
// //   'StudentManagementFilterByBatch',
// //   'StudentManagementViewProfile',
// //   'StudentManagementResetPassword',
// //   'StudentManagementEditProfilePicture',
// //   'StudentManagementSendAnnouncement',
// //   'StudentManagementUpdateGuardian',
// //   'StudentManagementViewGuardian',
// //   'StudentManagementAssignTransport',
// //   'StudentManagementViewAttendance',
// //   'StudentManagementViewFeeStatus',
// //   'StudentManagementViewExamResult',
// //   'StudentManagementBlockAccount',
// //   'StudentManagementUnblockAccount',
// //   'StudentManagementSuspendStudent',
// //   'StudentManagementReinstateStudent',
// //   'StudentManagementAssignHostel',
// //   'StudentManagementRemoveHostel',
// // ];

// // export default function CreateUserPage() {
// //   const { subadmin, permissions } = useSubAdmin();

// //   const [users, setUsers] = useState([]);
// //   const [isFormOpen, setFormOpen] = useState(false);
// //   const [isEditMode, setEditMode] = useState(false);
// //   const [editingUserId, setEditingUserId] = useState(null);
// //   const [errors, setErrors] = useState({});
// //   const [adminLoading, setAdminLoading] = useState(false);

// //   const [formData, setFormData] = useState({
// //     name: '',
// //     email: '',
// //     role: 'CollegeAdmin',
// //     permissions: [],
// //     status: 'Active',
// //     token: '',
// //     password: '',
// //   });

// //   useEffect(() => {
// //     if (!subadmin?.id) return;

// //     const fetchAdmin = async () => {
// //       try {
// //         setAdminLoading(true);
// //         const res = await axiosInstance.get(`/subadmin/admins/${subadmin.id}`);
// //         console.log('Fetched admin:', res.data);
// //         setUsers(res.data);
// //       } catch (error) {
// //         console.error('Error fetching admin:', error);
// //       } finally {
// //         setAdminLoading(false);
// //       }
// //     };

// //     fetchAdmin();
// //   }, [subadmin?.id]);

// //   const toggleForm = (user = null) => {
// //     if (user) {
// //       const { id, ...rest } = user;
// //       setFormData(rest);
// //       setEditingUserId(id);
// //       setEditMode(true);
// //     } else {
// //       setFormData({
// //         name: '',
// //         email: '',
// //         role: 'CollegeAdmin',
// //         permissions: [],
// //         status: 'Active',
// //         token: '',
// //         password: '',
// //       });
// //       setEditMode(false);
// //       setEditingUserId(null);
// //     }
// //     setErrors({});
// //     setFormOpen(true);
// //   };

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({
// //       ...prev,
// //       [name]: value,
// //     }));
// //     setErrors((prev) => ({ ...prev, [name]: '' }));
// //   };

// //   const handlePermissionChange = (perm) => {
// //     setFormData((prev) => {
// //       const updated = prev.permissions.includes(perm)
// //         ? prev.permissions.filter((p) => p !== perm)
// //         : [...prev.permissions, perm];
// //       return { ...prev, permissions: updated };
// //     });
// //     setErrors((prev) => ({ ...prev, permissions: '' }));
// //   };

// //   const validateForm = () => {
// //     const newErrors = {};
// //     if (!formData.name.trim()) newErrors.name = 'Name is required';
// //     if (!formData.email.trim()) {
// //       newErrors.email = 'Email is required';
// //     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
// //       newErrors.email = 'Invalid email format';
// //     }
// //     if (!formData.password.trim()) newErrors.password = 'Password is required';
// //     if (!formData.token.trim()) newErrors.token = 'Token is required';
// //     if (!formData.permissions.length) newErrors.permissions = 'At least one permission is required';
// //     return newErrors;
// //   };

  
// //   const handleSubmit = (e) => {
// //   e.preventDefault();

// //   const validationErrors = validateForm();
// //   if (Object.keys(validationErrors).length > 0) {
// //     setErrors(validationErrors);
// //     return;
// //   }

// //   const payload = {
// //     ...formData,
// //     y: subadmin?.id,
// //   };

// //   // If editing, remove password
// //   if (isEditMode) {
// //     delete payload.password;
// //   }

// //   if (isEditMode) {
// //     axiosInstance
// //       .put(`/subadmin/admins/${editingUserId}`, payload)
// //       .then((response) => {
// //         const updatedAdmin = response.data.admin;
// //         setUsers((prev) =>
// //           prev.map((u) => (u.id === editingUserId ? updatedAdmin : u))
// //         );
// //         resetFormState();
// //       })
// //       .catch((error) => {
// //         console.error('Error updating user:', error.response?.data || error);
// //         setErrors(error.response?.data?.errors || { general: 'Failed to update user' });
// //         alert('Failed to update user.');
// //       });
// //   } else {
// //     axiosInstance
// //       .post('/subadmin/createAdmin', payload)
// //       .then((response) => {
// //         const createdAdmin = response.data.admin;
// //         setUsers((prev) => [...prev, createdAdmin]);
// //         resetFormState();
// //       })
// //       .catch((error) => {
// //         console.error('Error creating user:', error.response?.data || error);
// //         setErrors(error.response?.data?.errors || { general: 'Failed to create user' });
// //         alert('Failed to create user. Please check the form and try again.');
// //       });
// //   }
// // };

// // const resetFormState = () => {
// //   setFormOpen(false);
// //   setEditMode(false);
// //   setEditingUserId(null);
// //   setFormData({
// //     name: '',
// //     email: '',
// //     role: 'CollegeAdmin',
// //     permissions: [],
// //     status: 'Active',
// //     token: '',
// //     password: '',
// //   });
// //   setErrors({});
// // };

// //   const handleDelete = (id) => {
// //     if (confirm('Are you sure you want to delete this user?')) {
// //       setUsers((prev) => prev.filter((user) => user.id !== id));
// //     }
// //   };

// //   return (
// //     <div className="relative w-full">
// //       <div className="bg-white shadow p-4 rounded-md w-full">
// //         <div className="flex justify-between items-center mb-4">
// //           <h2 className="text-xl font-semibold">User List</h2>
// //           {permissions.includes('SAUserAddButton') && (
// //             <button
// //               onClick={() => toggleForm()}
// //               className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
// //             >
// //               <Plus size={18} /> Add User
// //             </button>
// //           )}
// //         </div>

// //         {adminLoading ? (
// //           <Loader message="Loading users..." />
// //         ) : (
// //           <div className="overflow-x-auto">
// //             <table className="min-w-full border text-sm text-left">
// //               <thead className="bg-gray-100 text-gray-700">
// //                 <tr>
// //                   <th className="py-2 px-3 border-b">Name</th>
// //                   <th className="py-2 px-3 border-b">Email</th>
// //                   <th className="py-2 px-3 border-b">Role</th>
// //                   <th className="py-2 px-3 border-b">Permissions</th>
// //                   <th className="py-2 px-3 border-b">Status</th>
// //                   <th className="py-2 px-3 border-b">Token</th>
// //                   {(permissions.includes('SAUserEditButton') || permissions.includes('SAUserDeleteButton')) && (
// //                     <th className="py-2 px-3 border-b">Actions</th>
// //                   )}
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {users.map((user) => (
// //                   <tr key={user.id} className="hover:bg-gray-50">
// //                     <td className="py-2 px-3 border-b">{user.name}</td>
// //                     <td className="py-2 px-3 border-b">{user.email}</td>
// //                     <td className="py-2 px-3 border-b">{user.role}</td>
// //                     <td className="py-2 px-3 border-b text-xs">{user.permissions?.join(', ') || 'None'}</td>
// //                     <td className="py-2 px-3 border-b">
// //                       <span
// //                         className={`px-2 py-1 text-xs rounded-full font-medium ${
// //                           user.status === 'Active'
// //                             ? 'bg-green-100 text-green-700'
// //                             : 'bg-red-100 text-red-700'
// //                         }`}
// //                       >
// //                         {user.status}
// //                       </span>
// //                     </td>
// //                     <td className="py-2 px-3 border-b">{user.token || '—'}</td>
// //                     {(permissions.includes('SAUserEditButton') || permissions.includes('SAUserDeleteButton')) && (
// //                       <td className="py-2 px-3 border-b flex gap-2">
// //                         {permissions.includes('SAUserEditButton') && (
// //                           <button
// //                             onClick={() => toggleForm(user)}
// //                             className="text-blue-600 hover:text-blue-800"
// //                             title="Edit"
// //                           >
// //                             <Pencil size={16} />
// //                           </button>
// //                         )}
// //                         {permissions.includes('SAUserDeleteButton') && (
// //                           <button
// //                             onClick={() => handleDelete(user.id)}
// //                             className="text-red-600 hover:text-red-800"
// //                             title="Delete"
// //                           >
// //                             <Trash2 size={16} />
// //                           </button>
// //                         )}
// //                       </td>
// //                     )}
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>
// //         )}
// //       </div>

// //       <div className={`fixed top-0 right-0 h-full w-full sm:max-w-md bg-white shadow-lg p-6 transition-transform duration-300 z-50 ${isFormOpen ? 'translate-x-0' : 'translate-x-full'}`}>
// //         <div className="flex justify-between items-center mb-4">
// //           <h3 className="text-lg font-semibold">{isEditMode ? 'Edit User' : 'Add New User'}</h3>
// //           <button onClick={() => setFormOpen(false)} className="text-gray-500 hover:text-red-500">
// //             <X size={20} />
// //           </button>
// //         </div>

// //         <form onSubmit={handleSubmit} className="space-y-4">
// //           <InputField label="Token" name="token" value={formData.token} onChange={handleChange} error={errors.token} />
// //           <InputField label="Name" name="name" value={formData.name} onChange={handleChange} error={errors.name} />
// //           <InputField label="Email" name="email" value={formData.email} onChange={handleChange} type="email" error={errors.email} />
// // {!isEditMode && (
// //   <InputField
// //     label="Password"
// //     name="password"
// //     value={formData.password}
// //     onChange={handleChange}
// //     type="password"
// //     error={errors.password}
// //   />
// // )}
// //           <div>
// //             <label className="block text-sm font-medium mb-1">Role</label>
// //             <input
// //               type="text"
// //               name="role"
// //               value={formData.role}
// //               disabled
// //               className="w-full border px-3 py-2 rounded bg-gray-100 cursor-not-allowed"
// //             />
// //           </div>

// //           {permissions.length > 0 && (
// //             <div>
// //               <label className="block text-sm font-medium mb-1">Permissions <span className="text-red-500">*</span></label>
// //               <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto border p-2 rounded text-sm">
// //                 {ALL_STUDENT_PERMISSIONS.filter((perm) => permissions.includes(perm)).map((perm) => (
// //                   <label key={perm} className="flex items-center gap-2 break-all">
// //                     <input
// //                       type="checkbox"
// //                       checked={formData.permissions.includes(perm)}
// //                       onChange={() => handlePermissionChange(perm)}
// //                     />
// //                     {perm}
// //                   </label>
// //                 ))}
// //               </div>
// //               {errors.permissions && (
// //                 <p className="text-red-500 text-xs mt-1">{errors.permissions}</p>
// //               )}
// //             </div>
// //           )}

// //           <div>
// //             <label className="block text-sm font-medium mb-1">Status</label>
// //             <select
// //               name="status"
// //               value={formData.status}
// //               onChange={handleChange}
// //               className="w-full border px-3 py-2 rounded"
// //             >
// //               <option value="Active">Active</option>
// //               <option value="Inactive">Inactive</option>
// //             </select>
// //           </div>

// //           <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
// //             {isEditMode ? 'Update User' : 'Save User'}
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }

// // function InputField({ label, name, value, onChange, type = 'text', error }) {
// //   return (
// //     <div>
// //       <label className="block text-sm font-medium mb-1">
// //         {label} <span className="text-red-500">*</span>
// //       </label>
// //       <input
// //         type={type}
// //         name={name}
// //         value={value}
// //         onChange={onChange}
// //         required
// //         className={`w-full border px-3 py-2 rounded ${error ? 'border-red-500' : ''}`}
// //       />
// //       {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
// //     </div>
// //   );
// // }

// import { useEffect, useState } from 'react';
// import { Plus, Pencil, Trash2, X } from 'lucide-react';
// import { useSubAdmin } from '@/contexts/subContext';
// import axiosInstance from '@/utils/axiosInstance';
// import Loader from '@/components/Loader';

// const ALL_STUDENT_PERMISSIONS = [
//   'StudentManagementViewStudents',
//   'StudentManagementAddStudent',
//   'StudentManagementDeleteStudent',
//   'StudentManagementAddPreviousSchool',
//   'StudentManagementEditStudent',
//   'StudentManagementUploadPhoto',
//   'StudentManagementAssignRoll',
//   'StudentManagementDemoteStudent',
//   'StudentManagementPromoteStudent',
//   'StudentManagementGenerateIDCard',
//   'StudentManagementPrintList',
//   'StudentManagementFilterBySection',
//   'StudentManagementFilterByClass',
//   'StudentManagementFilterByBatch',
//   'StudentManagementViewProfile',
//   'StudentManagementResetPassword',
//   'StudentManagementEditProfilePicture',
//   'StudentManagementSendAnnouncement',
//   'StudentManagementUpdateGuardian',
//   'StudentManagementViewGuardian',
//   'StudentManagementAssignTransport',
//   'StudentManagementViewAttendance',
//   'StudentManagementViewFeeStatus',
//   'StudentManagementViewExamResult',
//   'StudentManagementBlockAccount',
//   'StudentManagementUnblockAccount',
//   'StudentManagementSuspendStudent',
//   'StudentManagementReinstateStudent',
//   'StudentManagementAssignHostel',
//   'StudentManagementRemoveHostel',
// ];

// export default function CreateUserPage() {
//   const { subadmin, permissions } = useSubAdmin();

//   const [users, setUsers] = useState([]);
//   const [isFormOpen, setFormOpen] = useState(false);
//   const [isEditMode, setEditMode] = useState(false);
//   const [editingUserId, setEditingUserId] = useState(null);
//   const [errors, setErrors] = useState({});
//   const [adminLoading, setAdminLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     role: 'CollegeAdmin',
//     permissions: [],
//     status: 'Active',
//     token: '',
//     password: '',
//   });

//   useEffect(() => {
//     if (!subadmin?.id) return;

//     const fetchAdmin = async () => {
//       try {
//         setAdminLoading(true);
//         const res = await axiosInstance.get(`/subadmin/admins/${subadmin.id}`);
//         console.log('Fetched admin:', res.data);
//         setUsers(res.data);
//       } catch (error) {
//         console.error('Error fetching admin:', error);
//         alert('Failed to load users. Please try again.');
//       } finally {
//         setAdminLoading(false);
//       }
//     };

//     fetchAdmin();
//   }, [subadmin?.id]);

//   const toggleForm = (user = null) => {
//     if (user) {
//       const { id, password, ...rest } = user;
//       setFormData({
//         ...rest,
//         permissions: Array.isArray(rest.permissions) ? rest.permissions : JSON.parse(rest.permissions || '[]'),
//         password: '',
//       });
//       setEditingUserId(id);
//       setEditMode(true);
//     } else {
//       setFormData({
//         name: '',
//         email: '',
//         role: 'CollegeAdmin',
//         permissions: [],
//         status: 'Active',
//         token: '',
//         password: '',
//       });
//       setEditMode(false);
//       setEditingUserId(null);
//     }
//     setErrors({});
//     setFormOpen(true);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     setErrors((prev) => ({ ...prev, [name]: '' }));
//   };

//   const handlePermissionChange = (perm) => {
//     setFormData((prev) => {
//       const updated = prev.permissions.includes(perm)
//         ? prev.permissions.filter((p) => p !== perm)
//         : [...prev.permissions, perm];
//       return { ...prev, permissions: updated };
//     });
//     setErrors((prev) => ({ ...prev, permissions: '' }));
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.name.trim()) newErrors.name = 'Name is required';
//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = 'Invalid email format';
//     }
//     if (!isEditMode && !formData.password.trim()) newErrors.password = 'Password is required';
//     if (!formData.token.trim()) newErrors.token = 'Token is required';
//     if (!formData.permissions.length) newErrors.permissions = 'At least one permission is required';
//     return newErrors;
//   };

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   const validationErrors = validateForm();
//   if (Object.keys(validationErrors).length > 0) {
//     setErrors(validationErrors);
//     return;
//   }

//   const payload = {
//     ...formData,
//     y: subadmin?.id,
//   };

//   if (isEditMode && !payload.password.trim()) {
//     delete payload.password;
//   }

//   try {
//     if (isEditMode) {
//       const response = await axiosInstance.put(`/subadmin/admins/${editingUserId}`, payload);
//       setUsers((prev) =>
//         prev.map((u) => (u.id === editingUserId ? { ...u, ...response.data.admin } : u))
//       );
//       alert('User updated successfully.');
//     } else {
//       const response = await axiosInstance.post('/subadmin/createAdmin', payload);
//       setUsers((prev) => [...prev, response.data.admin]);
//       alert('User created successfully.');
//     }

//     setFormOpen(false);
//     setEditMode(false);
//     setEditingUserId(null);
//     setFormData({
//       name: '',
//       email: '',
//       role: 'CollegeAdmin',
//       permissions: [],
//       status: 'Active',
//       token: '',
//       password: '',
//     });
//     setErrors({});
//   } catch (error) {
//     console.error('Error submitting form:', error.response?.data || error);
//     const errorMessage = error.response?.data?.message || (isEditMode ? 'Failed to update user' : 'Failed to create user');
//     const errorDetails = error.response?.data?.errors || { general: errorMessage };
//     setErrors(errorDetails);
//     alert(`${errorMessage}. ${Object.values(errorDetails).join(' ')}`);
//   }
// };

//   const handleDelete = async (id) => {
//     if (confirm('Are you sure you want to delete this user?')) {
//       try {
//         await axiosInstance.delete(`/subadmin/admins/${id}`);
//         setUsers((prev) => prev.filter((user) => user.id !== id));
//         alert('User deleted successfully.');
//       } catch (error) {
//         console.error('Error deleting user:', error);
//         alert('Failed to delete user. Please try again.');
//       }
//     }
//   };

//   return (
//     <div className="relative w-full">
//       <div className="bg-white shadow p-4 rounded-md w-full">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold">User List</h2>
//           {permissions.includes('SAUserAddButton') && (
//             <button
//               onClick={() => toggleForm()}
//               className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//             >
//               <Plus size={18} /> Add User
//             </button>
//           )}
//         </div>

//         {adminLoading ? (
//           <Loader message="Loading users..." />
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full border text-sm text-left">
//               <thead className="bg-gray-100 text-gray-700">
//                 <tr>
//                   <th className="py-2 px-3 border-b">Name</th>
//                   <th className="py-2 px-3 border-b">Email</th>
//                   <th className="py-2 px-3 border-b">Role</th>
//                   <th className="py-2 px-3 border-b">Permissions</th>
//                   <th className="py-2 px-3 border-b">Status</th>
//                   <th className="py-2 px-3 border-b">Token</th>
//                   {(permissions.includes('SAUserEditButton') || permissions.includes('SAUserDeleteButton')) && (
//                     <th className="py-2 px-3 border-b">Actions</th>
//                   )}
//                 </tr>
//               </thead>
//               <tbody>
//                 {users.map((user) => (
//                   <tr key={user.id} className="hover:bg-gray-50">
//                     <td className="py-2 px-3 border-b">{user.name}</td>
//                     <td className="py-2 px-3 border-b">{user.email}</td>
//                     <td className="py-2 px-3 border-b">{user.role}</td>
//                     <td className="py-2 px-3 border-b text-xs">
//                       {Array.isArray(user.permissions) ? user.permissions.join(', ') : 'None'}
//                     </td>
//                     <td className="py-2 px-3 border-b">
//                       <span
//                         className={`px-2 py-1 text-xs rounded-full font-medium ${
//                           user.status === 'Active'
//                             ? 'bg-green-100 text-green-700'
//                             : 'bg-red-100 text-red-700'
//                         }`}
//                       >
//                         {user.status}
//                       </span>
//                     </td>
//                     <td className="py-2 px-3 border-b">{user.token || '—'}</td>
//                     {(permissions.includes('SAUserEditButton') || permissions.includes('SAUserDeleteButton')) && (
//                       <td className="py-2 px-3 border-b flex gap-2">
//                         {permissions.includes('SAUserEditButton') && (
//                           <button
//                             onClick={() => toggleForm(user)}
//                             className="text-blue-600 hover:text-blue-800"
//                             title="Edit"
//                           >
//                             <Pencil size={16} />
//                           </button>
//                         )}
//                         {permissions.includes('SAUserDeleteButton') && (
//                           <button
//                             onClick={() => handleDelete(user.id)}
//                             className="text-red-600 hover:text-red-800"
//                             title="Delete"
//                           >
//                             <Trash2 size={16} />
//                           </button>
//                         )}
//                       </td>
//                     )}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       <div
//         className={`fixed top-0 right-0 h-full w-full sm:max-w-md bg-white shadow-lg p-6 transition-transform duration-300 z-50 ${
//           isFormOpen ? 'translate-x-0' : 'translate-x-full'
//         }`}
//       >
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-lg font-semibold">{isEditMode ? 'Edit User' : 'Add New User'}</h3>
//           <button onClick={() => setFormOpen(false)} className="text-gray-500 hover:text-red-500">
//             <X size={20} />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <InputField label="Token" name="token" value={formData.token} onChange={handleChange} error={errors.token} />
//           <InputField label="Name" name="name" value={formData.name} onChange={handleChange} error={errors.name} />
//           <InputField label="Email" name="email" value={formData.email} onChange={handleChange} type="email" error={errors.email} />
//           {!isEditMode && (
//             <InputField
//               label="Password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               type="password"
//               error={errors.password}
//             />
//           )}
//           <div>
//             <label className="block text-sm font-medium mb-1">Role</label>
//             <input
//               type="text"
//               name="role"
//               value={formData.role}
//               disabled
//               className="w-full border px-3 py-2 rounded bg-gray-100 cursor-not-allowed"
//             />
//           </div>

//           {permissions.length > 0 && (
//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 Permissions <span className="text-red-500">*</span>
//               </label>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto border p-2 rounded text-sm">
//                 {ALL_STUDENT_PERMISSIONS.filter((perm) => permissions.includes(perm)).map((perm) => (
//                   <label key={perm} className="flex items-center gap-2 break-all">
//                     <input
//                       type="checkbox"
//                       checked={formData.permissions.includes(perm)}
//                       onChange={() => handlePermissionChange(perm)}
//                     />
//                     {perm}
//                   </label>
//                 ))}
//               </div>
//               {errors.permissions && <p className="text-red-500 text-xs mt-1">{errors.permissions}</p>}
//             </div>
//           )}

//           <div>
//             <label className="block text-sm font-medium mb-1">Status</label>
//             <select
//               name="status"
//               value={formData.status}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded"
//             >
//               <option value="Active">Active</option>
//               <option value="Inactive">Inactive</option>
//             </select>
//           </div>

//           {errors.general && <p className="text-red-500 text-xs mt-1">{errors.general}</p>}

//           <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
//             {isEditMode ? 'Update User' : 'Save User'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// function InputField({ label, name, value, onChange, type = 'text', error }) {
//   return (
//     <div>
//       <label className="block text-sm font-medium mb-1">
//         {label} <span className="text-red-500">*</span>
//       </label>
//       <input
//         type={type}
//         name={name}
//         value={value}
//         onChange={onChange}
//         required={name !== 'password' || !isEditMode} // Error: isEditMode is not defined
//         className={`w-full border px-3 py-2 rounded ${error ? 'border-red-500' : ''}`}
//       />
//       {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
//     </div>
//   );
// }
import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { useSubAdmin } from '@/contexts/subContext';
import axiosInstance from '@/utils/axiosInstance';
import Loader from '@/components/Loader';

const ALL_STUDENT_PERMISSIONS = [
  'StudentManagementViewStudents',
  'StudentManagementAddStudent',
  'StudentManagementDeleteStudent',
  'StudentManagementAddPreviousSchool',
  'StudentManagementEditStudent',
  'StudentManagementUploadPhoto',
  'StudentManagementAssignRoll',
  'StudentManagementDemoteStudent',
  'StudentManagementPromoteStudent',
  'StudentManagementGenerateIDCard',
  'StudentManagementPrintList',
  'StudentManagementFilterBySection',
  'StudentManagementFilterByClass',
  'StudentManagementFilterByBatch',
  'StudentManagementViewProfile',
  'StudentManagementResetPassword',
  'StudentManagementEditProfilePicture',
  'StudentManagementSendAnnouncement',
  'StudentManagementUpdateGuardian',
  'StudentManagementViewGuardian',
  'StudentManagementAssignTransport',
  'StudentManagementViewAttendance',
  'StudentManagementViewFeeStatus',
  'StudentManagementViewExamResult',
  'StudentManagementBlockAccount',
  'StudentManagementUnblockAccount',
  'StudentManagementSuspendStudent',
  'StudentManagementReinstateStudent',
  'StudentManagementAssignHostel',
  'StudentManagementRemoveHostel',
  'StudentManagementBatchDelete',
'StudentManagementBatchEdit',
'StudentManagementBatchAdd',
'StudentManagementBatchShow',
'TeacherManagementAdd',
'TeacherManagementEdit',
'TeacherManagementDelete',

];

export default function CreateUserPage() {
  const { subadmin, permissions } = useSubAdmin();

  const [users, setUsers] = useState([]);
  const [isFormOpen, setFormOpen] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [errors, setErrors] = useState({});
  const [adminLoading, setAdminLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'CollegeAdmin',
    permissions: [],
    status: 'Active',
    token: '',
    password: '',
  });

  useEffect(() => {
    if (!subadmin?.id) return;

    const fetchAdmin = async () => {
      try {
        setAdminLoading(true);
        const res = await axiosInstance.get(`/subadmin/admins/${subadmin.id}`);
        console.log('Fetched admin:', res.data);
        
        setUsers(
          res.data.map((user) => ({
            ...user,
            permissions: Array.isArray(user.permissions)
              ? user.permissions
              : JSON.parse(user.permissions || '[]'),
          }))
        );
      } catch (error) {
        console.error('Error fetching admin:', error);
        alert('Failed to load users. Please try again.');
      } finally {
        setAdminLoading(false);
      }
    };

    fetchAdmin();
  }, [subadmin?.id]);

  const toggleForm = (user = null) => {
    if (user) {
      const { id, password, ...rest } = user;
      setFormData({
        ...rest,
        permissions: Array.isArray(rest.permissions) ? rest.permissions : JSON.parse(rest.permissions || '[]'),
        password: '',
      });
      setEditingUserId(id);
      setEditMode(true);
    } else {
      setFormData({
        name: '',
        email: '',
        role: 'CollegeAdmin',
        permissions: [],
        status: 'Active' || 'Active',
        token: '',
        password: '',
      });
      setEditMode(false);
      setEditingUserId(null);
    }
    setErrors({});
    setFormOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handlePermissionChange = (perm) => {
    setFormData((prev) => {
      const updated = prev.permissions.includes(perm)
        ? prev.permissions.filter((p) => p !== perm)
        : [...prev.permissions, perm];
      return { ...prev, permissions: updated };
    });
    setErrors((prev) => ({ ...prev, permissions: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!isEditMode && !formData.password.trim()) newErrors.password = 'Password is required';
    if (!formData.token.trim()) newErrors.token = 'Token is required';
    if (!formData.permissions.length) newErrors.permissions = 'At least one permission is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const payload = {
      ...formData,
      y: subadmin?.id,
    };

    if (isEditMode && !payload.password.trim()) {
      delete payload.password;
    }

    try {
      if (isEditMode) {
        const response = await axiosInstance.put(`/subadmin/admins/${editingUserId}`, payload);
        setUsers((prev) =>
          prev.map((u) => (u.id === editingUserId ? { ...u, ...response.data.admin } : u))
        );
        alert('User updated successfully.');
      } else {
        const response = await axiosInstance.post('/subadmin/createAdmin', payload);
        setUsers((prev) => [...prev, response.data.admin]);
        alert('User created successfully.');
      }

      setFormOpen(false);
      setEditMode(false);
      setEditingUserId(null);
      setFormData({
        name: '',
        email: '',
        role: 'CollegeAdmin',
        permissions: [],
        status: 'Active',
        token: '',
        password: '',
      });
      setErrors({});
    } catch (error) {
      console.error('Error submitting form:', error.response?.data || error);
      const errorMessage = error.response?.data?.message || (isEditMode ? 'Failed to update user' : 'Failed to create user');
      const errorDetails = error.response?.data?.errors || { general: errorMessage };
      setErrors(errorDetails);
      alert(`${errorMessage}. ${Object.values(errorDetails).join(' ')}`);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        await axiosInstance.delete(`/subadmin/admins/${id}`);
        setUsers((prev) => prev.filter((user) => user.id !== id));
        alert('User deleted successfully.');
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Failed to delete user. Please try again.');
      }
    }
  };

  return (
    <div className="relative w-full">
      <div className="bg-white shadow p-4 rounded-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">User List</h2>
          {permissions.includes('SAUserAddButton') && (
            <button
              onClick={() => toggleForm()}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              <Plus size={18} /> Add User
            </button>
          )}
        </div>

        {adminLoading ? (
          <Loader message="Loading users..." />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm text-left">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="py-2 px-3 border-b">Name</th>
                  <th className="py-2 px-3 border-b">Email</th>
                  <th className="py-2 px-3 border-b">Role</th>
                  <th className="py-2 px-3 border-b">Permissions</th>
                  <th className="py-2 px-3 border-b">Status</th>
                  <th className="py-2 px-3 border-b">Token</th>
                  {(permissions.includes('SAUserEditButton') || permissions.includes('SAUserDeleteButton')) && (
                    <th className="py-2 px-3 border-b">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="py-2 px-3 border-b">{user.name}</td>
                    <td className="py-2 px-3 border-b">{user.email}</td>
                    <td className="py-2 px-3 border-b">{user.role}</td>
                    <td className="py-2 px-3 border-b text-xs">
                      {Array.isArray(user.permissions) ? user.permissions.join(', ') : 'None'}
                    </td>
                    <td className="py-2 px-3 border-b">
                      <span
                        className={`px-2 py-1 text-xs rounded-full font-medium ${
                          user.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="py-2 px-3 border-b">{user.token || '—'}</td>
                    {(permissions.includes('SAUserEditButton') || permissions.includes('SAUserDeleteButton')) && (
                      <td className="py-2 px-3 border-b flex gap-2">
                        {permissions.includes('SAUserEditButton') && (
                          <button
                            onClick={() => toggleForm(user)}
                            className="text-blue-600 hover:text-blue-800"
                            title="Edit"
                          >
                            <Pencil size={16} />
                          </button>
                        )}
                        {permissions.includes('SAUserDeleteButton') && (
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="text-red-600 hover:text-red-800"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div
        className={`fixed top-0 right-0 h-full w-full sm:max-w-md bg-white shadow-lg p-6 transition-transform duration-300 z-50 ${
          isFormOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{isEditMode ? 'Edit User' : 'Add New User'}</h3>
          <button onClick={() => setFormOpen(false)} className="text-gray-500 hover:text-red-500">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Token"
            name="token"
            value={formData.token}
            onChange={handleChange}
            error={errors.token}
            isEditMode={isEditMode}
          />
          <InputField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            isEditMode={isEditMode}
          />
          <InputField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            error={errors.email}
            isEditMode={isEditMode}
          />
          {!isEditMode && (
            <InputField
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              error={errors.password}
              isEditMode={isEditMode}
            />
          )}
          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              disabled
              className="w-full border px-3 py-2 rounded bg-gray-100 cursor-not-allowed"
            />
          </div>

          {permissions.length > 0 && (
            <div>
              <label className="block text-sm font-medium mb-1">
                Permissions <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto border p-2 rounded text-sm">
                {ALL_STUDENT_PERMISSIONS.filter((perm) => permissions.includes(perm)).map((perm) => (
                  <label key={perm} className="flex items-center gap-2 break-all">
                    <input
                      type="checkbox"
                      checked={formData.permissions.includes(perm)}
                      onChange={() => handlePermissionChange(perm)}
                    />
                    {perm}
                  </label>
                ))}
              </div>
              {errors.permissions && <p className="text-red-500 text-xs mt-1">{errors.permissions}</p>}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
            
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {errors.general && <p className="text-red-500 text-xs mt-1">{errors.general}</p>}

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            {isEditMode ? 'Update User' : 'Save User'}
          </button>
        </form>
      </div>
    </div>
  );
}

function InputField({ label, name, value, onChange, type = 'text', error, isEditMode }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={name !== 'password' || !isEditMode}
        className={`w-full border px-3 py-2 rounded ${error ? 'border-red-500' : ''}`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}