import React, { useEffect, useState } from 'react';
import StudentLayout from '@/Layouts/StudentLayout';
import axiosInstance from '@/utils/axiosInstance';
import { useStudent } from '@/contexts/StudentContext';

function Syllabus() {
  const { student, loading } = useStudent();
  const [syllabus, setSyllabus] = useState([]);
  const [loadingSyllabus, setLoadingSyllabus] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSyllabus = async () => {
      if (!student) return;

      try {
        const response = await axiosInstance.get(
          `/student/syllabus/${student.admin_id}/${student.batch_ids}`
        );

        const data = Array.isArray(response.data)
          ? response.data
          : response.data?.syllabus || [];

        setSyllabus(data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch syllabus');
      } finally {
        setLoadingSyllabus(false);
      }
    };

    if (!loading && student) {
      fetchSyllabus();
    }
  }, [loading, student]);

  if (loading || loadingSyllabus) return <div>Loading syllabus...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!syllabus || syllabus.length === 0) return <div>No syllabus found.</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Syllabus</h1>
      <ul className="space-y-4">
        {syllabus.map((item) => (
          <li key={item.id} className="border p-4 rounded">
            <p><strong>Batch ID:</strong> {item.batch_id}</p>

            {item.file_path && (
              <div className="mt-2">
                {(Array.isArray(item.file_path) ? item.file_path : [item.file_path]).map(
                  (file, index) => (
                    <a
                      key={index}
                      href={`${axiosInstance.defaults.baseURL}/storage/${file}`}
                      
                      rel="noopener noreferrer"
                      className="text-blue-500 underline mr-2"
                    >
                      Download File {index + 1}
                    </a>
                  )
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

Syllabus.layout = (page) => <StudentLayout>{page}</StudentLayout>;

export default Syllabus;
