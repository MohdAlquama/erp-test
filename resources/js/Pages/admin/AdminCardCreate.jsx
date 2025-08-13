import AdminLayout from '@/Layouts/AdminLayout';
import React, { useState, useEffect } from 'react';
import { Plus, PlusCircle, Users } from 'lucide-react';
import axiosInstance from '@/utils/axiosInstance';
import { useBaseContext } from '@/contexts/adminContext';
import AdminCardTable from './AdminCardTable';

function AdminCardCreate() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedBatch, setSelectedBatch] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [batches, setBatches] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [classRooms, setClassRooms] = useState([]);
  const [students, setStudents] = useState([]);

  const [selectedRooms, setSelectedRooms] = useState([]);
  const [autoAssignedRooms, setAutoAssignedRooms] = useState([]);

  const [batchWillStored, setBatchWillStored] = useState(0);
  const [studentsInBatch, setStudentsInBatch] = useState(0);
  const [selectedTeachers, setSelectedTeachers] = useState([]);

  const [showNewBatchInput, setShowNewBatchInput] = useState(false);
  const [formData, setFormData] = useState({
    collegeName: '',
    collegeLocation: '',
    subjectName: '',
    date: '',
    time: ''
  });

  const [previewData, setPreviewData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editBuffer, setEditBuffer] = useState(null);

  const { admin } = useBaseContext();

  const resetForm = () => {
    setSelectedBatch('');
    setFormData({
      collegeName: '',
      collegeLocation: '',
      subjectName: '',
      date: '',
      time: ''
    });
    setShowNewBatchInput(false);
    setSelectedRooms([]);
    setAutoAssignedRooms([]);
    setSelectedTeachers([]);
    setPreviewData([]);
    setStudentsInBatch(0);
    setBatchWillStored(0);
    setEditingIndex(null);
    setEditBuffer(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [
          teachersResponse,
          batchesResponse,
          subjectsResponse,
          classRoomResponse,
          studentResponse
        ] = await Promise.all([
          axiosInstance.get(`/admin/${admin.id}/teachers`),
          axiosInstance.get(`/admin/${admin.id}/batches`),
          axiosInstance.get(`/admin/${admin.id}/subjects`),
          axiosInstance.get(`/admin/${admin.id}/class-rooms`),
          axiosInstance.get(`/admin/${admin.id}/students`)
        ]);

        setTeachers(
          teachersResponse.data.teachers?.data ||
          teachersResponse.data.teachers ||
          teachersResponse.data ||
          []
        );
        setBatches(
          batchesResponse.data.batches?.data ||
          batchesResponse.data.batches ||
          batchesResponse.data ||
          []
        );
        setSubjects(
          subjectsResponse.data.subjects?.data ||
          subjectsResponse.data.subjects ||
          subjectsResponse.data ||
          []
        );
        setClassRooms(
          classRoomResponse.data.class_rooms?.data ||
          classRoomResponse.data.class_rooms ||
          classRoomResponse.data ||
          []
        );
        setStudents(
          studentResponse.data.students?.data ||
          studentResponse.data.students ||
          studentResponse.data ||
          []
        );
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (admin?.id) fetchData();
  }, [admin?.id]);

  // --- Utility: auto-assign rooms based on capacities ---
  const autoAssignRooms = (studentCount) => {
    if (!classRooms?.rooms || classRooms.rooms.length === 0) return [];

    // copy and sort by capacity descending
    const availableRooms = [...classRooms.rooms].sort((a, b) => parseInt(b.room_type) - parseInt(a.room_type));
    const assigned = [];
    let remaining = studentCount;

    for (const r of availableRooms) {
      if (remaining <= 0) break;
      const cap = parseInt(r.room_type) || 0;
      if (cap > 0) {
        assigned.push({
          ...r,
          assignedStudents: Math.min(remaining, cap)
        });
        remaining -= cap;
      }
    }
    return assigned;
  };

  // --- Distribute students to rooms based on assignedStudents ---
  const distributeRooms = (studentsArr, rooms) => {
    const result = [];
    let studentIndex = 0;

    rooms.forEach(room => {
      const numAssigned = room.assignedStudents || 0;
      for (let i = 0; i < numAssigned && studentIndex < studentsArr.length; i++) {
        result.push({ student: studentsArr[studentIndex], room });
        studentIndex++;
      }
    });

    // Assign null room if any students remain unassigned due to capacity shortfall
    while (studentIndex < studentsArr.length) {
      result.push({ student: studentsArr[studentIndex], room: null });
      studentIndex++;
    }

    return result;
  };

  // --- When batch changes: compute students count and auto rooms ---
  const handleBatchChange = (e) => {
    const batchId = Number(e.target.value);
    setBatchWillStored(batchId);
    setSelectedBatch(batchId);

    if (batchId > 0 && Array.isArray(students.data)) {
      const count = students.data.filter(s => s.batch_ids.includes(String(batchId))).length;
      setStudentsInBatch(count);

      const rooms = autoAssignRooms(count);
      setAutoAssignedRooms(rooms);
      setSelectedRooms(rooms.map(r => r.id));
    } else {
      setStudentsInBatch(0);
      setAutoAssignedRooms([]);
      setSelectedRooms([]);
    }

    setPreviewData([]);
    setEditingIndex(null);
    setEditBuffer(null);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // --- Teacher auto assignment (round-robin) ---
  const assignTeachersToStudents = (studentsArr, teachersArr) => {
    if (!Array.isArray(studentsArr)) return [];
    if (!Array.isArray(teachersArr) || teachersArr.length === 0) {
      return studentsArr.map(s => ({ ...s, teacher_name: null, teacher_id: null }));
    }
    const out = [];
    let tIndex = 0;
    for (let i = 0; i < studentsArr.length; i++) {
      const teacher = teachersArr[tIndex];
      out.push({
        ...studentsArr[i],
        teacher_name: teacher?.name || '',
        teacher_id: teacher?.id || null
      });
      tIndex = (tIndex + 1) % teachersArr.length;
    }
    return out;
  };

  // --- Build preview rows (populate previewData) ---
  const buildPreview = () => {
    if (!batchWillStored) {
      setError('Select a batch first.');
      return;
    }

    const batchObj = batches.find(b => b.id === batchWillStored);

    const studentsInSelected = Array.isArray(students.data)
      ? students.data.filter(s => s.batch_ids.includes(String(batchWillStored)))
      : [];

    const selectedTeacherObjs = teachers.filter(t => selectedTeachers.includes(t.id));

    const assignedStudents = assignTeachersToStudents(studentsInSelected, selectedTeacherObjs);

    // Distribute room assignments per capacity
    const distributed = distributeRooms(assignedStudents, autoAssignedRooms);

    const rows = distributed.map(({ student, room }) => ({
      student_id: student.id || null,
      student_name: student.name || student.full_name || '',
      teacher_id: student.teacher_id || null,
      teacher_name: student.teacher_name || null,
      class_id: batchObj?.id || null,
      class_name: batchObj?.name || batchObj?.title || '',
      college_name: formData.collegeName,
      college_location: formData.collegeLocation,
      subject_name: formData.subjectName,
      date: formData.date,
      time: formData.time,
      room_id: room?.id || null
    }));

    setPreviewData(rows);
    setEditingIndex(null);
    setEditBuffer(null);
  };

  // --- Table CRUD handlers ---
  const handleStartEdit = (index) => {
    setEditingIndex(index);
    setEditBuffer({ ...previewData[index] });
  };

  const handleEditChange = (field, value) => {
    setEditBuffer(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveEdit = (index) => {
    const newRows = previewData.map((r, i) => i === index ? { ...editBuffer } : r);
    setPreviewData(newRows);
    setEditingIndex(null);
    setEditBuffer(null);
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditBuffer(null);
  };

  const handleDeleteRow = (index) => {
    const newRows = previewData.filter((_, i) => i !== index);
    setPreviewData(newRows);
    if (editingIndex === index) handleCancelEdit();
  };

  // manual add single mapping (optional)
  const handleAddSingle = () => {
    if (!batchWillStored) {
      setError('Select a batch first');
      return;
    }
    const batchObj = batches.find(b => b.id === batchWillStored);
    const newRow = {
      student_id: null,
      student_name: 'NEW STUDENT',
      teacher_id: selectedTeachers[0] || null,
      teacher_name: (teachers.find(t => t.id === (selectedTeachers[0] || null)) || {}).name || '',
      class_id: batchObj?.id || null,
      class_name: batchObj?.name || '',
      college_name: formData.collegeName,
      college_location: formData.collegeLocation,
      subject_name: formData.subjectName,
      date: formData.date,
      time: formData.time,
      room_id: selectedRooms[0] || null
    };
    setPreviewData(prev => [...prev, newRow]);
  };

  // --- Final create object + submit ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const roomsData = autoAssignedRooms.map(r => ({
        id: r.id,
        room_name: r.room_name,
        room_type: r.room_type,
        assigned_students: r.assignedStudents
      }));

      const selectedBatchData = batches.find(b => b.id === batchWillStored);

      const finalStudents = previewData.map(r => ({
        student_id: r.student_id,
        student_name: r.student_name,
        teacher_id: r.teacher_id,
        teacher_name: r.teacher_name,
        class_id: r.class_id,
        class_name: r.class_name,
        college_name: r.college_name,
        college_location: r.college_location,
        subject_name: r.subject_name,
        date: r.date,
        time: r.time,
        room_id: r.room_id
      }));

      const fullObject = {
        admin_id: admin.id,
        admin_data: {

          id: admin.id,
          name: admin.name,
          email: admin.email,
          'status':'active'
          
        },
        batch_data: selectedBatchData,
        students_data: finalStudents,
        rooms_data: roomsData,
        total_students: finalStudents.length,
        total_rooms_assigned: roomsData.length,
        created_at: new Date().toISOString()
      };

      console.log('Final Admin Card Object:', fullObject);

      await axiosInstance.post(`/admin/${admin.id}/admin-cards`, fullObject);

      setTimeout(() => {
        setLoading(false);
        setDrawerOpen(false);
        alert('Admin Card created successfully!');
        resetForm();
      }, 800);

    } catch (err) {
      console.error(err);
      setError('Failed to create admin card. See console for details.');
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
          {error && <div className="mb-4 text-red-500">{error}</div>}


      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Design your Admin Card</h1>
        <button
          onClick={() => {
            resetForm();
            setDrawerOpen(true);
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-indigo-700"
          disabled={loading}
        >
          <Plus className="w-4 h-4" />
          Create Admin Card
        </button>
      </div>
       <AdminCardTable/>
      
      {drawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setDrawerOpen(false)}
          ></div>

          <div className="absolute right-0 top-0 h-full w-11/12 md:w-3/5 lg:w-1/2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-lg overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Create Admin Card</h2>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  Close
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Batch Select */}
                <div className="mb-4">
                  <label className="flex items-center gap-2 mb-1">
                    <Users size={18} /> Batch
                  </label>
                  <select
                    value={selectedBatch}
                    onChange={handleBatchChange}
                    className="w-full border rounded p-2 bg-white dark:bg-gray-700"
                    required
                  >
                    <option value="">-- Select Batch --</option>
                    {batches.map(batch => (
                      <option key={batch.id} value={batch.id}>
                        {batch.name} {batch.grade ? `(${batch.grade})` : ''}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Students count */}
                {studentsInBatch > 0 && (
                  <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900 rounded">
                    <p className="text-sm font-semibold">Students in batch: {studentsInBatch}</p>
                  </div>
                )}

                {/* Auto-assigned Rooms */}
                {autoAssignedRooms.length > 0 && (
                  <div className="mb-4 p-3 bg-green-50 dark:bg-green-900 rounded">
                    <h4 className="font-semibold mb-2">Auto-assigned Rooms</h4>
                    {autoAssignedRooms.map((room, i) => (
                      <div key={i} className="text-sm mb-1">
                        <span className="font-medium">{room.room_name}</span> (Capacity: {room.room_type}) — Assigned: {room.assignedStudents}
                      </div>
                    ))}
                  </div>
                )}

                {/* Toggle details */}
                <div
                  className="flex items-center gap-2 mt-2 cursor-pointer text-indigo-600 hover:text-indigo-800"
                  onClick={() => setShowNewBatchInput(prev => !prev)}
                >
                  <PlusCircle />
                  <span>{showNewBatchInput ? 'Hide Details' : 'Add Details'}</span>
                </div>

                {/* Details */}
                {showNewBatchInput && (
                  <div className="mt-4 space-y-3">
                    <input
                      placeholder="College name"
                      className="border rounded p-2 w-full bg-white dark:bg-gray-700"
                      value={formData.collegeName}
                      onChange={(e) => handleInputChange('collegeName', e.target.value)}
                      required
                    />
                    <input
                      placeholder="College location"
                      className="border rounded p-2 w-full bg-white dark:bg-gray-700"
                      value={formData.collegeLocation}
                      onChange={(e) => handleInputChange('collegeLocation', e.target.value)}
                      required
                    />
                    <input
                      placeholder="Subject name"
                      type="text"
                      className="border rounded p-2 w-full bg-white dark:bg-gray-700"
                      value={formData.subjectName}
                      onChange={(e) => handleInputChange('subjectName', e.target.value)}
                      required
                    />
                    <input
                      placeholder="Date"
                      type="date"
                      className="border rounded p-2 w-full bg-white dark:bg-gray-700"
                      value={formData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      required
                    />
                    <input
                      placeholder="Time"
                      type="time"
                      className="border rounded p-2 w-full bg-white dark:bg-gray-700"
                      value={formData.time}
                      onChange={(e) => handleInputChange('time', e.target.value)}
                      required
                    />

                    {/* Manual Teacher Selection */}
                    {teachers?.length > 0 && (
                      <div className="mt-4">
                        <label className="block font-semibold mb-2">Manual Teacher Selection</label>
                        <div className="max-h-40 overflow-y-auto border rounded p-2">
                          {teachers.map((teacher) => (
                            <label key={teacher.id} className="flex items-center gap-2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                              <input
                                type="checkbox"
                                value={teacher.id}
                                checked={selectedTeachers.includes(teacher.id)}
                                onChange={(e) => {
                                  const val = teacher.id;
                                  if (e.target.checked) setSelectedTeachers(prev => [...prev, val]);
                                  else setSelectedTeachers(prev => prev.filter(id => id !== val));
                                }}
                              />
                              <span>{teacher.name} {teacher.email ? `(${teacher.email})` : ''}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Manual Room Selection */}
                    {classRooms?.rooms && (
                      <div className="mt-4">
                        <label className="block font-semibold mb-2">Manual Room Selection (optional override)</label>
                        <div className="max-h-36 overflow-y-auto border rounded p-2">
                          {classRooms.rooms.map(room => (
                            <label key={room.id} className="flex items-center gap-2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                              <input
                                type="checkbox"
                                value={room.id}
                                checked={selectedRooms.includes(room.id)}
                                onChange={(e) => {
                                  const val = room.id;
                                  if (e.target.checked) setSelectedRooms(prev => [...prev, val]);
                                  else setSelectedRooms(prev => prev.filter(id => id !== val));
                                }}
                              />
                              <span>{room.room_name} (Capacity: {room.room_type})</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Preview Table */}
                {previewData.length > 0 && (
                  <div className="mt-6 max-h-72 overflow-auto border rounded">
                    <table className="min-w-full table-auto border-collapse border border-gray-300 dark:border-gray-700">
                      <thead className="bg-gray-100 dark:bg-gray-700 sticky top-0">
                        <tr>
                          <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-left">Student</th>
                          <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-left">Teacher</th>
                          <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-left">Batch</th>
                          <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-left">College</th>
                          <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-left">Subject</th>
                          <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-left">Date</th>
                          <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-left">Time</th>
                          <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-left">Room</th>
                          <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {previewData.map((row, i) => (
                          <tr key={i} className={i % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'}>
                            {editingIndex === i ? (
                              <>
                                <td className="border border-gray-300 dark:border-gray-600 px-2 py-1">
                                  <input
                                    type="text"
                                    value={editBuffer.student_name}
                                    onChange={e => handleEditChange('student_name', e.target.value)}
                                    className="w-full border rounded px-1 py-0.5"
                                  />
                                </td>
                                <td className="border border-gray-300 dark:border-gray-600 px-2 py-1">
                                  <input
                                    type="text"
                                    value={editBuffer.teacher_name}
                                    onChange={e => handleEditChange('teacher_name', e.target.value)}
                                    className="w-full border rounded px-1 py-0.5"
                                  />
                                </td>
                                <td className="border border-gray-300 dark:border-gray-600 px-2 py-1">{row.class_name}</td>
                                <td className="border border-gray-300 dark:border-gray-600 px-2 py-1">{row.college_name}</td>
                                <td className="border border-gray-300 dark:border-gray-600 px-2 py-1">{row.subject_name}</td>
                                <td className="border border-gray-300 dark:border-gray-600 px-2 py-1">
                                  <input
                                    type="date"
                                    value={editBuffer.date}
                                    onChange={e => handleEditChange('date', e.target.value)}
                                    className="w-full border rounded px-1 py-0.5"
                                  />
                                </td>
                                <td className="border border-gray-300 dark:border-gray-600 px-2 py-1">
                                  <input
                                    type="time"
                                    value={editBuffer.time}
                                    onChange={e => handleEditChange('time', e.target.value)}
                                    className="w-full border rounded px-1 py-0.5"
                                  />
                                </td>
                                <td className="border border-gray-300 dark:border-gray-600 px-2 py-1">
                                  {/* Show room name or input */}
                                  <input
                                    type="text"
                                    value={
                                      classRooms.rooms?.find(r => r.id === editBuffer.room_id)?.room_name || ''
                                    }
                                    onChange={e => {
                                      // optionally, you can implement room change logic here
                                    }}
                                    className="w-full border rounded px-1 py-0.5"
                                    disabled
                                  />
                                </td>
                                <td className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-center whitespace-nowrap">
                                  <button
                                    className="text-green-600 hover:text-green-800 px-2"
                                    onClick={() => handleSaveEdit(i)}
                                  >
                                    Save
                                  </button>
                                  <button
                                    className="text-red-600 hover:text-red-800 px-2"
                                    onClick={handleCancelEdit}
                                  >
                                    Cancel
                                  </button>
                                </td>
                              </>
                            ) : (
                              <>
                                <td className="border border-gray-300 dark:border-gray-600 px-2 py-1">{row.student_name}</td>
                                <td className="border border-gray-300 dark:border-gray-600 px-2 py-1">{row.teacher_name}</td>
                                <td className="border border-gray-300 dark:border-gray-600 px-2 py-1">{row.class_name}</td>
                                <td className="border border-gray-300 dark:border-gray-600 px-2 py-1">{row.college_name}</td>
                                <td className="border border-gray-300 dark:border-gray-600 px-2 py-1">{row.subject_name}</td>
                                <td className="border border-gray-300 dark:border-gray-600 px-2 py-1">{row.date}</td>
                                <td className="border border-gray-300 dark:border-gray-600 px-2 py-1">{row.time}</td>
                                <td className="border border-gray-300 dark:border-gray-600 px-2 py-1">
                                  {classRooms.rooms?.find(r => r.id === row.room_id)?.room_name || 'N/A'}
                                </td>
                                <td className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-center whitespace-nowrap">
                                  <button
                                    className="text-indigo-600 hover:text-indigo-800 px-2"
                                    onClick={() => handleStartEdit(i)}
                                  >
                                    Edit
                                  </button>
                                  <button
                                    className="text-red-600 hover:text-red-800 px-2"
                                    onClick={() => handleDeleteRow(i)}
                                  >
                                    Delete
                                  </button>
                                </td>
                              </>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                <div className="mt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={buildPreview}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    disabled={loading}
                  >
                    Preview
                  </button>
                  <button
                    type="button"
                    onClick={handleAddSingle}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    disabled={loading}
                  >
                    Add Single Mapping
                  </button>
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                    disabled={loading || previewData.length === 0}
                  >
                    {loading ? 'Saving...' : 'Create Admin Card'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* You can add other UI here, like list of created admin cards or status */}
    </div>
  );
}
export default AdminCardCreate;

AdminCardCreate.layout = (page) => <AdminLayout>{page}</AdminLayout>;
