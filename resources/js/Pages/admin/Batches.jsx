import React, { useState, useEffect } from "react";
import AdminLayout from "../../Layouts/AdminLayout";
import { Pencil, Trash, Plus, ViewIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useBaseContext } from "@/contexts/adminContext";
import axiosInstance from "@/utils/axiosInstance";
import Loader from "@/components/Loader";
import { router } from '@inertiajs/react';
export default function Batches() {
    const { permissions, admin } = useBaseContext();
    const [batches, setBatches] = useState([]);
    const [form, setForm] = useState({ name: "", grade: "", section: "" });
    const [editId, setEditId] = useState(null);
    const [showDrawer, setShowDrawer] = useState(false);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const can = (perm) => permissions?.includes(perm);

    useEffect(() => {
        fetchBatches();
    }, []);

    const fetchBatches = async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.get(`/admin/${admin.id}/batches`);
            setBatches(res.data);
        } catch (err) {
            toast.error("Failed to fetch batches");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const resetForm = () => {
        setForm({ name: "", grade: "", section: "" });
        setEditId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const permissionKey = editId !== null ? "StudentManagementBatchEdit" : "StudentManagementBatchAdd";
        if (!can(permissionKey)) return toast.error("You do not have permission.");

        if (!form.name.trim()) return toast.error("Batch name is required");

        const payload = { ...form, created_by: admin?.id };

        try {
            if (editId !== null) {
                await axiosInstance.put(`/admin/batches/${editId}`, payload);
                toast.success("Batch updated");
            } else {
                await axiosInstance.post("/admin/batches", payload);
                toast.success("Batch added");
            }
            fetchBatches();
            resetForm();
            setShowDrawer(false);
        } catch {
            toast.error("Something went wrong");
        }
    };

    const handleEdit = (batch) => {
        setForm({ name: batch.name, grade: batch.grade, section: batch.section });
        setEditId(batch.id);
        setShowDrawer(true);
    };

    const handleDelete = async (id) => {
        if (!can("StudentManagementBatchDelete")) return toast.error("You do not have permission.");

        if (window.confirm("Are you sure to delete this batch?")) {
            try {
                await axiosInstance.delete(`/admin/batches/${id}`);
                toast.success("Batch deleted");
                fetchBatches();
            } catch {
                toast.error("Failed to delete");
            }
        }
    };
const handleView = (id) => {
    router.get(`/admin/batches/${id}`);
};


    const filteredBatches = batches.filter((b) =>
        b.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-6 bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white relative">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Batches</h1>
                {can("StudentManagementBatchAdd") && (
                    <button
                        onClick={() => setShowDrawer(true)}
                        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" /> Add Batch
                    </button>
                )}
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by batch name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="px-4 py-2 border rounded w-full md:w-1/3 dark:bg-gray-800 dark:text-white"
                />
            </div>

            <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
                {loading ? (
                    <div className="p-6 flex justify-center">
                        <Loader message="Fetching batches..." />
                    </div>
                ) : (
                    <table className="min-w-full text-sm text-left text-gray-800 dark:text-white">
                        <thead className="bg-gray-100 dark:bg-gray-700 text-xs uppercase">
                            <tr>
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Grade</th>
                                <th className="px-4 py-2">Section</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBatches.length > 0 ? (
                                filteredBatches.map((batch) => (
                                    <tr key={batch.id} className="border-b border-gray-200 dark:border-gray-600">
                                        <td className="px-4 py-2">{batch.name}</td>
                                        <td className="px-4 py-2">{batch.grade}</td>
                                        <td className="px-4 py-2">{batch.section}</td>
                                        <td className="px-4 py-2 flex gap-2">

                                               <button
                                                    onClick={() => handleView(batch.id)}
                                                    className="text-yellow-600 hover:underline"
                                                >
                                                    <ViewIcon className="w-4 h-4 inline" /> view
                                                </button>

                                            {can("StudentManagementBatchEdit") && (
                                                <button
                                                    onClick={() => handleEdit(batch)}
                                                    className="text-yellow-600 hover:underline"
                                                >
                                                    <Pencil className="w-4 h-4 inline" /> Edit
                                                </button>
                                            )}
                                            {can("StudentManagementBatchDelete") && (
                                                <button
                                                    onClick={() => handleDelete(batch.id)}
                                                    className="text-red-600 hover:underline"
                                                >
                                                    <Trash className="w-4 h-4 inline" /> Delete
                                                </button>
                                            )}
                                          
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-4 py-4 text-center text-gray-500 dark:text-gray-400">
                                        No batches found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Drawer Form */}
            <div
                className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white dark:bg-gray-900 shadow-xl transition-transform duration-300 z-50 ${
                    showDrawer ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                        {editId !== null ? "Edit Batch" : "Add Batch"}
                    </h2>
                    <button
                        onClick={() => {
                            setShowDrawer(false);
                            resetForm();
                        }}
                        className="text-gray-600 dark:text-gray-300 hover:text-red-600"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <div>
                        <label className="block mb-1">Batch Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Grade</label>
                        <input
                            type="text"
                            name="grade"
                            value={form.grade}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Section</label>
                        <input
                            type="text"
                            name="section"
                            value={form.section}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
                        />
                    </div>
                     
                    <button
                        type="submit"
                        className="bg-indigo-600 text-white w-full py-2 rounded hover:bg-indigo-700"
                    >
                        {editId !== null ? "Update Batch" : "Create Batch"}
                    </button>
                  
                </form>
            </div>
        </div>
    );
}

Batches.layout = (page) => <AdminLayout>{page}</AdminLayout>;
