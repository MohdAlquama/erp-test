import AdminLayout from '@/Layouts/AdminLayout';
import React, { useState, useEffect } from 'react';
import { Plus, X, Edit, Trash } from 'lucide-react';
import axiosInstance from '@/utils/axiosInstance';
import { useBaseContext } from '@/contexts/adminContext';

export default function BatchView({ batch }) {
  const { admin } = useBaseContext();

  // State
  const [showAssignDrawer, setShowAssignDrawer] = useState(false);
  const [showEditDrawer, setShowEditDrawer] = useState(false);

  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [assignments, setAssignments] = useState([]);

  const [loadingSubjects, setLoadingSubjects] = useState(false);
  const [loadingTeachers, setLoadingTeachers] = useState(false);
  const [loadingAssignments, setLoadingAssignments] = useState(false);

  // For Assign Drawer
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState('');

  // For Edit Drawer
  const [editAssignmentId, setEditAssignmentId] = useState(null);
  const [editSubject, setEditSubject] = useState('');
  const [editTeacher, setEditTeacher] = useState('');

  // Fetch teachers assigned to this batch
  const fetchTeachers = () => {
    setLoadingTeachers(true);
    axiosInstance
      .get(`/admin/${admin.id}/batch/${batch.id}/teachers`)
      .then((res) => setTeachers(res.data.data || []))
      .catch((err) => alert('Error fetching teachers'))
      .finally(() => setLoadingTeachers(false));
  };

  // Fetch subjects for admin
  const fetchSubjects = () => {
    setLoadingSubjects(true);
    axiosInstance
      .get(`/admin/${admin.id}/subjects`)
      .then((res) => setSubjects(res.data || []))
      .catch(() => alert('Error fetching subjects'))
      .finally(() => setLoadingSubjects(false));
  };

  // Fetch assignments for batch/admin
  const fetchAssignments = () => {
    setLoadingAssignments(true);
    axiosInstance
      .get(`/admin/${admin.id}/batch/${batch.id}/assignments`)
      .then((res) => setAssignments(res.data.data))
      .catch(() => alert('Error fetching assignments'))
      .finally(() => setLoadingAssignments(false));
  };

  // Load initial data
  useEffect(() => {
    fetchTeachers();
    fetchSubjects();
    fetchAssignments();
  }, [admin.id, batch.id]);

  // Open assign drawer resets selections
  const openAssignDrawer = () => {
    setSelectedSubject('');
    setSelectedTeacher('');
    setShowAssignDrawer(true);
  };

  // Handle Assign new subject to teacher
  const handleAssign = () => {
    if (!selectedSubject || !selectedTeacher) {
      alert('Please select both subject and teacher');
      return;
    }
    axiosInstance
      .post(`/admin/${admin.id}/batch/${batch.id}/assign-subject`, {
        teacher_id: selectedTeacher,
        subject_id: selectedSubject,
      })
      .then(() => {
        alert('Assigned successfully');
        setShowAssignDrawer(false);
        fetchAssignments();
      })
      .catch(() => alert('Error assigning subject'));
  };

  // Open edit drawer and set current assignment data
  const openEditDrawer = (assignment) => {
    setEditAssignmentId(assignment.assignment_id);
    setEditTeacher(assignment.teacher_id);
    setEditSubject(assignment.subject_id);
    setShowEditDrawer(true);
  };

  // Handle Edit assignment save
  const handleEditSave = () => {
    if (!editTeacher || !editSubject) {
      alert('Please select both teacher and subject');
      return;
    }
    axiosInstance
      .put(
        `/admin/${admin.id}/batch/${batch.id}/assignments/${editAssignmentId}`,
        {
          teacher_id: editTeacher,
          subject_id: editSubject,
        }
      )
      .then(() => {
        alert('Assignment updated');
        setShowEditDrawer(false);
        fetchAssignments();
      })
      .catch(() => alert('Error updating assignment'));
  };

  // Handle Delete assignment
  const handleDeleteAssignment = (assignmentId) => {
    if (!confirm('Are you sure to delete this assignment?')) return;
    axiosInstance
      .delete(
        `/admin/${admin.id}/batch/${batch.id}/assignments/${assignmentId}`
      )
      .then(() => {
        alert('Assignment deleted');
        fetchAssignments();
      })
      .catch(() => alert('Error deleting assignment'));
  };

  // Handle Remove teacher from batch
  const handleRemoveTeacher = (teacherId) => {
    if (!confirm('Are you sure to remove this teacher from batch?')) return;
    axiosInstance
      .delete(`/admin/${admin.id}/batch/${batch.id}/teachers/${teacherId}`)
      .then(() => {
        alert('Teacher removed from batch');
        fetchTeachers();
        fetchAssignments(); // Remove assignments of that teacher also
      })
      .catch(() => alert('Error removing teacher'));
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Assign Subject to Teachers in {batch.name}
        </h1>
        <button
          onClick={openAssignDrawer}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Assign
        </button>
      </div>

      {/* Teachers List */}
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow mb-8">
        <h2 className="text-lg font-semibold mb-3 flex justify-between items-center">
          Teachers in this batch
        </h2>
        {loadingTeachers ? (
          <p className="text-gray-500">Loading teachers...</p>
        ) : teachers.length > 0 ? (
          <ul className="space-y-2">
            {teachers.map((t) => (
              <li
                key={t.id}
                className="p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm flex justify-between items-center"
              >
                <div>
                  <span>{t.name}</span>
                  <br />
                  <span className="text-sm text-gray-500">{t.email}</span>
                </div>
                <button
                  onClick={() => handleRemoveTeacher(t.id)}
                  className="text-red-600 hover:text-red-800 font-semibold"
                  title="Remove teacher from batch"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No teachers found for this batch</p>
        )}
      </div>

      {/* Assignments List */}
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-3">Subject Assignments</h2>
        {loadingAssignments ? (
          <p className="text-gray-500">Loading assignments...</p>
        ) : assignments.length > 0 ? (
          <table className="min-w-full table-auto border-collapse border border-gray-300 dark:border-gray-600">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Teacher</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Subject</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Assigned At</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assign) => (
                <tr key={assign.assignment_id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                    {assign.teacher_name} <br />
                    <span className="text-sm text-gray-500">{assign.teacher_email}</span>
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{assign.subject_name}</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{new Date(assign.created_at).toLocaleString()}</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center space-x-2">
                    <button
                      onClick={() => openEditDrawer(assign)}
                      title="Edit Assignment"
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <Edit className="inline-block w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteAssignment(assign.assignment_id)}
                      title="Delete Assignment"
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash className="inline-block w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No assignments found.</p>
        )}
      </div>

      {/* Assign Drawer */}
      {showAssignDrawer && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={() => setShowAssignDrawer(false)}
          ></div>

          <div className="fixed top-0 right-0 w-80 h-full bg-white dark:bg-gray-800 shadow-lg z-50 p-5 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Assign Subject</h2>
              <button onClick={() => setShowAssignDrawer(false)}>
                <X className="w-5 h-5 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300" />
              </button>
            </div>

            <label className="text-sm font-medium mb-1">Select Subject</label>
            {loadingSubjects ? (
              <p className="text-gray-500 mb-3">Loading subjects...</p>
            ) : subjects.length > 0 ? (
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="p-2 border rounded-lg mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">-- Select a subject --</option>
                {subjects.map((subj) => (
                  <option key={subj.id} value={subj.id}>
                    {subj.name || subj.subject}
                  </option>
                ))}
              </select>
            ) : (
              <p className="text-gray-500 mb-3">No subjects found</p>
            )}

            <label className="text-sm font-medium mb-1">Select Teacher</label>
            {loadingTeachers ? (
              <p className="text-gray-500 mb-3">Loading teachers...</p>
            ) : teachers.length > 0 ? (
              <select
                value={selectedTeacher}
                onChange={(e) => setSelectedTeacher(e.target.value)}
                className="p-2 border rounded-lg mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">-- Select a teacher --</option>
                {teachers.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.name}
                  </option>
                ))}
              </select>
            ) : (
              <p className="text-gray-500 mb-3">No teachers found</p>
            )}

            <button
              onClick={handleAssign}
              className="mt-auto bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Assign
            </button>
          </div>
        </>
      )}

      {/* Edit Drawer */}
      {showEditDrawer && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={() => setShowEditDrawer(false)}
          ></div>

          <div className="fixed top-0 right-0 w-80 h-full bg-white dark:bg-gray-800 shadow-lg z-50 p-5 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Edit Assignment</h2>
              <button onClick={() => setShowEditDrawer(false)}>
                <X className="w-5 h-5 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300" />
              </button>
            </div>

            <label className="text-sm font-medium mb-1">Select Subject</label>
            {loadingSubjects ? (
              <p className="text-gray-500 mb-3">Loading subjects...</p>
            ) : subjects.length > 0 ? (
              <select
                value={editSubject}
                onChange={(e) => setEditSubject(e.target.value)}
                className="p-2 border rounded-lg mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">-- Select a subject --</option>
                {subjects.map((subj) => (
                  <option key={subj.id} value={subj.id}>
                    {subj.name || subj.subject}
                  </option>
                ))}
              </select>
            ) : (
              <p className="text-gray-500 mb-3">No subjects found</p>
            )}

            <label className="text-sm font-medium mb-1">Select Teacher</label>
            {loadingTeachers ? (
              <p className="text-gray-500 mb-3">Loading teachers...</p>
            ) : teachers.length > 0 ? (
              <select
                value={editTeacher}
                onChange={(e) => setEditTeacher(e.target.value)}
                className="p-2 border rounded-lg mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">-- Select a teacher --</option>
                {teachers.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.name}
                  </option>
                ))}
              </select>
            ) : (
              <p className="text-gray-500 mb-3">No teachers found</p>
            )}

            <button
              onClick={handleEditSave}
              className="mt-auto bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Save Changes
            </button>
          </div>
        </>
      )}
    </div>
  );
}

BatchView.layout = (page) => <AdminLayout>{page}</AdminLayout>;
