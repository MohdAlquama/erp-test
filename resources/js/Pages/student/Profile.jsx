"use client";

import { useState, useRef } from "react";
import { User, Edit3, Save, UploadCloud, Lock } from "lucide-react";
import toast from "react-hot-toast";
import StudentLayout from "@/Layouts/StudentLayout";

export default function Profile() {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "Priyanka Sharma",
        email: "priyanka@student.edu",
        phone: "9876543210",
        class: "10th A",
        rollNumber: "1023",
    });

    const [avatar, setAvatar] = useState(null);
    const fileInputRef = useRef();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleEdit = () => setIsEditing(true);

    const handleSave = () => {
        setIsEditing(false);
        toast.success("Profile updated successfully!");
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatar(URL.createObjectURL(file));
            toast.success("Avatar uploaded!");
        }
    };

    const handlePasswordChange = () => {
        toast.success("Password changed successfully!");
    };

    return (
        <StudentLayout>
            <div className="max-w-4xl mx-auto px-6 py-10 bg-white dark:bg-gray-900 shadow-xl rounded-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                        <User className="w-7 h-7" /> Student Profile
                    </h2>
                    {!isEditing ? (
                        <button
                            onClick={handleEdit}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded flex items-center gap-2 transition"
                        >
                            <Edit3 size={16} /> Edit
                        </button>
                    ) : (
                        <button
                            onClick={handleSave}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2 transition"
                        >
                            <Save size={16} /> Save
                        </button>
                    )}
                </div>

                {/* Avatar Card */}
                <div className="flex items-center flex-col sm:flex-row gap-6 mb-8">
                    <div className="relative">
                        <div className="rounded-full w-28 h-28 p-1 bg-gradient-to-br from-indigo-500 to-purple-600">
                            <img
                                src={
                                    avatar || "https://via.placeholder.com/100"
                                }
                                alt="Avatar"
                                className="rounded-full object-cover w-full h-full border-4 border-white dark:border-gray-800"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col items-center sm:items-start">
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleAvatarChange}
                            className="hidden"
                        />
                        <button
                            onClick={() => fileInputRef.current.click()}
                            className="mt-2 flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
                        >
                            <UploadCloud size={16} /> Upload Avatar
                        </button>
                    </div>
                </div>

                {/* Divider */}
                <hr className="my-6 border-gray-300 dark:border-gray-700" />

                {/* Profile Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries({
                        fullName: "Full Name",
                        email: "Email",
                        phone: "Phone Number",
                        class: "Class",
                        rollNumber: "Roll Number",
                    }).map(([key, label]) => (
                        <div key={key}>
                            <label className="block text-gray-600 dark:text-gray-300 font-medium mb-1">
                                {label}
                            </label>
                            <input
                                type="text"
                                name={key}
                                value={formData[key]}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={`w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white transition ${
                                    isEditing
                                        ? "border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                                        : "border-gray-300 cursor-not-allowed"
                                }`}
                            />
                        </div>
                    ))}
                </div>

                {/* Divider */}
                <hr className="my-8 border-gray-300 dark:border-gray-700" />

                {/* Password Section */}
                <div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
                        <Lock size={20} /> Change Password
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="password"
                            placeholder="New Password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-white"
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-white"
                        />
                    </div>
                    <button
                        onClick={handlePasswordChange}
                        className="mt-5 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition"
                    >
                        Update Password
                    </button>
                </div>
            </div>
        </StudentLayout>
    );
}
