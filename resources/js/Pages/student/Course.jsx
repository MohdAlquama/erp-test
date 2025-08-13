"use client";
import { useStudent } from "@/contexts/StudentContext";
import StudentLayout from "@/Layouts/StudentLayout";
import axiosInstance from "@/utils/axiosInstance";
import React, { useEffect, useState } from "react";
function Course() {
  const { student, loading } = useStudent();
  const [batches, setBatches] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  // Fetch data
  useEffect(() => {
    if (student?.admin_id && student?.id) {
      // Fetch batches
      axiosInstance
        .get(`/student/${student.admin_id}/batches`)
        .then((res) => {
          setBatches(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.error("Failed to fetch batches", err);
          setFetchError("Failed to load batches.");
        });
      // Fetch subjects
      axiosInstance
        .get(`/student/${student.admin_id}/subjects`)
        .then((res) => {
          setSubjects(res.data);
        })
        .catch((err) => {
          console.error("Failed to fetch subjects", err);
          setFetchError("Failed to load subjects.");
        });
      // Fetch teachers
      axiosInstance
        .get(`/student/${student.admin_id}/teachers`)
        .then((res) => {
          setTeachers(res.data.teachers);
        })
        .catch((err) => {
          console.error("Failed to fetch teachers", err);
          setFetchError("Failed to load teachers.");
        });
    }
  }, [student?.admin_id, student?.id]);
  if (loading) {
    return (
      <div className="p-4 sm:p-6 bg-white shadow rounded-lg w-full">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }
  if (fetchError) {
    return (
      <div className="p-4 sm:p-6 bg-white shadow rounded-lg w-full">
        <p className="text-red-600">{fetchError}</p>
      </div>
    );
  }
  // Prepare course data for all batches
  const courseData = (student?.batch_ids || []).map((batchId) => {
    const batch = batches.find((b) => b.id === Number(batchId)) || {
      name: "Unknown Batch",
      created_at: student?.created_at,
    };
    const subjectNames = (student?.subject_ids || [])
      .map((subjectId) => {
        const subject = subjects.find((s) => s.id === Number(subjectId));
        return subject ? subject.subject : "Unknown Subject";
      })
      .join(", ");
    return {
      batchName: batch.name,
      subjectNames: subjectNames || "No Subjects",
      status: student?.status || "Unknown",
      startDate: batch.created_at
        ? new Date(batch.created_at).toISOString().split("T")[0]
        : "N/A",
    };
  }).filter((course) => course.batchName !== "Unknown Batch");

  // Prepare teacher data
  const teacherData = (student?.teacher_ids || []).map((teacherId) => {
    const teacher = teachers.find((t) => t.id === Number(teacherId)) || {
      name: "Unknown Teacher",
      email: "N/A",
      status: "N/A",
      batch_ids: [],
      subject_ids: [],
    };
    const teacherBatchNames = (teacher.batch_ids || [])
      .map((bId) => {
        const b = batches.find((batch) => batch.id === Number(bId));
        return b ? b.name : "Unknown Batch";
      })
      .join(", ");
    const teacherSubjectNames = (teacher.subject_ids || [])
      .map((sId) => {
        const s = subjects.find((subject) => subject.id === Number(sId));
        return s ? s.subject : "Unknown Subject";
      })
      .join(", ");
    return {
      name: teacher.name,
      email: teacher.email,
      status: teacher.status,
      batchNames: teacherBatchNames || "None",
      subjectNames: teacherSubjectNames || "None",
    };
  });
  return (
    <div className="p-4 sm:p-6 bg-white shadow rounded-lg w-full">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-8 mb-6">
        <section className="flex flex-col">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
            My Course
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            You are enrolled in {courseData.length} course{courseData.length !== 1 ? 's' : ''}
          </p>
        </section>
        <section className="flex flex-col">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
            Total Subjects
          </h1>
          <p className="text-base sm:text-lg font-medium text-gray-600">
            {student?.subject_ids?.length || 0}
          </p>
        </section>
        <section className="flex flex-col">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
            Date
          </h1>
          <p className="text-base sm:text-lg font-medium text-gray-600">
            {new Date().toISOString().split("T")[0]}
          </p>
        </section>
      </div>
      {/* Course Section */}
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
        Course Details
      </h2>
      {/* Mobile: Card Layout */}
      <div className="sm:hidden space-y-4">
        {courseData.length > 0 ? (
          courseData.map((course, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white"
            >
              <div className="mb-2">
                <span className="text-xs font-medium text-gray-500 uppercase">
                  Course Name
                </span>
                <p className="text-sm text-gray-900">{course.batchName}</p>
              </div>
              <div className="mb-2">
                <span className="text-xs font-medium text-gray-500 uppercase">
                  Subjects
                </span>
                <p className="text-sm text-gray-900">{course.subjectNames}</p>
              </div>
              <div className="mb-2">
                <span className="text-xs font-medium text-gray-500 uppercase">
                  Status
                </span>
                <p>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      course.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {course.status}
                  </span>
                </p>
              </div>
              <div>
                <span className="text-xs font-medium text-gray-500 uppercase">
                  Start Date
                </span>
                <p className="text-sm text-gray-900">{course.startDate}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-sm text-gray-500">
            No course found.
          </div>
        )}
      </div>
      {/* Desktop: Table Layout */}
      <div className="hidden sm:block overflow-x-auto mb-8">
        <table className="w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Course Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subjects
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Start Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {courseData.length > 0 ? (
              courseData.map((course, index) => (
                <tr key={index}>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {course.batchName}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {course.subjectNames}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        course.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {course.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {course.startDate}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="px-4 py-3 text-center text-sm text-gray-500"
                >
                  No course found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Teachers Section */}
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
        Teachers
      </h2>
      {/* Mobile: Card Layout */}
      <div className="sm:hidden space-y-4">
        {teacherData.length > 0 ? (
          teacherData.map((teacher, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white"
            >
              <div className="mb-2">
                <span className="text-xs font-medium text-gray-500 uppercase">
                  Name
                </span>
                <p className="text-sm text-gray-900">{teacher.name}</p>
              </div>
              <div className="mb-2">
                <span className="text-xs font-medium text-gray-500 uppercase">
                  Email
                </span>
                <p className="text-sm text-gray-900">{teacher.email}</p>
              </div>
              <div className="mb-2">
                <span className="text-xs font-medium text-gray-500 uppercase">
                  Status
                </span>
                <p>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      teacher.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {teacher.status}
                  </span>
                </p>
              </div>
              <div className="mb-2">
                <span className="text-xs font-medium text-gray-500 uppercase">
                  Batches
                </span>
                <p className="text-sm text-gray-900">{teacher.batchNames}</p>
              </div>
              <div>
                <span className="text-xs font-medium text-gray-500 uppercase">
                  Subjects
                </span>
                <p className="text-sm text-gray-900">{teacher.subjectNames}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-sm text-gray-500">
            No teachers found.
          </div>
        )}
      </div>
      {/* Desktop: Table Layout */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Batches
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subjects
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {teacherData.length > 0 ? (
              teacherData.map((teacher, index) => (
                <tr key={index}>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {teacher.name}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {teacher.email}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        teacher.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {teacher.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {teacher.batchNames}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {teacher.subjectNames}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-4 py-3 text-center text-sm text-gray-500"
                >
                  No teachers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Chart Placeholder */}
      <div className="mt-8">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
          Course Summary
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          Chart placeholder (e.g., subject count). Please specify chart details if
          needed.
        </p>
        {/*
        <div className="mt-4 bg-white p-4 rounded-lg shadow max-w-full">
          <chartjs type="bar">
            {
              "labels": ["Subjects"],
              "datasets": [{
                "label": "Number of Subjects",
                "data": [student?.subject_ids?.length || 0],
                "backgroundColor": "#3b82f6",
                "borderColor": "#2563eb",
                "borderWidth": 1
              }]
            }
          </chartjs>
        </div>
        */}
      </div>
    </div>
  );
}
export default Course;
Course.layout = (page) => <StudentLayout>{page}</StudentLayout>;