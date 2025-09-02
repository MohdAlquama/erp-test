import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from "recharts";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Attendance() {
  const [today, setToday] = useState({ present: 0, absent: 0 });
  const [monthly, setMonthly] = useState([]);
  const [yearly, setYearly] = useState([]);

  const adminId = 8; // later from context/session
  const COLORS = ["#22c55e", "#ef4444"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [todayRes, monthlyRes, yearlyRes] = await Promise.all([
          axiosInstance.get(`/admin/${adminId}/attendance/today`),
          axiosInstance.get(`/admin/${adminId}/attendance/monthly`),
          axiosInstance.get(`/admin/${adminId}/attendance/yearly`),
        ]);

        setToday(todayRes.data);
        setMonthly(monthlyRes.data);
        setYearly(yearlyRes.data);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };
    fetchData();
  }, [adminId]);

  const pieData = [
    { name: "Present", value: today.present },
    { name: "Absent", value: today.absent },
  ];

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800">Attendance Overview</h1>

      {/* Today’s Attendance */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Today’s Attendance</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Monthly Attendance */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          This Month’s Attendance (by Day)
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthly}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="present" fill="#22c55e" />
            <Bar dataKey="absent" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Yearly Attendance */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          This Year’s Attendance (by Month)
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={yearly}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="present" fill="#22c55e" />
            <Bar dataKey="absent" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// Layout usage
Attendance.layout = (page) => <AdminLayout>{page}</AdminLayout>;
