import React, { useState, useEffect } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import axiosInstance from '@/utils/axiosInstance';
import { PlusCircle, Edit2, Trash2 } from 'lucide-react';
import { useBaseContext } from '@/contexts/adminContext';
import { toast } from 'react-hot-toast';

function Syllabus() {
  const { admin } = useBaseContext();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [batches, setBatches] = useState([]);
  const [batchId, setBatchId] = useState('');
  const [newFiles, setNewFiles] = useState([null]);
  const [existingFiles, setExistingFiles] = useState([]);

  const [syllabusList, setSyllabusList] = useState([]);
  const [editingSyllabus, setEditingSyllabus] = useState(null);

  // Fetch batches
  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const res = await axiosInstance.get(`/admin/${admin.id}/batches`);
        setBatches(res.data.batches || res.data || []);
      } catch {
        toast.error('Failed to fetch batches');
      }
    };
    if (admin?.id) fetchBatches();
  }, [admin?.id]);

  // Fetch syllabus
  const fetchSyllabus = async () => {
    try {
      const res = await axiosInstance.get(`/admin/${admin.id}/syllabus`);
      setSyllabusList(res.data.syllabus || res.data || []);
    } catch {
      toast.error('Failed to fetch syllabus');
    }
  };

  useEffect(() => {
    if (admin?.id) fetchSyllabus();
  }, [admin?.id]);

  const handleNewFileChange = (index, file) => {
    setNewFiles(prev => {
      const updated = [...prev];
      updated[index] = file;
      return updated;
    });
  };

  const handleAddFileInput = () => setNewFiles(prev => [...prev, null]);
  const handleRemoveFile = (index) => setNewFiles(prev => prev.filter((_, i) => i !== index));
  const handleRemoveExistingFile = (fileToRemove) => {
    setExistingFiles(prev => prev.filter(f => f !== fileToRemove));
  };

  const handleSubmit = async () => {
    if (!batchId) {
      setError('Select a batch.');
      return;
    }

    const formData = new FormData();
    formData.append('batch_id', batchId);

    // Append remaining existing files
    existingFiles.forEach((f, i) => formData.append(`existing_files[${i}]`, f));

    // Append new files
    newFiles.forEach((file, i) => {
      if (file) formData.append(`files[${i}]`, file);
    });

    setLoading(true);
    try {
      if (editingSyllabus) {
        await axiosInstance.post(
          `/admin/${admin.id}/syllabus/${editingSyllabus.id}`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        toast.success('Syllabus updated successfully!');
      } else {
        await axiosInstance.post(`/admin/${admin.id}/syllabus`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Syllabus saved successfully!');
      }

      // Reset form
      setNewFiles([null]);
      setExistingFiles([]);
      setBatchId('');
      setDrawerOpen(false);
      setEditingSyllabus(null);
      setError(null);

      fetchSyllabus();
    } catch (err) {
      console.error(err);
      setError('Failed to save syllabus.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (syllabus) => {
    setEditingSyllabus(syllabus);
    setBatchId(syllabus.batch_id);
    setNewFiles([null]);
    setExistingFiles(Array.isArray(syllabus.file_path) ? [...syllabus.file_path] : [syllabus.file_path]);
    setDrawerOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this syllabus?')) return;
    try {
      await axiosInstance.delete(`/admin/${admin.id}/syllabus/${id}`);
      toast.success('Syllabus deleted successfully!');
      setSyllabusList(prev => prev.filter(s => s.id !== id));
    } catch {
      toast.error('Failed to delete syllabus.');
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Syllabus Upload</h1>
        <button
          onClick={() => setDrawerOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-indigo-700"
          disabled={loading}
        >
          <PlusCircle className="w-4 h-4" /> Add Syllabus
        </button>
      </div>

      {/* Syllabus Table */}
      <table className="w-full table-auto border border-gray-300 dark:border-gray-700 mb-6">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th className="p-2 border-b text-left">Batch</th>
            <th className="p-2 border-b text-left">File</th>
            <th className="p-2 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {syllabusList.map(s => {
            const batch = batches.find(b => b.id === s.batch_id);
            let fileNames = [];
            if (s.file_path) {
              if (Array.isArray(s.file_path)) fileNames = s.file_path.map(f => f.split('/').pop());
              else if (typeof s.file_path === 'string') fileNames = [s.file_path.split('/').pop()];
            }

            return (
              <tr key={s.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="p-2 border-b">
                  {batch?.name || s.batch_id} {batch?.grade ? `(${batch.grade})` : ''}
                </td>
                <td className="p-2 border-b">
                  {fileNames.length > 0
                    ? fileNames.map((name, idx) => (
                        <div key={idx} className="text-gray-700 dark:text-gray-300">
                          <a
                            href={`${axiosInstance.defaults.baseURL}/storage/${s.file_path[idx]}`}
                            target="_blank"
                            rel="noreferrer"
                            className="underline hover:text-indigo-600"
                          >
                            {name}
                          </a>
                        </div>
                      ))
                    : 'N/A'}
                </td>
                <td className="p-2 border-b flex gap-2">
                  <button
                    onClick={() => handleEdit(s)}
                    className="text-green-600 hover:text-green-800 flex items-center gap-1"
                  >
                    <Edit2 className="w-4 h-4" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="text-red-600 hover:text-red-800 flex items-center gap-1"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </td>
              </tr>
            );
          })}

          {syllabusList.length === 0 && (
            <tr>
              <td colSpan="3" className="text-center p-4 text-gray-500">
                No syllabus uploaded yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => {
              setDrawerOpen(false);
              setEditingSyllabus(null);
              setError(null);
            }}
          ></div>

          <div className="absolute right-0 top-0 h-full w-11/12 md:w-2/5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-lg overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{editingSyllabus ? 'Edit Syllabus' : 'Add Syllabus'}</h2>
                <button
                  onClick={() => {
                    setDrawerOpen(false);
                    setEditingSyllabus(null);
                    setError(null);
                  }}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  Close
                </button>
              </div>

              {error && <div className="mb-2 text-red-500">{error}</div>}

              <select
                value={batchId}
                onChange={(e) => setBatchId(e.target.value)}
                className="w-full mb-4 border rounded p-2 bg-white dark:bg-gray-700"
              >
                <option value="">-- Select Batch --</option>
                {batches.map(batch => (
                  <option key={batch.id} value={batch.id}>
                    {batch.name} {batch.grade ? `(${batch.grade})` : ''}
                  </option>
                ))}
              </select>

              {/* Existing Files */}
              {existingFiles.length > 0 && (
                <div className="mb-4">
                  <p className="font-semibold">Existing Files:</p>
                  {existingFiles.map((f, i) => (
                    <div key={i} className="flex justify-between items-center mb-1">
                      <a
                        href={`${axiosInstance.defaults.baseURL}/storage/${f}`}
                        target="_blank"
                        rel="noreferrer"
                        className="underline hover:text-indigo-600"
                      >
                        {f.split('/').pop()}
                      </a>
                      <button
                        type="button"
                        onClick={() => handleRemoveExistingFile(f)}
                        className="text-red-600 hover:text-red-800 ml-2"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* New Files */}
              {newFiles.map((file, i) => (
                <div key={i} className="mb-4 relative">
                  <input
                    type="file"
                    onChange={(e) => handleNewFileChange(i, e.target.files[0])}
                    className="w-full border rounded p-2 bg-white dark:bg-gray-700"
                  />
                  {newFiles.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(i)}
                      className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}

              <div className="flex gap-3 mt-2">
                <button
                  type="button"
                  onClick={handleAddFileInput}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Add Another File
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : editingSyllabus ? 'Update' : 'Save All'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Syllabus;
Syllabus.layout = page => <AdminLayout>{page}</AdminLayout>;
