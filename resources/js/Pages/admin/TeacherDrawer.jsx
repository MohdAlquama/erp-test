// import React, { useState, useEffect } from 'react';
// import {
//   X, Plus, Edit2, Trash2, Eye, Search, Download, Upload
// } from 'lucide-react';
// import axiosInstance from '@/utils/axiosInstance';
// import { useBaseContext } from '@/contexts/adminContext';
// import AdminLayout from '@/Layouts/AdminLayout';

// const TeacherManagementDashboard = () => {
//   const { admin } = useBaseContext();

//   // State
//   const [teachers, setTeachers] = useState([]);
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [editingTeacher, setEditingTeacher] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterStatus, setFilterStatus] = useState('All');

//   // Form fields
//   const [teacherName, setTeacherName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [status, setStatus] = useState('Active');
//   const [selectedBatches, setSelectedBatches] = useState([]);
//   const [selectedSubjects, setSelectedSubjects] = useState([]);

//   // Data lists
//   const [batches, setBatches] = useState([]);
//   const [subjects, setSubjects] = useState([]);

//   useEffect(() => {
//     if (!admin?.id) return;

//     // Fetch teachers
//     axiosInstance.get(`/admin/${admin.id}/teachers`)
//       .then(res => setTeachers(res.data.teachers || []));

//     // Fetch batches
//     axiosInstance.get(`/admin/${admin.id}/batches`)
//       .then(res => setBatches(res.data || []));

//     // Fetch subjects
//     axiosInstance.get(`/admin/${admin.id}/subjects`)
//       .then(res => setSubjects(res.data || []));
//   }, [admin]);

//   // Reset form
//   const resetForm = () => {
//     setTeacherName('');
//     setEmail('');
//     setPassword('');
//     setStatus('Active');
//     setSelectedBatches([]);
//     setSelectedSubjects([]);
//     setEditingTeacher(null);
//   };

//   const handleEdit = (teacher) => {
//     log
//     setEditingTeacher(teacher);
//     setTeacherName(teacher.name);
//     setEmail(teacher.email);
//     setStatus(teacher.status || 'Active');
//     setSelectedBatches(teacher.batch_ids?.map(b => b.id) || []);
//     setSelectedSubjects(teacher.subject_ids?.map(s => s.id) || []);
//     setDrawerOpen(true);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Delete this teacher?')) {
//       await axiosInstance.delete(`/admin/${admin.id}/teachers/${id}`);
//       setTeachers(prev => prev.filter(t => t.id !== id));
//     }
//   };

//   const handleSubmit = async () => {
//     const payload = {
//       name: teacherName,
//       email,
//       status,
//       batch_ids: selectedBatches,
//       subject_ids: selectedSubjects,
//       ...(editingTeacher ? {} : { password }),
//     };

//     try {
//       if (editingTeacher) {
//         const res = await axiosInstance.put(`/admin/${admin.id}/teachers/${editingTeacher.id}`, payload);
//         setTeachers(prev =>
//           prev.map(t => (t.id === editingTeacher.id ? res.data.teacher : t))
//         );
//       } else {
//         const res = await axiosInstance.post(`/admin/${admin.id}/teachers`, payload);
//         setTeachers(prev => [...prev, res.data.teacher]);
//       }
//       resetForm();
//       setDrawerOpen(false);
//     } catch (error) {
//       console.error('Error saving teacher:', error);
//     }
//   };

//   const handleCheckboxChange = (id, list, setList) => {
//     if (list.includes(id)) {
//       setList(list.filter(item => item !== id));
//     } else {
//       setList([...list, id]);
//     }
//   };

//   const filteredTeachers = teachers.filter(t => {
//     const matchesSearch =
//       t.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       t.email?.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus = filterStatus === 'All' || t.status === filterStatus;
//     return matchesSearch && matchesStatus;
//   });

//   const StatusBadge = ({ status }) => (
//     <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
//       status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//     }`}>
//       {status}
//     </span>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Teacher Management</h1>
//           <p className="text-gray-600">Manage teachers and their assignments</p>
//         </div>

//         {/* Actions */}
//         <div className="bg-white p-4 rounded-lg shadow border mb-6 flex flex-wrap gap-4 justify-between items-center">
//           <div className="flex gap-3">
//             <div className="relative">
//               <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
//               <input
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 placeholder="Search..."
//                 className="pl-10 pr-4 py-2 border rounded-lg text-sm"
//               />
//             </div>
//             <select
//               value={filterStatus}
//               onChange={(e) => setFilterStatus(e.target.value)}
//               className="px-3 py-2 border rounded-lg text-sm"
//             >
//               <option value="All">All</option>
//               <option value="Active">Active</option>
//               <option value="Inactive">Inactive</option>
//             </select>
//           </div>
//           <div className="flex gap-2">
//             <button className="border px-4 py-2 text-sm rounded-lg text-gray-700 flex items-center gap-1">
//               <Download className="w-4 h-4" /> Export
//             </button>
//             <button className="border px-4 py-2 text-sm rounded-lg text-gray-700 flex items-center gap-1">
//               <Upload className="w-4 h-4" /> Import
//             </button>
//             <button
//               onClick={() => setDrawerOpen(true)}
//               className="bg-blue-600 text-white px-4 py-2 text-sm rounded-lg flex items-center gap-1"
//             >
//               <Plus className="w-4 h-4" /> Add Teacher
//             </button>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="bg-white border rounded-lg overflow-x-auto">
//           <table className="w-full table-auto">
//             <thead className="bg-gray-100 text-xs text-gray-500 uppercase tracking-wider">
//               <tr>
//                 <th className="px-6 py-3 text-left">Name</th>
//                 <th className="px-6 py-3 text-left">Email</th>
//                 <th className="px-6 py-3 text-left">Batches</th>
//                 <th className="px-6 py-3 text-left">Subjects</th>
//                 <th className="px-6 py-3 text-left">Status</th>
//                 <th className="px-6 py-3 text-left">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="text-sm divide-y">
//               {filteredTeachers.map(t => (
//                 <tr key={t.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 font-medium">{t.name}</td>
//                   <td className="px-6 py-4">{t.email}</td>
//                   <td className="px-6 py-4">{t.batch_ids}</td>
//                   <td className="px-6 py-4">{t.subject_ids}</td>
//                   <td className="px-6 py-4 space-x-1">
//                     {t.batches?.map((b, i) => (
//                       <span key={i} className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">{b.name}</span>
//                     ))}
//                   </td>
//                   <td className="px-6 py-4 space-x-1">
//                     {t.subjects?.map((s, i) => (
//                       <span key={i} className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded">{s.subject_ids}</span>
//                     ))}
//                   </td>
//                   <td className="px-6 py-4"><StatusBadge status={t.status} /></td>
//                   <td className="px-6 py-4">
//                     <div className="flex gap-2">
//                       <button className="text-gray-400 hover:text-blue-600"><Eye className="w-4 h-4" /></button>
//                       <button className="text-green-600" onClick={() => handleEdit(t)}><Edit2 className="w-4 h-4" /></button>
//                       <button className="text-red-600" onClick={() => handleDelete(t.id)}><Trash2 className="w-4 h-4" /></button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Drawer Overlay */}
//         {drawerOpen && (
//           <div
//             className="fixed inset-0 bg-black/40 z-40"
//             onClick={() => { setDrawerOpen(false); resetForm(); }}
//           />
//         )}

//         {/* Drawer */}
//         <div className={`fixed top-0 right-0 w-[400px] bg-white h-full shadow-lg z-50 transition-transform duration-300 ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
//           <div className="flex items-center justify-between p-4 border-b bg-gray-50">
//             <h2 className="text-lg font-semibold">{editingTeacher ? 'Edit' : 'Add'} Teacher</h2>
//             <button onClick={() => { setDrawerOpen(false); resetForm(); }}>
//               <X className="w-5 h-5" />
//             </button>
//           </div>
//           <div className="p-6 space-y-5 overflow-y-auto h-[calc(100%-60px)] scrollbar-thin">
//             <input
//               type="text"
//               placeholder="Name"
//               value={teacherName}
//               onChange={e => setTeacherName(e.target.value)}
//               className="w-full border px-3 py-2 rounded-lg"
//             />
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={e => setEmail(e.target.value)}
//               className="w-full border px-3 py-2 rounded-lg"
//             />
//             {!editingTeacher && (
//               <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={e => setPassword(e.target.value)}
//                 className="w-full border px-3 py-2 rounded-lg"
//               />
//             )}
//             <select
//               value={status}
//               onChange={(e) => setStatus(e.target.value)}
//               className="w-full border px-3 py-2 rounded-lg"
//             >
//               <option value="Active">Active</option>
//               <option value="Inactive">Inactive</option>
//             </select>

//             {/* Batches */}
//             <div>
//               <p className="font-medium text-sm mb-2">Assign Batches</p>
//               <div className="space-y-2 max-h-32 overflow-y-auto border p-3 rounded bg-gray-50">
//                 {batches.map(batch => (
//                   <label key={batch.id} className="flex items-center gap-2 text-sm hover:bg-gray-100 p-1 rounded">
//                     <input
//                       type="checkbox"
//                       checked={selectedBatches.includes(batch.id)}
//                       onChange={() => handleCheckboxChange(batch.id, selectedBatches, setSelectedBatches)}
//                     />
//                     <span>{batch.name}</span>
//                   </label>
//                 ))}
//               </div>
//             </div>

//             {/* Subjects */}
//             <div>
//               <p className="font-medium text-sm mb-2">Assign Subjects</p>
//               <div className="space-y-2 max-h-32 overflow-y-auto border p-3 rounded bg-gray-50">
//                 {subjects.map(subject => (
//                   <label key={subject.id} className="flex items-center gap-2 text-sm hover:bg-gray-100 p-1 rounded">
//                     <input
//                       type="checkbox"
//                       checked={selectedSubjects.includes(subject.id)}
//                       onChange={() => handleCheckboxChange(subject.id, selectedSubjects, setSelectedSubjects)}
//                     />
//                     <span>{subject.subject}</span>
//                   </label>
//                 ))}
//               </div>
//             </div>

//             {/* Actions */}
//             <div className="flex gap-3 pt-4">
//               <button
//                 className="flex-1 px-4 py-2 border text-gray-600 rounded-lg"
//                 onClick={() => { setDrawerOpen(false); resetForm(); }}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg"
//                 onClick={handleSubmit}
//               >
//                 {editingTeacher ? 'Update' : 'Add'} Teacher
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// TeacherManagementDashboard.layout = page => <AdminLayout>{page}</AdminLayout>;
// export default TeacherManagementDashboard;

import React, { useState, useEffect } from 'react';
import {
  X, Plus, Edit2, Trash2, Eye, Search, Download, Upload
} from 'lucide-react';
import axiosInstance from '@/utils/axiosInstance';
import { useBaseContext } from '@/contexts/adminContext';
import AdminLayout from '@/Layouts/AdminLayout';

const TeacherManagementDashboard = () => {
  const { admin } = useBaseContext();

  // State
  const [teachers, setTeachers] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [loading, setLoading] = useState(false);

  // Form fields
  const [teacherName, setTeacherName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('Active');
  const [selectedBatches, setSelectedBatches] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  // Data lists
  const [batches, setBatches] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    if (!admin?.id) return;
    fetchData();
  }, [admin?.id]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch all data concurrently
      const [teachersRes, batchesRes, subjectsRes] = await Promise.all([
        axiosInstance.get(`/admin/${admin.id}/teachers`),
        axiosInstance.get(`/admin/${admin.id}/batches`),
        axiosInstance.get(`/admin/${admin.id}/subjects`)
      ]);

      setTeachers(teachersRes.data.teachers || []);
      setBatches(batchesRes.data.batches || batchesRes.data || []);
      setSubjects(subjectsRes.data.subjects || subjectsRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setTeachers([]);
      setBatches([]);
      setSubjects([]);
    } finally {
      setLoading(false);
    }
  };

  // Helper functions to get names from IDs
  const getBatchName = (batchId) => {
    const batch = batches.find(b => b.id == batchId);
    return batch ? batch.name : `Batch ${batchId}`;
  };

  const getSubjectName = (subjectId) => {
    const subject = subjects.find(s => s.id == subjectId);
    return subject ? (subject.subject || subject.name) : `Subject ${subjectId}`;
  };

  // Reset form
  const resetForm = () => {
    setTeacherName('');
    setEmail('');
    setPassword('');
    setStatus('Active');
    setSelectedBatches([]);
    setSelectedSubjects([]);
    setEditingTeacher(null);
  };

  const handleEdit = (teacher) => {
    console.log('Editing teacher:', teacher);
    
    setEditingTeacher(teacher);
    setTeacherName(teacher.name || '');
    setEmail(teacher.email || '');
    setStatus(teacher.status || 'Active');
    
    // Handle batch_ids - ensure they are numbers for comparison
    setSelectedBatches((teacher.batch_ids || []).map(id => Number(id)));
    
    // Handle subject_ids - ensure they are numbers for comparison
    setSelectedSubjects((teacher.subject_ids || []).map(id => Number(id)));
    
    setDrawerOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      try {
        await axiosInstance.delete(`/admin/${admin.id}/teachers/${id}`);
        setTeachers(prev => prev.filter(t => t.id !== id));
      } catch (error) {
        console.error('Error deleting teacher:', error);
        alert('Failed to delete teacher');
      }
    }
  };

  const handleSubmit = async () => {
    if (!teacherName.trim() || !email.trim()) {
      alert('Please fill in required fields');
      return;
    }

    if (!editingTeacher && !password.trim()) {
      alert('Password is required for new teachers');
      return;
    }

    const payload = {
      name: teacherName.trim(),
      email: email.trim(),
      status,
      batch_ids: selectedBatches,
      subject_ids: selectedSubjects,
    };

    // Only include password for new teachers
    if (!editingTeacher && password.trim()) {
      payload.password = password.trim();
    }

    try {
      setLoading(true);
      
      if (editingTeacher) {
        const res = await axiosInstance.put(`/admin/${admin.id}/teachers/${editingTeacher.id}`, payload);
        setTeachers(prev =>
          prev.map(t => (t.id === editingTeacher.id ? res.data.teacher : t))
        );
      } else {
        const res = await axiosInstance.post(`/admin/${admin.id}/teachers`, payload);
        setTeachers(prev => [...prev, res.data.teacher]);
      }
      
      resetForm();
      setDrawerOpen(false);
    } catch (error) {
      console.error('Error saving teacher:', error);
      alert('Failed to save teacher');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (id, list, setList) => {
    const numId = Number(id);
    if (list.includes(numId)) {
      setList(list.filter(item => item !== numId));
    } else {
      setList([...list, numId]);
    }
  };

  const filteredTeachers = (teachers || []).filter(t => {
    const matchesSearch =
      t.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || t.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const StatusBadge = ({ status }) => (
    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
      status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
    }`}>
      {status}
    </span>
  );

  return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Teacher Management</h1>
            <p className="text-gray-600">Manage teachers and their assignments</p>
          </div>

          {/* Actions */}
          <div className="bg-white p-4 rounded-lg shadow border mb-6 flex flex-wrap gap-4 justify-between items-center">
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search teachers..."
                  className="pl-10 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button className="border px-4 py-2 text-sm rounded-lg text-gray-700 flex items-center gap-1 hover:bg-gray-50">
                <Download className="w-4 h-4" /> Export
              </button>
              <button className="border px-4 py-2 text-sm rounded-lg text-gray-700 flex items-center gap-1 hover:bg-gray-50">
                <Upload className="w-4 h-4" /> Import
              </button>
              <button
                onClick={() => {
                  resetForm();
                  setDrawerOpen(true);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm rounded-lg flex items-center gap-1"
              >
                <Plus className="w-4 h-4" /> Add Teacher
              </button>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="bg-white p-8 rounded-lg shadow border text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading...</p>
            </div>
          )}

          {/* Table */}
          {!loading && (
            <div className="bg-white border rounded-lg overflow-hidden shadow">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batches</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subjects</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredTeachers.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                          <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                              <Search className="w-6 h-6 text-gray-400" />
                            </div>
                            {searchTerm || filterStatus !== 'All' ? 
                              'No teachers match your search criteria' : 
                              'No teachers found. Add your first teacher to get started.'
                            }
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredTeachers.map(teacher => (
                        <tr key={teacher.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{teacher.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                            {teacher.email}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-1">
                              {(teacher.batch_ids || []).map((batchId, i) => (
                                <span 
                                  key={i} 
                                  className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                                >
                                  {getBatchName(batchId)}
                                </span>
                              ))}
                              {(!teacher.batch_ids || teacher.batch_ids.length === 0) && (
                                <span className="text-gray-400 text-sm">No batches assigned</span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-1">
                              {(teacher.subject_ids || []).map((subjectId, i) => (
                                <span 
                                  key={i} 
                                  className="inline-flex px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full"
                                >
                                  {getSubjectName(subjectId)}
                                </span>
                              ))}
                              {(!teacher.subject_ids || teacher.subject_ids.length === 0) && (
                                <span className="text-gray-400 text-sm">No subjects assigned</span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <StatusBadge status={teacher.status} />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex gap-2">
                              <button 
                                className="text-gray-400 hover:text-blue-600 transition-colors"
                                title="View Details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button 
                                className="text-gray-400 hover:text-green-600 transition-colors" 
                                onClick={() => handleEdit(teacher)}
                                title="Edit Teacher"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button 
                                className="text-gray-400 hover:text-red-600 transition-colors" 
                                onClick={() => handleDelete(teacher.id)}
                                title="Delete Teacher"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Drawer Overlay */}
          {drawerOpen && (
            <div
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => { setDrawerOpen(false); resetForm(); }}
            />
          )}

          {/* Drawer */}
          <div className={`fixed top-0 right-0 w-[400px] bg-white h-full shadow-xl z-50 transition-transform duration-300 ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex items-center justify-between p-4 border-b bg-gray-50">
              <h2 className="text-lg font-semibold">
                {editingTeacher ? 'Edit Teacher' : 'Add New Teacher'}
              </h2>
              <button 
                onClick={() => { setDrawerOpen(false); resetForm(); }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-5 overflow-y-auto h-[calc(100%-80px)]">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="Enter teacher name"
                  value={teacherName}
                  onChange={e => setTeacherName(e.target.value)}
                  className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="teacher@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {!editingTeacher && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password *
                  </label>
                  <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              {/* Batches */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assign Batches
                </label>
                <div className="space-y-2 max-h-40 overflow-y-auto border p-3 rounded-lg bg-gray-50">
                  {(batches || []).length === 0 ? (
                    <p className="text-gray-500 text-sm">No batches available</p>
                  ) : (
                    batches.map(batch => (
                      <label key={batch.id} className="flex items-center gap-2 text-sm hover:bg-gray-100 p-1 rounded cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedBatches.includes(Number(batch.id))}
                          onChange={() => handleCheckboxChange(batch.id, selectedBatches, setSelectedBatches)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span>{batch.name}</span>
                      </label>
                    ))
                  )}
                </div>
              </div>

              {/* Subjects */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assign Subjects
                </label>
                <div className="space-y-2 max-h-40 overflow-y-auto border p-3 rounded-lg bg-gray-50">
                  {(subjects || []).length === 0 ? (
                    <p className="text-gray-500 text-sm">No subjects available</p>
                  ) : (
                    subjects.map(subject => (
                      <label key={subject.id} className="flex items-center gap-2 text-sm hover:bg-gray-100 p-1 rounded cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedSubjects.includes(Number(subject.id))}
                          onChange={() => handleCheckboxChange(subject.id, selectedSubjects, setSelectedSubjects)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span>{subject.subject || subject.name}</span>
                      </label>
                    ))
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t">
                <button
                  className="flex-1 px-4 py-2 border text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => { setDrawerOpen(false); resetForm(); }}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                  onClick={handleSubmit}
                  disabled={loading || !teacherName.trim() || !email.trim() || (!editingTeacher && !password.trim())}
                >
                  {loading ? 'Saving...' : (editingTeacher ? 'Update Teacher' : 'Add Teacher')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};
 TeacherManagementDashboard.layout = page => <AdminLayout>{page}</AdminLayout>;

export default TeacherManagementDashboard;