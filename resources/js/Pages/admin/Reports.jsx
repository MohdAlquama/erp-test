import React, { useState } from "react";
import AdminLayout from "../../Layouts/AdminLayout";
import { Eye, Plus } from "lucide-react";
import toast from "react-hot-toast";

export default function Reports() {
    const [reports, setReports] = useState([
        {
            id: 1,
            title: "Student Performance",
            category: "Academic",
            date: "2025-07-15",
            summary: "Performance analysis of students in Term 1.",
        },
        {
            id: 2,
            title: "Finance Summary",
            category: "Finance",
            date: "2025-07-10",
            summary: "Quarterly revenue and expense overview.",
        },
    ]);

    const [form, setForm] = useState({
        title: "",
        category: "",
        summary: "",
        date: "",
    });

    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [selectedReport, setSelectedReport] = useState(null);
    const [showFormDrawer, setShowFormDrawer] = useState(false);

    const filteredReports = reports.filter((report) => {
        const matchesSearch = report.title
            .toLowerCase()
            .includes(search.toLowerCase());
        const matchesCategory = categoryFilter
            ? report.category === categoryFilter
            : true;
        return matchesSearch && matchesCategory;
    });

    const uniqueCategories = [...new Set(reports.map((r) => r.category))];

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.title || !form.category || !form.date || !form.summary) {
            toast.error("All fields are required");
            return;
        }

        setReports([
            ...reports,
            {
                ...form,
                id: reports.length + 1,
            },
        ]);

        toast.success("Report uploaded successfully!");
        setForm({ title: "", category: "", summary: "", date: "" });
        setShowFormDrawer(false);
    };

    return (
        <div className="p-6 bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white relative">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Reports</h1>
                <button
                    onClick={() => setShowFormDrawer(true)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Upload Report
                </button>
            </div>

            {/* Filter */}
            <div className="flex flex-wrap gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search by title"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="px-4 py-2 border rounded w-full md:w-1/3 dark:bg-gray-800 dark:text-white dark:border-gray-600"
                />
                <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="px-4 py-2 border rounded w-full md:w-1/4 dark:bg-gray-800 dark:text-white dark:border-gray-600"
                >
                    <option value="">All Categories</option>
                    {uniqueCategories.map((cat, i) => (
                        <option key={i} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-100 dark:bg-gray-700 text-xs uppercase">
                        <tr>
                            <th className="px-4 py-2">Title</th>
                            <th className="px-4 py-2">Category</th>
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredReports.length > 0 ? (
                            filteredReports.map((report) => (
                                <tr
                                    key={report.id}
                                    className="border-b border-gray-200 dark:border-gray-600"
                                >
                                    <td className="px-4 py-2">
                                        {report.title}
                                    </td>
                                    <td className="px-4 py-2">
                                        {report.category}
                                    </td>
                                    <td className="px-4 py-2">{report.date}</td>
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() =>
                                                setSelectedReport(report)
                                            }
                                            className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                                        >
                                            <Eye className="w-4 h-4" />
                                            View
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
                                    No reports found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* View Modal */}
            {selectedReport && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-lg shadow-lg p-6 relative">
                        <button
                            onClick={() => setSelectedReport(null)}
                            className="absolute top-2 right-2 text-gray-600 dark:text-gray-300 hover:text-red-600"
                        >
                            ✕
                        </button>
                        <h2 className="text-xl font-bold mb-2">
                            {selectedReport.title}
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            Category: {selectedReport.category}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Date: {selectedReport.date}
                        </p>
                        <p className="text-base text-gray-800 dark:text-gray-200">
                            {selectedReport.summary}
                        </p>
                    </div>
                </div>
            )}

            {/* Drawer Form */}
            <div
                className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white dark:bg-gray-900 shadow-xl transition-transform duration-300 z-50 ${
                    showFormDrawer ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                        Upload Report
                    </h2>
                    <button
                        onClick={() => setShowFormDrawer(false)}
                        className="text-gray-600 dark:text-gray-300 hover:text-red-600"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Report Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            className="mt-1 w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-600"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Category
                        </label>
                        <input
                            type="text"
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            className="mt-1 w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-600"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Date
                        </label>
                        <input
                            type="date"
                            name="date"
                            value={form.date}
                            onChange={handleChange}
                            className="mt-1 w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-600"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Summary
                        </label>
                        <textarea
                            name="summary"
                            rows="4"
                            value={form.summary}
                            onChange={handleChange}
                            className="mt-1 w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-600"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-indigo-600 text-white w-full py-2 rounded hover:bg-indigo-700"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

Reports.layout = (page) => <AdminLayout>{page}</AdminLayout>;
