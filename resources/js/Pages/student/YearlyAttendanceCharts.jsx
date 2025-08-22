"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { PolarArea, Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler
);

export default function YearlyAttendanceCharts() {
  const [attendance, setAttendance] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // current year + 1

  useEffect(() => {
    axiosInstance
      .get("/student/get-attendance")
      .then((res) => setAttendance(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Filter attendance by year
  const filtered = attendance.filter((r) => {
    const d = new Date(r.date);
    return d.getFullYear() === selectedYear;
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

  const polarData = {
    labels: subjects,
    datasets: [
      {
        label: "Total Attendance (Present + Absent)",
        data: subjects.map((s) => summary[s].present + summary[s].absent),
        backgroundColor: [
          "rgba(75, 192, 192, 0.7)",
          "rgba(255, 99, 132, 0.7)",
          "rgba(153, 102, 255, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(54, 162, 235, 0.7)",
        ],
      },
    ],
  };

  const radarData = {
    labels: subjects,
    datasets: [
      {
        label: "Present",
        data: presentCounts,
        backgroundColor: "rgba(75, 192, 192, 0.3)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
      },
      {
        label: "Absent",
        data: absentCounts,
        backgroundColor: "rgba(255, 99, 132, 0.3)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
      },
    ],
  };

  const years = [...new Set(attendance.map((r) => new Date(r.date).getFullYear()))];

  return (
    <div className="p-6 space-y-6">
      {/* Year Selector */}
      <div className="flex gap-4">
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

      {/* Grid Layout */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Polar Area Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-bold mb-2">Polar Area Chart ({selectedYear})</h2>
          {subjects.length > 0 ? <PolarArea data={polarData} /> : <p>No data</p>}
        </div>

        {/* Radar Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-bold mb-2">Radar Chart ({selectedYear})</h2>
          {subjects.length > 0 ? <Radar data={radarData} /> : <p>No data</p>}
        </div>
      </div>
    </div>
  );
}