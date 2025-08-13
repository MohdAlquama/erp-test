import React, { useState, useEffect } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Plus, Trash2, Edit2 } from "lucide-react";
import axiosInstance from "@/utils/axiosInstance";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";
import { useBaseContext } from "@/contexts/adminContext";

export default function AdmitCard() {
  const { admin } = useBaseContext();
  const [collegeName, setCollegeName] = useState("");
  const [examType, setExamType] = useState("");
  const [sessionOfExam, setSessionOfExam] = useState("");
  const [collegeLogo, setCollegeLogo] = useState(null);
  const [sign, setSign] = useState(null);
  const [generalInstructions, setGeneralInstructions] = useState([""]);
  const [notices, setNotices] = useState([""]);
  const [loading, setLoading] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [admitCards, setAdmitCards] = useState([]);
  const [editingCard, setEditingCard] = useState(null); // Track card being edited

  // Fetch admit cards
  useEffect(() => {
    const fetchAdmitCards = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/admin/admit-card/${admin.id}`);
        setAdmitCards(response.data.admitCards || []);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch admit cards");
      } finally {
        setLoading(false);
      }
    };

    if (admin?.id) {
      fetchAdmitCards();
    }
  }, [admin?.id]);

  // Handlers for file inputs
  const handleCollegeLogoChange = (e) => {
    setCollegeLogo(e.target.files[0]);
  };

  const handleSignChange = (e) => {
    setSign(e.target.files[0]);
  };

  // General Instructions handlers
  const addInstruction = () => {
    setGeneralInstructions((prev) => [...prev, ""]);
  };

  const updateInstruction = (index, value) => {
    const newInstructions = [...generalInstructions];
    newInstructions[index] = value;
    setGeneralInstructions(newInstructions);
  };

  const removeInstruction = (index) => {
    setGeneralInstructions((prev) => prev.filter((_, i) => i !== index));
  };

  // Notices handlers
  const addNotice = () => {
    setNotices((prev) => [...prev, ""]);
  };

  const updateNotice = (index, value) => {
    const newNotices = [...notices];
    newNotices[index] = value;
    setNotices(newNotices);
  };

  const removeNotice = (index) => {
    setNotices((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle form submission (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!collegeName.trim() || !examType.trim() || !sessionOfExam.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (!editingCard && (!collegeLogo || !sign)) {
      toast.error("Please upload both college logo and sign images");
      return;
    }

    const filteredInstructions = generalInstructions.filter((ins) => ins.trim() !== "");
    const filteredNotices = notices.filter((n) => n.trim() !== "");
    const formData = new FormData();
    formData.append("admin", admin.id);
    formData.append("collegeName", collegeName.trim());
    formData.append("examType", examType.trim());
    formData.append("sessionOfExam", sessionOfExam.trim());
    if (collegeLogo) formData.append("collegeLogo", collegeLogo);
    if (sign) formData.append("sign", sign);
    formData.append("generalInstructions", JSON.stringify(filteredInstructions));
    formData.append("notices", JSON.stringify(filteredNotices));

    try {
      setLoading(true);
      const url = editingCard ? `/admin/admit-card/${editingCard.id}` : "/admin/admit-card";
      const method = editingCard ? "put" : "post";
      const res = await axiosInstance[method](url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(res.data.message || editingCard ? "Admit card updated successfully" : "Admit card created successfully");
      
      // Reset form
      setCollegeName("");
      setExamType("");
      setSessionOfExam("");
      setCollegeLogo(null);
      setSign(null);
      setGeneralInstructions([""]);
      setNotices([""]);
      setShowDrawer(false);
      setEditingCard(null);

      // Refetch admit cards
      const response = await axiosInstance.get(`/admin/admit-card/${admin.id}`);
      setAdmitCards(response.data.admitCards || []);
    } catch (error) {
      toast.error(error.response?.data?.message || editingCard ? "Update failed" : "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  // Handle edit
  const handleEdit = (card) => {
    setEditingCard(card);
    setCollegeName(card.college_name);
    setExamType(card.exam_type);
    setSessionOfExam(card.session_of_exam);
    setGeneralInstructions(card.general_instructions || [""]);
    setNotices(card.notices || [""]);
    setCollegeLogo(null); // Reset file inputs
    setSign(null);
    setShowDrawer(true);
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this admit card?")) return;
    try {
      setLoading(true);
      const res = await axiosInstance.delete(`/admin/admit-card/${id}`);
      toast.success(res.data.message || "Admit card deleted successfully");
      setAdmitCards(admitCards.filter((card) => card.id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete admit card");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admit Cards</h1>
        <button
          onClick={() => {
            setEditingCard(null);
            setCollegeName("");
            setExamType("");
            setSessionOfExam("");
            setCollegeLogo(null);
            setSign(null);
            setGeneralInstructions([""]);
            setNotices([""]);
            setShowDrawer(true);
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 flex items-center gap-2"
          disabled={loading}
        >
          <Plus className="w-4 h-4" /> Add Admit Card
        </button>
      </div>

      {/* Display Admit Cards */}
      <div className="mb-6">
        {admitCards.length > 0 ? (
          <div className="grid gap-4">
            {admitCards.map((card) => (
              <div key={card.id} className="border p-4 rounded bg-gray-50 dark:bg-gray-800">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">{card.college_name}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(card)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit admit card"
                      disabled={loading}
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(card.id)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete admit card"
                      disabled={loading}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <p>Exam Type: {card.exam_type}:{card.college_logo_url}</p>
                <p>Session: {card.session_of_exam}</p>
                <p>Instructions: {card.general_instructions.join(", ")}</p>
                <p>Notices: {card.notices.join(", ")}</p>
                <div className="flex gap-4 mt-2">
                  <img src={card.college_logo_url} alt="College Logo" className="w-16 h-16 object-contain" />
                  <img src={card.sign_url} alt="Sign" className="w-16 h-16 object-contain" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No admit cards found.</p>
        )}
      </div>

      {/* Drawer */}
      {showDrawer && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={() => !loading && setShowDrawer(false)}
          />
          <div className="fixed top-0 right-0 h-full w-full sm:w-1/3 bg-white dark:bg-gray-800 shadow-lg z-50 flex flex-col p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {editingCard ? "Edit Admit Card" : "Upload Admit Card Details"}
              </h2>
              <button
                onClick={() => !loading && setShowDrawer(false)}
                className="text-gray-600 dark:text-gray-300 hover:text-red-600 text-2xl font-bold leading-none"
                aria-label="Close drawer"
                disabled={loading}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* College Name */}
              <div>
                <label className="block text-sm font-medium mb-1">College Name</label>
                <input
                  type="text"
                  value={collegeName}
                  onChange={(e) => setCollegeName(e.target.value)}
                  placeholder="Enter college name"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                  disabled={loading}
                />
              </div>
              {/* Exam Type */}
              <div>
                <label className="block text-sm font-medium mb-1">Exam Type</label>
                <input
                  type="text"
                  value={examType}
                  onChange={(e) => setExamType(e.target.value)}
                  placeholder="Enter exam type"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                  disabled={loading}
                />
              </div>
              {/* Session of Exam */}
              <div>
                <label className="block text-sm font-medium mb-1">Session of Exam</label>
                <input
                  type="text"
                  value={sessionOfExam}
                  onChange={(e) => setSessionOfExam(e.target.value)}
                  placeholder="Enter session of exam"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                  disabled={loading}
                />
              </div>
              {/* College Logo */}
              <div>
                <label className="block text-sm font-medium mb-1">College Logo (image)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCollegeLogoChange}
                  className="w-full"
                  disabled={loading}
                />
                {editingCard && <p className="text-sm text-gray-500">Current: {editingCard.college_logo_url}</p>}
              </div>
              {/* Sign */}
              <div>
                <label className="block text-sm font-medium mb-1">Sign (image)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleSignChange}
                  className="w-full"
                  disabled={loading}
                />
                {editingCard && <p className="text-sm text-gray-500">Current: {editingCard.sign_url}</p>}
              </div>
              {/* General Instructions */}
              <div>
                <label className="block text-sm font-medium mb-1">General Instructions</label>
                {generalInstructions.map((instruction, idx) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    <textarea
                      rows={2}
                      value={instruction}
                      onChange={(e) => updateInstruction(idx, e.target.value)}
                      placeholder={`Instruction #${idx + 1}`}
                      className="flex-grow border border-gray-300 rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      disabled={loading}
                    />
                    {generalInstructions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeInstruction(idx)}
                        className="text-red-600 hover:text-red-800"
                        disabled={loading}
                        title="Remove instruction"
                      >
                        <Trash2 />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addInstruction}
                  className="mt-1 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-gray-800"
                  disabled={loading}
                >
                  + Add Instruction
                </button>
              </div>
              {/* Notices */}
              <div>
                <label className="block text-sm font-medium mb-1">Notices</label>
                {notices.map((notice, idx) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    <textarea
                      rows={2}
                      value={notice}
                      onChange={(e) => updateNotice(idx, e.target.value)}
                      placeholder={`Notice #${idx + 1}`}
                      className="flex-grow border border-gray-300 rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      disabled={loading}
                    />
                    {notices.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeNotice(idx)}
                        className="text-red-600 hover:text-red-800"
                        disabled={loading}
                        title="Remove notice"
                      >
                        <Trash2 />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addNotice}
                  className="mt-1 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-gray-800"
                  disabled={loading}
                >
                  + Add Notice
                </button>
              </div>
              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? "Processing..." : editingCard ? "Update" : "Upload"}
                </button>
                <button
                  type="button"
                  onClick={() => !loading && setShowDrawer(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </>
      )}

      {/* Loader overlay */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <Loader />
        </div>
      )}
    </div>
  );
}

AdmitCard.layout = (page) => <AdminLayout>{page}</AdminLayout>;