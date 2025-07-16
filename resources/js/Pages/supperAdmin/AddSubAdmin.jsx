// // 'use client'

// // import { useState } from 'react'
// // import { Plus } from 'lucide-react'
// // import { motion } from 'framer-motion'
// // import SupperAdminLayout from '@/Layouts/SupperAdminLayout'
// // import AddUser from '@/form/addUser'
// // // import AddUser from '@/components/sub-admin/addUser'
// // // import img from 'next/img';
// // export default function AddSubAdmin() {
// //   const [isDrawerOpen, setDrawerOpen] = useState(false)
// //   const [subAdmins, setSubAdmins] = useState([])
// //   const [searchQuery, setSearchQuery] = useState('')
// //   const [sortKey, setSortKey] = useState('name')
// //   const [sortOrder, setSortOrder] = useState('asc')

// //   const toggleDrawer = () => setDrawerOpen(!isDrawerOpen)

// //   const handleAddSubAdmin = (newAdmin) => {
// //     setSubAdmins(prev => [...prev, newAdmin])
// //     toggleDrawer()
// //   }

// //   const handleSort = (key) => {
// //     if (sortKey === key) {
// //       setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))
// //     } else {
// //       setSortKey(key)
// //       setSortOrder('asc')
// //     }
// //   }

// //   const filteredAndSortedAdmins = [...subAdmins]
// //     .filter(admin =>
// //       [admin.name, admin.email, admin.phone]
// //         .some(field => field?.toLowerCase().includes(searchQuery.toLowerCase()))
// //     )
// //     .sort((a, b) => {
// //       const valA = a[sortKey]?.toLowerCase?.() || ''
// //       const valB = b[sortKey]?.toLowerCase?.() || ''
// //       if (valA < valB) return sortOrder === 'asc' ? -1 : 1
// //       if (valA > valB) return sortOrder === 'asc' ? 1 : -1
// //       return 0
// //     })

// //   return (
// //     <SupperAdminLayout>
// //        <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-6">
// //       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
// //         <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Sub-Admins</h1>
// //         <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
// //           <input
// //             type="text"
// //             placeholder="Search by name, email, or phone..."
// //             value={searchQuery}
// //             onChange={(e) => setSearchQuery(e.target.value)}
// //             className="px-4 py-2 rounded border dark:bg-gray-900 dark:border-gray-700 dark:text-white"
// //           />
// //           <button
// //             onClick={toggleDrawer}
// //             className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
// //           >
// //             <Plus className="w-4 h-4" />
// //             Add User
// //           </button>
// //         </div>
// //       </div>

// //       {/* Show Sub-Admins Table */}
// //       {filteredAndSortedAdmins.length > 0 ? (
// //         <div className="overflow-auto rounded-lg shadow border dark:border-gray-700">
// //           <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
// //             <thead className="bg-gray-100 dark:bg-gray-800">
// //               <tr>
// //                 <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 dark:text-gray-300">#</th>
// //                 <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 dark:text-gray-300">Avatar</th>
// //                 {['name', 'email', 'phone', 'dob', 'ip', 'address'].map((key) => (
// //                   <th
// //                     key={key}
// //                     onClick={() => handleSort(key)}
// //                     className="px-4 py-2 text-left text-xs font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
// //                   >
// //                     {key.charAt(0).toUpperCase() + key.slice(1)}{' '}
// //                     {sortKey === key && (sortOrder === 'asc' ? '▲' : '▼')}
// //                   </th>
// //                 ))}
// //               </tr>
// //             </thead>
// //             <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
// //               {filteredAndSortedAdmins.map((admin, index) => (
// //                 <tr key={index}>
// //                   <td className="px-4 py-2 text-sm text-gray-900 dark:text-white">{index + 1}</td>
// //                   <td className="px-4 py-2">
// //                     {admin.avatar ? (
// //                       <img src={admin.avatar} alt="avatar" className="w-10 h-10 rounded-full border" />
// //                     ) : (
// //                       <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-sm text-white">
// //                         {admin.name?.[0]?.toUpperCase() || '?'}
// //                       </div>
// //                     )}
// //                   </td>
// //                   <td className="px-4 py-2 text-sm text-gray-900 dark:text-white">{admin.name}</td>
// //                   <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{admin.email}</td>
// //                   <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{admin.phone || 'N/A'}</td>
// //                   <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{admin.dob || 'N/A'}</td>
// //                   <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{admin.ip || 'N/A'}</td>
// //                   <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{admin.address || 'N/A'}</td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       ) : (
// //         <p className="text-sm text-gray-600 dark:text-gray-400">No sub-admins found.</p>
// //       )}

// //       {/* Drawer */}
// //       {isDrawerOpen && (
// //         <>
// //           <div
// //             onClick={toggleDrawer}
// //             className="fixed inset-0 bg-black/40 z-40"
// //           ></div>

// //           <motion.div
// //             initial={{ x: '100%' }}
// //             animate={{ x: 0 }}
// //             exit={{ x: '100%' }}
// //             transition={{ duration: 0.3 }}
// //             className="fixed top-0 right-0 w-full sm:w-[450px] h-full bg-white dark:bg-gray-900 shadow-lg z-50 overflow-y-auto"
// //           >
// //             <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
// //               <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Add Sub-Admin</h2>
// //               <button
// //                 onClick={toggleDrawer}
// //                 className="text-gray-600 dark:text-gray-300 hover:text-red-500 transition"
// //               >
// //                 ✕
// //               </button>
// //             </div>

// //             <AddUser onSubmit={handleAddSubAdmin} />
// //           </motion.div>
// //         </>
// //       )}
// //     </div>
// //     </SupperAdminLayout>

// //   )
// // }

// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import { Plus } from "lucide-react";
// // import { motion } from "framer-motion";
// // import toast from "react-hot-toast";
// // import SupperAdminLayout from "@/Layouts/SupperAdminLayout";
// // import AddUser from "@/form/addUser";

// // export default function AddSubAdmin() {
// //     const [isDrawerOpen, setDrawerOpen] = useState(false);
// //     const [subAdmins, setSubAdmins] = useState([]);
// //     const [searchQuery, setSearchQuery] = useState("");
// //     const [sortKey, setSortKey] = useState("name");
// //     const [sortOrder, setSortOrder] = useState("asc");
// //     const [permissionsData, setPermissionsData] = useState([]);

// //     useEffect(() => {
// //         const fetchPermissions = async () => {
// //             try {
// //                 const res = await axios.get("/supper/permission-list");
// //                 setPermissionsData(res.data);
// //             } catch (err) {
// //                 toast.error("Failed to load permissions");
// //             }
// //         };

// //         fetchPermissions();
// //         fetchSubAdmins();
// //     }, []);

// //     // useEffect(() => {
// //     //   fetchSubAdmins()
// //     // }, [])

// //     const fetchSubAdmins = () => {
// //         axios
// //             .get("/supper/fetch-subadmin")
// //             .then((res) => {
// //                 setSubAdmins(res.data.data);
// //             })
// //             .catch(() => toast.error("Failed to load Sub-Admins"));
// //     };

// //     const toggleDrawer = () => setDrawerOpen(!isDrawerOpen);

// //     const handleAddSubAdmin = (newAdmin) => {
// //         axios
// //             .post("/supper/add-subadmin", newAdmin)
// //             .then(() => {
// //                 toast.success("Sub-Admin added!");
// //                 fetchSubAdmins();
// //                 toggleDrawer();
// //             })
// //             .catch((err) => {
// //                 if (err.response?.data?.errors) {
// //                     Object.values(err.response.data.errors).forEach((msg) =>
// //                         toast.error(msg[0])
// //                     );
// //                 } else {
// //                     toast.error("Error adding sub-admin");
// //                 }
// //             });
// //     };

// //     const handleSort = (key) => {
// //         if (sortKey === key) {
// //             setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
// //         } else {
// //             setSortKey(key);
// //             setSortOrder("asc");
// //         }
// //     };

// //     const filteredAndSortedAdmins = [...subAdmins]
// //         .filter((admin) =>
// //             [admin.name, admin.email, admin.phone].some((field) =>
// //                 field?.toLowerCase().includes(searchQuery.toLowerCase())
// //             )
// //         )
// //         .sort((a, b) => {
// //             const valA = a[sortKey]?.toLowerCase?.() || "";
// //             const valB = b[sortKey]?.toLowerCase?.() || "";
// //             if (valA < valB) return sortOrder === "asc" ? -1 : 1;
// //             if (valA > valB) return sortOrder === "asc" ? 1 : -1;
// //             return 0;
// //         });

// //     return (
// //         <SupperAdminLayout>
// //             <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-6">
// //                 <div className="flex justify-between items-center mb-4">
// //                     <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
// //                         Sub-Admins
// //                     </h1>
// //                     <div className="flex gap-2">
// //                         <input
// //                             type="text"
// //                             placeholder="Search..."
// //                             value={searchQuery}
// //                             onChange={(e) => setSearchQuery(e.target.value)}
// //                             className="px-4 py-2 rounded border dark:bg-gray-900 dark:border-gray-700 dark:text-white"
// //                         />
// //                         <button
// //                             onClick={toggleDrawer}
// //                             className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
// //                         >
// //                             <Plus className="w-4 h-4" />
// //                             Add User
// //                         </button>
// //                     </div>
// //                 </div>

// //                 {filteredAndSortedAdmins.length > 0 ? (
// //                     <div className="overflow-auto rounded-lg shadow border dark:border-gray-700">
// //                         <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
// //                             <thead className="bg-gray-100 dark:bg-gray-800">
// //                                 <tr>
// //                                     <th className="px-4 py-2">#</th>
// //                                     <th className="px-4 py-2">Avatar</th>
// //                                     {[
// //                                         "name",
// //                                         "email",
// //                                         "phone",
// //                                         "dob",
// //                                         "ip",
// //                                         "address",
// //                                     ].map((key) => (
// //                                         <th
// //                                             key={key}
// //                                             onClick={() => handleSort(key)}
// //                                             className="px-4 py-2 cursor-pointer"
// //                                         >
// //                                             {key.charAt(0).toUpperCase() +
// //                                                 key.slice(1)}{" "}
// //                                             {sortKey === key &&
// //                                                 (sortOrder === "asc"
// //                                                     ? "▲"
// //                                                     : "▼")}
// //                                         </th>
// //                                     ))}
// //                                 </tr>
// //                             </thead>
// //                             <tbody className="bg-white dark:bg-gray-900">
// //                                 {filteredAndSortedAdmins.map((admin, index) => (
// //                                     <tr key={index}>
// //                                         <td className="px-4 py-2">
// //                                             {index + 1}
// //                                         </td>
// //                                         <td className="px-4 py-2">
// //                                             {admin.avatar ? (
// //                                                 <img
// //                                                     src={admin.avatar}
// //                                                     className="w-10 h-10 rounded-full"
// //                                                 />
// //                                             ) : (
// //                                                 <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white">
// //                                                     {admin.name?.[0]?.toUpperCase() ||
// //                                                         "?"}
// //                                                 </div>
// //                                             )}
// //                                         </td>
// //                                         <td className="px-4 py-2">
// //                                             {admin.name}
// //                                         </td>
// //                                         <td className="px-4 py-2">
// //                                             {admin.email}
// //                                         </td>
// //                                         <td className="px-4 py-2">
// //                                             {admin.phone || "N/A"}
// //                                         </td>
// //                                         <td className="px-4 py-2">
// //                                             {admin.dob || "N/A"}
// //                                         </td>
// //                                         <td className="px-4 py-2">
// //                                             {admin.ip || "N/A"}
// //                                         </td>
// //                                         <td className="px-4 py-2">
// //                                             {admin.address || "N/A"}
// //                                         </td>
// //                                     </tr>
// //                                 ))}
// //                             </tbody>
// //                         </table>
// //                     </div>
// //                 ) : (
// //                     <p className="text-sm text-gray-600 dark:text-gray-400">
// //                         No sub-admins found.
// //                     </p>
// //                 )}

// //                 {isDrawerOpen && (
// //                     <>
// //                         <div
// //                             onClick={toggleDrawer}
// //                             className="fixed inset-0 bg-black/40 z-40"
// //                         ></div>
// //                         <motion.div
// //                             initial={{ x: "100%" }}
// //                             animate={{ x: 0 }}
// //                             exit={{ x: "100%" }}
// //                             transition={{ duration: 0.3 }}
// //                             className="fixed top-0 right-0 w-full sm:w-[450px] h-full bg-white dark:bg-gray-900 shadow-lg z-50 overflow-y-auto"
// //                         >
// //                             <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
// //                                 <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
// //                                     Add Sub-Admin
// //                                 </h2>
// //                                 <button
// //                                     onClick={toggleDrawer}
// //                                     className="text-gray-600 dark:text-gray-300 hover:text-red-500"
// //                                 >
// //                                     ✕
// //                                 </button>
// //                             </div>
// //                             <AddUser onSubmit={handleAddSubAdmin} />
// //                         </motion.div>
// //                     </>
// //                 )}
// //             </div>
// //             <AddUser
// //                 onSubmit={handleAddSubAdmin}
// //                 permissionsData={permissionsData}
// //             />
// //         </SupperAdminLayout>
// //     );
// // }

// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import { Plus } from "lucide-react";
// // import { motion } from "framer-motion";
// // import toast from "react-hot-toast";
// // import SupperAdminLayout from "@/Layouts/SupperAdminLayout";
// // import AddUser from "@/form/addUser";
// // import { Pencil, Trash2 } from "lucide-react";

// // export default function AddSubAdmin() {
// //     const [isDrawerOpen, setDrawerOpen] = useState(false);
// //     const [subAdmins, setSubAdmins] = useState([]);
// //     const [searchQuery, setSearchQuery] = useState("");
// //     const [sortKey, setSortKey] = useState("name");
// //     const [sortOrder, setSortOrder] = useState("asc");
// //     const [permissionsData, setPermissionsData] = useState([]);
// //     const [editingAdmin, setEditingAdmin] = useState(null);

// //     useEffect(() => {
// //         fetchPermissions();
// //         fetchSubAdmins();
// //     }, []);

// //     const fetchPermissions = async () => {
// //         try {
// //             const res = await axios.get("/supper/permission-list");
// //             setPermissionsData(res.data); // should be [{ feature: 'user', permissions: [...] }, ...]
// //         } catch (err) {
// //             toast.error("Failed to load permissions");
// //         }
// //     };

// //     const handleEdit = (admin) => {
// //         setEditingAdmin(admin);
// //         setDrawerOpen(true);
// //     };

// //     const handleUpdateSubAdmin = (updatedAdmin) => {
// //         axios
// //             .put(`/supper/update-subadmin/${editingAdmin.id}`, updatedAdmin)
// //             .then(() => {
// //                 toast.success("Sub-Admin updated!");
// //                 fetchSubAdmins();
// //                 setDrawerOpen(false);
// //                 setEditingAdmin(null);
// //             })
// //             .catch(() => toast.error("Failed to update sub-admin"));
// //     };

// //     const toggleDrawer = () => {
// //         setDrawerOpen(!isDrawerOpen);
// //         if (isDrawerOpen) setEditingAdmin(null);
// //     };

// //     const handleDelete = (id) => {
// //         if (window.confirm("Are you sure you want to delete this sub-admin?")) {
// //             axios
// //                 .delete(`/supper/delete-subadmin/${id}`)
// //                 .then(() => {
// //                     toast.success("Sub-Admin deleted!");
// //                     fetchSubAdmins();
// //                 })
// //                 .catch(() => toast.error("Failed to delete sub-admin"));
// //         }
// //     };

// //     const fetchSubAdmins = () => {
// //         axios
// //             .get("/supper/fetch-subadmin")
// //             .then((res) => {
// //                 setSubAdmins(res.data.data);
// //             })
// //             .catch(() => toast.error("Failed to load Sub-Admins"));
// //     };

// //     // const toggleDrawer = () => setDrawerOpen(!isDrawerOpen);

// //     const handleAddSubAdmin = (newAdmin) => {
// //         axios
// //             .post("/supper/add-subadmin", newAdmin)
// //             .then(() => {
// //                 toast.success("Sub-Admin added!");
// //                 fetchSubAdmins();
// //                 toggleDrawer();
// //             })
// //             .catch((err) => {
// //                 if (err.response?.data?.errors) {
// //                     Object.values(err.response.data.errors).forEach((msg) =>
// //                         toast.error(msg[0])
// //                     );
// //                 } else {
// //                     toast.error("Error adding sub-admin");
// //                 }
// //             });
// //     };

// //     const handleSort = (key) => {
// //         if (sortKey === key) {
// //             setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
// //         } else {
// //             setSortKey(key);
// //             setSortOrder("asc");
// //         }
// //     };

// //     const filteredAndSortedAdmins = [...subAdmins]
// //         .filter((admin) =>
// //             [admin.name, admin.email, admin.phone].some((field) =>
// //                 field?.toLowerCase().includes(searchQuery.toLowerCase())
// //             )
// //         )
// //         .sort((a, b) => {
// //             const valA = a[sortKey]?.toLowerCase?.() || "";
// //             const valB = b[sortKey]?.toLowerCase?.() || "";
// //             if (valA < valB) return sortOrder === "asc" ? -1 : 1;
// //             if (valA > valB) return sortOrder === "asc" ? 1 : -1;
// //             return 0;
// //         });

// //     const getGroupedPermissions = (admin) => {
// //         const grouped = {};

// //         (admin.permissions || []).forEach((perm) => {
// //             const [feature, action] = perm.split(".");
// //             if (!feature || !action) return;
// //             if (!grouped[feature]) grouped[feature] = [];
// //             grouped[feature].push(action);
// //         });

// //         return grouped;
// //     };

// //     return (
// //         <SupperAdminLayout>
// //             <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-6">
// //                 {/* Header */}
// //                 <div className="flex justify-between items-center mb-4">
// //                     <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
// //                         Sub-Admins
// //                     </h1>
// //                     <div className="flex gap-2">
// //                         <input
// //                             type="text"
// //                             placeholder="Search..."
// //                             value={searchQuery}
// //                             onChange={(e) => setSearchQuery(e.target.value)}
// //                             className="px-4 py-2 rounded border dark:bg-gray-900 dark:border-gray-700 dark:text-white"
// //                         />
// //                         <button
// //                             onClick={toggleDrawer}
// //                             className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
// //                         >
// //                             <Plus className="w-4 h-4" />
// //                             Add User
// //                         </button>
// //                     </div>
// //                 </div>

// //                 {/* Table */}
// //                 {filteredAndSortedAdmins.length > 0 ? (
// //                     <div className="overflow-auto rounded-lg shadow border dark:border-gray-700">
// //                         <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
// //                             <thead className="bg-gray-100 dark:bg-gray-800">
// //                                 <tr>
// //                                     <th className="px-4 py-2">#</th>
// //                                     <th className="px-4 py-2">Avatar</th>
// //                                     {[
// //                                         "name",
// //                                         "email",
// //                                         "phone",
// //                                         "dob",
// //                                         "ip",
// //                                         "address",
// //                                         "permissions",
// //                                         "Modules",
// //                                     ].map((key) => (
// //                                         <th
// //                                             key={key}
// //                                             onClick={() => handleSort(key)}
// //                                             className="px-4 py-2 cursor-pointer"
// //                                         >
// //                                             {key.charAt(0).toUpperCase() +
// //                                                 key.slice(1)}{" "}
// //                                             {sortKey === key &&
// //                                                 (sortOrder === "asc"
// //                                                     ? "▲"
// //                                                     : "▼")}
// //                                         </th>
// //                                     ))}
// //                                     {/* <th className="px-4 py-2">Modules</th> */}
// //                                     <th className="px-4 py-2">Actions</th>
// //                                 </tr>
// //                             </thead>
// //                             <tbody className="bg-white dark:bg-gray-900">
// //                                 {filteredAndSortedAdmins.map((admin, index) => (
// //                                     <tr key={index}>
// //                                         <td className="px-4 py-2">
// //                                             {index + 1}
// //                                         </td>
// //                                         <td className="px-4 py-2">
// //                                             {admin.avatar ? (
// //                                                 <img
// //                                                     src={admin.avatar}
// //                                                     className="w-10 h-10 rounded-full"
// //                                                 />
// //                                             ) : (
// //                                                 <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white">
// //                                                     {admin.name?.[0]?.toUpperCase() ||
// //                                                         "?"}
// //                                                 </div>
// //                                             )}
// //                                         </td>
// //                                         <td className="px-4 py-2">
// //                                             {admin.name}
// //                                         </td>
// //                                         <td className="px-4 py-2">
// //                                             {admin.email}
// //                                         </td>
// //                                         <td className="px-4 py-2">
// //                                             {admin.phone || "N/A"}
// //                                         </td>
// //                                         <td className="px-4 py-2">
// //                                             {admin.dob || "N/A"}
// //                                         </td>
// //                                         <td className="px-4 py-2">
// //                                             {admin.ip || "N/A"}
// //                                         </td>
// //                                         <td className="px-4 py-2">
// //                                             {admin.address || "N/A"}
// //                                         </td>

// //                                         <td className="px-4 py-2">
// //                                             {admin.permissions &&
// //                                             admin.permissions.length > 0 ? (
// //                                                 admin.permissions.join(", ")
// //                                             ) : (
// //                                                 <span className="text-gray-400 italic">
// //                                                     No Permissions
// //                                                 </span>
// //                                             )}
// //                                         </td>

// //                                         {/* Module Column */}

// //                                         <td className="px-4 py-2">
// //                                             {Array.isArray(admin.permissions) &&
// //                                             admin.permissions.length > 0 ? (
// //                                                 [
// //                                                     ...new Set(
// //                                                         admin.permissions
// //                                                             .map(
// //                                                                 (perm) =>
// //                                                                     perm?.split(
// //                                                                         "."
// //                                                                     )?.[0]
// //                                                             )
// //                                                             .filter(Boolean)
// //                                                     ),
// //                                                 ].map((module, i) => (
// //                                                     <span
// //                                                         key={i}
// //                                                         className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mr-1 dark:bg-green-900 dark:text-green-100"
// //                                                     >
// //                                                         {module}
// //                                                     </span>
// //                                                 ))
// //                                             ) : (
// //                                                 <span className="text-gray-400 italic">
// //                                                     N/A
// //                                                 </span>
// //                                             )}
// //                                         </td>

// //                                         <td className="px-4 py-2 space-x-2">
// //                                             <button
// //                                                 onClick={() =>
// //                                                     handleEdit(admin)
// //                                                 }
// //                                                 className="text-blue-600 hover:text-blue-800"
// //                                                 title="Edit"
// //                                             >
// //                                                 <Pencil className="w-4 h-4" />
// //                                             </button>
// //                                             <button
// //                                                 onClick={() =>
// //                                                     handleDelete(admin.id)
// //                                                 }
// //                                                 className="text-red-600 hover:text-red-800"
// //                                                 title="Delete"
// //                                             >
// //                                                 <Trash2 className="w-4 h-4" />
// //                                             </button>
// //                                             {console.log(admin)}
// //                                         </td>
// //                                     </tr>
// //                                 ))}
// //                             </tbody>
// //                         </table>
// //                     </div>
// //                 ) : (
// //                     <p className="text-sm text-gray-600 dark:text-gray-400">
// //                         No sub-admins found.
// //                     </p>
// //                 )}

// //                 {/* Slide Drawer */}
// //                 {isDrawerOpen && (
// //                     <>
// //                         <div
// //                             onClick={toggleDrawer}
// //                             className="fixed inset-0 bg-black/40 z-40"
// //                         ></div>
// //                         <motion.div
// //                             initial={{ x: "100%" }}
// //                             animate={{ x: 0 }}
// //                             exit={{ x: "100%" }}
// //                             transition={{ duration: 0.3 }}
// //                             className="fixed top-0 right-0 w-full sm:w-[450px] h-full bg-white dark:bg-gray-900 shadow-lg z-50 overflow-y-auto"
// //                         >
// //                             <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
// //                                 <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
// //                                     Add Sub-Admin
// //                                 </h2>
// //                                 <button
// //                                     onClick={toggleDrawer}
// //                                     className="text-gray-600 dark:text-gray-300 hover:text-red-500"
// //                                 >
// //                                     ✕
// //                                 </button>
// //                             </div>

// //                             {/* ✅ Pass permissionsData + onSubmit to form */}
// //                             <AddUser
// //                                 onSubmit={
// //                                     editingAdmin
// //                                         ? handleUpdateSubAdmin
// //                                         : handleAddSubAdmin
// //                                 }
// //                                 initialData={editingAdmin}
// //                                 permissionsData={permissionsData}
// //                             />
// //                         </motion.div>
// //                     </>
// //                 )}
// //             </div>
// //         </SupperAdminLayout>
// //     );
// // }


// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import { Plus, Pencil, Trash2 } from "lucide-react";
// // import { motion } from "framer-motion";
// // import toast from "react-hot-toast";
// // import SupperAdminLayout from "@/Layouts/SupperAdminLayout";
// // import AddUser from "@/form/addUser";

// // export default function AddSubAdmin() {
// //     const [isDrawerOpen, setDrawerOpen] = useState(false);
// //     const [subAdmins, setSubAdmins] = useState([]);
// //     const [searchQuery, setSearchQuery] = useState("");
// //     const [sortKey, setSortKey] = useState("name");
// //     const [sortOrder, setSortOrder] = useState("asc");
// //     const [permissionsData, setPermissionsData] = useState([]);
// //     const [editingAdmin, setEditingAdmin] = useState(null);

// //     useEffect(() => {
// //         fetchPermissions();
// //         fetchSubAdmins();
// //     }, []);

// //     const fetchPermissions = async () => {
// //         try {
// //             const res = await axios.get("/supper/permission-list", {
// //                 headers: {
// //                     'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content,
// //                 },
// //             });
// //             console.log("Permissions data:", res.data);
// //             setPermissionsData(res.data);
// //         } catch (err) {
// //             toast.error("Failed to load permissions");
// //             console.error("Permission fetch error:", err);
// //         }
// //     };

// //     const fetchSubAdmins = async () => {
// //         try {
// //             const res = await axios.get("/supper/fetch-subadmin", {
// //                 headers: {
// //                     'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content,
// //                 },
// //             });
// //             setSubAdmins(res.data.data);
// //         } catch (err) {
// //             toast.error("Failed to load Sub-Admins");
// //             console.error("Sub-admins fetch error:", err);
// //         }
// //     };

// //     const handleAddSubAdmin = async (newAdmin) => {
// //         try {
// //             await axios.post("/supper/add-subadmin", newAdmin, {
// //                 headers: {
// //                     'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content,
// //                 },
// //             });
// //             toast.success("Sub-Admin added!");
// //             fetchSubAdmins();
// //             setDrawerOpen(false);
// //         } catch (err) {
// //             if (err.response?.data?.errors) {
// //                 Object.values(err.response.data.errors).forEach((msg) =>
// //                     toast.error(msg[0])
// //                 );
// //             } else {
// //                 toast.error("Error adding sub-admin: " + (err.response?.data?.error || err.message));
// //             }
// //             console.error("Add sub-admin error:", err);
// //         }
// //     };

// //     const handleUpdateSubAdmin = async (updatedAdmin) => {
// //         if (!editingAdmin?.id) {
// //             toast.error("No sub-admin ID provided for update!");
// //             console.error("Missing editingAdmin.id", { editingAdmin });
// //             return;
// //         }

// //         console.log("Updating admin with ID:", editingAdmin.id, "Data:", updatedAdmin);

// //         try {
// //             await axios.put(`/supper/update-subadmin/${editingAdmin.id}`, updatedAdmin, {
// //                 headers: {
// //                     'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content,
// //                 },
// //             });
// //             toast.success("Sub-Admin updated!");
// //             fetchSubAdmins();
// //             setDrawerOpen(false);
// //             setEditingAdmin(null);
// //         } catch (err) {
// //             console.error("Update error:", err.response?.data || err.message);
// //             if (err.response?.data?.errors) {
// //                 Object.values(err.response.data.errors).forEach((msg) =>
// //                     toast.error(msg[0])
// //                 );
// //             } else {
// //                 toast.error(`Failed to update sub-admin: ${err.response?.data?.error || err.message}`);
// //             }
// //         }
// //     };

// //     const handleDelete = async (id) => {
// //         if (window.confirm("Are you sure you want to delete this sub-admin?")) {
// //             try {
// //                 await axios.delete(`/supper/delete-subadmin/${id}`, {
// //                     headers: {
// //                         'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content,
// //                     },
// //                 });
// //                 toast.success("Sub-Admin deleted!");
// //                 fetchSubAdmins();
// //             } catch (err) {
// //                 toast.error("Failed to delete sub-admin: " + (err.response?.data?.error || err.message));
// //                 console.error("Delete error:", err);
// //             }
// //         }
// //     };

// //     const handleEdit = (admin) => {
// //         console.log("Editing admin:", admin);
// //         setEditingAdmin(admin);
// //         setDrawerOpen(true);
// //     };

// //     const toggleDrawer = () => {
// //         setDrawerOpen(!isDrawerOpen);
// //         if (isDrawerOpen) setEditingAdmin(null);
// //     };

// //     const handleSort = (key) => {
// //         if (sortKey === key) {
// //             setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
// //         } else {
// //             setSortKey(key);
// //             setSortOrder("asc");
// //         }
// //     };

// //     const filteredAndSortedAdmins = [...subAdmins]
// //         .filter((admin) =>
// //             [admin.name, admin.email, admin.phone, admin.role].some((field) =>
// //                 field?.toLowerCase().includes(searchQuery.toLowerCase())
// //             )
// //         )
// //         .sort((a, b) => {
// //             const valA = a[sortKey]?.toLowerCase?.() || "";
// //             const valB = b[sortKey]?.toLowerCase?.() || "";
// //             if (valA < valB) return sortOrder === "asc" ? -1 : 1;
// //             if (valA > valB) return sortOrder === "asc" ? 1 : -1;
// //             return 0;
// //         });

// //     return (
// //         <SupperAdminLayout>
// //             <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-6">
// //                 <div className="flex justify-between items-center mb-4">
// //                     <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
// //                         Sub-Admins
// //                     </h1>
// //                     <div className="flex gap-2">
// //                         <input
// //                             type="text"
// //                             placeholder="Search..."
// //                             value={searchQuery}
// //                             onChange={(e) => setSearchQuery(e.target.value)}
// //                             className="px-4 py-2 rounded border dark:bg-gray-900 dark:border-gray-700 dark:text-white"
// //                         />
// //                         <button
// //                             onClick={toggleDrawer}
// //                             className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
// //                         >
// //                             <Plus className="w-4 h-4" />
// //                             Add User
// //                         </button>
// //                     </div>
// //                 </div>

// //                 {filteredAndSortedAdmins.length > 0 ? (
// //                     <div className="overflow-auto rounded-lg shadow border dark:border-gray-700">
// //                         <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
// //                             <thead className="bg-gray-100 dark:bg-gray-800">
// //                                 <tr>
// //                                     <th className="px-4 py-2">#</th>
// //                                     <th className="px-4 py-2">Avatar</th>
// //                                     {[
// //                                         "name",
// //                                         "email",
// //                                         "phone",
// //                                         "dob",
// //                                         "ip",
// //                                         "address",
// //                                         "role",
// //                                         "permissions",
// //                                         "modules",
// //                                     ].map((key) => (
// //                                         <th
// //                                             key={key}
// //                                             onClick={() => handleSort(key)}
// //                                             className="px-4 py-2 cursor-pointer"
// //                                         >
// //                                             {key.charAt(0).toUpperCase() + key.slice(1)}{" "}
// //                                             {sortKey === key &&
// //                                                 (sortOrder === "asc" ? "▲" : "▼")}
// //                                         </th>
// //                                     ))}
// //                                     <th className="px-4 py-2">Actions</th>
// //                                 </tr>
// //                             </thead>
// //                             <tbody className="bg-white dark:bg-gray-900">
// //                                 {filteredAndSortedAdmins.map((admin, index) => (
// //                                     <tr key={admin.id}>
// //                                         <td className="px-4 py-2">{index + 1}</td>
// //                                         <td className="px-4 py-2">
// //                                             {admin.avatar ? (
// //                                                 <img
// //                                                     src={admin.avatar}
// //                                                     className="w-10 h-10 rounded-full"
// //                                                 />
// //                                             ) : (
// //                                                 <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white">
// //                                                     {admin.name?.[0]?.toUpperCase() || "?"}
// //                                                 </div>
// //                                             )}
// //                                         </td>
// //                                         <td className="px-4 py-2">{admin.name}</td>
// //                                         <td className="px-4 py-2">{admin.email}</td>
// //                                         <td className="px-4 py-2">{admin.phone || "N/A"}</td>
// //                                         <td className="px-4 py-2">{admin.dob || "N/A"}</td>
// //                                         <td className="px-4 py-2">{admin.ip || "N/A"}</td>
// //                                         <td className="px-4 py-2">{admin.address || "N/A"}</td>
// //                                         <td className="px-4 py-2">{admin.role || "N/A"}</td>
// //                                         <td className="px-4 py-2">
// //                                             {admin.permissions || (
// //                                                 <span className="text-gray-400 italic">
// //                                                     No Permissions
// //                                                 </span>
// //                                             )}
// //                                         </td>
// //                                         <td className="px-4 py-2">
// //                                             {admin.permissions ? (
// //                                                 admin.permissions
// //                                                     .split('.')
// //                                                     .filter(Boolean)
// //                                                     .map((perm, i) => (
// //                                                         <span
// //                                                             key={i}
// //                                                             className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mr-1 dark:bg-green-900 dark:text-green-100"
// //                                                         >
// //                                                             {perm}
// //                                                         </span>
// //                                                     ))
// //                                             ) : (
// //                                                 <span className="text-gray-400 italic">
// //                                                     N/A
// //                                                 </span>
// //                                             )}
// //                                         </td>
// //                                         <td className="px-4 py-2 space-x-2">
// //                                             <button
// //                                                 onClick={() => handleEdit(admin)}
// //                                                 className="text-blue-600 hover:text-blue-800"
// //                                                 title="Edit"
// //                                             >
// //                                                 <Pencil className="w-4 h-4" />
// //                                             </button>
// //                                             <button
// //                                                 onClick={() => handleDelete(admin.id)}
// //                                                 className="text-red-600 hover:text-red-800"
// //                                                 title="Delete"
// //                                             >
// //                                                 <Trash2 className="w-4 h-4" />
// //                                             </button>
// //                                         </td>
// //                                     </tr>
// //                                 ))}
// //                             </tbody>
// //                         </table>
// //                     </div>
// //                 ) : (
// //                     <p className="text-sm text-gray-600 dark:text-gray-400">
// //                         No sub-admins found.
// //                     </p>
// //                 )}

// //                 {isDrawerOpen && (
// //                     <>
// //                         <div
// //                             onClick={toggleDrawer}
// //                             className="fixed inset-0 bg-black/40 z-40"
// //                         ></div>
// //                         <motion.div
// //                             initial={{ x: "100%" }}
// //                             animate={{ x: 0 }}
// //                             exit={{ x: "100%" }}
// //                             transition={{ duration: 0.3 }}
// //                             className="fixed top-0 right-0 w-full sm:w-[450px] h-full bg-white dark:bg-gray-900 shadow-lg z-50 overflow-y-auto"
// //                         >
// //                             <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
// //                                 <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
// //                                     {editingAdmin ? "Edit Sub-Admin" : "Add Sub-Admin"}
// //                                 </h2>
// //                                 <button
// //                                     onClick={toggleDrawer}
// //                                     className="text-gray-600 dark:text-gray-300 hover:text-red-500"
// //                                 >
// //                                     ✕
// //                                 </button>
// //                             </div>
// //                             <AddUser
// //                                 onSubmit={editingAdmin ? handleUpdateSubAdmin : handleAddSubAdmin}
// //                                 initialData={editingAdmin}
// //                                 permissionsData={permissionsData}
// //                             />
// //                         </motion.div>
// //                     </>
// //                 )}
// //             </div>
// //         </SupperAdminLayout>
// //     );
// // }



// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Plus, Pencil, Trash2 } from 'lucide-react';
// import { motion } from 'framer-motion';
// import toast from 'react-hot-toast';
// import SupperAdminLayout from '@/Layouts/SupperAdminLayout';
// import AddUser from '@/form/addUser';

// export default function AddSubAdmin() {
//     const [isDrawerOpen, setDrawerOpen] = useState(false);
//     const [subAdmins, setSubAdmins] = useState([]);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [sortKey, setSortKey] = useState('name');
//     const [sortOrder, setSortOrder] = useState('asc');
//     const [permissionsData, setPermissionsData] = useState([]);
//     const [editingAdmin, setEditingAdmin] = useState(null);

//     useEffect(() => {
//         fetchPermissions();
//         fetchSubAdmins();
//     }, []);

//     const fetchPermissions = async () => {
//         try {
//             const res = await axios.get('/supper/permission-list', {
//                 headers: { 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content },
//             });
//             console.log('Permissions data:', res.data);
//             setPermissionsData(res.data);
//         } catch (err) {
//             toast.error('Failed to load permissions');
//             console.error('Permission fetch error:', err);
//         }
//     };

//     const fetchSubAdmins = async () => {
//         try {
//             const res = await axios.get('/supper/fetch-subadmin', {
//                 headers: { 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content },
//             });
//             setSubAdmins(res.data.data);
//         } catch (err) {
//             toast.error('Failed to load Sub-Admins');
//             console.error('Sub-admins fetch error:', err);
//         }
//     };

//     const handleAddSubAdmin = async (newAdmin) => {
//         try {
//             await axios.post('/supper/add-subadmin', newAdmin, {
//                 headers: { 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content },
//             });
//             toast.success('Sub-Admin added!');
//             fetchSubAdmins();
//             setDrawerOpen(false);
//         } catch (err) {
//             if (err.response?.data?.errors) {
//                 Object.values(err.response.data.errors).forEach((msg) => toast.error(msg[0]));
//             } else {
//                 toast.error('Error adding sub-admin: ' + (err.response?.data?.error || err.message));
//             }
//             console.error('Add sub-admin error:', err);
//         }
//     };

//     const handleUpdateSubAdmin = async (updatedAdmin) => {
//         if (!editingAdmin?.id) {
//             toast.error('No sub-admin ID provided for update!');
//             console.error('Missing editingAdmin.id', { editingAdmin });
//             return;
//         }

//         console.log('Updating admin with ID:', editingAdmin.id, 'Data:', updatedAdmin);

//         try {
//             await axios.put(`/supper/update-subadmin/${editingAdmin.id}`, updatedAdmin, {
//                 headers: { 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content },
//             });
//             toast.success('Sub-Admin updated!');
//             fetchSubAdmins();
//             setDrawerOpen(false);
//             setEditingAdmin(null);
//         } catch (err) {
//             console.error('Update error:', err.response?.data || err.message);
//             if (err.response?.data?.errors) {
//                 Object.values(err.response.data.errors).forEach((msg) => toast.error(msg[0]));
//             } else {
//                 toast.error(`Failed to update sub-admin: ${err.response?.data?.error || err.message}`);
//             }
//         }
//     };

//     const handleDelete = async (id) => {
//         if (window.confirm('Are you sure you want to delete this sub-admin?')) {
//             try {
//                 await axios.delete(`/supper/delete-subadmin/${id}`, {
//                     headers: { 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content },
//                 });
//                 toast.success('Sub-Admin deleted!');
//                 fetchSubAdmins();
//             } catch (err) {
//                 toast.error('Failed to delete sub-admin: ' + (err.response?.data?.error || err.message));
//                 console.error('Delete error:', err);
//             }
//         }
//     };

//     const handleEdit = (admin) => {
//         console.log('Editing admin:', admin);
//         setEditingAdmin(admin);
//         setDrawerOpen(true);
//     };

//     const toggleDrawer = () => {
//         setDrawerOpen(!isDrawerOpen);
//         if (isDrawerOpen) setEditingAdmin(null);
//     };

//     const handleSort = (key) => {
//         if (sortKey === key) {
//             setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
//         } else {
//             setSortKey(key);
//             setSortOrder('asc');
//         }
//     };

//     const filteredAndSortedAdmins = [...subAdmins]
//         .filter((admin) =>
//             [admin.name, admin.email, admin.phone, admin.role].some((field) =>
//                 field?.toLowerCase().includes(searchQuery.toLowerCase())
//             )
//         )
//         .sort((a, b) => {
//             const valA = a[sortKey]?.toLowerCase?.() || '';
//             const valB = b[sortKey]?.toLowerCase?.() || '';
//             if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
//             if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
//             return 0;
//         });

//     return (
//         <SupperAdminLayout>
//             <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-6">
//                 <div className="flex justify-between items-center mb-4">
//                     <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Sub-Admins</h1>
//                     <div className="flex gap-2">
//                         <input
//                             type="text"
//                             placeholder="Search..."
//                             value={searchQuery}
//                             onChange={(e) => setSearchQuery(e.target.value)}
//                             className="px-4 py-2 rounded border dark:bg-gray-900 dark:border-gray-700 dark:text-white"
//                         />
//                         <button
//                             onClick={toggleDrawer}
//                             className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
//                         >
//                             <Plus className="w-4 h-4" />
//                             Add User
//                         </button>
//                     </div>
//                 </div>

//                 {filteredAndSortedAdmins.length > 0 ? (
//                     <div className="overflow-auto rounded-lg shadow border dark:border-gray-700">
//                         <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//                             <thead className="bg-gray-100 dark:bg-gray-800">
//                                 <tr>
//                                     <th className="px-4 py-2">#</th>
//                                     <th className="px-4 py-2">Avatar</th>
//                                     {['name', 'email', 'phone', 'dob', 'ip', 'address', 'role', 'permissions', 'modules'].map((key) => (
//                                         <th
//                                             key={key}
//                                             onClick={() => handleSort(key)}
//                                             className="px-4 py-2 cursor-pointer"
//                                         >
//                                             {key.charAt(0).toUpperCase() + key.slice(1)}{' '}
//                                             {sortKey === key && (sortOrder === 'asc' ? '▲' : '▼')}
//                                         </th>
//                                     ))}
//                                     <th className="px-4 py-2">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="bg-white dark:bg-gray-900">
//                                 {filteredAndSortedAdmins.map((admin, index) => (
//                                     <tr key={admin.id}>
//                                         <td className="px-4 py-2">{index + 1}</td>
//                                         <td className="px-4 py-2">
//                                             {admin.avatar ? (
//                                                 <img src={admin.avatar} className="w-10 h-10 rounded-full" />
//                                             ) : (
//                                                 <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white">
//                                                     {admin.name?.[0]?.toUpperCase() || '?'}
//                                                 </div>
//                                             )}
//                                         </td>
//                                         <td className="px-4 py-2">{admin.name}</td>
//                                         <td className="px-4 py-2">{admin.email}</td>
//                                         <td className="px-4 py-2">{admin.phone || 'N/A'}</td>
//                                         <td className="px-4 py-2">{admin.dob || 'N/A'}</td>
//                                         <td className="px-4 py-2">{admin.ip || 'N/A'}</td>
//                                         <td className="px-4 py-2">{admin.address || 'N/A'}</td>
//                                         <td className="px-4 py-2">{admin.role || 'N/A'}</td>
//                                         <td className="px-4 py-2">
//                                             {typeof admin.permissions === 'string' && admin.permissions ? (
//                                                 admin.permissions
//                                             ) : Array.isArray(admin.permissions) && admin.permissions.length > 0 ? (
//                                                 admin.permissions.join(', ')
//                                             ) : (
//                                                 <span className="text-gray-400 italic">No Permissions</span>
//                                             )}
//                                         </td>
//                                         <td className="px-4 py-2">
//                                             {typeof admin.permissions === 'string' && admin.permissions ? (
//                                                 admin.permissions
//                                                     .split('.')
//                                                     .filter(Boolean)
//                                                     .map((perm, i) => (
//                                                         <span
//                                                             key={i}
//                                                             className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mr-1 dark:bg-green-900 dark:text-green-100"
//                                                         >
//                                                             {perm}
//                                                         </span>
//                                                     ))
//                                             ) : Array.isArray(admin.permissions) && admin.permissions.length > 0 ? (
//                                                 admin.permissions.map((perm, i) => (
//                                                     <span
//                                                         key={i}
//                                                         className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mr-1 dark:bg-green-900 dark:text-green-100"
//                                                     >
//                                                         {perm}
//                                                     </span>
//                                                 ))
//                                             ) : (
//                                                 <span className="text-gray-400 italic">N/A</span>
//                                             )}
//                                         </td>
//                                         <td className="px-4 py-2 space-x-2">
//                                             <button
//                                                 onClick={() => handleEdit(admin)}
//                                                 className="text-blue-600 hover:text-blue-800"
//                                                 title="Edit"
//                                             >
//                                                 <Pencil className="w-4 h-4" />
//                                             </button>
//                                             <button
//                                                 onClick={() => handleDelete(admin.id)}
//                                                 className="text-red-600 hover:text-red-800"
//                                                 title="Delete"
//                                             >
//                                                 <Trash2 className="w-4 h-4" />
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 ) : (
//                     <p className="text-sm text-gray-600 dark:text-gray-400">No sub-admins found.</p>
//                 )}

//                 {isDrawerOpen && (
//                     <>
//                         <div onClick={toggleDrawer} className="fixed inset-0 bg-black/40 z-40"></div>
//                         <motion.div
//                             initial={{ x: '100%' }}
//                             animate={{ x: 0 }}
//                             exit={{ x: '100%' }}
//                             transition={{ duration: 0.3 }}
//                             className="fixed top-0 right-0 w-full sm:w-[450px] h-full bg-white dark:bg-gray-900 shadow-lg z-50 overflow-y-auto"
//                         >
//                             <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
//                                 <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
//                                     {editingAdmin ? 'Edit Sub-Admin' : 'Add Sub-Admin'}
//                                 </h2>
//                                 <button
//                                     onClick={toggleDrawer}
//                                     className="text-gray-600 dark:text-gray-300 hover:text-red-500"
//                                 >
//                                     ✕
//                                 </button>
//                             </div>
//                             <AddUser
//                                 onSubmit={editingAdmin ? handleUpdateSubAdmin : handleAddSubAdmin}
//                                 initialData={editingAdmin}
//                                 permissionsData={permissionsData}
//                             />
//                         </motion.div>
//                     </>
//                 )}
//             </div>
//         </SupperAdminLayout>
//     );
// }


import { useEffect, useState } from 'react';
import axios from 'axios';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import SupperAdminLayout from '@/Layouts/SupperAdminLayout';
import AddUser from '@/form/addUser';

export default function AddSubAdmin() {
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [subAdmins, setSubAdmins] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortKey, setSortKey] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [permissionsData, setPermissionsData] = useState([]);
    const [editingAdmin, setEditingAdmin] = useState(null);

    useEffect(() => {
        fetchPermissions();
        fetchSubAdmins();
    }, []);

    const fetchPermissions = async () => {
        try {
            const res = await axios.get('/supper/permission-list', {
                headers: { 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content },
            });
            console.log('Permissions data:', res.data);
            setPermissionsData(res.data);
        } catch (err) {
            toast.error('Failed to load permissions');
            console.error('Permission fetch error:', err);
        }
    };

    const fetchSubAdmins = async () => {
        try {
            const res = await axios.get('/supper/fetch-subadmin', {
                headers: { 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content },
            });
            console.log('Fetched sub-admins:', res.data.data);
            setSubAdmins(res.data.data);
        } catch (err) {
            toast.error('Failed to load Sub-Admins');
            console.error('Sub-admins fetch error:', err);
        }
    };

    const handleAddSubAdmin = async (newAdmin) => {
        try {
            console.log('Sending add sub-admin request:', newAdmin);
            const res = await axios.post('/supper/add-subadmin', newAdmin, {
                headers: { 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content },
            });
            toast.success('Sub-Admin added!');
            fetchSubAdmins();
            setDrawerOpen(false);
        } catch (err) {
            console.error('Add sub-admin error:', err.response?.data || err.message);
            if (err.response?.data?.errors) {
                Object.values(err.response.data.errors).forEach((msg) => toast.error(msg[0]));
            } else {
                toast.error('Error adding sub-admin: ' + (err.response?.data?.error || err.message));
            }
        }
    };

    const handleUpdateSubAdmin = async (updatedAdmin) => {
        if (!editingAdmin?.id) {
            toast.error('No sub-admin ID provided for update!');
            console.error('Missing editingAdmin.id', { editingAdmin });
            return;
        }

        console.log('Updating admin with ID:', editingAdmin.id, 'Data:', updatedAdmin);

        try {
            const res = await axios.put(`/supper/update-subadmin/${editingAdmin.id}`, updatedAdmin, {
                headers: { 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content },
            });
            toast.success('Sub-Admin updated!');
            fetchSubAdmins();
            setDrawerOpen(false);
            setEditingAdmin(null);
        } catch (err) {
            console.error('Update error:', err.response?.data || err.message);
            if (err.response?.data?.errors) {
                Object.values(err.response.data.errors).forEach((msg) => toast.error(msg[0]));
            } else {
                toast.error(`Failed to update sub-admin: ${err.response?.data?.error || err.message}`);
            }
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this sub-admin?')) {
            try {
                await axios.delete(`/supper/delete-subadmin/${id}`, {
                    headers: { 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content },
                });
                toast.success('Sub-Admin deleted!');
                fetchSubAdmins();
            } catch (err) {
                toast.error('Failed to delete sub-admin: ' + (err.response?.data?.error || err.message));
                console.error('Delete error:', err);
            }
        }
    };

    const handleEdit = (admin) => {
        console.log('Editing admin:', admin);
        setEditingAdmin(admin);
        setDrawerOpen(true);
    };

    const toggleDrawer = () => {
        setDrawerOpen(!isDrawerOpen);
        if (isDrawerOpen) setEditingAdmin(null);
    };

    const handleSort = (key) => {
        if (sortKey === key) {
            setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortKey(key);
            setSortOrder('asc');
        }
    };

    const filteredAndSortedAdmins = [...subAdmins]
        .filter((admin) =>
            [admin.name, admin.email, admin.phone, admin.role].some((field) =>
                field?.toLowerCase().includes(searchQuery.toLowerCase())
            )
        )
        .sort((a, b) => {
            const valA = a[sortKey]?.toLowerCase?.() || '';
            const valB = b[sortKey]?.toLowerCase?.() || '';
            if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
            if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

    return (
        <SupperAdminLayout>
            <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Sub-Admins</h1>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="px-4 py-2 rounded border dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                        />
                        <button
                            onClick={toggleDrawer}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
                        >
                            <Plus className="w-4 h-4" />
                            Add User
                        </button>
                    </div>
                </div>

                {filteredAndSortedAdmins.length > 0 ? (
                    <div className="overflow-auto rounded-lg shadow border dark:border-gray-700">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-100 dark:bg-gray-800">
                                <tr>
                                    <th className="px-4 py-2">#</th>
                                    <th className="px-4 py-2">Avatar</th>
                                    {['name', 'email', 'phone', 'dob', 'ip', 'address', 'role', 'permissions', 'modules'].map((key) => (
                                        <th
                                            key={key}
                                            onClick={() => handleSort(key)}
                                            className="px-4 py-2 cursor-pointer"
                                        >
                                            {key.charAt(0).toUpperCase() + key.slice(1)}{' '}
                                            {sortKey === key && (sortOrder === 'asc' ? '▲' : '▼')}
                                        </th>
                                    ))}
                                    <th className="px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            {/* <tbody className="bg-white dark:bg-gray-900">
                                {filteredAndSortedAdmins.map((admin, index) => (
                                    <tr key={admin.id}>
                                        <td className="px-4 py-2">{index + 1}</td>
                                        <td className="px-4 py-2">
                                            {admin.avatar ? (
                                                <img src={admin.avatar} className="w-10 h-10 rounded-full" />
                                            ) : (
                                                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white">
                                                    {admin.name?.[0]?.toUpperCase() || '?'}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-4 py-2">{admin.name}</td>
                                        <td className="px-4 py-2">{admin.email}</td>
                                        <td className="px-4 py-2">{admin.phone || 'N/A'}</td>
                                        <td className="px-4 py-2">{admin.dob || 'N/A'}</td>
                                        <td className="px-4 py-2">{admin.ip || 'N/A'}</td>
                                        <td className="px-4 py-2">{admin.address || 'N/A'}</td>
                                        <td className="px-4 py-2">{admin.role || 'N/A'}</td>
                                        <td className="px-4 py-2">
                                            {typeof admin.permissions === 'string' && admin.permissions ? (
                                                admin.permissions
                                            ) : Array.isArray(admin.permissions) && admin.permissions.length > 0 ? (
                                                admin.permissions.join(', ')
                                            ) : (
                                                <span className="text-gray-400 italic">No Permissions</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-2">
                                            {typeof admin.permissions === 'string' && admin.permissions ? (
                                                admin.permissions
                                                    .split('.')
                                                    .filter(Boolean)
                                                    .map((perm, i) => (
                                                        <span
                                                            key={i}
                                                            className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mr-1 dark:bg-green-900 dark:text-green-100"
                                                        >
                                                            {perm}
                                                        </span>
                                                    ))
                                            ) : Array.isArray(admin.permissions) && admin.permissions.length > 0 ? (
                                                admin.permissions.map((perm, i) => (
                                                    <span
                                                        key={i}
                                                        className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mr-1 dark:bg-green-900 dark:text-green-100"
                                                    >
                                                        {perm}
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="text-gray-400 italic">N/A</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-2 space-x-2">
                                            <button
                                                onClick={() => handleEdit(admin)}
                                                className="text-blue-600 hover:text-blue-800"
                                                title="Edit"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(admin.id)}
                                                className="text-red-600 hover:text-red-800"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody> */}
                            <tbody className="bg-white dark:bg-gray-900">
    {filteredAndSortedAdmins.map((admin, index) => (
        <tr key={admin.id}>
            <td className="px-4 py-2">{index + 1}</td>
            <td className="px-4 py-2">
                {admin.avatar ? (
                    <img src={admin.avatar} className="w-10 h-10 rounded-full" />
                ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white">
                        {admin.name?.[0]?.toUpperCase() || '?'}
                    </div>
                )}
            </td>
            <td className="px-4 py-2">{admin.name}</td>
            <td className="px-4 py-2">{admin.email}</td>
            <td className="px-4 py-2">{admin.phone || 'N/A'}</td>
            <td className="px-4 py-2">{admin.dob || 'N/A'}</td>
            <td className="px-4 py-2">{admin.ip || 'N/A'}</td>
            <td className="px-4 py-2">{admin.address || 'N/A'}</td>
            <td className="px-4 py-2">{admin.role || 'N/A'}</td>
            <td className="px-4 py-2">
                {typeof admin.permissions === 'string' && admin.permissions ? (
                    admin.permissions
                ) : Array.isArray(admin.permissions) && admin.permissions.length > 0 ? (
                    admin.permissions.join(', ')
                ) : (
                    <span className="text-gray-400 italic">No Permissions</span>
                )}
            </td>
            <td className="px-4 py-2">
                {typeof admin.permissions === 'string' && admin.permissions ? (
                    admin.permissions
                        .split('.')
                        .filter(Boolean)
                        .map((perm, i) => (
                            <span
                                key={i}
                                className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mr-1 dark:bg-green-900 dark:text-green-100"
                            >
                                {perm}
                            </span>
                        ))
                ) : Array.isArray(admin.permissions) && admin.permissions.length > 0 ? (
                    admin.permissions.map((perm, i) => (
                        <span
                            key={i}
                            className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mr-1 dark:bg-green-900 dark:text-green-100"
                        >
                            {perm}
                        </span>
                    ))
                ) : (
                    <span className="text-gray-400 italic">N/A</span>
                )}
            </td>

            {/* ✅ NEW: Status Column */}
            <td className="px-4 py-2">
                <span
                    className={`inline-block px-2 py-1 text-xs rounded-full ${
                        admin.status === 'active'
                            ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200'
                            : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200'
                    }`}
                >
                    {admin.status === 'active' ? 'Active' : 'Inactive'}
                </span>
            </td>

            <td className="px-4 py-2 space-x-2">
                <button
                    onClick={() => handleEdit(admin)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Edit"
                >
                    <Pencil className="w-4 h-4" />
                </button>
                <button
                    onClick={() => handleDelete(admin.id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </td>
        </tr>
    ))}
</tbody>

                        </table>
                    </div>
                ) : (
                    <p className="text-sm text-gray-600 dark:text-gray-400">No sub-admins found.</p>
                )}

                {isDrawerOpen && (
                    <>
                        <div onClick={toggleDrawer} className="fixed inset-0 bg-black/40 z-40"></div>
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ duration: 0.3 }}
                            className="fixed top-0 right-0 w-full sm:w-[450px] h-full bg-white dark:bg-gray-900 shadow-lg z-50 overflow-y-auto"
                        >
                            <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                                    {editingAdmin ? 'Edit Sub-Admin' : 'Add Sub-Admin'}
                                </h2>
                                <button
                                    onClick={toggleDrawer}
                                    className="text-gray-600 dark:text-gray-300 hover:text-red-500"
                                >
                                    ✕
                                </button>
                            </div>
                            <AddUser
                                onSubmit={editingAdmin ? handleUpdateSubAdmin : handleAddSubAdmin}
                                initialData={editingAdmin}
                                permissionsData={permissionsData}
                            />
                        </motion.div>
                    </>
                )}
            </div>
        </SupperAdminLayout>
    );
}