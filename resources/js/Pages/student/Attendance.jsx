"use client";

import StudentLayout from "@/Layouts/StudentLayout";
import { CalendarDays, Search } from "lucide-react";
import { useState } from "react";
import {
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Legend,
    CartesianGrid,
} from "recharts";

const attendanceData = [
    { date: "2025-07-01", subject: "Mathematics", status: "Present" },
    { date: "2025-07-02", subject: "Physics", status: "Absent" },
    { date: "2025-07-03", subject: "Chemistry", status: "Present" },
    { date: "2025-07-04", subject: "Computer Science", status: "Present" },
    { date: "2025-07-05", subject: "English", status: "Absent" },
    { date: "2025-07-06", subject: "Physics", status: "Present" },
    { date: "2025-07-07", subject: "Mathematics", status: "Absent" },
    { date: "2025-07-08", subject: "English", status: "Present" },
    { date: "2025-07-09", subject: "Computer Science", status: "Absent" },
    { date: "2025-07-10", subject: "Mathematics", status: "Present" },
];

const COLORS = ["#22c55e", "#ef4444"];

export default function Attendance() {
    const [subjectFilter, setSubjectFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedMonth, setSelectedMonth] = useState("2025-07");
    const pageSize = 5;

    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
        setCurrentPage(1);
    };

    const monthlyFilteredData = attendanceData.filter((record) =>
        record.date.startsWith(selectedMonth)
    );

    const filteredData = monthlyFilteredData.filter((record) => {
        const subjectMatch = subjectFilter
            ? record.subject.toLowerCase().includes(subjectFilter.toLowerCase())
            : true;
        const statusMatch = statusFilter
            ? record.status === statusFilter
            : true;
        return subjectMatch && statusMatch;
    });

    const pageCount = Math.ceil(filteredData.length / pageSize);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const handlePageChange = (page) => {
        if (page >= 1 && page <= pageCount) setCurrentPage(page);
    };

    const pieData = [
        {
            name: "Present",
            value: attendanceData.filter((d) => d.status === "Present").length,
        },
        {
            name: "Absent",
            value: attendanceData.filter((d) => d.status === "Absent").length,
        },
    ];

    const subjectAbbrMap = {
        Mathematics: "Math",
        Science: "Sci",
        English: "Eng",
        Chemistry: "Chem",
        Physics: "Phys",
        "Computer Science": "CS",
    };

    const barData = Object.values(
        attendanceData.reduce((acc, record) => {
            const subj = record.subject;
            if (!acc[subj]) {
                acc[subj] = {
                    subject: subj,
                    abbr: subjectAbbrMap[subj] || subj.slice(0, 4),
                    Present: 0,
                    Absent: 0,
                };
            }
            acc[subj][record.status] += 1;
            return acc;
        }, {})
    );

    return (
        <StudentLayout>
            <div className="mb-6 flex items-center gap-2">
                <CalendarDays className="w-6 h-6 text-indigo-600" />
                <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
                    Attendance Record
                </h1>
            </div>

            {/* Charts */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="p-4 bg-white/30 dark:bg-white/10 backdrop-blur-lg shadow-lg rounded-xl border border-white/20">
                    <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-white">
                        Overall Attendance Summary
                    </h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                label
                            >
                                {pieData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="p-4 bg-white/30 dark:bg-white/10 backdrop-blur-lg shadow-lg rounded-xl border border-white/20">
                    <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-white">
                        Subject-wise Attendance
                    </h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={barData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="abbr"
                                interval={0}
                                angle={-45}
                                textAnchor="end"
                            />
                            <YAxis />
                            <Tooltip
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        const data = payload[0].payload;
                                        return (
                                            <div className="bg-white border px-3 py-2 rounded shadow text-sm">
                                                <p className="font-semibold">
                                                    {data.subject}
                                                </p>
                                                <p>Present: {data.Present}</p>
                                                <p>Absent: {data.Absent}</p>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <Legend />
                            <Bar dataKey="Present" fill="#22c55e" />
                            <Bar dataKey="Absent" fill="#ef4444" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Filter by subject..."
                        className="px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-700"
                        value={subjectFilter}
                        onChange={(e) => {
                            setSubjectFilter(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                </div>

                <select
                    value={statusFilter}
                    onChange={(e) => {
                        setStatusFilter(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-700"
                >
                    <option value="">All Status</option>
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                </select>

                <select
                    value={selectedMonth}
                    onChange={handleMonthChange}
                    className="px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-700"
                >
                    <option value="2025-07">July 2025</option>
                    <option value="2025-06">June 2025</option>
                    <option value="2025-05">May 2025</option>
                </select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-xl shadow-md bg-white dark:bg-gray-800">
                <table className="min-w-full table-auto border-collapse">
                    <thead className="bg-gray-100 dark:bg-gray-700">
                        <tr className="text-left text-gray-600 dark:text-gray-300">
                            <th className="p-4">Date</th>
                            <th className="p-4">Subject</th>
                            <th className="p-4">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((record, index) => (
                            <tr
                                key={index}
                                className="border-t dark:border-gray-700 text-gray-700 dark:text-gray-200"
                            >
                                <td className="p-4">{record.date}</td>
                                <td className="p-4">{record.subject}</td>
                                <td className="p-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                                            record.status === "Present"
                                                ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                                                : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                                        }`}
                                    >
                                        {record.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {paginatedData.length === 0 && (
                            <tr>
                                <td
                                    colSpan="3"
                                    className="p-4 text-center text-gray-500"
                                >
                                    No records found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6 space-x-2">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 text-sm rounded-md border border-gray-300 dark:border-gray-600 dark:text-white"
                >
                    Prev
                </button>
                {Array.from({ length: pageCount }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => handlePageChange(i + 1)}
                        className={`px-3 py-1 text-sm rounded-md ${
                            currentPage === i + 1
                                ? "bg-indigo-600 text-white"
                                : "border border-gray-300 dark:border-gray-600 dark:text-white"
                        }`}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === pageCount}
                    className="px-3 py-1 text-sm rounded-md border border-gray-300 dark:border-gray-600 dark:text-white"
                >
                    Next
                </button>
            </div>
        </StudentLayout>
    );
}
