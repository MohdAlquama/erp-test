// import React, { useEffect, useState } from "react";
// import axiosInstance from "@/utils/axiosInstance";

// function ResultGetData({ folder_id, admin_id, batch_id , refreshKey}) {
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editingRow, setEditingRow] = useState(null); // Track which row is being edited
//   const [formData, setFormData] = useState({}); // Store input values

//   // Fetch results
//   useEffect(() => {
//     if (!folder_id || !admin_id || !batch_id) return;

//     const fetchResults = async () => {
//       try {
//         const res = await axiosInstance.get(
//           `/admin/${admin_id}/results/${folder_id}/${batch_id}`
//         );
//         setResults(res.data);
//       } catch (err) {
//         console.error("Error fetching results:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchResults();
//   }, [folder_id, admin_id, batch_id , refreshKey]);

//   // Handle delete
//   const handleDelete = async (row) => {
//     if (!window.confirm("Are you sure you want to delete this result?")) return;

//     try {
//       await axiosInstance.delete(`admin/results/${admin_id}/${row.enrollment_number}`);

//       setResults((prev) => prev.filter((r) => r.enrollment_number !== row.enrollment_number));
//       alert("Result deleted successfully!");
//     } catch (err) {
//       console.error("Error deleting result:", err);
//       alert("Failed to delete result");
//     }
//   };

//   // Start editing row
//   const handleEdit = (row) => {
//     setEditingRow(row.enrollment_number);
//     setFormData({
//       subject_name: row.subject_name,
//       max_marks: row.max_marks,
//       scored_marks: row.scored_marks,
//       status: row.status,
//     });
//   };

//   // Save update
//   const handleUpdate = async (enrollment_number) => {
//     try {
//       const res = await axiosInstance.put(
//         `/results/${admin_id}/${enrollment_number}`,
//         formData
//       );

//       setResults((prev) =>
//         prev.map((r) =>
//           r.enrollment_number === enrollment_number ? res.data.data : r
//         )
//       );

//       setEditingRow(null);
//       alert("Result updated successfully!");
//     } catch (err) {
//       console.error("Error updating result:", err);
//       alert("Failed to update result");
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (!results.length) return <p>No results found</p>;

//   return (
//     <div className="overflow-x-auto mt-4">
//       <table className="min-w-full border border-gray-300 rounded-lg">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="border px-4 py-2">Enrollment</th>
//             <th className="border px-4 py-2">Subject</th>
//             <th className="border px-4 py-2">Student</th>
//             <th className="border px-4 py-2">Max Marks</th>
//             <th className="border px-4 py-2">Scored Marks</th>
//             <th className="border px-4 py-2">Status</th>
//             <th className="border px-4 py-2">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {results.map((row) => (
//             <tr key={row.enrollment_number} className="hover:bg-gray-50">
//               <td className="border px-4 py-2">{row.enrollment_number}</td>

//               {editingRow === row.enrollment_number ? (
//                 <>
//                   <td className="border px-4 py-2">
//                     <input
//                       value={formData.subject_name}
//                       onChange={(e) =>
//                         setFormData({ ...formData, subject_name: e.target.value })
//                       }
//                       className="border p-1 w-full"
//                     />
//                   </td>
//                   <td className="border px-4 py-2">{row.student_name}</td>
//                   <td className="border px-4 py-2">
//                     <input
//                       type="number"
//                       value={formData.max_marks}
//                       onChange={(e) =>
//                         setFormData({ ...formData, max_marks: e.target.value })
//                       }
//                       className="border p-1 w-full"
//                     />
//                   </td>
//                   <td className="border px-4 py-2">
//                     <input
//                       type="number"
//                       value={formData.scored_marks}
//                       onChange={(e) =>
//                         setFormData({ ...formData, scored_marks: e.target.value })
//                       }
//                       className="border p-1 w-full"
//                     />
//                   </td>
//                   <td className="border px-4 py-2">
//                     <select
//                       value={formData.status}
//                       onChange={(e) =>
//                         setFormData({ ...formData, status: e.target.value })
//                       }
//                       className="border p-1 w-full"
//                     >
//                       <option value="pass">Pass</option>
//                       <option value="fail">Fail</option>
//                     </select>
//                   </td>
//                   <td className="border px-4 py-2 text-center space-x-2">
//                     <button
//                       onClick={() => handleUpdate(row.enrollment_number)}
//                       className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
//                     >
//                       Save
//                     </button>
//                     <button
//                       onClick={() => setEditingRow(null)}
//                       className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded"
//                     >
//                       Cancel
//                     </button>
//                   </td>
//                 </>
//               ) : (
//                 <>
//                   <td className="border px-4 py-2">{row.subject_name}</td>
//                   <td className="border px-4 py-2">{row.student_name}</td>
//                   <td className="border px-4 py-2">{row.max_marks}</td>
//                   <td className="border px-4 py-2">{row.scored_marks}</td>
//                   <td className="border px-4 py-2 capitalize">{row.status}</td>
//                   <td className="border px-4 py-2 text-center space-x-2">
//                     {/* <button
//                       onClick={() => handleEdit(row)}
//                       className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
//                     >
//                       Edit
//                     </button> */}
                     
                    
//                     <button
//                       onClick={() => handleDelete(row)}
//                       className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </>
//               )}
//             </tr>
//           ))}
//         </tbody>
//       </table>
  
//     </div>
//   );
// }

// export default ResultGetData;
import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";

function ResultGetData({ folder_id, admin_id, batch_id, refreshKey }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Fetch results
  useEffect(() => {
    if (!folder_id || !admin_id || !batch_id) return;

    const fetchResults = async () => {
      try {
        const res = await axiosInstance.get(
          `/admin/${admin_id}/results/${folder_id}/${batch_id}`
        );
        setResults(res.data);
      } catch (err) {
        console.error("Error fetching results:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [folder_id, admin_id, batch_id, refreshKey]);

  // Handle delete
  const handleDelete = async (row) => {
    if (!window.confirm("Are you sure you want to delete this result?")) return;

    try {
      await axiosInstance.delete(
        `admin/results/${admin_id}/${row.enrollment_number}`
      );

      setResults((prev) =>
        prev.filter((r) => r.enrollment_number !== row.enrollment_number)
      );
      alert("Result deleted successfully!");
    } catch (err) {
      console.error("Error deleting result:", err);
      alert("Failed to delete result");
    }
  };

 const approveAllResults = async () => {
    try {
      const res = await axiosInstance.put("/admin/results/approve", {
        admin_id,
        batch_id,
        folder_id,
      });

      // Update local state instantly
      setResults((prev) => prev.map((r) => ({ ...r, status: "approved" })));

      alert(res.data.message);
    } catch (err) {
      console.error("Error approving results:", err);
      alert("Failed to approve results");
    }
  };

  // Apply search filter
  const filteredResults = results.filter(
    (r) =>
      r.enrollment_number.toLowerCase().includes(search.toLowerCase()) ||
      r.student_name.toLowerCase().includes(search.toLowerCase()) ||
      r.subject_name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (!results.length) return <p className="text-center mt-4">No results found</p>;

  return (
    <div className="overflow-x-auto mt-4">
      {/* ℹ️ Info text */}
      <p className="text-center text-lg font-medium mb-2 text-gray-700">
        Result Data Table – Search, Manage & Delete
      </p>

      {/* 🔎 Search bar */}
      <div className="flex flex-col items-center mb-4 space-y-3">
        <div className="relative w-1/2">
          <input
            type="text"
            placeholder="🔍 Search by enrollment, student or subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-4 py-2 rounded w-full focus:ring-2 focus:ring-blue-400 outline-none"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-2 text-gray-500 hover:text-red-500"
            >
              ✕
            </button>
          )}
        </div>

        {/* Two buttons under search */}
        <div className="flex space-x-4">
          <button
            onClick={approveAllResults}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Approve All Results
          </button>
          <button
            onClick={() => console.log("Button 2 clicked")}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Button 2
          </button>
        </div>
      </div>

      {/* 📊 Results Table */}
      <table className="min-w-full border border-gray-300 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Enrollment</th>
            <th className="border px-4 py-2">Subject</th>
            <th className="border px-4 py-2">Student</th>
            <th className="border px-4 py-2">Max Marks</th>
            <th className="border px-4 py-2">Scored Marks</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredResults.map((row) => (
            <tr key={row.enrollment_number} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{row.enrollment_number}</td>
              <td className="border px-4 py-2">{row.subject_name}</td>
              <td className="border px-4 py-2">{row.student_name}</td>
              <td className="border px-4 py-2">{row.max_marks}</td>
              <td className="border px-4 py-2">{row.scored_marks}</td>
              <td className="border px-4 py-2 capitalize">{row.status}</td>
              <td className="border px-4 py-2 text-center space-x-2">
                <button
                  onClick={() => handleDelete(row)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResultGetData;
