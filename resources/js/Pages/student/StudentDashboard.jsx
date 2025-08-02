"use client";

import StudentLayout from "@/Layouts/StudentLayout";
import {
    CalendarCheck,
    BookOpen,
    GraduationCap,
    Bell,
    User,
} from "lucide-react";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";

export default function StudentDashboard() {
    const stats = [
        {
            title: "Attendance",
            icon: (
                <CalendarCheck className="h-8 w-8 text-indigo-500 dark:text-indigo-400" />
            ),
            description: "See your school attendance",
            href: "/student/attendance",
        },
        {
            title: "Subjects",
            icon: (
                <BookOpen className="h-8 w-8 text-indigo-500 dark:text-indigo-400" />
            ),
            description: "Look at your subjects",
            href: "/student/subjects",
        },
        {
            title: "Report Card",
            icon: (
                <GraduationCap className="h-8 w-8 text-indigo-500 dark:text-indigo-400" />
            ),
            description: "Check your marks and progress",
            href: "/student/report-card",
        },
        {
            title: "Notices",
            icon: (
                <Bell className="h-8 w-8 text-indigo-500 dark:text-indigo-400" />
            ),
            description: "School announcements & alerts",
            href: "/student/notices",
        },
        {
            title: "My Profile",
            icon: (
                <User className="h-8 w-8 text-indigo-500 dark:text-indigo-400" />
            ),
            description: "Update your info",
            href: "/student/profile",
        },
    ];

    const attendanceData = [
        { date: "Mon", attendance: 100 },
        { date: "Tue", attendance: 95 },
        { date: "Wed", attendance: 90 },
        { date: "Thu", attendance: 100 },
        { date: "Fri", attendance: 85 },
    ];

    const gradeData = [
        { subject: "Math", marks: 90 },
        { subject: "Science", marks: 85 },
        { subject: "English", marks: 75 },
        { subject: "Art", marks: 95 },
    ];

    const subjectProgress = [
        { name: "Completed", value: 6 },
        { name: "Ongoing", value: 3 },
        { name: "Not Started", value: 1 },
    ];

    const COLORS = ["#4f46e5", "#22c55e", "#0ea5e9"];

    return (
        <StudentLayout>
            <div className="pt-6">
                {/* Student Info Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {stats.map((item, idx) => (
                        <a
                            key={idx}
                            href={item.href}
                            className="p-6 rounded-2xl shadow-lg backdrop-blur-lg bg-white/30 dark:bg-white/10 hover:shadow-xl transition-all duration-300 flex items-center gap-4 group"
                        >
                            <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full">
                                {item.icon}
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold group-hover:text-indigo-600 dark:group-hover:text-indigo-300">
                                    {item.title}
                                </h2>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    {item.description}
                                </p>
                            </div>
                        </a>
                    ))}
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Attendance Line Chart */}
                    <div className="p-6 rounded-2xl backdrop-blur-lg bg-white/30 dark:bg-white/10 shadow-lg">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
                            Attendance This Week
                        </h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={attendanceData}>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#ccc"
                                />
                                <XAxis dataKey="date" stroke="#8884d8" />
                                <YAxis domain={[0, 100]} stroke="#8884d8" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#1f2937",
                                        border: "none",
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="attendance"
                                    stroke="#60a5fa"
                                    strokeWidth={3}
                                    dot={{ r: 5 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Marks Bar Chart */}
                    <div className="p-6 rounded-2xl backdrop-blur-lg bg-white/30 dark:bg-white/10 shadow-lg">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
                            Marks by Subject
                        </h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={gradeData}>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#ccc"
                                />
                                <XAxis dataKey="subject" stroke="#8884d8" />
                                <YAxis domain={[0, 100]} stroke="#8884d8" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#1f2937",
                                        border: "none",
                                    }}
                                />
                                <Bar dataKey="marks" fill="#22d3ee" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Subject Progress Pie Chart */}
                    <div className="p-6 rounded-2xl backdrop-blur-lg bg-white/30 dark:bg-white/10 shadow-lg col-span-1 md:col-span-2">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
                            Subject Progress
                        </h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={subjectProgress}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) =>
                                        `${name} (${(percent * 100).toFixed(
                                            0
                                        )}%)`
                                    }
                                    outerRadius={80}
                                    dataKey="value"
                                >
                                    {subjectProgress.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#1f2937",
                                        border: "none",
                                    }}
                                />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </StudentLayout>
    );
}
