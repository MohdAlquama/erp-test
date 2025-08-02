// "use client";

// import {
//     LayoutDashboard,
//     UserCircle2,
//     CalendarCheck,
//     LogOut,
//     X,
// } from "lucide-react";
// import { useState } from "react";
// import { Link, usePage } from "@inertiajs/react";
// import clsx from "clsx";

// // Admin-specific navigation
// const navItems = [
//     { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
//     { name: "Examination Feature", href: "/admin/profile", icon: UserCircle2 },
//     { name: "Finance", href: "/admin/attendance", icon: CalendarCheck },
//     { name: "Permissions", href: "/admin/permission", icon: CalendarCheck },
//     { name: "Create User", href: "/admin/createUser", icon: CalendarCheck },
//     { name: "Reports", href: "/admin/reports", icon: CalendarCheck },
//     { name: "Batches", href: "/admin/batches", icon: CalendarCheck },
//     { name: "Notice", href: "/admin/notice", icon: CalendarCheck },
//     { name: "Control Room", href: "/admin/controlRoom", icon: CalendarCheck },
// ];

// export default function AdminSidebar({ isOpen, toggleSidebar }) {
//     const { url } = usePage();
//     const pathname = url;

//     return (
//         <aside
//             className={clsx(
//                 "fixed top-0 left-0 z-40 w-64 bg-white dark:bg-gray-900 h-full shadow-lg transition-transform duration-300",
//                 isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
//             )}
//         >
//             {/* Header */}
//             <div className="flex items-center justify-between px-4 py-4 bg-indigo-600 text-white">
//                 <h2 className="font-bold text-lg">Admin</h2>
//                 <button onClick={toggleSidebar} className="md:hidden">
//                     <X className="w-5 h-5" />
//                 </button>
//             </div>

//             {/* Navigation Links */}
//             <nav className="flex flex-col mt-4 space-y-1 px-4">
//                 {navItems.map((item) => {
//                     const isActive = pathname === item.href;
//                     return (
//                         <Link
//                             key={item.name}
//                             href={item.href}
//                             className={clsx(
//                                 "flex items-center gap-3 px-4 py-2 rounded-md font-medium",
//                                 isActive
//                                     ? "bg-indigo-500 text-white"
//                                     : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
//                             )}
//                         >
//                             <item.icon className="w-5 h-5" />
//                             {item.name}
//                         </Link>
//                     );
//                 })}
//             </nav>

//             {/* Logout */}
//             <div className="mt-auto px-4 py-4">
//                 <button
//                     onClick={() => alert("Logout")}
//                     className="flex items-center gap-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 p-2 rounded-md w-full"
//                 >
//                     <LogOut className="w-5 h-5" />
//                     Logout
//                 </button>
//             </div>
//         </aside>
//     );
// }

"use client";

import {
    LayoutDashboard,
    FileText,
    Wallet,
    KeyRound,
    UserPlus,
    BarChart3,
    Layers,
    BellRing,
    ServerCog,
    LogOut,
    X,
} from "lucide-react";
import { Link, usePage, router } from "@inertiajs/react";
import clsx from "clsx";

// Admin-specific navigation
const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    {
        name: "Examination Feature",
        href: "/admin/examinations",
        icon: FileText,
    },
    { name: "Finance", href: "/admin/finance", icon: Wallet },
    { name: "Permissions", href: "/admin/permission", icon: KeyRound },
    { name: "Create User", href: "/admin/createUser", icon: UserPlus },
    { name: "Reports", href: "/admin/reports", icon: BarChart3 },
    { name: "Batches", href: "/admin/batches", icon: Layers },
    { name: "Notice", href: "/admin/notice", icon: BellRing },
    { name: "Control Room", href: "/admin/controlRoom", icon: ServerCog },
];

export default function AdminSidebar({ isOpen, toggleSidebar }) {
    const { url } = usePage();
    const pathname = url;

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    onClick={toggleSidebar}
                    className="fixed inset-0 bg-black/40 z-30 md:hidden"
                />
            )}

            <aside
                className={clsx(
                    "fixed top-0 left-0 z-40 w-64 bg-white dark:bg-gray-900 h-full shadow-lg transition-transform duration-300 flex flex-col",
                    isOpen
                        ? "translate-x-0"
                        : "-translate-x-full md:translate-x-0"
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-4 bg-indigo-600 text-white">
                    <h2 className="font-bold text-lg">Admin</h2>
                    <button onClick={toggleSidebar} className="md:hidden">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation */}
                <div className="flex-1 overflow-y-auto">
                    <nav className="flex flex-col mt-4 space-y-1 px-4">
                        {navItems.map((item) => {
                            const isActive = pathname.startsWith(item.href);
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={clsx(
                                        "flex items-center gap-3 px-4 py-2 rounded-md font-medium transition-colors",
                                        isActive
                                            ? "bg-indigo-500 text-white"
                                            : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                                    )}
                                >
                                    <item.icon className="w-5 h-5" />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Logout */}
                <div className="px-4 py-4">
                    <button
                        onClick={() => router.post("/logout")}
                        className="flex items-center gap-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 p-2 rounded-md w-full"
                    >
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </aside>
        </>
    );
}
