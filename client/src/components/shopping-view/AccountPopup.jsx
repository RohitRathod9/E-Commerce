/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Modal from "./Modal";
import AuthLogin from "@/pages/auth/login";
import AuthRegister from "@/pages/auth/register";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/auth-slice";

function AccountPopup({ isAuthenticated, onLogoutSuccess }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    closeModal(); // Close the modal after logout.
    if (onLogoutSuccess) {
      onLogoutSuccess(); // Trigger navigation to the home page on logout.
    }
  };

  return (
    <div>
      {!isAuthenticated ? (
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          onClick={openModal}
        >
          Sign In
        </button>
      ) : (
        <button
          className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
          onClick={handleLogout}
        >
          Logout
        </button>
      )}
<Modal isOpen={isModalOpen} onClose={closeModal} className="bg-white rounded-lg shadow-md">
  <div className="p-6">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">
      {isLogin ? "Login" : "Register"}
    </h2>

    {isLogin ? (
      <AuthLogin onSuccess={closeModal} />
    ) : (
      <AuthRegister onSuccess={closeModal} />
    )}

    <p className="mt-4 text-sm text-gray-600">
      {isLogin
        ? "Don't have an account?"
        : "Already have an account?"}
      <button
        className="text-blue-500 hover:underline ml-2"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? "Register" : "Login"}
      </button>
    </p>
  </div>
</Modal>
    </div>
  );
}

export default AccountPopup;
