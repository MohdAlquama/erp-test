import { useStudent } from '@/contexts/StudentContext';
import StudentLayout from '@/Layouts/StudentLayout';
import axiosInstance from '@/utils/axiosInstance';
import React, { useEffect, useState } from 'react';

function Result() {
  const { student, loading } = useStudent();
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState("");
  const [results, setResults] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [fetchingResults, setFetchingResults] = useState(false);

  // Fetch admit card folders
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
          const data = res.data.data || [];
          setFolders(data);
          if (data.length > 0) setSelectedFolder(data[0].folder_name); // default folder
        })
        .catch((err) => console.error('Error fetching folders:', err))
        .finally(() => setLoadingData(false));
    }
  }, [loading, student]);

  // Fetch results on button click
  const handleFetchResults = () => {
    if (!selectedFolder || !student) return;

    setFetchingResults(true);
    axiosInstance
      .get(`/student/result/${student.admin_id}/${selectedFolder}/${student.batch_ids}/${student.enrollment_number}`)
      .then((res) => {
        setResults(res.data.data || []);
      })
      .catch((err) => console.error('Error fetching results:', err))
      .finally(() => setFetchingResults(false));
  };

  if (loading || loadingData) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-3 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Student Info */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Result Card Details</h2>

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
            Choose Result Card
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
            onClick={handleFetchResults}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
                  disabled={fetchingResults || !selectedFolder}
          >
   {fetchingResults ? 'Fetching...' : 'Load Results'}          </button>
        </div>



        {/* Results Table */}
        {results.length > 0 ? (
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-3 border">Subject</th>
                  <th className="p-3 border">Teacher</th>
                  <th className="p-3 border">Exam Venue</th>
                  <th className="p-3 border">Exam Date</th>
                  <th className="p-3 border">Exam Time</th>
                  <th className="p-3 border">Max Marks</th>
                  <th className="p-3 border">Scored</th>
                  <th className="p-3 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {results.map((row) => (
                  <tr key={row.result_id} className="hover:bg-gray-50">
                    <td className="p-3 border">{row.subject_name}</td>
                    <td className="p-3 border">{row.teacher_id}</td>
                    <td className="p-3 border">{row.exam_venue}</td>
                    <td className="p-3 border">{row.exam_date}</td>
                    <td className="p-3 border">{row.exam_time}</td>
                    <td className="p-3 border">{row.max_marks}</td>
                    <td className="p-3 border font-bold">{row.scored_marks}</td>
                    <td className="p-3 border">{row.result_status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
            <p className="text-gray-500 text-center">No results found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

Result.layout = (page) => <StudentLayout>{page}</StudentLayout>;

export default Result;
