import React, { useState } from "react";
import AdminLayout from "../../Layouts/AdminLayout";
import toast from "react-hot-toast";

export default function CreateUser() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        role: "student",
        password: "",
    });

    const [users, setUsers] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState("");
    const [showFormDrawer, setShowFormDrawer] = useState(false);

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            form.name.trim() === "" ||
            form.email.trim() === "" ||
            form.password.trim() === ""
        ) {
            toast.error("Please fill out all required fields.");
            return;
        }

        if (editIndex !== null) {
            const updated = [...users];
            updated[editIndex] = form;
            setUsers(updated);
            toast.success("User updated successfully!");
            setEditIndex(null);
        } else {
            setUsers([...users, form]);
            toast.success("User created successfully!");
        }

        setForm({ name: "", email: "", role: "student", password: "" });
        setShowFormDrawer(false);
    };

    const handleEdit = (index) => {
        setForm(users[index]);
        setEditIndex(index);
        setShowFormDrawer(true);
    };

    const handleDelete = (index) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            const updated = users.filter((_, i) => i !== index);
            setUsers(updated);
            toast.success("User deleted.");
        }
    };

    const handleView = (user) => {
        alert(`
      Name: ${user.name}
      Email: ${user.email}
      Role: ${user.role}
    `);
    };

    const filteredUsers = users.filter((user) => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = roleFilter ? user.role === roleFilter : true;
        return matchesSearch && matchesRole;
    });

    const uniqueRoles = [...new Set(users.map((u) => u.role))];

    return (
        <div className="p-6 relative overflow-hidden bg-white dark:bg-gray-900 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Create User
                </h1>
                <button
                    onClick={() => {
                        setEditIndex(null);
                        setForm({
                            name: "",
                            email: "",
                            role: "student",
                            password: "",
                        });
                        setShowFormDrawer(true);
                    }}
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
                >
                    + Create User
                </button>
            </div>

            {/* Search + Filter */}
            <div className="flex flex-wrap gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search by name or email"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-4 py-2 border rounded w-full md:w-1/3 dark:bg-gray-800 dark:text-white dark:border-gray-600"
                />

                <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="px-4 py-2 border rounded w-full md:w-1/4 dark:bg-gray-800 dark:text-white dark:border-gray-600"
                >
                    <option value="">All Roles</option>
                    {uniqueRoles.map((role, i) => (
                        <option key={i} value={role}>
                            {role.charAt(0).toUpperCase() + role.slice(1)}
                        </option>
                    ))}
                </select>
            </div>

            {/* Table */}
            {filteredUsers.length > 0 ? (
                <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
                    <table className="min-w-full text-sm text-left text-gray-800 dark:text-gray-200">
                        <thead className="bg-gray-100 dark:bg-gray-700 text-xs uppercase">
                            <tr>
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Email</th>
                                <th className="px-4 py-2">Role</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user, index) => (
                                <tr
                                    key={index}
                                    className="border-b border-gray-200 dark:border-gray-700"
                                >
                                    <td className="px-4 py-2">{user.name}</td>
                                    <td className="px-4 py-2">{user.email}</td>
                                    <td className="px-4 py-2 capitalize">
                                        {user.role}
                                    </td>
                                    <td className="px-4 py-2 flex gap-2">
                                        <button
                                            onClick={() => handleView(user)}
                                            className="text-blue-600 dark:text-blue-400 hover:underline"
                                        >
                                            View
                                        </button>
                                        <button
                                            onClick={() => handleEdit(index)}
                                            className="text-yellow-600 dark:text-yellow-400 hover:underline"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(index)}
                                            className="text-red-600 dark:text-red-400 hover:underline"
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
                    No users found.
                </p>
            )}

            {/* Slide-In Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white dark:bg-gray-900 shadow-xl transition-transform duration-300 z-50 ${
                    showFormDrawer ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                        {editIndex !== null ? "Edit User" : "Create User"}
                    </h2>
                    <button
                        onClick={() => setShowFormDrawer(false)}
                        className="text-gray-600 dark:text-gray-300 hover:text-red-600"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            required
                            value={form.name}
                            onChange={handleChange}
                            className="mt-1 w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-600"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={form.email}
                            onChange={handleChange}
                            className="mt-1 w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-600"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Role
                        </label>
                        <select
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                            className="mt-1 w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-600"
                        >
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                            <option value="admin">Admin</option>
                            <option value="subadmin">Sub Admin</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            required
                            value={form.password}
                            onChange={handleChange}
                            className="mt-1 w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-600"
                        />
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            className="bg-indigo-600 text-white w-full py-2 rounded hover:bg-indigo-700"
                        >
                            {editIndex !== null ? "Update User" : "Create User"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

CreateUser.layout = (page) => <AdminLayout>{page}</AdminLayout>;
