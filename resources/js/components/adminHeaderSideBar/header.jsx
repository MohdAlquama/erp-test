"use client";

import { Menu, Bell, Search, ChevronDown, Moon, Sun } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export function AdminHeader({ toggleSidebar }) {
    const [searchOpen, setSearchOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [theme, setTheme] = useState("light");
    const dropdownRef = useRef(null);

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

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className="fixed top-0 left-0 right-0 h-16 bg-indigo-600 dark:bg-indigo-800 text-white z-50 flex items-center justify-between px-4 shadow-md">
            {/* Left: Logo + Title */}
            <div className="flex items-center gap-3">
                <button
                    onClick={toggleSidebar}
                    className="md:hidden block p-2 rounded-md hover:bg-indigo-500 dark:hover:bg-indigo-700"
                >
                    <Menu className="h-5 w-5" />
                </button>
                <div className="h-8 w-8 rounded-full bg-white text-indigo-600 dark:bg-gray-300 dark:text-indigo-800 flex items-center justify-center font-bold text-lg">
                    A
                </div>
                <h1 className="font-bold text-lg">Admin Dashboard</h1>
            </div>

            {/* Right: Search, Theme, Notifications, Avatar */}
            <div className="flex items-center gap-4 relative">
                <div className="relative">
                    <button
                        onClick={() => setSearchOpen(!searchOpen)}
                        className="p-2 hover:bg-indigo-500 dark:hover:bg-indigo-700 rounded-md"
                    >
                        <Search className="h-5 w-5" />
                    </button>
                    {searchOpen && (
                        <input
                            type="text"
                            placeholder="Search..."
                            className="absolute right-0 top-10 w-64 p-2 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-lg"
                        />
                    )}
                </div>

                <button
                    onClick={toggleTheme}
                    className="p-2 hover:bg-indigo-500 dark:hover:bg-indigo-700 rounded-md"
                >
                    {theme === "light" ? (
                        <Moon className="h-5 w-5" />
                    ) : (
                        <Sun className="h-5 w-5" />
                    )}
                </button>

                <Bell className="h-5 w-5 hover:text-gray-200" />

                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center gap-2 px-2 py-1 bg-indigo-500 dark:bg-indigo-700 hover:bg-indigo-400 dark:hover:bg-indigo-600 rounded-full"
                    >
                        <div className="h-8 w-8 bg-white dark:bg-gray-300 text-indigo-600 dark:text-indigo-800 rounded-full flex items-center justify-center font-semibold">
                            A
                        </div>
                        <ChevronDown className="h-4 w-4 text-white" />
                    </button>

                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-md shadow-lg z-50">
                            <ul className="py-1">
                                <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                                    Profile
                                </li>
                                <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
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
