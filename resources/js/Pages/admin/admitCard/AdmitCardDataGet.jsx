import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";

function AdmitCardDataGet({ folder_id, admin_id ,batch_id }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!folder_id || !admin_id) return;

    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(
          `/admin/${admin_id}/admit-cards/${folder_id}/${batch_id}`
        );
        setData(res.data);
      } catch (err) {
        console.error("Error fetching admit card data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [folder_id, admin_id]);

  if (loading) return <p>Loading...</p>;
  if (!data.length) return <p>No data available</p>;

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full border border-gray-300 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Enrollment</th>
            <th className="border px-4 py-2">Subject</th>
            <th className="border px-4 py-2">Batch</th>
            <th className="border px-4 py-2">Teacher</th>
            <th className="border px-4 py-2">Student</th>
            <th className="border px-4 py-2">Venue</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{row.enrollment_number}</td>
              <td className="border px-4 py-2">{row.subject_name}</td>
              <td className="border px-4 py-2">{row.batch_name}</td>
              <td className="border px-4 py-2">{row.teacher_name}</td>
              <td className="border px-4 py-2">{row.student_name}</td>
              <td className="border px-4 py-2">{row.exam_venue}</td>
              <td className="border px-4 py-2">{row.exam_date}</td>
              <td className="border px-4 py-2">{row.exam_time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdmitCardDataGet;
