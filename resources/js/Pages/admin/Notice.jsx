import React, { useState } from "react";
import AdminLayout from "../../Layouts/AdminLayout";
import { Plus, Pencil, Trash } from "lucide-react";
import toast from "react-hot-toast";

export default function Notice() {
    const [notices, setNotices] = useState([]);
    const [form, setForm] = useState({
        title: "",
        message: "",
    });
    const [editIndex, setEditIndex] = useState(null);
    const [showDrawer, setShowDrawer] = useState(false);
    const [search, setSearch] = useState("");

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const resetForm = () => {
        setForm({ title: "", message: "" });
        setEditIndex(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.title.trim() || !form.message.trim()) {
            toast.error("Title and Message are required.");
            return;
        }

        if (editIndex !== null) {
            const updated = [...notices];
            updated[editIndex] = form;
            setNotices(updated);
            toast.success("Notice updated");
        } else {
            setNotices([...notices, form]);
            toast.success("Notice added");
        }

        resetForm();
        setShowDrawer(false);
    };

    const handleEdit = (index) => {
        setForm(notices[index]);
        setEditIndex(index);
        setShowDrawer(true);
    };

    const handleDelete = (index) => {
        if (window.confirm("Are you sure to delete this notice?")) {
            const updated = notices.filter((_, i) => i !== index);
            setNotices(updated);
            toast.success("Notice deleted");
        }
    };

    const filteredNotices = notices.filter((n) =>
        n.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Notice Board</h1>
                <button
                    onClick={() => {
                        resetForm();
                        setShowDrawer(true);
                    }}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Add Notice
                </button>
            </div>

            {/* Search */}
            <input
                type="text"
                placeholder="Search notice by title"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mb-4 px-4 py-2 border rounded w-full md:w-1/3 dark:bg-gray-800 dark:text-white"
            />

            {/* Table */}
            <div className="overflow-x-auto rounded-lg shadow bg-white dark:bg-gray-800">
                <table className="min-w-full text-sm text-left text-gray-900 dark:text-white">
                    <thead className="bg-gray-100 dark:bg-gray-700 text-xs uppercase">
                        <tr>
                            <th className="px-4 py-2">Title</th>
                            <th className="px-4 py-2">Message</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredNotices.length > 0 ? (
                            filteredNotices.map((n, i) => (
                                <tr
                                    key={i}
                                    className="border-b dark:border-gray-700"
                                >
                                    <td className="px-4 py-2">{n.title}</td>
                                    <td className="px-4 py-2">{n.message}</td>
                                    <td className="px-4 py-2 flex gap-2">
                                        <button
                                            onClick={() => handleEdit(i)}
                                            className="text-yellow-600 hover:underline"
                                        >
                                            <Pencil className="w-4 h-4 inline" />{" "}
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(i)}
                                            className="text-red-600 hover:underline"
                                        >
                                            <Trash className="w-4 h-4 inline" />{" "}
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="3"
                                    className="px-4 py-4 text-center text-gray-500 dark:text-gray-400"
                                >
                                    No notices found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 w-full sm:w-[400px] h-full bg-white dark:bg-gray-900 z-50 shadow-lg transform transition-transform duration-300 ${
                    showDrawer ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
                    <h2 className="text-lg font-bold">
                        {editIndex !== null ? "Edit Notice" : "Add Notice"}
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
                        <label>Title</label>
                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
                        />
                    </div>

                    <div>
                        <label>Message</label>
                        <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            rows={4}
                            required
                            className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-indigo-600 text-white w-full py-2 rounded hover:bg-indigo-700"
                    >
                        {editIndex !== null ? "Update Notice" : "Create Notice"}
                    </button>
                </form>
            </div>
        </div>
    );
}

Notice.layout = (page) => <AdminLayout>{page}</AdminLayout>;
