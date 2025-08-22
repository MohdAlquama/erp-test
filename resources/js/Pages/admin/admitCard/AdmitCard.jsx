import { useBaseContext } from "@/contexts/adminContext";
import AdminLayout from "@/Layouts/AdminLayout";
import axiosInstance from "@/utils/axiosInstance";
import { useEffect, useState } from "react";
import AdmitCardDataGet from "./AdmitCardDataGet";

function AdmitCard({ admit_card_folders_data , folderId,batchId}) {
  const { admin } = useBaseContext();
  const [rooms, setRooms] = useState([]);
  const [admitData, setAdmitData] = useState([]);
  const [bulkDate, setBulkDate] = useState("");
  const [bulkTime, setBulkTime] = useState("");

  useEffect(() => {
    const initialData = admit_card_folders_data.map((item) => ({
      ...item,
      exam_venue: "",
      exam_date: "",
      exam_time: "",
    }));
    setAdmitData(initialData);

    const fetchRooms = async () => {
      try {
        const response = await axiosInstance.get(`/admin/${admin.id}/class-rooms`);
        setRooms(response.data.rooms);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRooms();
  }, [admit_card_folders_data, admin.id]);

  const handleChange = (index, field, value) => {
    const updatedData = [...admitData];
    updatedData[index][field] = value;
    setAdmitData(updatedData);
  };

  const handleBulkDateChange = (value) => {
    setBulkDate(value);
    const updatedData = admitData.map((item) => ({ ...item, exam_date: value }));
    setAdmitData(updatedData);
  };

  const handleBulkTimeChange = (value) => {
    setBulkTime(value);
    const updatedData = admitData.map((item) => ({ ...item, exam_time: value }));
    setAdmitData(updatedData);
  };

  // Console full row data
 const handleSubmitRow = async (row) => {
  try {
    const payload = {
      admin_id: admin.id,
      folder_id: folderId,
            batch_id: batchId, // ✅ include batchId
      enrollment_number: row.enrollment_number,
      subject_name: row.subject_name,
      batch_name: row.batch_name,
      teacher_name: row.teacher_name,
      student_name: row.student_name,
      exam_venue: row.exam_venue,
      exam_date: row.exam_date,
      exam_time: row.exam_time,

    };

    const response = await axiosInstance.post(
      `/admin/${admin.id}/admit-card/submit`,
      payload
    );

    console.log("Saved successfully:", response.data);
    alert("Row saved successfully!");
  } catch (error) {
    console.error("Error saving row:", error);
    alert("Failed to save row!");
  }
};


  return (
    <div>
      <div className="flex gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium">Bulk Exam Date</label>
          <input
            type="date"
            value={bulkDate}
            onChange={(e) => handleBulkDateChange(e.target.value)}
            className="border px-2 py-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Bulk Exam Time</label>
          <input
            type="time"
            value={bulkTime}
            onChange={(e) => handleBulkTimeChange(e.target.value)}
            className="border px-2 py-1"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">Enrollment Number</th>
              <th className="border px-4 py-2 text-left">Subject</th>
              <th className="border px-4 py-2 text-left">Batch</th>
              <th className="border px-4 py-2 text-left">Teacher</th>
              <th className="border px-4 py-2 text-left">Student</th>
              <th className="border px-4 py-2 text-left">Exam Venue</th>
              <th className="border px-4 py-2 text-left">Exam Date</th>
              <th className="border px-4 py-2 text-left">Exam Time</th>
              <th className="border px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {admitData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{item.enrollment_number}</td>
                <td className="border px-4 py-2">{item.subject_name}</td>
                <td className="border px-4 py-2">{item.batch_name}</td>
                <td className="border px-4 py-2">{item.teacher_name}</td>
                <td className="border px-4 py-2">{item.student_name}</td>

                <td className="border px-4 py-2">
                  <select
                    value={item.exam_venue}
                    onChange={(e) => handleChange(index, "exam_venue", e.target.value)}
                    className="border px-2 py-1 w-full"
                  >
                    <option value="">Select Venue</option>
                    {rooms.map((room) => (
                      <option key={room.id} value={room.room_name}>
                        {room.room_name}
                      </option>
                    ))}
                  </select>
                </td>

                <td className="border px-4 py-2">
                  <input
                    type="date"
                    value={item.exam_date}
                    onChange={(e) => handleChange(index, "exam_date", e.target.value)}
                    className="border px-2 py-1 w-full"
                  />
                </td>

                <td className="border px-4 py-2">
                  <input
                    type="time"
                    value={item.exam_time}
                    onChange={(e) => handleChange(index, "exam_time", e.target.value)}
                    className="border px-2 py-1 w-full"
                  />
                </td>

                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleSubmitRow(item)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Submit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AdmitCardDataGet folder_id={folderId} admin_id={admin.id} batch_id={batchId}/>
    </div>
  );
}

AdmitCard.layout = (page) => <AdminLayout>{page}</AdminLayout>;

export default AdmitCard;
