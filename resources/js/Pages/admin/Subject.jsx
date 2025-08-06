import React, { useState, useEffect } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Plus } from "lucide-react";
import { usePage } from "@inertiajs/react";
import axiosInstance from "@/utils/axiosInstance";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";
import { useBaseContext } from "@/contexts/adminContext";

export default function Subject() {
    const { props } = usePage();
    const { adminId } = props;

    
      const { admin, permissions } = useBaseContext();
    console.log("Admin:", permissions);
    
    const [form, setForm] = useState({ subject: "" });
    const [showDrawer, setShowDrawer] = useState(false);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    // ✅ Centralized subject fetch
    const fetchSubjects = async () => {
        try {
            setLoading(true);
            const res = await axiosInstance.get(`/admin/${admin.id}/subjects`);
            console.log(res.data);
            
            setItems(res.data || []);
        } catch (err) {
            toast.error("Failed to load subjects.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubjects(); // ✅ Initial load
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const resetForm = () => setForm({ subject: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.subject.trim()) return toast.error("Subject name is required.");

        try {
            setLoading(true);
            await axiosInstance.post("/admin/subjects", {
                subject: form.subject,
                created_by: adminId,
            });
            toast.success("Subject added successfully!");
            resetForm();
            setShowDrawer(false);
            await fetchSubjects(); // ✅ Refresh list
        } catch (error) {
            toast.error("Failed to save subject.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white relative">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Subjects</h1>
                <button
                    onClick={() => setShowDrawer(true)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" /> Add Subject
                </button>
            </div>

            <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
                <table className="min-w-full text-sm text-left text-gray-800 dark:text-white">
                    <thead className="bg-gray-100 dark:bg-gray-700 text-xs uppercase">
                        <tr>
                            <th className="px-4 py-2">Subject</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td className="px-4 py-4 text-center" colSpan="1">
                                    <Loader message="Loading subjects..." />
                                </td>
                            </tr>
                        ) : items.length > 0 ? (
                            items.map((item) => (
                                <tr key={item.id} className="border-b border-gray-200 dark:border-gray-600">
                                    <td className="px-4 py-2">{item.subject}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="px-4 py-4 text-center text-gray-500 dark:text-gray-400">
                                    No subjects found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Drawer Form */}
            <div
                className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white dark:bg-gray-900 shadow-xl transition-transform duration-300 z-50 ${
                    showDrawer ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-bold text-gray-800 dark:text-white">Add Subject</h2>
                    <button
                        onClick={() => {
                            setShowDrawer(false);
                            resetForm();
                        }}
                        className="text-gray-600 dark:text-gray-300 hover:text-red-600"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <div>
                        <label className="block mb-1">Subject Name</label>
                        <input
                            type="text"
                            name="subject"
                            value={form.subject}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-indigo-600 text-white w-full py-2 rounded hover:bg-indigo-700"
                    >
                        Save Subject
                    </button>
                </form>
            </div>
        </div>
    );
}

Subject.layout = (page) => <AdminLayout>{page}</AdminLayout>;
