import StudentLayout from '@/Layouts/StudentLayout';
import React, { useRef, useEffect, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useStudent } from '@/contexts/StudentContext';
import axiosInstance from '@/utils/axiosInstance';

function IcardStudent() {
  const { student, loading } = useStudent();
  const [college, setCollege] = useState({ id: '', name: '', logo_url: '', location: '' });
  const [batch, setBatch] = useState({ id: '', name: '', grade: '', section: '' });
  const cardRef = useRef();

  // 🔹 Fetch batch data
  useEffect(() => {
    if (student?.admin_id && student?.batch_ids) {
      axiosInstance
        .get(`/student/${student.admin_id}/batches/${student.batch_ids}`)
        .then((res) => {
          if (res.data?.batches?.length > 0) {
            setBatch(res.data.batches[0]); // set first batch
            console.log("Batch Data:", res.data.batches[0]);
          }
        })
        .catch((err) => console.error('Error fetching batch data:', err));
    }
  }, [student]);

  // 🔹 Fetch college data
  useEffect(() => {
    if (student?.admin_id) {
      axiosInstance
        .get(`/student/${student.admin_id}/colleges`)
        .then((res) => {
          if (res.data?.length > 0) {
            setCollege(res.data[0]);
            console.log("College Data:", res.data[0]);
          }
        })
        .catch((err) => console.error('Error fetching college data:', err));
    }
  }, [student]);

  // 🔹 PDF Download Function
  const downloadPDF = async () => {
    if (!cardRef.current || !student) return;

    const element = cardRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 10, 10, pdfWidth - 20, pdfHeight);
    pdf.save(`${student.name || "student"}_IDCard.pdf`);
  };

  // 🔹 Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-gray-600 text-lg">Loading Student ID...</p>
      </div>
    );
  }

  // 🔹 No student case
  if (!student) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-red-500 text-lg">No student data available.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-6 gap-6">
      {/* ID Card */}
      <div
        ref={cardRef}
        className="w-96 bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-300"
      >
        {/* College Header */}
        <div className="flex items-center gap-3 bg-blue-700 text-white px-4 py-3">
          <img
            src={college.logo_url || "https://via.placeholder.com/80"}
            alt="College Logo"
            className="w-12 h-12 object-cover rounded-full border-2 border-white"
          />
          <div>
            <h1 className="text-lg font-bold">{college.name || "College Name"}</h1>
            <p className="text-xs text-gray-200">{college.location || "College Location"}</p>
          </div>
        </div>

        {/* Student Info */}
        <div className="p-5 flex items-center gap-4">
          <img
             src={student?.profile_image ? `/storage/${student.profile_image}` : "/default-avatar.png"}
                alt={`Profile picture of ${student?.name || "Student"}`}
            className="w-24 h-24 rounded-lg object-cover border-2 border-blue-700 shadow-md"
          />
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-800">{student.name}</h2>
            <p className="text-gray-600 text-sm">Enrollment No: {student.enrollment_number}</p>
            <p className="text-gray-600 text-sm">Batch: {batch.name || "N/A"}</p>
            <p className="text-gray-600 text-sm">Section: {batch.section || "N/A"}</p>
            <p className="text-gray-600 text-sm">Grade: {batch.grade || "N/A"}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 border-t px-4 py-2 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} {college.name || "College"} | All Rights Reserved
        </div>
      </div>

      {/* Download Button */}
      <button
        onClick={downloadPDF}
        disabled={!student}
        className="px-5 py-2 bg-blue-700 text-white rounded-lg shadow-md hover:bg-blue-800 transition disabled:opacity-50"
      >
        Download ID Card (PDF)
      </button>
    </div>
  );
}

IcardStudent.layout = (page) => <StudentLayout>{page}</StudentLayout>;
export default IcardStudent;
