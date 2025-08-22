

import { createContext, useContext, useState, useEffect } from "react";
import { usePage, router } from "@inertiajs/react";
import axiosInstance from "@/utils/axiosInstance";

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const { student: inertiaStudent } = usePage().props || {}; // guard
  const [student, setStudent] = useState(inertiaStudent || null);
  const [loading, setLoading] = useState(!inertiaStudent);

  useEffect(() => {
    if (!inertiaStudent?.id) {
      setLoading(false);
      return;
    }

    const fetchStudentDetails = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`/student/${inertiaStudent.id}/details`);
        setStudent(res.data);
      } catch (err) {
        console.error("Failed to fetch student details", err);
        if (err.response?.status === 401) router.visit("/student/login");
      } finally {
        setLoading(false);
      }
    };

    fetchStudentDetails();
  }, [inertiaStudent?.id]);

  return (
    <StudentContext.Provider value={{ student: student || {}, setStudent, loading }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => useContext(StudentContext);
