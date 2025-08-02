"use client";

import {
    Menu,
    Bell,
    Search,
    ChevronDown,
    Moon,
    Sun,
    CircleDot,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { router } from "@inertiajs/react";

export function StudentHeader({ toggleSidebar }) {
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [theme, setTheme] = useState("light");

    const dropdownRef = useRef(null);
    const notifRef = useRef(null);

    // Demo notifications
    const notifications = [
        "Assignment deadline extended",
        "New course material uploaded",
        "Exam schedule released",
    ];

    // Search suggestions demo
    const allItems = [
        "Web Development",
        "DBMS",
        "Soft Computing",
        "Profile Settings",
        "Attendance Report",
        "Grade Card",
    ];

    // Detect dark mode preference
    useEffect(() => {
        if (document.documentElement.classList.contains("dark")) {
            setTheme("dark");
        }
    }, []);

    const toggleTheme = () => {
        if (theme === "light") {
            document.documentElement.classList.add("dark");
            setTheme("dark");
        } else {
            document.documentElement.classList.remove("dark");
            setTheme("light");
        }
    };

    // Close dropdowns on outside click
    useEffect(() => {
        const handler = (e) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target)
            ) {
                setDropdownOpen(false);
            }
            if (notifRef.current && !notifRef.current.contains(e.target)) {
                setNotificationOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    // Search logic
    useEffect(() => {
        if (searchQuery.trim() === "") {
            setSearchResults([]);
            return;
        }
        const filtered = allItems.filter((item) =>
            item.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filtered);
    }, [searchQuery]);

    return (
        <header className="fixed top-0 left-0 right-0 h-16 bg-blue-600 dark:bg-indigo-800 text-white z-50 flex items-center justify-between px-4 shadow-md">
            {/* Left: Logo + Menu */}
            <div className="flex items-center gap-3">
                <button
                    onClick={toggleSidebar}
                    className="md:hidden block p-2 rounded-md hover:bg-blue-500 dark:hover:bg-indigo-700"
                >
                    <Menu className="h-5 w-5" />
                </button>
                <div className="h-8 w-8 rounded-full bg-white text-blue-600 dark:bg-gray-300 dark:text-indigo-800 flex items-center justify-center font-bold text-lg">
                    S
                </div>
                <h1 className="font-bold text-lg">Student Dashboard</h1>
            </div>

            {/* Right: Icons */}
            <div className="flex items-center gap-4 relative">
                {/* Search */}
                <div className="relative">
                    <button
                        onClick={() => setSearchOpen(!searchOpen)}
                        className="p-2 hover:bg-blue-500 dark:hover:bg-indigo-700 rounded-md"
                    >
                        <Search className="h-5 w-5" />
                    </button>

                    {searchOpen && (
                        <div className="absolute right-0 top-10 w-72 bg-white dark:bg-gray-900 shadow-lg rounded-md z-40">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search..."
                                className="w-full p-2 border-b border-gray-300 dark:border-gray-700 bg-transparent text-black dark:text-white"
                            />
                            {searchResults.length > 0 && (
                                <ul className="max-h-60 overflow-y-auto">
                                    {searchResults.map((item, i) => (
                                        <li
                                            key={i}
                                            className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {searchQuery && searchResults.length === 0 && (
                                <div className="p-2 text-sm text-gray-500 dark:text-gray-400">
                                    No results found.
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Dark Mode Toggle */}
                <button
                    onClick={toggleTheme}
                    className="p-2 hover:bg-blue-500 dark:hover:bg-indigo-700 rounded-md"
                >
                    {theme === "light" ? (
                        <Moon className="h-5 w-5" />
                    ) : (
                        <Sun className="h-5 w-5" />
                    )}
                </button>

                {/* Notification Bell */}
                <div className="relative" ref={notifRef}>
                    <button
                        onClick={() => setNotificationOpen(!notificationOpen)}
                        className="p-2 hover:bg-blue-500 dark:hover:bg-indigo-700 rounded-md relative"
                    >
                        <Bell className="h-5 w-5" />
                        {notifications.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-xs text-white rounded-full px-1">
                                {notifications.length}
                            </span>
                        )}
                    </button>
                    {notificationOpen && (
                        <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 shadow-lg rounded-md z-50">
                            <ul className="py-2 max-h-64 overflow-y-auto">
                                {notifications.map((note, i) => (
                                    <li
                                        key={i}
                                        className="flex items-start gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        <CircleDot className="w-4 h-4 text-blue-500 mt-1" />
                                        <span>{note}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Avatar Dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center gap-2 px-2 py-1 bg-blue-500 dark:bg-indigo-700 hover:bg-blue-400 dark:hover:bg-indigo-600 rounded-full"
                    >
                        <div className="h-8 w-8 bg-white dark:bg-gray-300 text-blue-600 dark:text-indigo-800 rounded-full flex items-center justify-center font-semibold">
                            S
                        </div>
                        <ChevronDown className="h-4 w-4 text-white" />
                    </button>

                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-md shadow-lg z-50">
                            <ul className="py-1">
                                <li
                                    onClick={() =>
                                        router.visit("/student/profile")
                                    }
                                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                                >
                                    Profile
                                </li>
                                <li
                                    onClick={() => router.post("/logout")}
                                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-red-500"
                                >
                                    Logout
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
