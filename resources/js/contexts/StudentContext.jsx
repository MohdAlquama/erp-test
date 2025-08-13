"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { usePage, router } from "@inertiajs/react";
import axios from "axios";

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const inertiaStudent = usePage().props.student; // from backend
  const [student, setStudent] = useState(inertiaStudent || null);
  const [loading, setLoading] = useState(true);

  // Sync when inertia props change
  useEffect(() => {
    setStudent(inertiaStudent || null);
  }, [inertiaStudent]);

  // Fetch latest details if we have an ID
  useEffect(() => {
    if (student?.id) {
      setLoading(true);
      axios
        .get(`/student/${student.id}/details`) // Laravel route for student details
        .then((res) => {
          setStudent(res.data);
        })
        .catch((err) => {
          console.error("Failed to fetch student details", err);
          // Optional: redirect if unauthorized
          if (err.response?.status === 401) {
            router.visit("/student/login");
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [student?.id]);

  return (
    <StudentContext.Provider value={{ student, setStudent, loading }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => useContext(StudentContext);
