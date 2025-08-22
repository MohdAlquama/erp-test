import React, { useEffect, useState } from "react";
import AdminLayout from "../../Layouts/AdminLayout";
import { Plus, Pencil, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useBaseContext } from "@/contexts/adminContext";
import axiosInstance from "@/utils/axiosInstance";
import Loader from "@/components/Loader"; // import your Loader

export default function ControlRoom() {
  const { admin } = useBaseContext();
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState({ roomName: "", roomType: "" });
  const [editIndex, setEditIndex] = useState(null);
  const [search, setSearch] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(false); // loading state

  useEffect(() => {
    async function fetchRooms() {
     try {
        if (!admin?.id) return;
        setLoading(true);
        const response = await axiosInstance.get(`/admin/${admin.id}/class-rooms`);
        setRooms(response.data.rooms || []);
      } catch (error) {
        toast.error("Failed to fetch rooms");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchRooms();
  }, [admin?.id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const resetForm = () => {
    setForm({ roomName: "", roomType: "" });
    setEditIndex(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const adminId = admin?.id;
    if (!adminId) {
      toast.error("Admin not found. Please login again.");
      return;
    }
    if (!form.roomName.trim()) {
      toast.error("Room name is required");
      return;
    }
    if (!form.roomType.trim()) {
      toast.error("Room type is required");
      return;
    }
    if (isNaN(form.roomType)) {
      toast.error("Room type must be a number");
      return;
    }

    const room = {
      roomName: form.roomName,
      roomType: Number(form.roomType),
    };

    try {
      setLoading(true);
      if (editIndex !== null) {
        const roomId = rooms[editIndex]?.id;
        if (!roomId) throw new Error("Room ID missing for update");

        await axiosInstance.put(`/admin/${adminId}/class-room/${roomId}`, room);
        toast.success("Room updated");
      } else {
        await axiosInstance.post(`/admin/${adminId}/class-room`, room);
        toast.success("Room added");
      }

      const response = await axiosInstance.get(`/admin/${adminId}/class-rooms`);
      setRooms(response.data.rooms || []);

      resetForm();
      setDrawerOpen(false);
    } catch (error) {
      toast.error("Failed to save room");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (index) => {
    setForm({
      roomName: rooms[index].room_name,
      roomType: rooms[index].room_type.toString(),
    });
    setEditIndex(index);
    setDrawerOpen(true);
  };

  const handleDelete = async (index) => {
    if (!window.confirm("Are you sure you want to delete this room?")) return;

    const adminId = admin?.id;
    const roomId = rooms[index]?.id;
    if (!roomId || !adminId) {
      toast.error("Room or Admin ID missing");
      return;
    }

    try {
      setLoading(true);
      await axiosInstance.delete(`/admin/${adminId}/class-room/${roomId}`);
      toast.success("Room deleted");

      const response = await axiosInstance.get(`/admin/${adminId}/class-rooms`);
      setRooms(response.data.rooms || []);
    } catch (error) {
      toast.error("Failed to delete room");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRooms = rooms.filter((room) =>
    room.room_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Control Room</h1>
        <button
          onClick={() => {
            resetForm();
            setDrawerOpen(true);
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-indigo-700"
          disabled={loading}
        >
          <Plus className="w-4 h-4" />
          Add Room
        </button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search room by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded w-full md:w-1/3 dark:bg-gray-800 dark:text-white"
          disabled={loading}
        />
      </div>

      {/* Show loader if loading */}
      {loading ? (
        <Loader message="Loading rooms..." />
      ) : (
        <div className="overflow-x-auto rounded-lg shadow bg-white dark:bg-gray-800">
          <table className="min-w-full text-sm text-left text-gray-900 dark:text-white">
            <thead className="bg-gray-100 dark:bg-gray-700 text-xs uppercase">
              <tr>
                <th className="px-4 py-2">Room Name</th>
                <th className="px-4 py-2">Room Type</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRooms.length > 0 ? (
                filteredRooms.map((room, i) => (
                  <tr key={room.id} className="border-b dark:border-gray-600">
                    <td className="px-4 py-2">{room.room_name}</td>
                    <td className="px-4 py-2">{room.room_type}</td>
                    <td className="px-4 py-2 flex gap-2">
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
                    colSpan="3"
                    className="px-4 py-4 text-center text-gray-500 dark:text-gray-400"
                  >
                    No rooms found.
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
            {editIndex !== null ? "Edit Room" : "Add Room"}
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
            <label>Room Name</label>
            <input
              type="text"
              name="roomName"
              value={form.roomName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
              disabled={loading}
            />
          </div>

          <div>
            <label>Room Type (Number)</label>
            <input
              type="number"
              name="roomType"
              value={form.roomType}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
            disabled={loading}
          >
            {editIndex !== null ? "Update Room" : "Add Room"}
          </button>
        </form>
      </div>
    </div>
  );
}

ControlRoom.layout = (page) => <AdminLayout>{page}</AdminLayout>;
