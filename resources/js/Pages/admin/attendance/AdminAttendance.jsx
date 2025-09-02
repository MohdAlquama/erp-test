// import React, { useEffect, useState } from "react";
// import axiosInstance from "@/utils/axiosInstance";
// import {
//   BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer
// } from "recharts";

// export default function AdminAttendance({ adminId }) {
//   const [attendanceData, setAttendanceData] = useState([]);
//   const [year, setYear] = useState(new Date().getFullYear()); // default current year
//   const [chartData, setChartData] = useState({});

//   useEffect(() => {
//     fetchAttendance();
//   }, [year]);

//   const fetchAttendance = async () => {
//     try {
//       const res = await axiosInstance.get(`/admin/${adminId}/attendance`);
//       setAttendanceData(res.data);
//       processData(res.data);
//     } catch (error) {
//       console.error("Error fetching attendance", error);
//     }
//   };

//   const processData = (data) => {
//     // Group data batch-wise
//     const grouped = {};

//     data.forEach((item) => {
//       const date = new Date(item.date);
//       const itemYear = date.getFullYear();

//       if (itemYear !== parseInt(year)) return; // filter by selected year

//       const month = date.toLocaleString("default", { month: "short" }); // Jan, Feb, ...

//       if (!grouped[item.batch_name]) {
//         grouped[item.batch_name] = {};
//       }

//       if (!grouped[item.batch_name][month]) {
//         grouped[item.batch_name][month] = { present: 0, absent: 0 };
//       }

//       if (item.status === "present") {
//         grouped[item.batch_name][month].present += 1;
//       } else {
//         grouped[item.batch_name][month].absent += 1;
//       }
//     });

//     // Convert grouped data into recharts format
//     const formatted = {};
//     Object.keys(grouped).forEach((batch) => {
//       formatted[batch] = Object.keys(grouped[batch]).map((month) => ({
//         month,
//         present: grouped[batch][month].present,
//         absent: grouped[batch][month].absent,
//       }));
//     });

//     setChartData(formatted);
//   };

//   // Get year options dynamically from fetched data
//   const availableYears = Array.from(
//     new Set(attendanceData.map((item) => new Date(item.date).getFullYear()))
//   ).sort();

//   return (
//     <div className="p-6 space-y-6">
//       {/* Year Filter */}
//       <div className="flex items-center gap-2">
//         <label className="font-medium">Select Year:</label>
//         <select
//           className="border rounded p-2"
//           value={year}
//           onChange={(e) => setYear(e.target.value)}
//         >
//           {availableYears.map((y) => (
//             <option key={y} value={y}>{y}</option>
//           ))}
//         </select>
//       </div>

//       {/* Charts per Batch */}
//       {Object.keys(chartData).map((batch) => (
//         <div key={batch} className="p-4 border rounded-lg shadow bg-white">
//           <h2 className="text-lg font-bold mb-4">{batch} - Attendance ({year})</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={chartData[batch]}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="month" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="present" fill="#4caf50" name="Present" />
//               <Bar dataKey="absent" fill="#f44336" name="Absent" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       ))}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";

export default function AdminAttendance({ adminId }) {
  const [attendanceData, setAttendanceData] = useState([]);
  const [summary, setSummary] = useState({ batchSubject: [], monthly: [], yearly: [], today: [] });
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // default current year

  // Fetch Attendance Data
  const fetchAttendance = async () => {
    try {
      const res = await axiosInstance.get(`/admin/${adminId}/attendance`);
      setAttendanceData(res.data);
      setSummary(processData(res.data));
    } catch (error) {
      console.error("Error fetching attendance", error);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  // Set default year if available in summary
  useEffect(() => {
    if (summary.yearly.length > 0) {
      const currentYear = new Date().getFullYear();
      const availableYears = summary.yearly.map((y) => y.year);
      if (availableYears.includes(currentYear)) {
        setSelectedYear(currentYear);
      } else {
        setSelectedYear(availableYears[0]);
      }
    }
  }, [summary.yearly]);

  // Filter monthly summary based on selectedYear
  const filteredMonthly = summary.monthly.filter((row) =>
    row.month.startsWith(selectedYear.toString())
  );

  return (
    <div className="space-y-6 p-4">
      {/* Today's Summary */}
      <div>
        <h2 className="text-xl font-bold mb-2">Today's Attendance</h2>
        {summary.today.length > 0 ? (
          <table className="w-full border text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">Batch</th>
                <th className="p-2 border">Subject</th>
                <th className="p-2 border">Present</th>
                <th className="p-2 border">Absent</th>
              </tr>
            </thead>
            <tbody>
              {summary.today.map((row, idx) => (
                <tr key={idx} className="border">
                  <td className="p-2 border">{row.batch}</td>
                  <td className="p-2 border">{row.subject}</td>
                  <td className="p-2 border">{row.present}</td>
                  <td className="p-2 border">{row.absent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No attendance data for today.</p>
        )}
      </div>

      {/* Batch + Subject Summary */}
      <div>
        <h2 className="text-xl font-bold mb-2">Batch + Subject Summary</h2>
        <table className="w-full border text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Batch</th>
              <th className="p-2 border">Subject</th>
              <th className="p-2 border">Present</th>
              <th className="p-2 border">Absent</th>
            </tr>
          </thead>
          <tbody>
            {summary.batchSubject.map((row, idx) => (
              <tr key={idx} className="border">
                <td className="p-2 border">{row.batch}</td>
                <td className="p-2 border">{row.subject}</td>
                <td className="p-2 border">{row.present}</td>
                <td className="p-2 border">{row.absent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Monthly Summary with Year Filter */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold">Monthly Summary</h2>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="border rounded p-1"
          >
            {summary.yearly
              .sort((a, b) => b.year - a.year) // latest year on top
              .map((row, idx) => (
                <option key={idx} value={row.year}>
                  {row.year}
                </option>
              ))}
          </select>
        </div>

        <table className="w-full border text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Month</th>
              <th className="p-2 border">Present</th>
              <th className="p-2 border">Absent</th>
            </tr>
          </thead>
          <tbody>
            {filteredMonthly.map((row, idx) => (
              <tr key={idx} className="border">
                <td className="p-2 border">{row.month}</td>
                <td className="p-2 border">{row.present}</td>
                <td className="p-2 border">{row.absent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Yearly Summary */}
      <div>
        <h2 className="text-xl font-bold mb-2">Yearly Summary</h2>
        <table className="w-full border text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Year</th>
              <th className="p-2 border">Present</th>
              <th className="p-2 border">Absent</th>
            </tr>
          </thead>
          <tbody>
            {summary.yearly.map((row, idx) => (
              <tr key={idx} className="border">
                <td className="p-2 border">{row.year}</td>
                <td className="p-2 border">{row.present}</td>
                <td className="p-2 border">{row.absent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ✅ Updated Utility function
function processData(data) {
  const batchSubjectSummary = {};
  const monthlySummary = {};
  const yearlySummary = {};
  const todaySummary = {};

  const today = new Date().toISOString().slice(0, 10); // yyyy-mm-dd

  data.forEach((item) => {
    const { batch_name, subject_name, status, date } = item;
    const key = `${batch_name}-${subject_name}`;

    // Batch + Subject Summary
    if (!batchSubjectSummary[key]) {
      batchSubjectSummary[key] = { batch: batch_name, subject: subject_name, present: 0, absent: 0 };
    }
    batchSubjectSummary[key][status] += 1;

    // Monthly Summary
    const month = date.slice(0, 7); // yyyy-mm
    if (!monthlySummary[month]) monthlySummary[month] = { month, present: 0, absent: 0 };
    monthlySummary[month][status] += 1;

    // Yearly Summary
    const year = date.slice(0, 4);
    if (!yearlySummary[year]) yearlySummary[year] = { year: Number(year), present: 0, absent: 0 };
    yearlySummary[year][status] += 1;

    // Today's Summary
    if (date === today) {
      if (!todaySummary[key]) {
        todaySummary[key] = { batch: batch_name, subject: subject_name, present: 0, absent: 0 };
      }
      todaySummary[key][status] += 1;
    }
  });

  // ✅ Ensure current year always appears in dropdown
  const currentYear = new Date().getFullYear();
  if (!yearlySummary[currentYear]) {
    yearlySummary[currentYear] = { year: currentYear, present: 0, absent: 0 };
  }

  return {
    batchSubject: Object.values(batchSubjectSummary),
    monthly: Object.values(monthlySummary),
    yearly: Object.values(yearlySummary),
    today: Object.values(todaySummary),
  };
}

