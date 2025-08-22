// import React, { useEffect, useState } from "react";
// import AdminLayout from "@/Layouts/AdminLayout";
// import { Plus, Pencil, Trash, View } from "lucide-react";
// import toast from "react-hot-toast";
// import { useBaseContext } from "@/contexts/adminContext";
// import axiosInstance from "@/utils/axiosInstance";
// import Loader from "@/components/Loader";
// import { router } from "@inertiajs/react";

// export default function AdmitCardFolder() {
//     const { admin } = useBaseContext();
//     const [folders, setFolders] = useState([]);
//     const [form, setForm] = useState({ folderName: "", description: "", year: "" });
//     const [editIndex, setEditIndex] = useState(null);
//     const [search, setSearch] = useState("");
//     const [drawerOpen, setDrawerOpen] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [admitCarLayout, setAdmitCardLayout] = useState([])
//   const [selectedExamType, setSelectedExamType] = useState("");
//       useEffect(() => {
//         async function fetchAdmitCards() {
//             try {
//                 const response = await axiosInstance.get(`/admin/admit-card/${admin.id}`);
//                 setAdmitCardLayout(response.data.admitCards); // Logs the actual { admitCards: [...] }
//                 console.log(response.data.admitCards);
                
//             } catch (error) {
//                 console.error("Error fetching admit cards:", error);
//             }
//         }

//         if (admin?.id) {
//             fetchAdmitCards();
//         }
//     }, [admin?.id]);



//     // Fetch all folders
//     useEffect(() => {
//         async function fetchFolders() {
//             try {
//                 if (!admin?.id) return;
//                 setLoading(true);
//                 const response = await axiosInstance.get(
//                     `/admin/${admin.id}/admit-card-folders`
//                 );
//                 setFolders(response.data.folders || []);

//             } catch (error) {
//                 toast.error("Failed to fetch folders");
//                 console.error(error);
//             } finally {
//                 setLoading(false);
//             }
//         }
//         fetchFolders();
//     }, [admin?.id]);

//     const handleChange = (e) =>
//         setForm({ ...form, [e.target.name]: e.target.value });

//     const resetForm = () => {
//         setForm({ folderName: "", description: "" });
//         setEditIndex(null);
//     };

//     // const handleSubmit = async (e) => {
//     //     e.preventDefault();

//     //     const adminId = admin?.id;
//     //     if (!adminId) {
//     //         toast.error("Admin not found. Please login again.");
//     //         return;
//     //     }
//     //     if (!form.folderName.trim()) {
//     //         toast.error("Folder name is required");
//     //         return;
//     //     }

//     //     const folderData = {
//     //         folderName: form.folderName,
//     //         description: form.description.trim(),
//     //         year: form.year
//     //     };

//     //     try {
//     //         setLoading(true);
//     //         if (editIndex !== null) {
//     //             const folderId = folders[editIndex]?.id;
//     //             if (!folderId) throw new Error("Folder ID missing for update");

//     //             await axiosInstance.put(
//     //                 `/admin/${adminId}/admit-card-folder/${folderId}`,
//     //                 folderData
//     //             );
//     //             toast.success("Folder updated");
//     //         } else {
//     //             await axiosInstance.post(
//     //                 `/admin/${adminId}/admit-card-folder`,
//     //                 folderData
//     //             );
//     //             toast.success("Folder added");
//     //         }

//     //         const response = await axiosInstance.get(
//     //             `/admin/${adminId}/admit-card-folders`
//     //         );
//     //         setFolders(response.data.folders || []);

//     //         resetForm();
//     //         setDrawerOpen(false);
//     //     } catch (error) {
//     //         toast.error("Failed to save folder");
//     //         console.error(error);
//     //     } finally {
//     //         setLoading(false);
//     //     }
//     // };
// const handleSubmit = async (e) => {
//     e.preventDefault();

//     const adminId = admin?.id;
//     if (!adminId) {
//         toast.error("Admin not found. Please login again.");
//         return;
//     }
//     if (!form.folderName.trim()) {
//         toast.error("Folder name is required");
//         return;
//     }
//     if (!selectedExamType) {
//         toast.error("Please select an exam type");
//         return;
//     }
//     if (!form.year) {
//         toast.error("Year is required");
//         return;
//     }

//     const folderData = {
//         folderName: form.folderName,
//         description: form.description.trim(),
//         year: form.year,
//         exam_type_id: selectedExamType // yaha exam type ka ID bhej rahe hain
//     };

//     try {
//         setLoading(true);
//         if (editIndex !== null) {
//             const folderId = folders[editIndex]?.id;
//             if (!folderId) throw new Error("Folder ID missing for update");

//             await axiosInstance.put(
//                 `/admin/${adminId}/admit-card-folder/${folderId}`,
//                 folderData
//             );
//             toast.success("Folder updated");
//         } else {
//             await axiosInstance.post(
//                 `/admin/${adminId}/admit-card-folder`,
//                 folderData
//             );
//             toast.success("Folder added");
//         }

//         const response = await axiosInstance.get(
//             `/admin/${adminId}/admit-card-folders`
//         );
//         setFolders(response.data.folders || []);

//         resetForm();
//         setDrawerOpen(false);
//     } catch (error) {
//         toast.error("Failed to save folder");
//         console.error(error);
//     } finally {
//         setLoading(false);
//     }
// };

//     const handleEdit = (index) => {
//         setForm({
//             folderName: folders[index].folder_name,
//             description: folders[index].description || "",
//         });
//         setEditIndex(index);
//         setDrawerOpen(true);
//     };

//     const handleDelete = async (index) => {
//         if (!window.confirm("Are you sure you want to delete this folder?")) return;

//         const adminId = admin?.id;
//         const folderId = folders[index]?.id;
//         if (!folderId || !adminId) {
//             toast.error("Folder or Admin ID missing");
//             return;
//         }

//         try {
//             setLoading(true);
//             await axiosInstance.delete(
//                 `/admin/${adminId}/admit-card-folder/${folderId}`
//             );
//             toast.success("Folder deleted");

//             const response = await axiosInstance.get(
//                 `/admin/${adminId}/admit-card-folders`
//             );
//             setFolders(response.data.folders || []);
//         } catch (error) {
//             toast.error("Failed to delete folder");
//             console.error(error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const filteredFolders = folders.filter((folder) =>
//         folder.folder_name.toLowerCase().includes(search.toLowerCase())
//     );

//     const handleView = (folderId) => {
//         if (!folderId) return;

//         // Encode ID to Base64
//         const encodedId = btoa(folderId.toString());
//         router.visit(`/admin/admit-card-folder/${encodedId}`);
//     };
//     return (
//         <div className="p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
//             <div className="flex justify-between items-center mb-6">
//                 <h1 className="text-2xl font-bold">Admit Card Folders</h1>
//                 <button
//                     onClick={() => {
//                         resetForm();
//                         setDrawerOpen(true);
//                     }}
//                     className="bg-indigo-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-indigo-700"
//                     disabled={loading}
//                 >
//                     <Plus className="w-4 h-4" />
//                     Add Folder
//                 </button>
//             </div>

//             {/* Search */}
//             <div className="mb-4">
//                 <input
//                     type="text"
//                     placeholder="Search folder by name"
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                     className="px-4 py-2 border rounded w-full md:w-1/3 dark:bg-gray-800 dark:text-white"
//                     disabled={loading}
//                 />
//             </div>

//             {loading ? (
//                 <Loader message="Loading folders..." />
//             ) : (
//                 <div className="overflow-x-auto rounded-lg shadow bg-white dark:bg-gray-800">
//                     <table className="min-w-full text-sm text-left text-gray-900 dark:text-white">
//                         <thead className="bg-gray-100 dark:bg-gray-700 text-xs uppercase">
//                             <tr>
//                                 <th className="px-4 py-2">Folder Name</th>
//                                 <th className="px-4 py-2">Description</th>
//                                 <th className="px-4 py-2">Exam Year</th>
//                                 <th className="px-4 py-2">Admit card Layout</th>
                                
//                                 <th className="px-4 py-2">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {filteredFolders.length > 0 ? (
//                                 filteredFolders.map((folder, i) => (
//                                     <tr key={folder.id} className="border-b dark:border-gray-600">
//                                         <td className="px-4 py-2">{folder.folder_name}</td>
//                                         <td className="px-4 py-2">
//                                             {folder.description || "—"}
//                                         </td>
//                                         <td className="px-4 py-2">
//                                             {folder.year || "—"}
//                                         </td>
//                                         <td className="px-4 py-2">
//                                             {folder.exam_type_id || "—"}
//                                         </td>
//                                         <td className="px-4 py-2 flex gap-2">

//                                             <button
//                                                 onClick={() => handleView(folder.id)}
//                                                 className="text-yellow-600 hover:underline"
//                                                 disabled={loading}
//                                             >
//                                                 <View className="w-4 h-4 inline" /> view
//                                             </button>
//                                             <button
//                                                 onClick={() => handleEdit(i)}
//                                                 className="text-yellow-600 hover:underline"
//                                                 disabled={loading}
//                                             >
//                                                 <Pencil className="w-4 h-4 inline" /> Edit
//                                             </button>
//                                             <button
//                                                 onClick={() => handleDelete(i)}
//                                                 className="text-red-600 hover:underline"
//                                                 disabled={loading}
//                                             >
//                                                 <Trash className="w-4 h-4 inline" /> Delete
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))
//                             ) : (
//                                 <tr>
//                                     <td
//                                         colSpan="3"
//                                         className="px-4 py-4 text-center text-gray-500 dark:text-gray-400"
//                                     >
//                                         No folders found.
//                                     </td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//             )}

//             {/* Drawer */}
//             <div
//                 className={`fixed top-0 right-0 w-full sm:w-[400px] h-full bg-white dark:bg-gray-900 z-50 shadow-lg transition-transform duration-300 ${drawerOpen ? "translate-x-0" : "translate-x-full"
//                     }`}
//             >
//                 <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
//                     <h2 className="text-lg font-bold">
//                         {editIndex !== null ? "Edit Folder" : "Add Folder"}
//                     </h2>
//                     <button
//                         onClick={() => {
//                             setDrawerOpen(false);
//                             resetForm();
//                         }}
//                         className="text-gray-600 dark:text-gray-300 hover:text-red-600"
//                     >
//                         ✕
//                     </button>
//                 </div>

//                 <form onSubmit={handleSubmit} className="p-4 space-y-4">
//                     <div>
//                         <label>Folder Name</label>
//                         <input
//                             type="text"
//                             name="folderName"
//                             value={form.folderName}
//                             onChange={handleChange}
//                             required
//                             className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
//                             disabled={loading}
//                         />
//                     </div>

//                     <div>
//                         <label>Description</label>
//                         <textarea
//                             name="description"
//                             value={form.description}
//                             onChange={handleChange}
//                             className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
//                             disabled={loading}
//                         />
//                     </div>

//                     <div>
//                         <label>year</label>
//                         <input
//                             type="number"
//                             name="year"
//                             value={form.year}
//                             onChange={handleChange}
//                             className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
//                             disabled={loading}
//                         />
//                     </div>

//                           {/* Exam Type Dropdown */}
//       <div>
//         <label className="block text-sm font-medium mb-1">Exam Type</label>
//         <select
//           value={selectedExamType}
//           onChange={(e) => setSelectedExamType(e.target.value)}
//           className="border rounded p-2"
//         >
//           <option value="">All</option>
//           {admitCarLayout.map((admitDesign, index) => (
//             <option key={index} value={admitDesign.id}>
//               {admitDesign.exam_type}
//             </option>
//           ))}
//         </select>
//       </div>

//                     <button
//                         type="submit"
//                         className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
//                         disabled={loading}
//                     >
//                         {editIndex !== null ? "Update Folder" : "Add Folder"}
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// AdmitCardFolder.layout = (page) => <AdminLayout>{page}</AdminLayout>;
import React, { useEffect, useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Plus, Pencil, Trash, View } from "lucide-react";
import toast from "react-hot-toast";
import { useBaseContext } from "@/contexts/adminContext";
import axiosInstance from "@/utils/axiosInstance";
import Loader from "@/components/Loader";
import { router } from "@inertiajs/react";

export default function AdmitCardFolder() {
  const { admin } = useBaseContext();
  const [folders, setFolders] = useState([]);
  const [form, setForm] = useState({ folderName: "", description: "", year: "" });
  const [editIndex, setEditIndex] = useState(null);
  const [search, setSearch] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [admitCarLayout, setAdmitCardLayout] = useState([]);
  const [selectedExamType, setSelectedExamType] = useState("");

  // Fetch Admit Card Layouts
  useEffect(() => {
    async function fetchAdmitCards() {
      try {
        const response = await axiosInstance.get(`/admin/admit-card/${admin.id}`);
        setAdmitCardLayout(response.data.admitCards || []);
      } catch (error) {
        console.error("Error fetching admit cards:", error);
      }
    }
    if (admin?.id) fetchAdmitCards();
  }, [admin?.id]);

  // Fetch all folders
  useEffect(() => {
    async function fetchFolders() {
      try {
        if (!admin?.id) return;
        setLoading(true);
        const response = await axiosInstance.get(`/admin/${admin.id}/admit-card-folders`);
        setFolders(response.data.folders || []);
      } catch (error) {
        toast.error("Failed to fetch folders");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchFolders();
  }, [admin?.id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const resetForm = () => {
    setForm({ folderName: "", description: "", year: "" });
    setSelectedExamType("");
    setEditIndex(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const adminId = admin?.id;
    if (!adminId) {
      toast.error("Admin not found. Please login again.");
      return;
    }
    if (!form.folderName.trim()) {
      toast.error("Folder name is required");
      return;
    }
    if (!selectedExamType) {
      toast.error("Please select an exam type");
      return;
    }
    if (!form.year) {
      toast.error("Year is required");
      return;
    }

    const folderData = {
      folderName: form.folderName,
      description: form.description.trim(),
      year: form.year,
      exam_type_id: selectedExamType, // ✅ send ID
    };

    try {
      setLoading(true);
      if (editIndex !== null) {
        const folderId = folders[editIndex]?.id;
        if (!folderId) throw new Error("Folder ID missing for update");

        await axiosInstance.put(
          `/admin/${adminId}/admit-card-folder/${folderId}`,
          folderData
        );
        toast.success("Folder updated");
      } else {
        await axiosInstance.post(`/admin/${adminId}/admit-card-folder`, folderData);
        toast.success("Folder added");
      }

      const response = await axiosInstance.get(`/admin/${adminId}/admit-card-folders`);
      setFolders(response.data.folders || []);

      resetForm();
      setDrawerOpen(false);
    } catch (error) {
      toast.error("Failed to save folder");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (index) => {
    setForm({
      folderName: folders[index].folder_name,
      description: folders[index].description || "",
      year: folders[index].year || "",
    });
    setSelectedExamType(folders[index].exam_type_id || ""); // ✅ pre-fill exam type
    setEditIndex(index);
    setDrawerOpen(true);
  };

  const handleDelete = async (index) => {
    if (!window.confirm("Are you sure you want to delete this folder?")) return;

    const adminId = admin?.id;
    const folderId = folders[index]?.id;
    if (!folderId || !adminId) {
      toast.error("Folder or Admin ID missing");
      return;
    }

    try {
      setLoading(true);
      await axiosInstance.delete(`/admin/${adminId}/admit-card-folder/${folderId}`);
      toast.success("Folder deleted");

      const response = await axiosInstance.get(`/admin/${adminId}/admit-card-folders`);
      setFolders(response.data.folders || []);
    } catch (error) {
      toast.error("Failed to delete folder");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredFolders = folders.filter((folder) =>
    folder.folder_name.toLowerCase().includes(search.toLowerCase())
  );

  const handleView = (folderId) => {
    if (!folderId) return;
    const encodedId = btoa(folderId.toString());
    router.visit(`/admin/admit-card-folder/${encodedId}`);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admit Card Folders</h1>
        <button
          onClick={() => {
            resetForm();
            setDrawerOpen(true);
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-indigo-700"
          disabled={loading}
        >
          <Plus className="w-4 h-4" />
          Add Folder
        </button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search folder by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded w-full md:w-1/3 dark:bg-gray-800 dark:text-white"
          disabled={loading}
        />
      </div>

      {loading ? (
        <Loader message="Loading folders..." />
      ) : (
        <div className="overflow-x-auto rounded-lg shadow bg-white dark:bg-gray-800">
          <table className="min-w-full text-sm text-left text-gray-900 dark:text-white">
            <thead className="bg-gray-100 dark:bg-gray-700 text-xs uppercase">
              <tr>
                <th className="px-4 py-2">Folder Name</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Exam Year</th>
                <th className="px-4 py-2">Exam Type</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFolders.length > 0 ? (
                filteredFolders.map((folder, i) => (
                  <tr key={folder.id} className="border-b dark:border-gray-600">
                    <td className="px-4 py-2">{folder.folder_name}</td>
                    <td className="px-4 py-2">{folder.description || "—"}</td>
                    <td className="px-4 py-2">{folder.year || "—"}</td>
                    <td className="px-4 py-2">
                      {
                        admitCarLayout.find((item) => item.id === folder.exam_type_id)
                          ?.exam_type || "—"
                      }
                    </td>
                    <td className="px-4 py-2 flex gap-2">
                      <button
                        onClick={() => handleView(folder.id)}
                        className="text-yellow-600 hover:underline"
                        disabled={loading}
                      >
                        <View className="w-4 h-4 inline" /> view
                      </button>
                      <button
                        onClick={() => handleEdit(i)}
                        className="text-yellow-600 hover:underline"
                        disabled={loading}
                      >
                        <Pencil className="w-4 h-4 inline" /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(i)}
                        className="text-red-600 hover:underline"
                        disabled={loading}
                      >
                        <Trash className="w-4 h-4 inline" /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-4 text-center text-gray-500 dark:text-gray-400"
                  >
                    No folders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 w-full sm:w-[400px] h-full bg-white dark:bg-gray-900 z-50 shadow-lg transition-transform duration-300 ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h2 className="text-lg font-bold">
            {editIndex !== null ? "Edit Folder" : "Add Folder"}
          </h2>
          <button
            onClick={() => {
              setDrawerOpen(false);
              resetForm();
            }}
            className="text-gray-600 dark:text-gray-300 hover:text-red-600"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label>Folder Name</label>
            <input
              type="text"
              name="folderName"
              value={form.folderName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
              disabled={loading}
            />
          </div>

          <div>
            <label>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
              disabled={loading}
            />
          </div>

          <div>
            <label>Year</label>
            <input
              type="number"
              name="year"
              value={form.year}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
              disabled={loading}
            />
          </div>

          {/* Exam Type Dropdown */}
          <div>
            <label className="block text-sm font-medium mb-1">Exam Type</label>
            <select
              value={selectedExamType}
              onChange={(e) => setSelectedExamType(e.target.value)}
              className="border rounded p-2 w-full dark:bg-gray-800 dark:text-white"
            >
              <option value="">Select Exam Type</option>
              {admitCarLayout.map((admitDesign, index) => (
                <option key={index} value={admitDesign.id}>
                  {admitDesign.exam_type}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
            disabled={loading}
          >
            {editIndex !== null ? "Update Folder" : "Add Folder"}
          </button>
        </form>
      </div>
    </div>
  );
}

AdmitCardFolder.layout = (page) => <AdminLayout>{page}</AdminLayout>;
