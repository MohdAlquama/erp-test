import { useTeacher } from "@/contexts/TeacherContext";
import TeacherLayout from "@/Layouts/TeacherLayout";
import axiosInstance from "@/utils/axiosInstance";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import CheckAttendance from "./CheckAttendance";

export default function Attendance() {
  const { teacherData } = useTeacher();
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [attendanceDate, setAttendanceDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [loadingSubjects, setLoadingSubjects] = useState(false);
  const [students, setStudents] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [reloadAttendance, setReloadAttendance] = useState(0);

  // Fetch teacher's allowed batches
  useEffect(() => {
    if (!teacherData?.admin_id) return;

    axiosInstance
      .get(`/teacher/admin/${teacherData.admin_id}/batches`)
      .then((res) => {
        if (res.data.success) {
          let teacherBatchIds = [];
          if (teacherData?.batch_ids) {
            if (Array.isArray(teacherData.batch_ids)) {
              teacherBatchIds = teacherData.batch_ids.map((id) => parseInt(id));
            } else if (typeof teacherData.batch_ids === "string") {
              teacherBatchIds = teacherData.batch_ids
                .split(",")
                .map((id) => parseInt(id));
            } else {
              teacherBatchIds = [parseInt(teacherData.batch_ids)];
            }
          }

          const allowedBatches = res.data.data.filter((b) =>
            teacherBatchIds.includes(b.id)
          );
          setBatches(allowedBatches);
        }
      })
      .catch((err) => {
        toast.error("Error fetching batches");
        console.error(err);
      });
  }, [teacherData]);

  // Fetch subjects when batch is selected
  useEffect(() => {
    if (!selectedBatch || !teacherData?.id) return;

    setLoadingSubjects(true);
    setSubjects([]);
    setSelectedSubject("");

    axiosInstance
      .post(`/teacher/subjects`, {
        admin_id: teacherData.admin_id,
        batch_id: selectedBatch,
        teacher_id: teacherData.id,
      })
      .then((res) => {
        if (res.data.success) {
          setSubjects(res.data.data);
        } else {
          toast.error("No subjects found");
        }
      })
      .catch((err) => {
        toast.error("Error fetching subjects");
        console.error(err);
      })
      .finally(() => setLoadingSubjects(false));
  }, [selectedBatch, teacherData]);

  // Fetch students when subject and date are selected
  const handleSubmit = () => {
    if (!selectedBatch || !selectedSubject || !attendanceDate) {
      toast.error("Please select batch, subject, and date");
      return;
    }

    setLoadingStudents(true);
    setStudents([]);

    axiosInstance
      .post(`/teacher/subject/details`, {
        admin_id: teacherData.admin_id,
        teacher_id: teacherData.id,
        subject_id: selectedSubject,
        batch_id: selectedBatch,
      })
      .then((res) => {
        if (res.data.success) {
          const studentsWithStatus = res.data.data.map((st) => ({
            ...st,
            status: "present",
          }));
          setStudents(studentsWithStatus);
        } else {
          toast.error("No students found");
        }
      })
      .catch((err) => {
        toast.error("Error fetching student details");
        console.error(err);
      })
      .finally(() => setLoadingStudents(false));
  };

  // Handle status change for students
  const handleStatusChange = (index, value) => {
    const updated = [...students];
    updated[index].status = value;
    setStudents(updated);
  };

  // Handle attendance submission
  const handleAction = (row) => {
    const payload = {
      teacher_name: teacherData.name,
      subject_name: subjects.find((s) => s.id == selectedSubject)?.subject || "",
      subject_id: selectedSubject,
      batch_name: batches.find((b) => b.id == selectedBatch)?.name || "",
      batch_id: selectedBatch,
      date: attendanceDate,
      student_name: row.student_name,
      student_enrollment_number: row.enrollment_number,
      status: row.status,
      teacher_id: teacherData.id,
      admin_id: teacherData.admin_id,
    };

    axiosInstance
      .post("/teacher/attendance", payload)
      .then((res) => {
        if (res.data.success) {
          toast.success("Attendance saved!");
          setReloadAttendance((prev) => prev + 1);
        }
      })
      .catch((err) => {
        toast.error("Error saving attendance");
        console.error(err);
      });
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 bg-gray-50 min-h-screen">
      <Toaster position="top-right" />
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
        Take Attendance
      </h1>

      {/* Batch Dropdown */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Batch
        </label>
        <select
          className="w-full sm:w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          value={selectedBatch}
          onChange={(e) => setSelectedBatch(e.target.value)}
        >
          <option value="">-- Choose a Batch --</option>
          {batches.map((batch) => (
            <option key={batch.id} value={batch.id}>
              {batch.name}
            </option>
          ))}
        </select>
      </div>

      {/* Subject Dropdown */}
      {selectedBatch && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Subject
          </label>
          {loadingSubjects ? (
            <div className="flex items-center space-x-2">
              <svg
                className="animate-spin h-5 w-5 text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              <p className="text-gray-500">Loading subjects...</p>
            </div>
          ) : subjects.length > 0 ? (
            <select
              className="w-full sm:w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              <option value="">-- Choose a Subject --</option>
              {subjects.map((subj) => (
                <option key={subj.id} value={subj.id}>
                  {subj.subject}
                </option>
              ))}
            </select>
          ) : (
            <p className="text-red-500 text-sm">
              No subjects found for this batch
            </p>
          )}
        </div>
      )}

      {/* Date Picker */}
      {selectedBatch && selectedSubject && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Date
          </label>
          <input
            type="date"
            className="w-full sm:w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            value={attendanceDate}
            onChange={(e) => setAttendanceDate(e.target.value)}
          />
        </div>
      )}

      {/* Submit Button */}
      {selectedBatch && selectedSubject && (
        <button
          onClick={handleSubmit}
          className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition disabled:bg-blue-400"
          disabled={loadingStudents}
        >
          {loadingStudents ? (
            <span className="flex items-center">
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              Loading...
            </span>
          ) : (
            "Load Students"
          )}
        </button>
      )}

      {/* Students Table */}
      <div className="mt-8">
        {loadingStudents ? (
          <div className="flex items-center space-x-2">
            <svg
              className="animate-spin h-5 w-5 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            <p className="text-gray-500">Loading students...</p>
          </div>
        ) : students.length > 0 ? (
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Teacher
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Batch
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Enrollment
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {students.map((st, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {teacherData.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {subjects.find((s) => s.id == selectedSubject)?.subject}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {batches.find((b) => b.id == selectedBatch)?.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {attendanceDate}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {st.student_name}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {st.enrollment_number}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      <div className="flex space-x-4">
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name={`status-${index}`}
                            checked={st.status === "present"}
                            onChange={() => handleStatusChange(index, "present")}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <span>Present</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name={`status-${index}`}
                            checked={st.status === "absent"}
                            onChange={() => handleStatusChange(index, "absent")}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <span>Absent</span>
                        </label>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <button
                        onClick={() => handleAction(st)}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                      >
                        Log
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          selectedBatch &&
          selectedSubject &&
          !loadingStudents && (
            <p className="text-red-500 text-sm">No students found</p>
          )
        )}
      </div>

      {/* Live Attendance Checker */}
      {selectedBatch && selectedSubject && (
        <CheckAttendance
          teacher_id={teacherData.id}
          batch_id={selectedBatch}
          subject_id={selectedSubject}
          date={attendanceDate}
          reload={reloadAttendance}
        />
      )}
    </div>
  );
}

Attendance.layout = (page) => <TeacherLayout>{page}</TeacherLayout>;