import React, { useState, useEffect } from 'react';
import { X, Plus, Edit2, Trash2 } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useBaseContext } from '@/contexts/adminContext';
import axiosInstance from '@/utils/axiosInstance';

const StudentManagementDashboard = () => {
  const { admin } = useBaseContext();
  const isAdmin = true;

  // State for students
  const [students, setStudents] = useState([
 {}
  ]);

  // State for batches, teachers, and subjects
  const [batches, setBatches] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [profileImage, setProfileImage] = useState(null);
const [formData, setFormData] = useState({
  name: '',
  email: '',
  enrollment_number: '',
  contact_number: '',
  password: '',
  status: 'Active',
  batch_ids: '',
  subject_ids: [],
  teacher_ids: [],
  dob: '',       // Add DOB (string, format YYYY-MM-DD)
  gender: '',    // Add gender (string)
  session: '',
  father_name: '',
    profile_image: null,
});

  const [editingStudent, setEditingStudent] = useState(null);
useEffect(() => {
  if (!admin?.id) return;

  axiosInstance
    .get(`admin/${admin.id}/students`)
    .then((res) => {setStudents(res.data.data)
    console.log(res.data.data);
    
    }
  )
    .catch((err) => console.error('Error fetching students:', err));
}, [admin]);
  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [teachersResponse, batchesResponse, subjectsResponse] = await Promise.all([
          axiosInstance.get(`/admin/${admin.id}/teachers`),
          axiosInstance.get(`/admin/${admin.id}/batches`),
          axiosInstance.get(`/admin/${admin.id}/subjects`),
        ]);
        setTeachers(teachersResponse.data.teachers);
        setBatches(batchesResponse.data);
        setSubjects(subjectsResponse.data);
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    };
    if (admin.id) {
      fetchData();
    }
  }, [admin.id]);

  // Form handling functions
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiSelectChange = (e, field) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const currentValues = prev[field] || [];
      if (checked) {
        // Add the value if checked
        return { ...prev, [field]: [...currentValues, value] };
      } else {
        // Remove the value if unchecked
        return { ...prev, [field]: currentValues.filter((id) => id !== value) };
      }
    });
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.enrollment_number) {
      alert('Name, Email, and Enrollment Number are required');
      return false;
    }
    if (formData.contact_number && !/^\d{10}$/.test(formData.contact_number)) {
      alert('Contact number must be a valid 10-digit number');
      return false;
    }
    if (formData.dob === '') {
  alert('Date of Birth is required');
  return false;
}

if (formData.gender === '') {
  alert('Please select a gender');
  return false;
}

    return true;
  };

const handleSubmit = async () => {
    if (!validateForm()) return;
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('admin_id', admin.id);
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('enrollment_number', formData.enrollment_number);
      formDataToSend.append('contact_number', formData.contact_number);
      formDataToSend.append('status', formData.status);
      formDataToSend.append('session', formData.session || '');
      formDataToSend.append('father_name', formData.father_name || '');
      formDataToSend.append('dob', formData.dob || '');
      formDataToSend.append('gender', formData.gender || '');
            formDataToSend.append('batch_ids',formData.batch_ids || '');

      // (formData.batch_ids || []).forEach((id) => {
      //   formDataToSend.append('batch_ids[]', id);
      // });
     
      
      if (!editingStudent && formData.password) {
        formDataToSend.append('password', formData.password);
      }
      if (profileImage) {
        formDataToSend.append('profile_image', profileImage);
      }

      let response;
      if (editingStudent) {
        formDataToSend.append('_method', 'PUT');
        response = await axiosInstance.post(
          `/admin/students/${editingStudent.id}`,
          formDataToSend,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
      } else {
        response = await axiosInstance.post(
          '/admin/student',
          formDataToSend,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
      }

      if (editingStudent) {
        setStudents((prev) =>
          prev.map((s) => (s.id === editingStudent.id ? response.data.data : s))
        );
      } else {
        setStudents((prev) => [...prev, response.data.data]);
      }
      setDrawerOpen(false);
      handleClose();
    } catch (error) {
      console.error('Error saving student:', error.response?.data || error);
      alert(error.response?.data.message || 'Failed to save student');
    }
  };


const handleEdit = (student) => {

    setEditingStudent(student);
    const batchId = student.batch_id && batches.find((b) => b.id === student.batch_id)
      ? student.batch_id.toString()
      : '';
    setFormData({
      profile_image:student.profile_image,
      name: student.name || '',
      father_name: student.father_name || '',
      email: student.email || '',
      enrollment_number: student.enrollment_number || '',
      contact_number: student.contact_number || '',
      session: student.session || '',
      dob: student.dob || '',
      gender: student.gender || '',
      password: '',
      status: student.status || 'Active',
      batch_ids: batchId,
     
    });
    setProfileImage(null);
    setDrawerOpen(true);
  };


  

  
  


const handleDelete = async (studentId, enrollmentNumber) => {
  if (!window.confirm('Are you sure you want to delete this student?')) return;

  try {
    await axiosInstance.delete(`/admin/${admin.id}/students/${studentId}`, {
      data: { enrollment_number: enrollmentNumber },
    });
    setStudents(prev => prev.filter(s => s.id !== studentId));
    alert('Student deleted successfully');
  } catch (error) {
    console.error('Failed to delete student:', error.response?.data || error);
    alert(error.response?.data.message || 'Failed to delete student');
  }
};


  const handleClose = () => {
    setDrawerOpen(false);
    setEditingStudent(null);
    setFormData({

      name: '',
      email: '',
      enrollment_number: '',
      contact_number: '',
      password: '',
      status: 'Active',
      batch_ids: [],
      session:'',
      father_name:''
    });
  };

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.enrollment_number?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || s.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const StatusBadge = ({ status }) => (
    <span
      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
        status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}
    >
      {status}
    </span>
  );

  return (
    <div className="p-4">
      {/* Loading and Error States */}
      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="text-center text-red-600">{error}</div>}
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Student Management</h2>
        {isAdmin && (
          <button
            onClick={() => setDrawerOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-1"
            disabled={loading}
          >
            <Plus size={16} />
            Add Student
          </button>
        )}
      </div>
      {/* Search & Filter */}
      <div className="flex gap-3 mb-4">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name, email, or enrollment..."
          className="p-2 border rounded"
          disabled={loading}
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-2 border rounded"
          disabled={loading}
        >
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow border">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">img</th>

                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">id</th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Enrollment No.</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Batches</th>
              {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subjects</th> */}
              {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Teachers</th> */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              {isAdmin && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredStudents.map((s) => (
              <tr key={s.id}>
                


               <td className="px-4 py-4 min-w-0">
{s.profile_image ? (
    <img
      src={
        s.profile_image.startsWith('http')
          ? s.profile_image
          : `http://127.0.0.1:8000/storage/${s.profile_image.replace('public/storage/', '')}`
      }
      alt={`${s.name}'s profile`}
      className="w-10 h-10 rounded-full object-cover"
      onError={(e) => {
        console.error(`Failed to load image: ${s.profile_image}`);
        e.target.src = 'https://via.placeholder.com/40';
      }}
    />
  ) : (
    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
      No Image
    </div>
  )}
</td>      <td className="px-6 py-4">{s.id}</td>

                <td className="px-6 py-4">{s.name}</td>
                <td className="px-6 py-4">{s.email}</td>
                <td className="px-6 py-4">{s.enrollment_number}</td>
                <td className="px-6 py-4">{s.contact_number || '-'}</td>
                <td className="px-6 py-4 space-x-1">    {(() => {
    const batch = batches.find((b) => b.id === s.batch_ids);
    return batch ? batch.name : "Unknown";
  })()}



                  {/* {s.batch_ids?.map((id, i) => {
                    const batch = batches.find((b) => b.id === parseInt(id));
                    return (
                      <span key={i} className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                        {batch?.name || id}
                      </span>
                    );
                  })} */}
                </td>
                {/* <td className="px-6 py-4 space-x-1">
                  {s.subject_ids?.map((id, i) => {
                    const subject = subjects.find((sub) => sub.id === parseInt(id));
                    return (
                      <span key={i} className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded">
                        {subject?.subject || id}
                      </span>
                    );
                  })}
                </td> */}
                {/* <td className="px-6 py-4 space-x-1">
                  {s.teacher_ids?.map((id, i) => {
                    const teacher = teachers.find((t) => t.id === parseInt(id));
                    return (
                      <span key={i} className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                        {teacher?.name || id}
                      </span>
                    );
                  })}
                </td> */}
                <td className="px-6 py-4">
                  <StatusBadge status={s.status} />
                </td>
                {isAdmin && (
                  <td className="px-6 py-4 space-x-2">
                    <button onClick={() => handleEdit(s)} className="text-blue-600 hover:text-blue-900">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(s.id, s.enrollment_number)}className="text-red-600 hover:text-red-900">
                      <Trash2 size={16} />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Drawer */}
      {drawerOpen && isAdmin && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 flex justify-end z-50"
          onClick={handleClose}
        >
          <div
            className="w-full max-w-md bg-white h-full p-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">{editingStudent ? 'Edit Student' : 'Add Student'}</h3>
              <button onClick={handleClose}>
                <X />
              </button>
            </div>
            <div className="space-y-4">
             <input
                type="file"
                accept="image/*"
                onChange={(e) => setProfileImage(e.target.files[0])}
                className="w-full p-2 border rounded text-sm"
              />
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              /> 
               <input
                type="text"
                name="father_name"
                placeholder="father_name"
                value={formData.father_name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
              {/* Date of Birth */}
<input
  type="date"
  name="dob"
  placeholder="Date of Birth"
  value={formData.dob}
  onChange={handleInputChange}
  className="w-full p-2 border rounded"
/>

{/* Gender select */}
<select
  name="gender"
  value={formData.gender}
  onChange={handleInputChange}
  className="w-full p-2 border rounded"
>
  <option value="">Select Gender</option>
  <option value="Male">Male</option>
  <option value="Female">Female</option>
  <option value="Other">Other</option>
</select>

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
              {!editingStudent && (
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              )}
              <input
                type="text"
                name="enrollment_number"
                placeholder="Enrollment Number"
                value={formData.enrollment_number}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
          <input
  type="number"
  name="session"  // lowercase, matches state key
  placeholder="Session Number"
  value={formData.session}
  onChange={handleInputChange}
  className="w-full p-2 border rounded"
/>

              <input
                type="text"
                name="contact_number"
                placeholder="Contact Number"
                value={formData.contact_number}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              {/* Batches Checkboxes */}
              <div>
                <label className="block mb-1 text-sm font-medium">Batches</label>
                <div className="space-y-2 max-h-32 overflow-y-auto p-2 border rounded">
                  {batches.map((batch) => (
                    <label key={batch.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        value={batch.id.toString()}
                        checked={formData.batch_ids.includes(batch.id.toString())}
                        onChange={(e) => handleMultiSelectChange(e, 'batch_ids')}
                        disabled={loading}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                      <span>{batch.name}</span>
                    </label>
                  ))}
                  {batches.length === 0 && !loading && (
                    <p className="text-sm text-red-600">No batches available</p>
                  )}
                </div>
              </div>
              {/* Subjects Checkboxes */}
              {/* <div>
                <label className="block mb-1 text-sm font-medium">Subjects</label>
                <div className="space-y-2 max-h-32 overflow-y-auto p-2 border rounded">
                  {subjects.map((subject) => (
                    <label key={subject.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        value={subject.id.toString()}
                        checked={formData.subject_ids.includes(subject.id.toString())}
                        onChange={(e) => handleMultiSelectChange(e, 'subject_ids')}
                        disabled={loading}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                      <span>{subject.subject}</span>
                    </label>
                  ))}
                  {subjects.length === 0 && !loading && (
                    <p className="text-sm text-red-600">No subjects available</p>
                  )}
                </div>
              </div> */}
              {/* Teachers Checkboxes */}
              {/* <div>
                <label className="block mb-1 text-sm font-medium">Teachers</label>
                <div className="space-y-2 max-h-32 overflow-y-auto p-2 border rounded">
                  {teachers.map((teacher) => (
                    <label key={teacher.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        value={teacher.id.toString()}
                        checked={formData.teacher_ids.includes(teacher.id.toString())}
                        onChange={(e) => handleMultiSelectChange(e, 'teacher_ids')}
                        disabled={loading}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                      <span>{teacher.name}</span>
                    </label>
                  ))}
                  {teachers.length === 0 && !loading && (
                    <p className="text-sm text-red-600">No teachers available</p>
                  )}
                </div>
              </div> */}
              <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white w-full py-2 rounded"
                disabled={loading}
              >
                {editingStudent ? 'Update Student' : 'Add Student'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentManagementDashboard;

StudentManagementDashboard.layout = (page) => (
  <AdminLayout>{page}</AdminLayout>
);
