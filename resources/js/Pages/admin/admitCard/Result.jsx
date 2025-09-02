// import React, { useEffect, useState } from "react";
// import axiosInstance from "@/utils/axiosInstance";

// function Result({ folder_id, admin_id, batch_id , refreshKey , onResultSubmitted}) {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [results, setResults] = useState({});
//   const [bulkMaxMarks, setBulkMaxMarks] = useState("");
//   const [submittingId, setSubmittingId] = useState(null);

//   // Fetch Data
//   useEffect(() => {
//     if (!folder_id || !admin_id) return;

//     const fetchData = async () => {
//       try {
//         const res = await axiosInstance.get(
//           `/admin/${admin_id}/admit-cards/${folder_id}/${batch_id}`
//         );
//         setData(res.data);

//         // Initialize state
//         const initial = {};
//         res.data.forEach((row) => {
//           initial[row.id] = {
//             max_marks: row.max_marks ?? "",
//             scored_marks: row.scored_marks ?? "",
//           };
//         });
//         setResults(initial);
//       } catch (err) {
//         console.error("Error fetching admit card data:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [folder_id, admin_id, batch_id , refreshKey]);

//   // Handle per-field changes
//   const handleChange = (id, field, value) => {
//     setResults((prev) => ({
//       ...prev,
//       [id]: { ...prev[id], [field]: value },
//     }));
//   };

//   // Bulk Max Marks Change
//   const handleBulkMaxMarksChange = (value) => {
//     setBulkMaxMarks(value);
//     setResults((prev) => {
//       const updated = {};
//       Object.keys(prev).forEach((id) => {
//         updated[id] = { ...prev[id], max_marks: value };
//       });
//       return updated;
//     });
//   };

//   // Validation
//   const validateRow = (row) => {
//     const mm = Number(row.max_marks);
//     const sm = Number(row.scored_marks);
//     if (Number.isNaN(mm) || Number.isNaN(sm)) return "Marks must be numbers.";
//     if (mm <= 0) return "Max marks must be greater than 0.";
//     if (sm < 0) return "Scored marks cannot be negative.";
//     if (sm > mm) return "Scored marks cannot exceed max marks.";
//     return null;
//   };

//   // Submit single row
//   const handleSubmit = async (id, rowData, meta) => {
//     const errMsg = validateRow(rowData);
//     if (errMsg) {
//       alert(errMsg);
//       return;
//     }

//     setSubmittingId(id);
//     try {
//       await axiosInstance.post(`/admin/${admin_id}/results`, {
//         folder_id,
//         batch_id,
//         admin_id,
//         admit_card_id: id,
//         enrollment_number: meta.enrollment_number,
//         subject_name: meta.subject_name,
//         student_name: meta.student_name, // ✅ fixed
//         max_marks: Number(rowData.max_marks),
//         scored_marks: Number(rowData.scored_marks),
//         status: "pending",
//       });

//       alert("Result submitted successfully!");
//       if (onResultSubmitted) onResultSubmitted();
//     } catch (err) {
//       console.error("Error submitting result:", err);
//       alert("Failed to submit. Please try again.");
//     } finally {
//       setSubmittingId(null);
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (!data.length) return <p>No data available</p>;

//   return (
//     <div className="overflow-x-auto mt-4">
//       {/* Bulk Max Marks Input */}
//       <div className="flex items-center gap-3 mb-3">
//         <label className="font-medium">Bulk Max Marks:</label>
//         <input
//           type="number"
//           value={bulkMaxMarks}
//           onChange={(e) => handleBulkMaxMarksChange(e.target.value)}
//           className="border px-3 py-1 rounded"
//         />
//       </div>

//       <table className="min-w-full border border-gray-300 rounded-lg">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="border px-4 py-2">Enrollment</th>
//             <th className="border px-4 py-2">Subject</th>
//             <th className="border px-4 py-2">Batch</th>
//             <th className="border px-4 py-2">Teacher</th>
//             <th className="border px-4 py-2">Student</th>
//             <th className="border px-4 py-2">Venue</th>
//             <th className="border px-4 py-2">Date</th>
//             <th className="border px-4 py-2">Max Marks</th>
//             <th className="border px-4 py-2">Scored Marks</th>
//             <th className="border px-4 py-2">Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {data.map((row) => {
//             const r = results[row.id] || {};

//             return (
//               <tr key={row.id} className="hover:bg-gray-50">
//                 <td className="border px-4 py-2">{row.enrollment_number}</td>
//                 <td className="border px-4 py-2">{row.subject_name}</td>
//                 <td className="border px-4 py-2">{row.batch_name}</td>
//                 <td className="border px-4 py-2">{row.teacher_name}</td>
//                 <td className="border px-4 py-2">{row.student_name}</td>
//                 <td className="border px-4 py-2">{row.exam_venue}</td>
//                 <td className="border px-4 py-2">{row.exam_date}</td>

//                 {/* Max Marks */}
//                 <td className="border px-2 py-1">
//                   <input
//                     type="number"
//                     value={r.max_marks ?? ""}
//                     onChange={(e) =>
//                       handleChange(row.id, "max_marks", e.target.value)
//                     }
//                     className="border rounded px-2 py-1 w-24"
//                     min="0"
//                   />
//                 </td>

//                 {/* Scored Marks */}
//                 <td className="border px-2 py-1">
//                   <input
//                     type="number"
//                     value={r.scored_marks ?? ""}
//                     onChange={(e) =>
//                       handleChange(row.id, "scored_marks", e.target.value)
//                     }
//                     className="border rounded px-2 py-1 w-24"
//                     min="0"
//                   />
//                 </td>

//                 {/* Submit */}
//                 <td className="border px-4 py-2 text-center">
//                   <button
//                     onClick={() =>
//                       handleSubmit(row.id, results[row.id], {
//                         enrollment_number: row.enrollment_number,
//                         subject_name: row.subject_name,
//                         student_name: row.student_name, // ✅ passed here
//                       })
//                     }
//                     className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded disabled:opacity-60"
//                     disabled={submittingId === row.id}
//                   >
//                     {submittingId === row.id ? "Saving..." : "Submit"}
//                   </button>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Result;

import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";

function Result({ folder_id, admin_id, batch_id, refreshKey, onResultSubmitted }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState({});
  const [bulkMaxMarks, setBulkMaxMarks] = useState("");
  const [submittingId, setSubmittingId] = useState(null);

  // Fetch Data
  useEffect(() => {
    if (!folder_id || !admin_id) return;

    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(
          `/admin/${admin_id}/admit-cards/${folder_id}/${batch_id}`
        );
        setData(res.data);

        // Preserve old typed values
        setResults((prev) => {
          const updated = {};
          res.data.forEach((row) => {
            updated[row.id] = {
              max_marks: prev[row.id]?.max_marks ?? row.max_marks ?? "",
              scored_marks: prev[row.id]?.scored_marks ?? row.scored_marks ?? "",
            };
          });
          return updated;
        });
      } catch (err) {
        console.error("Error fetching admit card data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [folder_id, admin_id, batch_id, refreshKey]);

  // Handle per-field changes
  const handleChange = (id, field, value) => {
    setResults((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  // Bulk Max Marks
  const handleBulkMaxMarksChange = (value) => {
    setBulkMaxMarks(value);
    setResults((prev) => {
      const updated = {};
      Object.keys(prev).forEach((id) => {
        updated[id] = { ...prev[id], max_marks: value };
      });
      return updated;
    });
  };

  // Validation
  const validateRow = (row) => {
    const mm = Number(row.max_marks);
    const sm = Number(row.scored_marks);
    if (Number.isNaN(mm) || Number.isNaN(sm)) return "Marks must be numbers.";
    if (mm <= 0) return "Max marks must be greater than 0.";
    if (sm < 0) return "Scored marks cannot be negative.";
    if (sm > mm) return "Scored marks cannot exceed max marks.";
    return null;
  };

  // Submit row
  const handleSubmit = async (id, rowData, meta) => {
    const errMsg = validateRow(rowData);
    if (errMsg) {
      alert(errMsg);
      return;
    }

    setSubmittingId(id);
    try {
      await axiosInstance.post(`/admin/${admin_id}/results`, {
        folder_id,
        batch_id,
        admin_id,
        admit_card_id: id,
        enrollment_number: meta.enrollment_number,
        subject_name: meta.subject_name,
        student_name: meta.student_name,
        max_marks: Number(rowData.max_marks),
        scored_marks: Number(rowData.scored_marks),
        status: "pending",
      });

      // ✅ Optimistic local update
      setData((prev) =>
        prev.map((row) =>
          row.id === id
            ? { ...row, max_marks: rowData.max_marks, scored_marks: rowData.scored_marks }
            : row
        )
      );

      alert("Result submitted successfully!");
      if (onResultSubmitted) onResultSubmitted(); // 🔥 to sync ResultGetData
    } catch (err) {
      console.error("Error submitting result:", err);
      alert("Failed to submit. Please try again.");
    } finally {
      setSubmittingId(null);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!data.length) return <p>No data available</p>;

  return (
    <div className="overflow-x-auto mt-4">
      {/* Bulk Max Marks Input */}
      <div className="flex items-center gap-3 mb-3">
        <label className="font-medium">Bulk Max Marks:</label>
        <input
          type="number"
          value={bulkMaxMarks}
          onChange={(e) => handleBulkMaxMarksChange(e.target.value)}
          className="border px-3 py-1 rounded"
        />
      </div>

      {/* Table */}
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
            <th className="border px-4 py-2">Max Marks</th>
            <th className="border px-4 py-2">Scored Marks</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row) => {
            const r = results[row.id] || {};
            return (
              <tr key={row.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{row.enrollment_number}</td>
                <td className="border px-4 py-2">{row.subject_name}</td>
                <td className="border px-4 py-2">{row.batch_name}</td>
                <td className="border px-4 py-2">{row.teacher_name}</td>
                <td className="border px-4 py-2">{row.student_name}</td>
                <td className="border px-4 py-2">{row.exam_venue}</td>
                <td className="border px-4 py-2">{row.exam_date}</td>

                {/* Max Marks */}
                <td className="border px-2 py-1">
                  <input
                    type="number"
                    value={r.max_marks ?? ""}
                    onChange={(e) => handleChange(row.id, "max_marks", e.target.value)}
                    className="border rounded px-2 py-1 w-24"
                  />
                </td>

                {/* Scored Marks */}
                <td className="border px-2 py-1">
                  <input
                    type="number"
                    value={r.scored_marks ?? ""}
                    onChange={(e) => handleChange(row.id, "scored_marks", e.target.value)}
                    className="border rounded px-2 py-1 w-24"
                  />
                </td>

                {/* Submit */}
                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() =>
                      handleSubmit(row.id, results[row.id], {
                        enrollment_number: row.enrollment_number,
                        subject_name: row.subject_name,
                        student_name: row.student_name,
                      })
                    }
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded disabled:opacity-60"
                    disabled={submittingId === row.id}
                  >
                    {submittingId === row.id ? "Saving..." : "Submit"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Result;
