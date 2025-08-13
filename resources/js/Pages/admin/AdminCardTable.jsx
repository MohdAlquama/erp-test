import React, { useEffect, useState, useMemo } from 'react';
import axiosInstance from '@/utils/axiosInstance';
import { useBaseContext } from '@/contexts/adminContext';
import Modal from './Modal';
import { ArrowUpDown, Search, X, Check, Ban, Trash2, Loader2 } from 'lucide-react';

function StudentsTable() {
  const { admin } = useBaseContext();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [selectedCardStatus, setSelectedCardStatus] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [actionLoading, setActionLoading] = useState({});

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/admin/${admin.id}/admin-cards`);
      if (res.data?.data) {
        const allStudents = res.data.data.flatMap(card => {
          const status = card.admin_data?.status || 'N/A';
          return (card.students_data || []).map(student => ({
            ...student,
            status,
            cardId: card.id,
          }));
        });
        setStudents(allStudents);
      }
    } catch (err) {
      setError('Failed to fetch students data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (cardId, currentStatus, action) => {
    setSelectedCardId(cardId);
    setSelectedCardStatus(currentStatus);
    setModalAction(action);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCardId(null);
    setSelectedCardStatus(null);
    setModalAction(null);
    setModalOpen(false);
  };

  const handleConfirm = async () => {
    if (!selectedCardId || !modalAction) return;
    setActionLoading(prev => ({ ...prev, [selectedCardId]: true }));
    try {
      if (modalAction === 'deactivate') {
        await axiosInstance.put(`/admin/${admin.id}/admin-cards/${selectedCardId}/inactivate`);
        console.log('Card deactivated successfully!');
      } else if (modalAction === 'activate') {
        await axiosInstance.put(`/admin/${admin.id}/admin-cards/${selectedCardId}/activate`);
        console.log('Card activated successfully!');
      } else if (modalAction === 'delete') {
        await axiosInstance.delete(`/admin/${admin.id}/admin-cards/${selectedCardId}`);
        console.log('Card deleted successfully!');
      }
      closeModal();
      fetchStudents();
    } catch (error) {
      console.error(`Failed to ${modalAction} card.`, error);
    } finally {
      setActionLoading(prev => ({ ...prev, [selectedCardId]: false }));
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedStudents = useMemo(() => {
    const sorted = [...students];
    if (sortConfig.key) {
      sorted.sort((a, b) => {
        const aValue = a[sortConfig.key] || '';
        const bValue = b[sortConfig.key] || '';
        if (sortConfig.direction === 'asc') {
          return aValue.toString().localeCompare(bValue.toString());
        }
        return bValue.toString().localeCompare(aValue.toString());
      });
    }
    return sorted;
  }, [students, sortConfig]);

  const filteredStudents = useMemo(() => {
    return sortedStudents.filter(
      (stu) =>
        stu.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stu.student_id.toString().includes(searchTerm)
    );
  }, [sortedStudents, searchTerm]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4 bg-red-100 rounded-lg">{error}</div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-full">
      {/* Search Bar */}
      <div className="relative mb-6 max-w-md mx-auto">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search by student name or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute inset-y-0 right-0 flex items-center pr-3"
          >
            <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {/* Table */}
      <div className="relative overflow-x-auto sm:rounded-lg shadow-lg">
        <table className="w-full bg-white border border-gray-200 text-sm">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              {[
                { key: 'student_name', label: 'Student Name', mobile: true },
                { key: 'student_id', label: 'Student ID', mobile: true },
                { key: 'cardId', label: 'Card ID' },
                { key: 'teacher_name', label: 'Teacher Name' },
                { key: 'class_name', label: 'Class Name' },
                { key: 'college_name', label: 'College Name' },
                { key: 'college_location', label: 'College Location' },
                { key: 'subject_name', label: 'Subject Name' },
                { key: 'date', label: 'Date' },
                { key: 'time', label: 'Time' },
                { key: 'room_id', label: 'Room ID' },
                { key: 'status', label: 'Status', mobile: true },
              ].map(({ key, label, mobile }) => (
                <th
                  key={key}
                  scope="col"
                  onClick={() => handleSort(key)}
                  className={`px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 ${
                    mobile ? '' : 'hidden sm:table-cell'
                  }`}
                >
                  <div className="flex items-center">
                    {label}
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </th>
              ))}
              <th scope="col" className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan={13} className="text-center p-6 text-gray-500">
                  No students found.
                </td>
              </tr>
            ) : (
              filteredStudents.map((stu) => (
                <tr
                  key={`${stu.student_id}-${stu.date}-${stu.room_id}`}
                  className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-2 sm:px-4 py-2 sm:py-3 text-gray-800">{stu.student_name}</td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 text-center text-gray-600">{stu.student_id}</td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 text-center text-gray-600 hidden sm:table-cell">{stu.cardId}</td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 text-gray-800 hidden sm:table-cell">{stu.teacher_name}</td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 text-gray-800 hidden sm:table-cell">{stu.class_name}</td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 text-gray-800 hidden sm:table-cell">{stu.college_name}</td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 text-gray-800 hidden sm:table-cell">{stu.college_location}</td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 text-gray-800 hidden sm:table-cell">{stu.subject_name}</td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 text-gray-800 hidden sm:table-cell">{stu.date}</td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 text-gray-800 hidden sm:table-cell">{stu.time}</td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 text-center text-gray-800 hidden sm:table-cell">{stu.room_id}</td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 text-center text-gray-800">{stu.status}</td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 text-center">
                    <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-2 sm:space-y-0 justify-center">
                      <button
                        onClick={() =>
                          openModal(stu.cardId, stu.status, stu.status === 'active' ? 'deactivate' : 'activate')
                        }
                        disabled={actionLoading[stu.cardId]}
                        className={`relative flex items-center justify-center w-8 h-8 sm:w-auto sm:px-3 sm:py-2 text-xs sm:text-sm font-medium rounded-full sm:rounded-md ${
                          stu.status === 'active'
                            ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                            : 'bg-green-500 text-white hover:bg-green-600'
                        } disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${
                          stu.status === 'active' ? 'yellow-500' : 'green-500'
                        }`}
                        aria-label={stu.status === 'active' ? 'Deactivate Card' : 'Activate Card'}
                      >
                        {actionLoading[stu.cardId] ? (
                          <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                        ) : (
                          <>
                            {stu.status === 'active' ? (
                              <Ban className="h-4 w-4 sm:h-5 sm:w-5 sm:mr-1" />
                            ) : (
                              <Check className="h-4 w-4 sm:h-5 sm:w-5 sm:mr-1" />
                            )}
                            <span className="hidden sm:inline">
                              {stu.status === 'active' ? 'Deactivate' : 'Activate'}
                            </span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => openModal(stu.cardId, stu.status, 'delete')}
                        disabled={actionLoading[stu.cardId]}
                        className="relative flex items-center justify-center w-8 h-8 sm:w-auto sm:px-3 sm:py-2 text-xs sm:text-sm font-medium rounded-full sm:rounded-md bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        aria-label="Delete Card"
                      >
                        {actionLoading[stu.cardId] ? (
                          <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                        ) : (
                          <>
                            <Trash2 className="h-4 w-4 sm:h-5 sm:w-5 sm:mr-1" />
                            <span className="hidden sm:inline">Delete</span>
                          </>
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        onConfirm={handleConfirm}
        title={
          modalAction === 'activate'
            ? 'Confirm Activate'
            : modalAction === 'deactivate'
            ? 'Confirm Deactivate'
            : 'Confirm Delete'
        }
        confirmButtonColor={
          modalAction === 'activate'
            ? 'bg-green-600 hover:bg-green-700'
            : modalAction === 'deactivate'
            ? 'bg-yellow-600 hover:bg-yellow-700'
            : 'bg-red-600 hover:bg-red-700'
        }
      >
        Are you sure you want to {modalAction} this card (ID: {selectedCardId})?
      </Modal>
    </div>
  );
}

export default StudentsTable;