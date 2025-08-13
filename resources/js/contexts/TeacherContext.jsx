// contexts/TeacherContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";
import axiosInstance from "@/utils/axiosInstance";

const TeacherContext = createContext(null);

export const useTeacher = () => {
  const context = useContext(TeacherContext);
  if (!context) {
    throw new Error("useTeacher must be used within a TeacherProvider");
  }
  return context;
};

export const TeacherProvider = ({ children }) => {
  const { teacher } = usePage().props;
  const [teacherData, setTeacherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!teacher?.id) {
      setLoading(false);
      return;
    }

    const fetchTeacher = async () => {
      try {
        setLoading(true);
        const { data } = await axiosInstance.get(`/teacher/${teacher.id}`);
        setTeacherData(data);
      } catch (error) {
        console.error("Error fetching teacher data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeacher();
  }, [teacher?.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold">
        Loading teacher data...
      </div>
    );
  }

  return (
    <TeacherContext.Provider value={{ teacherData, loading }}>
      {children}
    </TeacherContext.Provider>
  );
};
