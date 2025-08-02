import React from "react";

export default function Finance({ financeRecords }) {
    return (
        <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-100">
            <h1 className="text-2xl font-bold mb-4">Finance Management</h1>

            <div className="overflow-x-auto rounded-lg shadow border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-indigo-600 text-white">
                        <tr>
                            <th className="px-4 py-3">#</th>
                            <th className="px-4 py-3">Student</th>
                            <th className="px-4 py-3">Batch</th>
                            <th className="px-4 py-3">Amount</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {financeRecords.map((record, index) => (
                            <tr
                                key={record.id}
                                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                            >
                                <td className="px-4 py-3">{index + 1}</td>
                                <td className="px-4 py-3">{record.student}</td>
                                <td className="px-4 py-3">{record.batch}</td>
                                <td className="px-4 py-3">₹{record.amount}</td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                                            record.status === "Paid"
                                                ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100"
                                        }`}
                                    >
                                        {record.status}
                                    </span>
                                </td>
                                <td className="px-4 py-3">{record.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// Use layout
import AdminLayout from "@/Layouts/AdminLayout";
Finance.layout = (page) => <AdminLayout>{page}</AdminLayout>;
