/* eslint-disable no-unused-vars */
import React from "react";
import { Outlet } from "react-router-dom";
import AccountPopup from "@/components/shopping-view/AccountPopup";

function AuthLayout() {
  return (
    <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
    <AccountPopup  />
  </div>
  );
}

export default AuthLayout;
