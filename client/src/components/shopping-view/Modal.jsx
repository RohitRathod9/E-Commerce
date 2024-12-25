/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          &#x2715;
        </button>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
