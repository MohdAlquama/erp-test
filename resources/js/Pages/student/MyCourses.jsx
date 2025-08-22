import React, { useEffect, useState } from "react";
import StudentLayout from "@/Layouts/StudentLayout";
import { useStudent } from "@/contexts/StudentContext";
import axiosInstance from "@/utils/axiosInstance";
import Loader from "@/components/Loader";

function MyCourses() {
  const { student, loading } = useStudent();
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axiosInstance.get(`/student/MyCourses/${student.batch_ids}/${student.admin_id}`);
        setCourses(res.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoadingCourses(false);
      }
    };

    if (!loading) {
      fetchCourses();
    }
  }, [loading]);

  if (loading || loadingCourses) {
    return (
      <Loader message="Loading your courses..."/>
      // <div className="flex items-center justify-center min-h-screen">
      //   <div className="flex flex-col items-center space-y-4">
      //     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      //     <p className="text-gray-600 text-lg">Loading your courses...</p>
      //   </div>
      // </div>
    );
  }

  const getStatusBadge = (status) => {
    const statusColors = {
      'active': 'bg-green-100 text-green-800 border-green-200',
      'inactive': 'bg-red-100 text-red-800 border-red-200',
      'pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'suspended': 'bg-gray-100 text-gray-800 border-gray-200'
    };
    
    const colorClass = statusColors[status?.toLowerCase()] || 'bg-blue-100 text-blue-800 border-blue-200';
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClass}`}>
        {status || 'Unknown'}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="bg-gradient-to-r from-white to-white p-3 rounded-xl">
              <span className="text-white text-2xl">📚</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
              <p className="text-gray-600 mt-1">View and manage your enrolled courses</p>
            </div>
          </div>
          
        
        </div>

        {/* Courses Table/Cards */}
        {courses.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-gray-400 text-3xl">📚</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses yet</h3>
            <p className="text-gray-500">You haven't been assigned any courses. Check back later!</p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Subject
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Teacher
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {courses.map((course, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                              <span className="text-white font-semibold text-sm">
                                {course.subject_name?.charAt(0) || 'S'}
                              </span>
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-gray-900">
                                {course.subject_name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{course.teacher_name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <a 
                            href={`mailto:${course.teacher_email}`}
                            className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                          >
                            {course.teacher_email}
                          </a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(course.teacher_status)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-4">
              {courses.map((course, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 w-12 h-12 rounded-xl flex items-center justify-center mr-3">
                        <span className="text-white font-bold">
                          {course.subject_name?.charAt(0) || 'S'}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {course.subject_name}
                        </h3>
                        <p className="text-sm text-gray-500">Subject</p>
                      </div>
                    </div>
                    {getStatusBadge(course.teacher_status)}
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <span className="text-gray-500 w-20">Teacher:</span>
                      <span className="text-gray-900 font-medium">{course.teacher_name}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="text-gray-500 w-20">Email:</span>
                      <a 
                        href={`mailto:${course.teacher_email}`}
                        className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                      >
                        {course.teacher_email}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MyCourses;

// Attach Layout
MyCourses.layout = (page) => <StudentLayout>{page}</StudentLayout>;