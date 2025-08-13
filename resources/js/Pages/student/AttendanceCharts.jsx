import React, { useEffect, useState } from "react";
import { Line, PolarArea } from "react-chartjs-2";
import axiosInstance from "@/utils/axiosInstance";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  RadialLinearScale,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  RadialLinearScale
);

export default function AttendanceCharts({ student_id, admin_id }) {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!student_id || !admin_id) return;
    axiosInstance
      .get(`/student/attendance/get/${student_id}/${admin_id}`)
      .then((res) => {
        setAttendance(res.data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [student_id, admin_id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-6 bg-white/90 rounded-2xl shadow-lg">
        <div className="text-lg font-medium text-gray-600">Loading attendance charts...</div>
      </div>
    );
  }

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const presentCountByMonth = new Array(12).fill(0);
  const absentCountByMonth = new Array(12).fill(0);

  attendance.forEach(({ date, status }) => {
    const d = new Date(date);
    const monthIndex = d.getMonth();
    if (status === "present") presentCountByMonth[monthIndex]++;
    else if (status === "absent") absentCountByMonth[monthIndex]++;
  });

  const lineChartData = {
    labels: months,
    datasets: [
      {
        label: "Present",
        data: presentCountByMonth,
        borderColor: "rgba(34, 197, 94, 0.8)",
        backgroundColor: "rgba(34, 197, 94, 0.2)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Absent",
        data: absentCountByMonth,
        borderColor: "rgba(239, 68, 68, 0.8)",
        backgroundColor: "rgba(239, 68, 68, 0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const totalPresent = presentCountByMonth.reduce((a, b) => a + b, 0);
  const totalAbsent = absentCountByMonth.reduce((a, b) => a + b, 0);

  const polarData = {
    labels: ["Present", "Absent"],
    datasets: [
      {
        data: [totalPresent, totalAbsent],
        backgroundColor: ["rgba(34, 197, 94, 0.7)", "rgba(239, 68, 68, 0.7)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6 sm:p-8 border border-white/20">
      <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-900">Attendance Overview</h2>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-4/5">
          <h3 className="text-lg font-medium mb-4 text-gray-700">Monthly Attendance Trend</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <Line
              data={lineChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: "top" },
                  tooltip: { mode: "index", intersect: false },
                },
                scales: {
                  y: { beginAtZero: true, title: { display: true, text: "Days" } },
                  x: { title: { display: true, text: "Month" } },
                },
              }}
              height={300}
            />
          </div>
        </div>
        <div className="lg:w-1/5">
          <h3 className="text-lg font-medium mb-4 text-gray-700">Yearly Summary</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <PolarArea
              data={polarData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: "bottom" },
                  tooltip: { callbacks: { label: (context) => `${context.label}: ${context.raw} days` } },
                },
              }}
              height={300}
            />
          </div>
        </div>
      </div>
    </div>
  );
}