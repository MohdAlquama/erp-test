

import React from "react";
import { UserCircle, CalendarCheck, FileText } from "lucide-react";

export default function AdminDashboard() {
    return (
        <div className="space-y-6 p-4 bg-gradient-to-r from-gray-100 to-gray-200 min-h-screen">
            {/* Page Header */}
            <div className="p-6 bg-white shadow rounded-xl">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Welcome, Admin
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                    Here’s an overview of your activity
                </p>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex items-center gap-4 transform transition hover:-translate-y-1">
                    <UserCircle className="w-12 h-12 text-indigo-600" />
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Employees
                        </p>
                        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                            24
                        </h3>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex items-center gap-4 transform transition hover:-translate-y-1">
                    <CalendarCheck className="w-12 h-12 text-indigo-600" />
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Today's Attendance
                        </p>
                        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                            19 Present
                        </h3>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex items-center gap-4 transform transition hover:-translate-y-1">
                    <FileText className="w-12 h-12 text-indigo-600" />
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Pending Requests
                        </p>
                        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                            3
                        </h3>
                    </div>
                </div>
            </div>

            {/* Recent Activity or Notices */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                    Recent Notices
                </h2>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>• Staff meeting at 3:00 PM today</li>
                    <li>• Upload monthly attendance report by Friday</li>
                    <li>• Maintenance window scheduled on Sunday</li>
                </ul>
            </div>
        </div>
    );
}

// Use layout
import AdminLayout from "@/Layouts/AdminLayout";
AdminDashboard.layout = (page) => <AdminLayout>{page}</AdminLayout>;
