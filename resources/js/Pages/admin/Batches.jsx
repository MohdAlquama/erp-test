import React, { useState } from "react";
import AdminLayout from "../../Layouts/AdminLayout";
import { Pencil, Trash, Plus } from "lucide-react";
import toast from "react-hot-toast";

export default function Batches() {
    const [type, setType] = useState("school");
    const [batches, setBatches] = useState([]);
    const [form, setForm] = useState({
        name: "",
        grade: "",
        section: "",
        department: "",
        semester: "",
    });
    const [editIndex, setEditIndex] = useState(null);
    const [showDrawer, setShowDrawer] = useState(false);
    const [search, setSearch] = useState("");
    const [filterType, setFilterType] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const resetForm = () => {
        setForm({
            name: "",
            grade: "",
            section: "",
            department: "",
            semester: "",
        });
        setEditIndex(null);
        setType("school");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const batch = {
            type,
            name: form.name,
            ...(type === "school"
                ? { grade: form.grade, section: form.section }
                : { department: form.department, semester: form.semester }),
        };

        if (!form.name.trim()) {
            toast.error("Batch name is required");
            return;
        }

        if (editIndex !== null) {
            const updated = [...batches];
            updated[editIndex] = batch;
            setBatches(updated);
            toast.success("Batch updated");
        } else {
            setBatches([...batches, batch]);
            toast.success("Batch added");
        }

        resetForm();
        setShowDrawer(false);
    };

    const handleEdit = (index) => {
        const selected = batches[index];
        setType(selected.type);
        setForm({
            name: selected.name,
            grade: selected.grade || "",
            section: selected.section || "",
            department: selected.department || "",
            semester: selected.semester || "",
        });
        setEditIndex(index);
        setShowDrawer(true);
    };

    const handleDelete = (index) => {
        if (window.confirm("Are you sure to delete this batch?")) {
            const updated = batches.filter((_, i) => i !== index);
            setBatches(updated);
            toast.success("Batch deleted");
        }
    };

    const filteredBatches = batches.filter((b) => {
        const matchesSearch = b.name
            .toLowerCase()
            .includes(search.toLowerCase());
        const matchesType = filterType ? b.type === filterType : true;
        return matchesSearch && matchesType;
    });

    return (
        <div className="p-6 bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white relative">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Batches</h1>
                <button
                    onClick={() => setShowDrawer(true)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Add Batch
                </button>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-wrap gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Search by batch name"
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
                    <option value="school">School</option>
                    <option value="college">College</option>
                </select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
                <table className="min-w-full text-sm text-left text-gray-800 dark:text-white">
                    <thead className="bg-gray-100 dark:bg-gray-700 text-xs uppercase">
                        <tr>
                            <th className="px-4 py-2">Type</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Details</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBatches.length > 0 ? (
                            filteredBatches.map((batch, i) => (
                                <tr
                                    key={i}
                                    className="border-b border-gray-200 dark:border-gray-600"
                                >
                                    <td className="px-4 py-2 capitalize">
                                        {batch.type}
                                    </td>
                                    <td className="px-4 py-2">{batch.name}</td>
                                    <td className="px-4 py-2">
                                        {batch.type === "school"
                                            ? `Grade: ${batch.grade}, Section: ${batch.section}`
                                            : `Dept: ${batch.department}, Sem: ${batch.semester}`}
                                    </td>
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
                                    colSpan="4"
                                    className="px-4 py-4 text-center text-gray-500 dark:text-gray-400"
                                >
                                    No batches found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* === Drawer Form === */}
            <div
                className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white dark:bg-gray-900 shadow-xl transition-transform duration-300 z-50 ${
                    showDrawer ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                        {editIndex !== null ? "Edit Batch" : "Add Batch"}
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
                    <div className="flex gap-4">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                value="school"
                                checked={type === "school"}
                                onChange={() => setType("school")}
                            />
                            <span>School</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                value="college"
                                checked={type === "college"}
                                onChange={() => setType("college")}
                            />
                            <span>College</span>
                        </label>
                    </div>

                    <div>
                        <label>Batch Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
                        />
                    </div>

                    {type === "school" ? (
                        <>
                            <div>
                                <label>Grade</label>
                                <input
                                    type="text"
                                    name="grade"
                                    value={form.grade}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
                                />
                            </div>
                            <div>
                                <label>Section</label>
                                <input
                                    type="text"
                                    name="section"
                                    value={form.section}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <label>Department</label>
                                <input
                                    type="text"
                                    name="department"
                                    value={form.department}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
                                />
                            </div>
                            <div>
                                <label>Semester</label>
                                <input
                                    type="text"
                                    name="semester"
                                    value={form.semester}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
                                />
                            </div>
                        </>
                    )}

                    <button
                        type="submit"
                        className="bg-indigo-600 text-white w-full py-2 rounded hover:bg-indigo-700"
                    >
                        {editIndex !== null ? "Update Batch" : "Create Batch"}
                    </button>
                </form>
            </div>
        </div>
    );
}

Batches.layout = (page) => <AdminLayout>{page}</AdminLayout>;
