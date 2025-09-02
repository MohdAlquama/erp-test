import React, { useState, useEffect } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Plus } from "lucide-react";
import { usePage } from "@inertiajs/react";
import axiosInstance from "@/utils/axiosInstance";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";
import { useBaseContext } from "@/contexts/adminContext";

export default function College() {
    const { props } = usePage();
    const { adminId } = props;
    const { admin } = useBaseContext();

    const [form, setForm] = useState({ name: "", location: "", logo: null });
    const [preview, setPreview] = useState(null);
    const [showDrawer, setShowDrawer] = useState(false);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editId, setEditId] = useState(null);

    // ✅ Fetch Colleges
    const fetchColleges = async () => {
        try {
            setLoading(true);
            const res = await axiosInstance.get(`/admin/${admin.id}/colleges`);
            setItems(res.data || []);
        } catch {
            toast.error("Failed to load colleges.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchColleges();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "logo" && files.length > 0) {
            setForm({ ...form, logo: files[0] });
            setPreview(URL.createObjectURL(files[0])); // preview image
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const resetForm = () => {
        setForm({ name: "", location: "", logo: null });
        setPreview(null);
        setEditId(null);
    };

    // ✅ Create / Update College
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name.trim() || !form.location.trim()) {
            return toast.error("All fields are required.");
        }

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("name", form.name);
            formData.append("location", form.location);
            formData.append("admin_id", admin.id);
            if (form.logo) formData.append("logo", form.logo);

            if (editId) {
                await axiosInstance.post(`/admin/colleges/${editId}?_method=PUT`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                toast.success("College updated successfully!");
            } else {
                await axiosInstance.post("/admin/colleges", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                toast.success("College added successfully!");
            }

            resetForm();
            setShowDrawer(false);
            await fetchColleges();
        } catch {
            toast.error("Failed to save college.");
        } finally {
            setLoading(false);
        }
    };

    // ✅ Edit
    const handleEdit = (item) => {
        setForm({ name: item.name, location: item.location, logo: null });
        setPreview(item.logo_url || null); // show existing logo if available
        setEditId(item.id);
        setShowDrawer(true);
    };

    // ✅ Delete
    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this college?")) return;
        try {
            setLoading(true);
            await axiosInstance.delete(`/admin/colleges/${id}`, {
                data: { admin_id: admin.id },
            });
            toast.success("College deleted successfully!");
            await fetchColleges();
        } catch {
            toast.error("Failed to delete college.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white relative">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Colleges</h1>
                <button
                    onClick={() => {
                        resetForm();
                        setShowDrawer(true);
                    }}
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" /> Add College
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
                <table className="min-w-full text-sm text-left text-gray-800 dark:text-white">
                    <thead className="bg-gray-100 dark:bg-gray-700 text-xs uppercase">
                        <tr>
                            <th className="px-4 py-2">Logo</th>
                            <th className="px-4 py-2">College Name</th>
                            <th className="px-4 py-2">Location</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="4" className="px-4 py-4 text-center">
                                    <Loader message="Loading colleges..." />
                                </td>
                            </tr>
                        ) : items.length > 0 ? (
                            items.map((item) => (
                                <tr
                                    key={item.id}
                                    className="border-b border-gray-200 dark:border-gray-600"
                                >
                                    <td className="px-4 py-2">
                                        {item.logo_url ? (
                                            <img
                                                src={item.logo_url}
                                                alt={item.name}
                                                className="w-12 h-12 rounded object-cover"
                                            />
                                        ) : (
                                            <span className="text-gray-400">No Logo</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-2">{item.name}</td>
                                    <td className="px-4 py-2">{item.location}</td>
                                    <td className="px-4 py-2 flex gap-2">
                                        <button
                                            onClick={() => handleEdit(item)}
                                            className="px-2 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="px-2 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="4"
                                    className="px-4 py-4 text-center text-gray-500 dark:text-gray-400"
                                >
                                    No colleges found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Drawer Form */}
            <div
                className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white dark:bg-gray-900 shadow-xl transition-transform duration-300 z-50 ${
                    showDrawer ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                        {editId ? "Edit College" : "Add College"}
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
                        <label className="block mb-1">College Name</label>
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
                        <label className="block mb-1">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={form.location}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="block mb-1">Logo</label>
                        <input
                            type="file"
                            name="logo"
                            accept="image/*"
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
                        />
                        {preview && (
                            <img
                                src={preview}
                                alt="Preview"
                                className="mt-2 w-24 h-24 object-cover rounded"
                            />
                        )}
                    </div>

                    <button
                        type="submit"
                        className="bg-indigo-600 text-white w-full py-2 rounded hover:bg-indigo-700"
                    >
                        {editId ? "Update College" : "Save College"}
                    </button>
                </form>
            </div>
        </div>
    );
}

College.layout = (page) => <AdminLayout>{page}</AdminLayout>;
