import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Pencil, Trash2, Plus } from 'lucide-react';
import PropTypes from 'prop-types';
import axiosInstance from '@/utils/axiosInstance';

function TokenLayout({ initialTokens = [], subAdmins = [] }) {
    const [tokens, setTokens] = useState(initialTokens);
    const [subAdminsState, setSubAdmins] = useState(subAdmins);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [formData, setFormData] = useState({
        id: null,
        token: '',
        status: 'Active',
        sub_admin_id: '',
        token_limit: 0,
    });

    const REGEN_LIMIT = 3;
    const COOLDOWN_MS = 30000;

    // Fetch sub-admins if not provided
    useEffect(() => {
        if (!subAdminsState.length) {
            axiosInstance
                .get('/supper/fetch-subadmins')
                .then((res) => {
                    const data = res.data.data || res.data.subAdmins || [];
                    console.log('Fetched SubAdmins:', data);
                    if (Array.isArray(data)) {
                        setSubAdmins(data);
                    } else {
                        console.warn('Unexpected sub-admin data format:', data);
                    }
                })
                .catch((err) => {
                    console.error('Fetch failed:', err);
                    toast.error('Failed to fetch sub-admins');
                });
        }
    }, [subAdminsState]);

    // Fetch tokens if not provided
    useEffect(() => {
        if (!initialTokens.length) {
            axiosInstance
                .get('/supper/tokens')
                .then((res) => {
                    const data = res.data.data || [];
                    setTokens(data);
                })
                .catch((err) => {
                    console.error('Fetch tokens failed:', err);
                    toast.error('Failed to fetch tokens');
                });
        }
    }, [initialTokens]);

    const handleOpenAdd = () => {
        setFormData({
            id: null,
            token: '',
            status: 'Active',
            sub_admin_id: '',
            token_limit: 0,
        });
        setIsEdit(false);
        setIsFormOpen(true);
    };

    const handleEdit = (token) => {
        setFormData({
            id: token.id,
            token: token.token,
            status: token.status,
            sub_admin_id: token.sub_admin_id || '',
            token_limit: token.token_limit || 0,
        });
        setIsEdit(true);
        setIsFormOpen(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await axiosInstance.delete(`/supper/tokens/${id}`);
            setTokens(tokens.filter((t) => t.id !== id));
            toast.success('Token deleted');
        } catch (err) {
            console.error('Delete failed:', err);
            toast.error('Delete failed');
        }
    };

    const handleInputChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const generateRandomToken = () => {
        return Math.random().toString(36).substring(2, 10).toUpperCase();
    };

    const regenerateToken = async (id) => {
        try {
            const { data } = await axiosInstance.post(`/supper/tokens/${id}/regenerate`);
            setTokens((prev) =>
                prev.map((t) => (t.id === id ? { ...t, ...data.data } : t))
            );
            toast.success('Token regenerated');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Regeneration failed');
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...formData,
            token_limit: parseInt(formData.token_limit) || 0,
            token_used: 0,
        };

        try {
            if (isEdit) {
                const { data } = await axiosInstance.put(`/supper/tokens/${formData.id}`, payload);
                setTokens((prev) =>
                    prev.map((t) => (t.id === formData.id ? { ...t, ...data.data } : t))
                );
                toast.success('Token updated');
            } else {
                const { data } = await axiosInstance.post('/supper/tokens', payload);
                setTokens((prev) => [...prev, data.data]);
                toast.success('Token created');
            }
            setIsFormOpen(false);
        } catch (err) {
            console.error('Submit failed:', err);
            toast.error('Submit failed');
        }
    };

    return (
        <div className="p-6 bg-white rounded shadow">
            <Toaster position="top-center" />
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Token Management</h2>
                <button
                    onClick={handleOpenAdd}
                    className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 text-sm"
                >
                    <Plus size={16} /> Add Token
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 border-b">#</th>
                            <th className="p-3 border-b">SubAdmin</th>
                            <th className="p-3 border-b">Token</th>
                            <th className="p-3 border-b">Status</th>
                            <th className="p-3 border-b">Created</th>
                            <th className="p-3 border-b">Actions</th>
                            <th className="p-3 border-b">Limit</th>
                            <th className="p-3 border-b">Regen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tokens.map((t, i) => (
                            <tr key={t.id} className="hover:bg-gray-50">
                                <td className="p-3 border-b">{i + 1}</td>
                                <td className="p-3 border-b">{t.sub_admin?.name || 'N/A'}</td>
                                <td className="p-3 border-b font-mono">{t.token}</td>
                                <td className="p-3 border-b">
                                    <span
                                        className={`px-2 py-1 text-xs rounded ${
                                            t.status === 'Active'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-red-100 text-red-700'
                                        }`}
                                    >
                                        {t.status}
                                    </span>
                                </td>
                                <td className="p-3 border-b">
                                    {t.createdAt ? new Date(t.createdAt).toLocaleString() : 'N/A'}
                                </td>
                                <td className="p-3 border-b">
                                    <div className="flex gap-2">
                                        <Pencil
                                            size={16}
                                            className="text-blue-600 cursor-pointer"
                                            onClick={() => handleEdit(t)}
                                        />
                                        <Trash2
                                            size={16}
                                            className="text-red-600 cursor-pointer"
                                            onClick={() => handleDelete(t.id)}
                                        />
                                        <button
                                            onClick={() => regenerateToken(t.id)}
                                            disabled={(t.regenCount || 0) >= REGEN_LIMIT}
                                            className="text-xs bg-yellow-200 px-2 py-1 rounded disabled:opacity-50"
                                        >
                                            Regenerate
                                        </button>
                                    </div>
                                </td>
                                <td className="p-3 border-b">
                                    {t.token_limit > 0
                                        ? `${t.token_limit - (t.token_used || 0)} / ${t.token_limit}`
                                        : 'Unlimited'}
                                </td>
                                <td className="p-3 border-b text-sm">
                                    Regen: {REGEN_LIMIT - (t.regenCount || 0)}
                                    <br />
                                    {t.lastRegenAt &&
                                        Date.now() - new Date(t.lastRegenAt).getTime() < COOLDOWN_MS && (
                                            <div className="text-xs text-gray-500">
                                                {Math.ceil(
                                                    (COOLDOWN_MS - (Date.now() - new Date(t.lastRegenAt).getTime())) /
                                                        1000
                                                )}
                                                s cooldown
                                            </div>
                                        )}
                                </td>
                            </tr>
                        ))}
                        {tokens.length === 0 && (
                            <tr>
                                <td colSpan="8" className="text-center p-4 text-gray-500">
                                    No tokens available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {isFormOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h3 className="text-xl font-semibold mb-4">
                            {isEdit ? 'Edit Token' : 'Add Token'}
                        </h3>
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <div>
                                <label className="block mb-1 text-sm">Token</label>
                                <input
                                    name="token"
                                    value={formData.token}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full border px-3 py-2 rounded text-sm"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            token: generateRandomToken(),
                                        }))
                                    }
                                    className="text-xs text-blue-600 hover:underline mt-1"
                                >
                                    Generate random token
                                </button>
                            </div>

                            <div>
                                <label className="block mb-1 text-sm">SubAdmin</label>
                                <select
                                    name="sub_admin_id"
                                    value={formData.sub_admin_id}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full border px-3 py-2 rounded text-sm"
                                >
                                    <option value="">Select SubAdmin</option>
                                    {subAdminsState.map((admin) => (
                                        <option key={admin.id} value={admin.id}>
                                            {admin.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block mb-1 text-sm">Status</label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                    className="w-full border px-3 py-2 rounded text-sm"
                                >
                                    <option value="Active">Active</option>
                                    <option value="Expired">Expired</option>
                                </select>
                            </div>

                            <div>
                                <label className="block mb-1 text-sm">Token Limit</label>
                                <input
                                    type="number"
                                    name="token_limit"
                                    value={formData.token_limit}
                                    onChange={handleInputChange}
                                    min="0"
                                    className="w-full border px-3 py-2 rounded text-sm"
                                />
                            </div>

                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setIsFormOpen(false)}
                                    className="bg-gray-200 px-4 py-2 rounded text-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded text-sm"
                                    disabled={!formData.token || !formData.sub_admin_id}
                                >
                                    {isEdit ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

TokenLayout.propTypes = {
    initialTokens: PropTypes.array,
    subAdmins: PropTypes.array,
};

export default TokenLayout;