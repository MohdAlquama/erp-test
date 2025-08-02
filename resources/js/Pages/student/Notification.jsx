import { useState } from "react";
import { Bell } from "lucide-react";
import StudentLayout from "@/Layouts/StudentLayout";

const dummyNotifications = [
    {
        id: 1,
        title: "Class rescheduled",
        message: "Math class moved to 10:00 AM",
        read: false,
    },
    {
        id: 2,
        title: "Exam Reminder",
        message: "Science exam on Monday",
        read: true,
    },
    {
        id: 3,
        title: "PTM Notice",
        message: "Parent-Teacher Meeting this Friday",
        read: false,
    },
    {
        id: 4,
        title: "Library Book Due",
        message: "Return your book by tomorrow",
        read: true,
    },
    {
        id: 5,
        title: "Holiday Notice",
        message: "School will remain closed on Thursday",
        read: false,
    },
    {
        id: 6,
        title: "Sports Day",
        message: "Practice session tomorrow at 4 PM",
        read: false,
    },
];

export default function Notification() {
    const [notifications, setNotifications] = useState(dummyNotifications);
    const [filter, setFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const filteredNotifications = notifications.filter((notif) => {
        if (filter === "All") return true;
        if (filter === "Unread") return !notif.read;
        if (filter === "Read") return notif.read;
    });

    const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);
    const currentNotifications = filteredNotifications.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const markAsRead = (id) => {
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, read: true } : n))
        );
    };

    return (
        <StudentLayout>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                        <Bell className="w-6 h-6" /> Notifications
                    </h2>
                    <select
                        className="border px-3 py-1 rounded dark:bg-gray-700 dark:text-white"
                        value={filter}
                        onChange={(e) => {
                            setFilter(e.target.value);
                            setCurrentPage(1);
                        }}
                    >
                        <option value="All">All</option>
                        <option value="Unread">Unread</option>
                        <option value="Read">Read</option>
                    </select>
                </div>

                <ul className="space-y-4">
                    {currentNotifications.length > 0 ? (
                        currentNotifications.map((notif) => (
                            <li
                                key={notif.id}
                                className={`
                                    p-5 transition-all duration-300
                                    rounded-xl border shadow-md backdrop-blur-lg 
                                    hover:scale-[1.01] hover:shadow-xl 
                                    ${
                                        notif.read
                                            ? "bg-white/30 dark:bg-white/10 border-gray-300 dark:border-gray-600"
                                            : "bg-indigo-100/50 dark:bg-indigo-600/30 border-indigo-300 dark:border-indigo-500"
                                    }
                                `}
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                                            {notif.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            {notif.message}
                                        </p>
                                    </div>
                                    {!notif.read && (
                                        <button
                                            onClick={() => markAsRead(notif.id)}
                                            className="text-sm text-indigo-600 dark:text-indigo-300 underline mt-1"
                                        >
                                            Mark as read
                                        </button>
                                    )}
                                </div>
                            </li>
                        ))
                    ) : (
                        <li className="text-center text-gray-500 dark:text-gray-300 py-4">
                            No notifications.
                        </li>
                    )}
                </ul>

                {/* Pagination */}
                <div className="flex justify-end items-center gap-3 mt-6">
                    <button
                        onClick={() =>
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
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
                            setCurrentPage((prev) =>
                                Math.min(prev + 1, totalPages)
                            )
                        }
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 bg-indigo-600 text-white rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </StudentLayout>
    );
}
