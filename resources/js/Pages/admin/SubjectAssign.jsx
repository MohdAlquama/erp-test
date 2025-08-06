import React, { useEffect, useState } from 'react';
import axiosInstance from '@/utils/axiosInstance';
import { toast } from 'react-toastify';

const SubjectAssign = () => {
  const [admins, setAdmins] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [assignments, setAssignments] = useState([]);

  const [selectedAdmin, setSelectedAdmin] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [adminRes, subjectRes, assignmentRes] = await Promise.all([
        axiosInstance.get('/api/admins'),
        axiosInstance.get('/api/subjects'),
        axiosInstance.get('/api/assignments'), // return list of {id, admin_name, subject}
      ]);

      setAdmins(adminRes.data);
      setSubjects(subjectRes.data);
      setAssignments(assignmentRes.data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load data');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/api/assign-subject', {
        admin_id: selectedAdmin,
        subject: selectedSubject,
      });
      toast.success('Subject assigned');
      setIsDrawerOpen(false);
      fetchData();
    } catch (error) {
      console.error(error);
      toast.error('Assignment failed');
    }
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Subject Assignments</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => setIsDrawerOpen(true)}
        >
          + Assign Subject
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Admin</th>
              <th className="p-3">Subject</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((a) => (
              <tr key={a.id} className="border-t">
                <td className="p-3">{a.admin_name}</td>
                <td className="p-3">{a.subject}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-40 flex justify-end">
          <div className="bg-white w-full max-w-md h-full shadow-lg p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Assign Subject</h3>
              <button onClick={() => setIsDrawerOpen(false)} className="text-gray-600 text-xl">
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1">Select Admin:</label>
                <select
                  value={selectedAdmin}
                  onChange={(e) => setSelectedAdmin(e.target.value)}
                  className="w-full border p-2 rounded"
                >
                  <option value="">-- Select Admin --</option>
                  {admins.map((admin) => (
                    <option key={admin.id} value={admin.id}>
                      {admin.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1">Select Subject:</label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full border p-2 rounded"
                >
                  <option value="">-- Select Subject --</option>
                  {subjects.map((subject) => (
                    <option key={subject.id} value={subject.name}>
                      {subject.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Assign
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectAssign;
