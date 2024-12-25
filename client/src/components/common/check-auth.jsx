/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  // Specific handling for login page
  if (location.pathname === "/auth/login") {
    if (isAuthenticated) {
      // If authenticated, always redirect to home page
      return <Navigate to="/shop/home" replace />;
    }
  }

  // Root path handling
  if (location.pathname === "/") {
    if (!isAuthenticated && location.pathname !== "/auth/login") {
      return <Navigate to="/auth/login" />;
    } else {
      if (user?.role === "admin") {
        return <Navigate to="/admin/dashboard" />;
      } else {
        return <Navigate to="/shop/home" />;
      }
    }
  }

  // Authentication and route protection logic
  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/shop/home" />;
  }

  // Redirect authenticated users away from login/register pages
  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    // Directly navigate to home page after successful authentication
    return <Navigate to="/shop/home" replace />;
  }

  // Prevent non-admin users from accessing admin routes
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  // Redirect admin users from shop routes to admin dashboard
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  // If no specific routing conditions are met, render children
  return <>{children}</>;
}

export default CheckAuth;