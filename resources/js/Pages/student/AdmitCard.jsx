import { useStudent } from '@/contexts/StudentContext';
import StudentLayout from '@/Layouts/StudentLayout';
import axiosInstance from '@/utils/axiosInstance';
import React, { useEffect, useState } from 'react';
import html2pdf from 'html2pdf.js';

function AdmitCard() {
  const { student, loading } = useStudent();
  const [folders, setFolders] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [selectedFolder, setSelectedFolder] = useState('');
  const [layoutData, setLayoutData] = useState(null);
  const [subjects, setSubjects] = useState([]); // ✅ subject data
  const[batchName,setBatchName]=useState();
  // Fetch folders
  useEffect(() => {
    if (!loading && student) {
      axiosInstance
        .get('/student/admit-card-folders', {
          params: {
            admin_id: student.admin_id,
            year: student.session,
          },
        })
        .then((res) => {
          setFolders(res.data.data || []);
          if (res.data.data.length > 0) setSelectedFolder(res.data.data[0].id);
        })
        .catch((err) => {
          console.error('Error fetching folders:', err);
        })
        .finally(() => setLoadingData(false));
    }
  }, [loading, student]);

  // Fetch admit card + layout
  const handleDownload = async () => {
    if (!selectedFolder) {
      console.log('No folder selected');
      return;
    }

    try {
      const res = await axiosInstance.get('/student/admit-card', {
        params: {
          enrollment_number: student.enrollment_number,
          batch_id: student.batch_ids,
          admin_id: student.admin_id,
          folder_id: selectedFolder,
        },
      });
setBatchName(res.data.data[0].batch_name);
console.log("ok", res.data.data[0].batch_name);
      if (res.data?.data?.length > 0) {
        const admitData = res.data.data;
       
        
        setSubjects(admitData.map((s) => ({
          subject_name: s.subject_name,
          exam_venue: s.exam_venue,
          exam_date: s.exam_date,
          exam_time: s.exam_time,
        })));

        const examTypeId = admitData[0].exam_type_id;
        const layoutRes = await axiosInstance.get(
          `/student/layout/${examTypeId}/${student.admin_id}`
        );

        setLayoutData(layoutRes.data.data[0]); // ✅ only layout object
      } else {
        console.log('No admit card data found');
      }
    } catch (err) {
      console.error('Error fetching admit card:', err);
    }
  };

  // Download as PDF
  const handlePDFDownload = () => {
    const element = document.getElementById('admit-card');
    const opt = {
      margin: 0.5,
      filename: `AdmitCard_${student.enrollment_number}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };

  if (loading || loadingData) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-3 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">

<div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Admit Card Details</h2>

          </div>

          <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-8">
            <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
              <img
                src={student?.profile_image ? `/storage/${student.profile_image}` : "/default-avatar.png"}
                alt={student?.name || "Student"}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">{student.name}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 text-sm">
                <div>
                  <p className="text-gray-500 mb-1">enrollment Number</p>
                  <p className="font-medium">ID:{student.enrollment_number}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Number</p>
                  <p className="font-medium">{student.contact_number}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Email</p>
                  <p className="font-medium">{student.email}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">father name</p>
                  <p className="font-medium">{student.father_name}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Session</p>
                  <p className="font-medium">{student.session}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Dob</p>
                  <p className="font-medium">
                    {new Date(student.dob).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric"
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
          </div>
        
        {/* Folder Selection */}
        <div className="bg-white rounded-2xl p-4 gap-4 sm:p-6 shadow-sm">
          <label htmlFor="folder" className="block mb-2 font-semibold">
            Choose Admit Card
          </label>
          <select
            id="folder"
            className="border p-2 rounded w-full max-w-xs"
            value={selectedFolder}
            onChange={(e) => setSelectedFolder(e.target.value)}
          >
            <option value="">-- Select it --</option>
            {folders.map((folder) => (
              <option key={folder.id} value={folder.folder_name}>
                {folder.folder_name}
              </option>
            ))}
          </select>

          <button
            onClick={handleDownload}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Generate Admit Card
          </button>
        </div>

        {/* Admit Card */}
        {layoutData && (
          <div>
            <div id="admit-card">
              <AdmitCardLayout
                layout={layoutData}
                student={student}
                subjects={subjects}
                 batchName={batchName} 
              />
            </div>

            <button
              onClick={handlePDFDownload}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Download PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Layout component
function AdmitCardLayout({ layout, student, subjects, batchName }) {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl border border-gray-300 p-8 rounded-2xl mt-6">
      {/* Header */}
      <div className="flex items-center border-b pb-4 mb-6">
        <img
          src={layout.college_logo_url}
          alt="College Logo"
          className="h-20 w-20 object-contain mr-4"
        />
        <div className="flex-1 text-center">
          <h1 className="text-3xl font-bold text-gray-800">{layout.college_name}</h1>
          <p className="text-gray-600 text-sm">
            {layout.exam_type.toUpperCase()} EXAM - {layout.session_of_exam}
          </p>
        </div>
        <div className="w-20"></div>
      </div>

      {/* Student Info */}
      <div className="grid grid-cols-3 gap-6 border-b pb-6 mb-6">
        {/* Left Info */}
        <div className="col-span-2 space-y-1 text-gray-700 text-sm">
          <p><span className="font-semibold">Student Name:</span> {student.name}</p>
          <p><span className="font-semibold">Father Name:</span> {student.father_name}</p>
          <p><span className="font-semibold">Enrollment No:</span> {student.enrollment_number}</p>
          <p><span className="font-semibold">Session:</span> {student.session}</p>
          <p><span className="font-semibold">Contact:</span> {student.contact_number}</p>
          <p><span className="font-semibold">Gender:</span> {student.gender}</p>
          <p><span className="font-semibold">DOB:</span> {new Date(student.dob).toLocaleDateString('en-IN')}</p>
          <p><span className="font-semibold">Batch:</span> {batchName}</p>
        </div>

        {/* Student Photo */}
        <div className="flex justify-center items-start">
          <div className="w-32 h-40 border border-gray-400 rounded overflow-hidden shadow">
            <img
              src={student?.profile_image ? `/storage/${student.profile_image}` : "/default-avatar.png"}
              alt="Student"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Subjects Table */}
      {subjects.length > 0 && (
        <div className="mb-6">
          <h2 className="font-semibold mb-3 text-gray-800 text-lg">Exam Schedule</h2>
          <table className="w-full border border-gray-300 text-sm rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="border px-3 py-2">Subject</th>
                <th className="border px-3 py-2">Venue</th>
                <th className="border px-3 py-2">Date</th>
                <th className="border px-3 py-2">Time</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((sub, idx) => (
                <tr
                  key={idx}
                  className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="border px-3 py-2">{sub.subject_name}</td>
                  <td className="border px-3 py-2">{sub.exam_venue}</td>
                  <td className="border px-3 py-2">
                    {new Date(sub.exam_date).toLocaleDateString('en-IN')}
                  </td>
                  <td className="border px-3 py-2">{sub.exam_time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Instructions */}
      {layout.general_instructions?.length > 0 && (
        <div className="mb-6">
          <h2 className="font-semibold text-gray-800 text-lg">General Instructions</h2>
          <ul className="list-disc ml-6 text-gray-600 text-sm space-y-1 mt-2">
            {layout.general_instructions.map((inst, idx) => (
              <li key={idx}>{inst}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Notices */}
      {layout.notices?.length > 0 && (
        <div className="mb-6">
          <h2 className="font-semibold text-gray-800 text-lg">Notices</h2>
          <ul className="list-disc ml-6 text-gray-600 text-sm space-y-1 mt-2">
            {layout.notices.map((note, idx) => (
              <li key={idx}>{note}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Signature */}
      <div className="flex justify-end items-center mt-10">
        {layout.sign_url && (
          <img
            src={layout.sign_url}
            alt="Signature"
            className="h-16 object-contain mr-4"
          />
        )}
        <p className="text-sm font-semibold text-gray-700">Authorized Signatory</p>
      </div>
    </div>
  );
}


AdmitCard.layout = (page) => <StudentLayout>{page}</StudentLayout>;

export default AdmitCard;
