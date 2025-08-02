import React, { useState } from "react";
import AdminLayout from "../../Layouts/AdminLayout";
import { Plus, Pencil, Trash } from "lucide-react";
import toast from "react-hot-toast";

export default function ControlRoom() {
    const [messages, setMessages] = useState([]);
    const [form, setForm] = useState({ type: "Emergency", content: "" });
    const [editIndex, setEditIndex] = useState(null);
    const [search, setSearch] = useState("");
    const [filterType, setFilterType] = useState("");
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const resetForm = () => {
        setForm({ type: "Emergency", content: "" });
        setEditIndex(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.content.trim()) {
            toast.error("Message content is required");
            return;
        }

        const message = { ...form };

        if (editIndex !== null) {
            const updated = [...messages];
            updated[editIndex] = message;
            setMessages(updated);
            toast.success("Message updated");
        } else {
            setMessages([...messages, message]);
            toast.success("Message added");
        }

        resetForm();
        setDrawerOpen(false);
    };

    const handleEdit = (index) => {
        setForm(messages[index]);
        setEditIndex(index);
        setDrawerOpen(true);
    };

    const handleDelete = (index) => {
        if (window.confirm("Are you sure you want to delete this message?")) {
            const updated = messages.filter((_, i) => i !== index);
            setMessages(updated);
            toast.success("Message deleted");
        }
    };

    const filteredMessages = messages.filter((msg) => {
        const matchesSearch = msg.content
            .toLowerCase()
            .includes(search.toLowerCase());
        const matchesType = filterType ? msg.type === filterType : true;
        return matchesSearch && matchesType;
    });

    return (
        <div className="p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Control Room</h1>
                <button
                    onClick={() => {
                        resetForm();
                        setDrawerOpen(true);
                    }}
                    className="bg-indigo-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-indigo-700"
                >
                    <Plus className="w-4 h-4" />
                    Add Message
                </button>
            </div>

            {/* Search + Filter */}
            <div className="flex flex-wrap gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Search message"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="px-4 py-2 border rounded w-full md:w-1/3 dark:bg-gray-800 dark:text-white"
                />
                <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
                >
                    <option value="">All Types</option>
                    <option value="Emergency">Emergency</option>
                    <option value="Info">Info</option>
                    <option value="Maintenance">Maintenance</option>
                </select>
            </div>

            {/* Messages Table */}
            <div className="overflow-x-auto rounded-lg shadow bg-white dark:bg-gray-800">
                <table className="min-w-full text-sm text-left text-gray-900 dark:text-white">
                    <thead className="bg-gray-100 dark:bg-gray-700 text-xs uppercase">
                        <tr>
                            <th className="px-4 py-2">Type</th>
                            <th className="px-4 py-2">Message</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMessages.length > 0 ? (
                            filteredMessages.map((msg, i) => (
                                <tr
                                    key={i}
                                    className="border-b dark:border-gray-600"
                                >
                                    <td className="px-4 py-2">{msg.type}</td>
                                    <td className="px-4 py-2">{msg.content}</td>
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
                                    No messages found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 w-full sm:w-[400px] h-full bg-white dark:bg-gray-900 z-50 shadow-lg transition-transform duration-300 ${
                    drawerOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
                    <h2 className="text-lg font-bold">
                        {editIndex !== null ? "Edit Message" : "Add Message"}
                    </h2>
                    <button
                        onClick={() => {
                            setDrawerOpen(false);
                            resetForm();
                        }}
                        className="text-gray-600 dark:text-gray-300 hover:text-red-600"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <div>
                        <label>Type</label>
                        <select
                            name="type"
                            value={form.type}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
                        >
                            <option value="Emergency">Emergency</option>
                            <option value="Info">Info</option>
                            <option value="Maintenance">Maintenance</option>
                        </select>
                    </div>

                    <div>
                        <label>Message</label>
                        <textarea
                            name="content"
                            rows="4"
                            value={form.content}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
                    >
                        {editIndex !== null ? "Update Message" : "Post Message"}
                    </button>
                </form>
            </div>
        </div>
    );
}

ControlRoom.layout = (page) => <AdminLayout>{page}</AdminLayout>;
