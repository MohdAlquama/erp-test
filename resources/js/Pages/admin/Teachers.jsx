import React, { useEffect, useState } from "react";
import AdminLayout from "../../Layouts/AdminLayout";
import { Plus, Pencil, Trash } from "lucide-react";
import { useBaseContext } from "@/contexts/adminContext";
import axiosInstance from "@/utils/axiosInstance";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";

export default function Teachers() {
    const { admin, permissions } = useBaseContext();
    const [teachers, setTeachers] = useState([]);
    const [batches, setBatches] = useState([]);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        batch_ids: [],
    });
    const [editId, setEditId] = useState(null);
    const [search, setSearch] = useState("");
    const [showDrawer, setShowDrawer] = useState(false);
    const [loading, setLoading] = useState(true);

    const can = (perm) => permissions?.includes(perm);

    useEffect(() => {
        fetchTeachers();
        fetchBatches();
    }, []);

    const fetchTeachers = async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.get(`/admin/${admin.id}/teachers`);
            setTeachers(res.data);
        } catch {
            toast.error("Failed to fetch teachers");
        } finally {
            setLoading(false);
        }
    };

    const fetchBatches = async () => {
        try {
            const res = await axiosInstance.get(`/admin/${admin.id}/batches`);
            setBatches(res.data);
        } catch {
            toast.error("Failed to fetch batches");
        }
    };

    const resetForm = () => {
        setForm({
            name: "",
            email: "",
            password: "",
            batch_ids: [],
        });
        setEditId(null);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleCheckboxChange = (e) => {
        const id = e.target.value;
        setForm((prev) => ({
            ...prev,
            batch_ids: e.target.checked
                ? [...prev.batch_ids, id]
                : prev.batch_ids.filter((b) => b !== id),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const perm = editId ? "TeacherManagementEdit" : "TeacherManagementAdd";
        if (!can(perm)) return toast.error("Permission denied");

        if (!editId && !form.password)
            return toast.error("Password is required");

        const payload = {
            ...form,
            created_by: admin.id,
        };

        try {
            if (editId) {
                delete payload.password;
                await axiosInstance.put(`/admin/teachers/${editId}`, payload);
                toast.success("Updated successfully");
            } else {
                await axiosInstance.post("/admin/t", "c c");
                console.log("fbfbdf");
                
                toast.success("Added successfully");
            }
            fetchTeachers();
            resetForm();
            setShowDrawer(false);
        } catch {
            toast.error("Something went wrong");
        }
    };

    const handleEdit = (teacher) => {
        setForm({
            name: teacher.name,
            email: teacher.email,
            password: "",
            batch_ids: teacher.batches.map((b) => b.id.toString()),
        });
        setEditId(teacher.id);
        setShowDrawer(true);
    };

    const handleDelete = async (id) => {
        if (!can("TeacherManagementDelete")) return toast.error("Permission denied");
        if (window.confirm("Delete teacher?")) {
            try {
                await axiosInstance.delete(`/admin/teachers/${id}`);
                fetchTeachers();
                toast.success("Deleted");
            } catch {
                toast.error("Failed to delete");
            }
        }
    };

    const filteredTeachers = teachers.filter((t) =>
        t.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Teachers</h1>
                {can("TeacherManagementAdd") && (
                    <button
                        onClick={() => setShowDrawer(true)}
                        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" /> Add Teacher
                    </button>
                )}
            </div>

            <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mb-4 px-4 py-2 border rounded w-full md:w-1/3 dark:bg-gray-800"
            />

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto">
                {loading ? (
                    <div className="p-6">
                        <Loader message="Loading teachers..." />
                    </div>
                ) : (
                    <table className="min-w-full text-sm text-left text-gray-800 dark:text-white">
                        <thead className="bg-gray-100 dark:bg-gray-700 text-xs uppercase">
                            <tr>
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Email</th>
                                <th className="px-4 py-2">Batches</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTeachers.length > 0 ? (
                                filteredTeachers.map((t) => (
                                    <tr key={t.id} className="border-b dark:border-gray-600">
                                        <td className="px-4 py-2">{t.name}</td>
                                        <td className="px-4 py-2 break-all">{t.email}</td>
                                        <td className="px-4 py-2 break-all">
                                            {t.batches.map((b) => b.name).join(", ")}
                                        </td>
                                        <td className="px-4 py-2 flex gap-2">
                                            {can("TeacherManagementEdit") && (
                                                <button
                                                    onClick={() => handleEdit(t)}
                                                    className="text-yellow-600 hover:underline"
                                                >
                                                    <Pencil className="w-4 h-4 inline" /> Edit
                                                </button>
                                            )}
                                            {can("TeacherManagementDelete") && (
                                                <button
                                                    onClick={() => handleDelete(t.id)}
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
                                    <td
                                        colSpan="4"
                                        className="text-center text-gray-500 dark:text-gray-400 p-4"
                                    >
                                        No teachers found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Drawer Form */}
            <div
                className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white dark:bg-gray-900 transition-transform shadow-lg z-50 ${
                    showDrawer ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
                    <h2 className="text-lg font-bold">{editId ? "Edit Teacher" : "Add Teacher"}</h2>
                    <button
                        onClick={() => {
                            resetForm();
                            setShowDrawer(false);
                        }}
                        className="text-gray-600 dark:text-gray-300 hover:text-red-600"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Name"
                        required
                        className="w-full px-4 py-2 border rounded dark:bg-gray-800"
                    />
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                        className="w-full px-4 py-2 border rounded dark:bg-gray-800"
                    />

                    {!editId && (
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Password"
                            required
                            className="w-full px-4 py-2 border rounded dark:bg-gray-800"
                        />
                    )}

                    <div>
                        <label className="block mb-1">Assign Batches</label>
                        <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto border rounded p-2 dark:bg-gray-800">
                            {batches.map((batch) => (
                                <label
                                    key={batch.id}
                                    className="flex items-center gap-2 text-sm"
                                >
                                    <input
                                        type="checkbox"
                                        value={batch.id}
                                        checked={form.batch_ids.includes(batch.id.toString())}
                                        onChange={handleCheckboxChange}
                                        className="accent-indigo-600"
                                    />
                                    <span>{batch.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="bg-indigo-600 text-white w-full py-2 rounded hover:bg-indigo-700"
                    >
                        {editId ? "Update" : "Create"}
                    </button>
                </form>
            </div>
        </div>
    );
}

Teachers.layout = (page) => <AdminLayout>{page}</AdminLayout>;
