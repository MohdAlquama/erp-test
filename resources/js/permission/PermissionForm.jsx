// import { useState } from "react";
// import { X, Plus } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import Loader from "@/components/Loader";

// export default function PermissionForm({
//     onClose,
//     onSave,
//     editData = null,
//     loading,
// }) {
//     const [feature, setFeature] = useState(editData?.feature || "");
//     const [permissions, setPermissions] = useState(
//         editData?.permissions || [""]
//     );
//     const [error, setError] = useState("");

//     const handlePermissionChange = (index, value) => {
//         const updated = [...permissions];
//         updated[index] = value;
//         setPermissions(updated);
//         if (error) setError("");
//     };

//     const handleAddField = () => {
//         setPermissions([...permissions, ""]);
//     };

//     const handleRemoveField = (index) => {
//         if (permissions.length > 1) {
//             setPermissions(permissions.filter((_, i) => i !== index));
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const validPermissions = permissions.filter((val) => val.trim() !== "");
//         if (!feature.trim() || validPermissions.length === 0) {
//             setError("Feature and at least one permission are required.");
//             return;
//         }

//         const data = {
//             feature: feature.trim(),
//             permissions: validPermissions,
//         };

//         await onSave(data, editData?.id); // Call parent save function
//         setFeature("");
//         setPermissions([""]);
//         setError("");
//     };

//     return (
//         <AnimatePresence>
//             <motion.div
//                 initial={{ x: "100%" }}
//                 animate={{ x: 0 }}
//                 exit={{ x: "100%" }}
//                 transition={{ type: "tween", duration: 0.3 }}
//                 className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-lg z-50"
//             >
//                 <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
//                     <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
//                         {editData ? "Edit Permission" : "Add Permission"}
//                     </h2>
//                     <button onClick={onClose} disabled={loading}>
//                         <X className="text-gray-600 dark:text-gray-300" />
//                     </button>
//                 </div>
//                 <form onSubmit={handleSubmit} className="p-6 space-y-4">
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                             Feature / Module Name
//                         </label>
//                         <input
//                             type="text"
//                             placeholder="e.g., User Management"
//                             value={feature}
//                             onChange={(e) => setFeature(e.target.value)}
//                             className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
//                             disabled={loading}
//                         />
//                     </div>
//                     <div className="space-y-3">
//                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                             Permissions
//                         </label>
//                         {permissions.map((value, index) => (
//                             <div
//                                 key={index}
//                                 className="flex items-center gap-2"
//                             >
//                                 <input
//                                     type="text"
//                                     placeholder="e.g., View"
//                                     value={value}
//                                     onChange={(e) =>
//                                         handlePermissionChange(
//                                             index,
//                                             e.target.value
//                                         )
//                                     }
//                                     className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
//                                     disabled={loading}
//                                 />
//                                 {permissions.length > 1 && (
//                                     <button
//                                         type="button"
//                                         onClick={() => handleRemoveField(index)}
//                                         className="text-red-600 hover:text-red-800"
//                                         disabled={loading}
//                                     >
//                                         <X size={18} />
//                                     </button>
//                                 )}
//                             </div>
//                         ))}
//                         <button
//                             type="button"
//                             onClick={handleAddField}
//                             className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:underline"
//                             disabled={loading}
//                         >
//                             <Plus size={18} />
//                             Add another permission
//                         </button>
//                     </div>
//                     {error && (
//                         <p className="text-sm text-red-600 dark:text-red-400">
//                             {error}
//                         </p>
//                     )}
//                     {loading && <Loader message="Saving..." />}
//                     <div className="flex justify-end pt-4">
//                         <button
//                             type="submit"
//                             className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition disabled:opacity-50"
//                             disabled={loading}
//                         >
//                             Save
//                         </button>
//                     </div>
//                 </form>
//             </motion.div>
//         </AnimatePresence>
//     );
// }
import { useState, useRef, useEffect } from "react";
import { X, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "@/components/Loader";

export default function PermissionForm({
    onClose,
    onSave,
    editData = null,
    loading,
}) {
    const [feature, setFeature] = useState(editData?.feature || "");
    const [permissions, setPermissions] = useState(editData?.permissions || [""]);
    const [error, setError] = useState("");
    const formRef = useRef();

    const handlePermissionChange = (index, value) => {
        const updated = [...permissions];
        updated[index] = value;
        setPermissions(updated);
        if (error) setError("");
    };

    const handleAddField = () => {
        setPermissions([...permissions, ""]);
    };

    const handleRemoveField = (index) => {
        if (permissions.length > 1) {
            setPermissions(permissions.filter((_, i) => i !== index));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validPermissions = permissions.filter((val) => val.trim() !== "");
        if (!feature.trim() || validPermissions.length === 0) {
            setError("Feature and at least one permission are required.");
            return;
        }

        const data = {
            feature: feature.trim(),
            permissions: validPermissions,
        };

        await onSave(data, editData?.id);
        setFeature("");
        setPermissions([""]);
        setError("");
    };

    // Scroll to bottom when a new permission is added
    useEffect(() => {
        if (formRef.current) {
            formRef.current.scrollTop = formRef.current.scrollHeight;
        }
    }, [permissions.length]);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", duration: 0.3 }}
                className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-lg z-50 flex flex-col"
            >
                {/* Header */}
                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700 shrink-0">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                        {editData ? "Edit Permission" : "Add Permission"}
                    </h2>
                    <button onClick={onClose} disabled={loading}>
                        <X className="text-gray-600 dark:text-gray-300" />
                    </button>
                </div>

                {/* Scrollable Form */}
                <form
                    onSubmit={handleSubmit}
                    ref={formRef}
                    className="p-6 space-y-4 overflow-y-auto flex-1"
                >
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Feature / Module Name
                        </label>
                        <input
                            type="text"
                            placeholder="e.g., User Management"
                            value={feature}
                            onChange={(e) => setFeature(e.target.value)}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                            disabled={loading}
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Permissions
                        </label>
                        {permissions.map((value, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <input
                                    type="text"
                                    placeholder="e.g., View"
                                    value={value}
                                    onChange={(e) =>
                                        handlePermissionChange(index, e.target.value)
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                                    disabled={loading}
                                />
                                {permissions.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveField(index)}
                                        className="text-red-600 hover:text-red-800"
                                        disabled={loading}
                                    >
                                        <X size={18} />
                                    </button>
                                )}
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={handleAddField}
                            className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:underline"
                            disabled={loading}
                        >
                            <Plus size={18} />
                            Add another permission
                        </button>
                    </div>

                    {error && (
                        <p className="text-sm text-red-600 dark:text-red-400">
                            {error}
                        </p>
                    )}

                    {loading && <Loader message="Saving..." />}

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition disabled:opacity-50"
                            disabled={loading}
                        >
                            Save
                        </button>
                    </div>
                </form>
            </motion.div>
        </AnimatePresence>
    );
}
