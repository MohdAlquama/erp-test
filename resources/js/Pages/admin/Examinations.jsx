import React, { useState } from "react";

export default function Examinations() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [exams, setExams] = useState([]);
    const [mode, setMode] = useState("school"); // 'school' or 'college'
    const [form, setForm] = useState({
        name: "",
        grade: "",
        semester: "",
        section: "",
        branch: "",
        subject: "",
        date: "",
        time: "",
        duration: "",
    });
    const [searchQuery, setSearchQuery] = useState("");
    const [gradeFilter, setGradeFilter] = useState("");
    const [semesterFilter, setSemesterFilter] = useState("");
    const [sectionFilter, setSectionFilter] = useState("");
    const [branchFilter, setBranchFilter] = useState("");
    const [editIndex, setEditIndex] = useState(null);

    const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            ...form,
            mode,
        };

        if (editIndex !== null) {
            const updated = [...exams];
            updated[editIndex] = data;
            setExams(updated);
            setEditIndex(null);
        } else {
            setExams([...exams, data]);
        }

        setForm({
            name: "",
            grade: "",
            semester: "",
            section: "",
            branch: "",
            subject: "",
            date: "",
            time: "",
            duration: "",
        });
        setIsDrawerOpen(false);
    };

    const handleEdit = (index) => {
        setForm(exams[index]);
        setMode(exams[index].mode || "school");
        setEditIndex(index);
        setIsDrawerOpen(true);
    };

    const handleDelete = (index) => {
        const updated = exams.filter((_, i) => i !== index);
        setExams(updated);
    };

    const handleView = (exam) => {
        const info =
            exam.mode === "college"
                ? `Semester: ${exam.semester}\nBranch: ${exam.branch}`
                : `Grade: ${exam.grade}\nSection: ${exam.section}`;

        alert(`
Exam Name: ${exam.name}
${info}
Subject: ${exam.subject}
Date: ${exam.date}
Time: ${exam.time}
Duration: ${exam.duration} mins
        `);
    };

    const filteredExams = exams.filter((exam) => {
        const matchesSearch =
            exam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            exam.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (exam.mode === "school"
                ? exam.section
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                  exam.grade.toLowerCase().includes(searchQuery.toLowerCase())
                : exam.branch
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                  exam.semester
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()));

        const matchesMode = exam.mode === mode;

        const matchesGrade =
            mode === "school"
                ? !gradeFilter || exam.grade === gradeFilter
                : true;

        const matchesSection =
            mode === "school"
                ? !sectionFilter || exam.section === sectionFilter
                : true;

        const matchesSemester =
            mode === "college"
                ? !semesterFilter || exam.semester === semesterFilter
                : true;

        const matchesBranch =
            mode === "college"
                ? !branchFilter || exam.branch === branchFilter
                : true;

        return (
            matchesSearch &&
            matchesMode &&
            matchesGrade &&
            matchesSection &&
            matchesSemester &&
            matchesBranch
        );
    });

    const uniqueGrades = [
        ...new Set(
            exams.filter((e) => e.mode === "school").map((e) => e.grade)
        ),
    ];
    const uniqueSections = [
        ...new Set(
            exams.filter((e) => e.mode === "school").map((e) => e.section)
        ),
    ];
    const uniqueSemesters = [
        ...new Set(
            exams.filter((e) => e.mode === "college").map((e) => e.semester)
        ),
    ];
    const uniqueBranches = [
        ...new Set(
            exams.filter((e) => e.mode === "college").map((e) => e.branch)
        ),
    ];

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                        Examination Management
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300">
                        Schedule exams for both School and College
                    </p>
                </div>
                <button
                    onClick={() => {
                        setForm({
                            name: "",
                            grade: "",
                            semester: "",
                            section: "",
                            branch: "",
                            subject: "",
                            date: "",
                            time: "",
                            duration: "",
                        });
                        setEditIndex(null);
                        toggleDrawer();
                    }}
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                    + Schedule New Exam
                </button>
            </div>

            {/* Mode Switch */}
            <div className="mb-4">
                <label className="mr-2 font-medium">Select Mode:</label>
                <select
                    value={mode}
                    onChange={(e) => setMode(e.target.value)}
                    className="px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
                >
                    <option value="school">School</option>
                    <option value="college">College</option>
                </select>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Search exams..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
                />

                {mode === "school" && (
                    <>
                        <select
                            value={gradeFilter}
                            onChange={(e) => setGradeFilter(e.target.value)}
                            className="px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
                        >
                            <option value="">All Grades</option>
                            {uniqueGrades.map((g, i) => (
                                <option key={i} value={g}>
                                    {g}
                                </option>
                            ))}
                        </select>

                        <select
                            value={sectionFilter}
                            onChange={(e) => setSectionFilter(e.target.value)}
                            className="px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
                        >
                            <option value="">All Sections</option>
                            {uniqueSections.map((s, i) => (
                                <option key={i} value={s}>
                                    {s}
                                </option>
                            ))}
                        </select>
                    </>
                )}

                {mode === "college" && (
                    <>
                        <select
                            value={semesterFilter}
                            onChange={(e) => setSemesterFilter(e.target.value)}
                            className="px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
                        >
                            <option value="">All Semesters</option>
                            {uniqueSemesters.map((s, i) => (
                                <option key={i} value={s}>
                                    {s}
                                </option>
                            ))}
                        </select>

                        <select
                            value={branchFilter}
                            onChange={(e) => setBranchFilter(e.target.value)}
                            className="px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
                        >
                            <option value="">All Branches</option>
                            {uniqueBranches.map((b, i) => (
                                <option key={i} value={b}>
                                    {b}
                                </option>
                            ))}
                        </select>
                    </>
                )}
            </div>

            {/* Table */}
            {filteredExams.length > 0 ? (
                <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
                    <table className="min-w-full text-sm text-left text-gray-800 dark:text-gray-200">
                        <thead className="bg-gray-100 dark:bg-gray-700 text-xs uppercase">
                            <tr>
                                <th className="px-4 py-2">Exam Name</th>
                                <th className="px-4 py-2">
                                    {mode === "college" ? "Semester" : "Grade"}
                                </th>
                                <th className="px-4 py-2">
                                    {mode === "college" ? "Branch" : "Section"}
                                </th>
                                <th className="px-4 py-2">Subject</th>
                                <th className="px-4 py-2">Date</th>
                                <th className="px-4 py-2">Time</th>
                                <th className="px-4 py-2">Duration</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredExams.map((exam, index) => (
                                <tr
                                    key={index}
                                    className="border-b border-gray-200 dark:border-gray-700"
                                >
                                    <td className="px-4 py-2">{exam.name}</td>
                                    <td className="px-4 py-2">
                                        {mode === "college"
                                            ? exam.semester
                                            : exam.grade}
                                    </td>
                                    <td className="px-4 py-2">
                                        {mode === "college"
                                            ? exam.branch
                                            : exam.section}
                                    </td>
                                    <td className="px-4 py-2">
                                        {exam.subject}
                                    </td>
                                    <td className="px-4 py-2">{exam.date}</td>
                                    <td className="px-4 py-2">{exam.time}</td>
                                    <td className="px-4 py-2">
                                        {exam.duration} mins
                                    </td>
                                    <td className="px-4 py-2 flex gap-2">
                                        <button
                                            onClick={() => handleView(exam)}
                                            className="text-blue-600 hover:underline"
                                        >
                                            View
                                        </button>
                                        <button
                                            onClick={() => handleEdit(index)}
                                            className="text-yellow-600 hover:underline"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(index)}
                                            className="text-red-600 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-gray-600 dark:text-gray-400 mt-6">
                    No exams scheduled yet.
                </p>
            )}

            {/* Drawer Form */}
            {isDrawerOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/40 z-30"
                        onClick={toggleDrawer}
                    />
                    <div className="fixed right-0 top-[64px] h-[calc(100%-64px)] w-full max-w-md bg-white dark:bg-gray-900 shadow-lg z-40 p-6 overflow-y-auto">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold dark:text-white">
                                {editIndex !== null
                                    ? "Edit Exam"
                                    : "Schedule New Exam"}
                            </h2>
                            <button
                                onClick={toggleDrawer}
                                className="text-gray-500 hover:text-red-600"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                name="name"
                                type="text"
                                placeholder="Exam Name"
                                value={form.name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-white"
                                required
                            />

                            {mode === "school" ? (
                                <>
                                    <input
                                        name="grade"
                                        type="text"
                                        placeholder="Grade (e.g., 10th)"
                                        value={form.grade}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-white"
                                        required
                                    />
                                    <input
                                        name="section"
                                        type="text"
                                        placeholder="Section (e.g., A)"
                                        value={form.section}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-white"
                                        required
                                    />
                                </>
                            ) : (
                                <>
                                    <select
                                        name="semester"
                                        value={form.semester}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-white"
                                        required
                                    >
                                        <option value="">
                                            Select Semester
                                        </option>
                                        {[
                                            "1st",
                                            "2nd",
                                            "3rd",
                                            "4th",
                                            "5th",
                                            "6th",
                                            "7th",
                                            "8th",
                                        ].map((sem) => (
                                            <option key={sem} value={sem}>
                                                {sem}
                                            </option>
                                        ))}
                                    </select>

                                    <select
                                        name="branch"
                                        value={form.branch}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-white"
                                        required
                                    >
                                        <option value="">Select Branch</option>
                                        {[
                                            "CSE",
                                            "IT",
                                            "ECE",
                                            "EEE",
                                            "ME",
                                            "CE",
                                            "AI-ML",
                                            "Data Science",
                                        ].map((branch) => (
                                            <option key={branch} value={branch}>
                                                {branch}
                                            </option>
                                        ))}
                                    </select>
                                </>
                            )}

                            <input
                                name="subject"
                                type="text"
                                placeholder="Subject"
                                value={form.subject}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-white"
                                required
                            />

                            <input
                                name="date"
                                type="date"
                                value={form.date}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-white"
                                required
                            />
                            <input
                                name="time"
                                type="time"
                                value={form.time}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-white"
                                required
                            />
                            <input
                                name="duration"
                                type="number"
                                placeholder="Duration (mins)"
                                value={form.duration}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-white"
                                required
                            />

                            <button
                                type="submit"
                                className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
                            >
                                {editIndex !== null
                                    ? "Update Exam"
                                    : "Save Exam"}
                            </button>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
}

// Use layout
import AdminLayout from "@/Layouts/AdminLayout";
Examinations.layout = (page) => <AdminLayout>{page}</AdminLayout>;
