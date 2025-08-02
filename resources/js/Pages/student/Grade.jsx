import { useState } from "react";
import StudentLayout from "@/Layouts/StudentLayout";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

const dummyGrades = [
    { id: 1, course: "Mathematics", class: "6", grade: "A" },
    { id: 2, course: "Science", class: "6", grade: "B+" },
    { id: 3, course: "English", class: "7", grade: "A-" },
    { id: 4, course: "Social Studies", class: "7", grade: "A+" },
    { id: 5, course: "Hindi", class: "8", grade: "B" },
    { id: 6, course: "Computer", class: "8", grade: "A" },
    { id: 7, course: "Math", class: "6", grade: "C+" },
];

const gradePoints = {
    "A+": 10,
    A: 9,
    "A-": 8.5,
    "B+": 8,
    B: 7,
    "C+": 6,
};

export default function Grade() {
    const [grades] = useState(dummyGrades);
    const [classFilter, setClassFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const filteredGrades = grades.filter(
        (grade) => classFilter === "All" || grade.class === classFilter
    );

    const totalPages = Math.ceil(filteredGrades.length / itemsPerPage);
    const currentGrades = filteredGrades.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const chartData = filteredGrades.map((grade) => ({
        course: grade.course,
        grade: grade.grade,
        gradePoint: gradePoints[grade.grade] || 0,
    }));

    return (
        <StudentLayout>
            <div className="backdrop-blur-md bg-white/40 dark:bg-gray-900/40 p-6 rounded-xl shadow-lg border dark:border-gray-700">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                        My Grades
                    </h2>

                    <select
                        value={classFilter}
                        onChange={(e) => {
                            setClassFilter(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="border px-3 py-2 rounded dark:bg-gray-800 dark:text-white shadow hover:border-indigo-500"
                    >
                        <option value="All">All Classes</option>
                        {Array.from({ length: 12 }, (_, i) => (
                            <option key={i + 1} value={i + 1}>
                                Class {i + 1}
                            </option>
                        ))}
                    </select>
                </div>

                <table className="w-full text-left rounded overflow-hidden shadow-lg">
                    <thead>
                        <tr className="bg-indigo-100 dark:bg-gray-700 text-indigo-800 dark:text-white">
                            <th className="p-3">Course</th>
                            <th className="p-3">Class</th>
                            <th className="p-3">Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentGrades.length > 0 ? (
                            currentGrades.map((grade) => (
                                <tr
                                    key={grade.id}
                                    className="hover:bg-indigo-50 dark:hover:bg-gray-800 transition"
                                >
                                    <td className="p-3 text-gray-700 dark:text-white">
                                        {grade.course}
                                    </td>
                                    <td className="p-3 text-gray-700 dark:text-white">
                                        Class {grade.class}
                                    </td>
                                    <td className="p-3 text-gray-700 dark:text-white">
                                        {grade.grade}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="3"
                                    className="text-center text-gray-500 dark:text-gray-300 py-4"
                                >
                                    No grades found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="flex justify-end items-center gap-3 mt-4">
                    <button
                        onClick={() =>
                            setCurrentPage((p) => Math.max(p - 1, 1))
                        }
                        disabled={currentPage === 1}
                        className="px-3 py-1 bg-indigo-600 text-white rounded disabled:opacity-50"
                    >
                        Prev
                    </button>
                    <span className="text-gray-800 dark:text-white">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() =>
                            setCurrentPage((p) => Math.min(p + 1, totalPages))
                        }
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 bg-indigo-600 text-white rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>

                {/* Chart */}
                <div className="mt-10">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                        Grades by Course
                    </h3>
                    <div className="h-72 bg-white/20 dark:bg-gray-800/40 rounded-xl shadow-inner p-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="course" />
                                <YAxis domain={[0, 10]} />
                                <Tooltip />
                                <Bar dataKey="gradePoint" fill="#6366f1" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </StudentLayout>
    );
}
