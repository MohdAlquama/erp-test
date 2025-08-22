import React, { useEffect, useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Eye, Plus, Trash2 } from "lucide-react";
import { useBaseContext } from "@/contexts/adminContext";
import axiosInstance from "@/utils/axiosInstance";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";
import { router } from "@inertiajs/react";

export default function CreatedBatch({ folder }) {
  const { admin } = useBaseContext();
  const [linkedRecords, setLinkedRecords] = useState([]); // raw link data with batch_id
  const [batchDetails, setBatchDetails] = useState([]); // batch objects with id, name etc.
  const [allBatches, setAllBatches] = useState([]); // for dropdown
  const [selectedBatch, setSelectedBatch] = useState("");
  const [showDrawer, setShowDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // Fetch linked batch-folder records & then fetch batch details
  const fetchLinkedBatches = async () => {
    if (!admin?.id || !folder?.id) return;
    try {
      setLoading(true);
      const res = await axiosInstance.get("admin/admin-folder-data", {
        params: { admin_id: admin.id, folder_id: folder.id },
      });
      const links = res.data.data;
      setLinkedRecords(links);

      const batchIds = [...new Set(links.map((link) => link.batch_id))];
      if (batchIds.length === 0) {
        setBatchDetails([]);
        return;
      }

      const batchRes = await axiosInstance.post("/admin/get-batches-by-ids", {
        batch_ids: batchIds,
      });
      setBatchDetails(batchRes.data.batches || []);
    } catch (error) {
      toast.error("Failed to load linked batches.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch all batches for dropdown on drawer open
  const fetchAllBatches = async () => {
    if (!admin?.id) return;
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/admin/${admin.id}/AdminGetBatch`);
      setAllBatches(res.data.batches || []);
    } catch (error) {
      toast.error("Failed to load batches.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinkedBatches();
  }, [admin?.id, folder?.id]);

  useEffect(() => {
    if (showDrawer) {
      fetchAllBatches();
    }
  }, [showDrawer]);

  const handleBatchSelect = (e) => {
    setSelectedBatch(e.target.value);
  };

  const handleSaveSelection = async () => {
    if (!selectedBatch) {
      toast.error("Please select a batch.");
      return;
    }
    try {
      setLoading(true);
      await axiosInstance.post("/admin/save-batch-folder", {
        admin_id: admin.id,
        batch_id: selectedBatch,
        folder_id: folder?.id,
      });
      toast.success("Batch linked to folder successfully!");
      setShowDrawer(false);
      setSelectedBatch("");
      await fetchLinkedBatches();
    } catch (error) {
      toast.error("Failed to save batch-folder link.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (linkId) => {
    if (!window.confirm("Are you sure you want to unlink this batch from the folder?")) return;

    try {
      setDeletingId(linkId);
      await axiosInstance.delete(`/admin/delete-batch-folder/${linkId}`, {
        params: { admin_id: admin.id },
      });
      toast.success("Batch-folder link deleted successfully!");
      await fetchLinkedBatches();
    } catch (error) {
      toast.error("Failed to delete batch-folder link.");
    } finally {
      setDeletingId(null);
    }
  };

  const Viewbatch =(batch_id)=>{
    const batch_idencodedId = btoa(batch_id.toString());
        const folderIdencodedId = btoa(folder.id.toString());

    router.visit(`/admin/getIenertiaParamShowOfSubject/${batch_idencodedId}/${folderIdencodedId}/${admin.id}`)
  }
  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Batches Linked to Folder</h1>
        <button
          onClick={() => setShowDrawer(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Select Batch
        </button>
      </div>

      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
        <table className="min-w-full text-sm text-left text-gray-800 dark:text-white">
          <thead className="bg-gray-100 dark:bg-gray-700 text-xs uppercase">
            <tr>
              <th className="px-4 py-2">Batch Name</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={2} className="px-4 py-4 text-center">
                  <Loader message="Loading batches..." />
                </td>
              </tr>
            ) : linkedRecords.length > 0 ? (
              linkedRecords.map((link) => {
                const batch = batchDetails.find((b) => b.id === link.batch_id);
                return (
                  <tr key={link.id} className="border-b border-gray-200 dark:border-gray-600">
                    <td className="px-4 py-2">{batch ? batch.name : "Batch not found"}</td>
                    <td className="px-4 py-2">
                      {batch ? (
                        <>
                          <button
                            onClick={() => handleDelete(link.id)}
                            disabled={deletingId === link.id}
                            className="text-red-600 hover:text-red-800 flex items-center gap-1 mr-4"
                            title="Delete Link"
                          >
                            <Trash2 className="w-4 h-4" />
                            {deletingId === link.id ? "Deleting..." : "Delete"}
                          </button>
                          <button
                            onClick={() => Viewbatch( batch.id)}
                            className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                            title="View Batch"
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </button>
                        </>
                      ) : (
                        <span className="text-gray-500">No actions</span>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={2} className="px-4 py-4 text-center text-gray-500 dark:text-gray-400">
                  No batches linked to this folder.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white dark:bg-gray-900 shadow-xl transition-transform duration-300 z-50 ${
          showDrawer ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">Select Batch</h2>
          <button
            onClick={() => setShowDrawer(false)}
            className="text-gray-600 dark:text-gray-300 hover:text-red-600"
          >
            ✕
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <label className="block mb-1">Choose a Batch</label>
            <select
              value={selectedBatch}
              onChange={handleBatchSelect}
              className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
            >
              <option value="">-- Select Batch --</option>
              {allBatches.map((batch) => (
                <option key={batch.id} value={batch.id}>
                  {batch.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleSaveSelection}
            disabled={loading}
            className="bg-indigo-600 text-white w-full py-2 rounded hover:bg-indigo-700"
          >
            {loading ? "Saving..." : "Save Selection"}
          </button>
        </div>
      </div>
    </div>
  );
}

CreatedBatch.layout = (page) => <AdminLayout>{page}</AdminLayout>;
