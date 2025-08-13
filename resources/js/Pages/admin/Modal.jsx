import React from 'react';

export default function Modal({ isOpen, onClose, onConfirm, children, title, confirmButtonColor = 'bg-red-600 hover:bg-red-700' }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black bg-opacity-60 transition-opacity duration-300 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl p-4 sm:p-6 w-full max-w-[90vw] sm:max-w-md mx-4 my-4 sm:my-8 transform transition-transform duration-300 scale-100">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">{title || 'Confirm Action'}</h2>
        <div className="text-gray-600 mb-4 text-sm sm:text-base">{children}</div>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-3 sm:px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`px-3 sm:px-4 py-2 ${confirmButtonColor} text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${confirmButtonColor.split('-')[1]}`}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}