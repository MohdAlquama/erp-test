'use client';

import { useState } from 'react';
import { X, Edit, Trash2 } from 'lucide-react';
import { Toaster, toast } from 'sonner';

const initialForm = {
  tokenName: '',
  token: '',
  limit: '',
  givenTo: '',
  reason: '',
};

const users = ['John Doe', 'Jane Smith', 'Developer', 'Admin'];

export default function TokenManager() {
  const [isOpen, setIsOpen] = useState(false);
  const [tokens, setTokens] = useState([]);
  const [formData, setFormData] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.tokenName || !formData.token) {
      toast.error('Token Name and Token are required!');
      return;
    }

    setTokens([...tokens, { ...formData, id: Date.now() }]);
    setFormData(initialForm);
    setIsOpen(false);
    toast.success('Token added successfully!');
  };

  const handleDelete = (id) => {
    setTokens(tokens.filter((t) => t.id !== id));
    toast.success('Token deleted!');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-6">
      <Toaster richColors position="top-right" />
      <h1 className="text-2xl font-bold mb-6">Token Manager</h1>

      <button
        onClick={() => setIsOpen(true)}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add Token
      </button>

      {/* Table */}
      <div className="overflow-x-auto rounded shadow">
        <table className="min-w-full table-auto bg-white dark:bg-gray-800">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              <th className="px-4 py-2">Token Name</th>
              <th className="px-4 py-2">Token</th>
              <th className="px-4 py-2">Limit</th>
              <th className="px-4 py-2">Given To</th>
              <th className="px-4 py-2">Reason</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tokens.map((token) => (
              <tr key={token.id} className="border-t hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-4 py-2">{token.tokenName}</td>
                <td className="px-4 py-2">{token.token}</td>
                <td className="px-4 py-2">{token.limit}</td>
                <td className="px-4 py-2">{token.givenTo}</td>
                <td className="px-4 py-2">{token.reason}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button className="text-blue-600 hover:text-blue-800"><Edit size={18} /></button>
                  <button onClick={() => handleDelete(token.id)} className="text-red-600 hover:text-red-800">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {tokens.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">No tokens added yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-40 flex justify-end bg-black bg-opacity-50">
          <div className="w-full max-w-md bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 shadow-2xl p-6 overflow-y-auto relative transform transition-transform duration-300">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-900"
            >
              <X size={24} />
            </button>
            <h2 className="text-xl font-semibold mb-6">Add New Token</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1">Token Name</label>
                <input
                  type="text"
                  name="tokenName"
                  value={formData.tokenName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Token</label>
                <input
                  type="text"
                  name="token"
                  value={formData.token}
                  onChange={handleChange}
                  className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Limit</label>
                <input
                  type="number"
                  name="limit"
                  value={formData.limit}
                  onChange={handleChange}
                  className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-2 rounded"
                />
              </div>
              <div>
                <label className="block mb-1">Given To</label>
                <select
                  name="givenTo"
                  value={formData.givenTo}
                  onChange={handleChange}
                  className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-2 rounded"
                >
                  <option value="">Select</option>
                  {users.map((user) => (
                    <option key={user} value={user}>{user}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1">Reason</label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-2 rounded"
                />
              </div>
              <div className="text-right">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Save Token
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
