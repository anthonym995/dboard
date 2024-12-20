import React from 'react';

export default function DeleteModal({ title, description, onConfirm, onCancel }) {
  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        role="dialog"
        aria-modal="true"
      >
        <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6">
          <button
            type="button"
            onClick={onCancel}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-900 focus:outline-none"
          >
            <span className="sr-only">Close modal</span>
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div className="text-center">
            <svg
              className="text-gray-400 w-12 h-12 mx-auto mb-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="mt-2 text-gray-600">{description}</p>
            <div className="mt-4 flex justify-center gap-4">
              <button
                type="button"
                onClick={onCancel}
                className="py-2 px-4 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none"
              >
                No, Cancel
              </button>
              <button
                type="button"
                onClick={onConfirm}
                className="py-2 px-4 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
