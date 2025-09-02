import AdminLayout from '@/Layouts/AdminLayout';
import React, { useState, useEffect } from 'react';
import axiosInstance from '@/utils/axiosInstance';
import { toast } from 'react-hot-toast';

function Permissions() {
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState('');
  const [status, setStatus] = useState('pending');
  const [loading, setLoading] = useState(false);

  // Fetch batches on component mount
  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await axiosInstance.get('/batches'); // Replace with your API route
        setBatches(response.data);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch batches');
      }
    };
    fetchBatches();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedBatch) {
      toast.error('Please select a batch');
      return;
    }

    setLoading(true);
    try {
      await axiosInstance.post('/permissions', {
        batch_id: selectedBatch,
        status,
      });
      toast.success('Permission sent successfully');
      setSelectedBatch('');
      setStatus('pending');
    } catch (error) {
      console.error(error);
      toast.error('Failed to send permission');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow-md w-full max-w-md mx-auto mt-10">
      <h1 className="text-xl font-bold mb-4">Send Permission</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Select Batch</label>
          <select
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
          >
            <option value="">-- Select Batch --</option>
            {batches.map((batch) => (
              <option key={batch.id} value={batch.id}>
                {batch.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
          >
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Sending...' : 'Send Permission'}
        </button>
      </form>
    </div>
  );
}

Permissions.layout = (page) => <AdminLayout>{page}</AdminLayout>;

export default Permissions;
