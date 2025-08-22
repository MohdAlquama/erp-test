"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement);

export default function AttendanceCharts() {
  const [attendance, setAttendance] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // current month
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // current year

  useEffect(() => {
    axiosInstance
      .get("/student/get-attendance")
      .then((res) => setAttendance(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Filter attendance by selected month/year
  const filtered = attendance.filter((r) => {
    const d = new Date(r.date);
    return (
      d.getMonth() + 1 === selectedMonth &&
      d.getFullYear() === selectedYear
    );
  });

  // Group by subject and status
  const summary = filtered.reduce((acc, record) => {
    const subject = record.subject_name;
    const status = record.status;
    if (!acc[subject]) {
      acc[subject] = { present: 0, absent: 0 };
    }
    acc[subject][status] += 1;
    return acc;
  }, {});

  const subjects = Object.keys(summary);
  const presentCounts = subjects.map((s) => summary[s].present);
  const absentCounts = subjects.map((s) => summary[s].absent);

  // Chart.js datasets
  const barData = {
    labels: subjects,
    datasets: [
      {
        label: "Present",
        data: presentCounts,
        backgroundColor: "rgba(75, 192, 192, 0.7)",
      },
      {
        label: "Absent",
        data: absentCounts,
        backgroundColor: "rgba(255, 99, 132, 0.7)",
      },
    ],
  };

  const pieData = {
    labels: ["Present", "Absent"],
    datasets: [
      {
        data: [
          presentCounts.reduce((a, b) => a + b, 0),
          absentCounts.reduce((a, b) => a + b, 0),
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.7)",
          "rgba(255, 99, 132, 0.7)",
        ],
      },
    ],
  };

  // Dropdowns for Month/Year
  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const years = [...new Set(attendance.map((r) => new Date(r.date).getFullYear()))];

  return (
    <div className="p-6 space-y-6 overflow-hidden">
      {/* Filters */}
      <div className="flex gap-4">
        <select
          className="border p-2 rounded"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
        >
          {months.map((m, idx) => (
            <option key={idx} value={idx + 1}>
              {m}
            </option>
          ))}
        </select>

        <select
          className="border p-2 rounded"
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
        >
          {years.length > 0
            ? years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))
            : <option>{new Date().getFullYear()}</option>}
        </select>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-bold mb-2">
            Subject-wise Attendance ({months[selectedMonth - 1]} {selectedYear})
          </h2>
          {subjects.length > 0 ? (
            <Bar data={barData} />
          ) : (
            <p className="text-gray-500">No data for this month/year</p>
          )}
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-bold mb-2">
            Overall Attendance ({months[selectedMonth - 1]} {selectedYear})
          </h2>
          {(presentCounts.length > 0 || absentCounts.length > 0) ? (
            <Pie data={pieData} />
          ) : (
            <p className="text-gray-500">No data for this month/year</p>
          )}
        </div>
      </div>
    </div>
  );
}
