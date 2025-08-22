import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axiosInstance from "@/utils/axiosInstance";

export default function CheckAttendance({
  teacher_id,
  batch_id,
  subject_id,
  date,
  reload,
}) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!teacher_id || !batch_id || !subject_id || !date) return;

    setLoading(true);
    setStudents([]);

    axiosInstance
      .post("/teacher/attendance/check", {
        teacher_id,
        batch_id,
        subject_id,
        date,
      })
      .then((res) => {
        if (res.data.success) {
          setStudents(res.data.data);
          toast.success("Attendance found for this batch");
        } else {
          toast.error(res.data.message);
          setStudents([]);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error checking attendance");
      })
      .finally(() => setLoading(false));
  }, [teacher_id, batch_id, subject_id, date, reload]);

  return (
    <div className="mt-8">
      <Toaster position="top-right" />
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Attendance Records
      </h2>
      {loading ? (
        <div className="flex items-center space-x-2">
          <svg
            className="animate-spin h-5 w-5 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          <p className="text-gray-500">Loading attendance...</p>
        </div>
      ) : students.length === 0 ? (
        <p className="text-red-500 text-sm">No attendance found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Student Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Enrollment
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {students.map((st, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {st.student_name}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {st.student_enrollment_number}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        st.status === "present"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {st.status.charAt(0).toUpperCase() + st.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}