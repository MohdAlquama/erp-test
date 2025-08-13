import { useEffect, useState } from "react";
import { useStudent } from "@/contexts/StudentContext";
import StudentLayout from "@/Layouts/StudentLayout";
import axiosInstance from "@/utils/axiosInstance";

// Reusable section for instructions/notices
function InfoSection({ title, items }) {
  if (!items?.length) return null;
  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold border-b border-black mb-2">{title}</h2>
      <ul className="list-disc list-inside text-sm leading-relaxed">
        {items.map((text, i) => (
          <li key={i}>{text}</li>
        ))}
      </ul>
    </div>
  );
}

function AdmitCard() {
  const { student, loading } = useStudent();
  const [cardData, setCardData] = useState(null);
  const [roomData, setRoomData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (!loading && student?.id && student?.admin_id) {
      const fetchData = async () => {
        try {
          setIsFetching(true);

          // Fetch all required data in parallel
          const [admitCardRes, batchRes, layoutRes] = await Promise.all([
            axiosInstance.get(`/student/${student.admin_id}/admin-cards/student/${student.id}`),
            axiosInstance.get(`/student/${student.admin_id}/class-rooms`),
            axiosInstance.get(`/student/admit-card/${student.admin_id}`),
          ]);

          setStudentData(admitCardRes.data?.data || []);
          setRoomData(batchRes.data?.rooms || []);
          setCardData(layoutRes.data?.admitCards?.[0] || null);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setIsFetching(false);
        }
      };

      fetchData();
    }
  }, [student, loading]);

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
        <p className="ml-3 text-lg font-semibold">Preparing your admit card...</p>
      </div>
    );
  }

  if (!cardData || studentData.length === 0) {
    return (
      <div className="text-center p-10 text-lg font-semibold text-red-600">
        Unable to load admit card details.
      </div>
    );
  }

  const firstStudent = studentData[0] || {};

  return (
    <div className="max-w-3xl mx-auto border border-black bg-white shadow-xl p-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-black pb-4 mb-4">
        <img
          src={cardData.college_logo_url}
          alt="College Logo"
          className="w-20 h-20 object-contain"
        />
        <div className="text-center flex-1">
          <h1 className="text-2xl font-bold uppercase">{cardData.college_name}</h1>
          <p className="text-gray-700">{firstStudent.college_location}</p>
          <p className="text-sm font-semibold">{cardData.session_of_exam}</p>
          <p className="mt-2 text-lg font-bold underline">Admit Card</p>
        </div>
        <div className="w-20"></div>
      </div>

      {/* Exam & Student Info */}
      <table className="w-full border border-black text-sm mb-6">
        <tbody>
          <tr className="border-b border-black">
            <td className="border-r border-black p-2 font-semibold w-1/3">Student Name</td>
            <td className="p-2">{firstStudent.student_name}</td>
          </tr>
          <tr className="border-b border-black">
            <td className="border-r border-black p-2 font-semibold">Class</td>
            <td className="p-2">{firstStudent.class_name}</td>
          </tr>

          {/* Subject Table */}
          <tr className="border-b border-black">
            <td colSpan="2" className="p-0">
              <table className="w-full border-collapse border-t border-black">
                <thead>
                  <tr className="bg-gray-100 border-b border-black text-center">
                    <th className="border-r border-black p-2">Subject</th>
                    <th className="border-r border-black p-2">Room</th>
                    <th className="border-r border-black p-2">Date</th>
                    <th className="border-r border-black p-2">College Name</th>
                    <th className="border-r border-black p-2">Location</th>
                    <th className="p-2">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {studentData.map((exam, index) => {
                    const room = roomData.find(r => r.id === exam.room_id);
                    return (
                      <tr key={index} className="text-center">
                        <td className="border-r border-black p-2">{exam.subject_name}</td>
                        <td className="border-r border-black p-2">{room?.room_name || "N/A"}</td>
                        <td className="border-r border-black p-2">{exam.date}</td>
                        <td className="border-r border-black p-2">{exam.college_name}</td>
                        <td className="border-r border-black p-2">{exam.college_location}</td>
                        <td className="p-2">{exam.time}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </td>
          </tr>

          <tr>
            <td className="border-r border-black p-2 font-semibold">Exam Type</td>
            <td className="p-2">{cardData.exam_type}</td>
          </tr>
        </tbody>
      </table>

      {/* Instructions */}
      <InfoSection title="General Instructions" items={cardData.general_instructions} />

      {/* Notices */}
      <InfoSection title="Notices" items={cardData.notices} />

      {/* Signature */}
      <div className="flex justify-end mt-8">
        <div className="text-center">
          <img
            src={cardData.sign_url}
            alt="Signature"
            className="w-28 object-contain mx-auto"
          />
          <p className="text-sm font-semibold">Authorized Signatory</p>
        </div>
      </div>

      {/* Print Button */}
      <div className="mt-6 text-center no-print">
        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Print Admit Card
        </button>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          .no-print {
            display: none;
          }
          body {
            background: white;
          }
        }
      `}</style>
    </div>
  );
}

AdmitCard.layout = (page) => <StudentLayout>{page}</StudentLayout>;

export default AdmitCard;
