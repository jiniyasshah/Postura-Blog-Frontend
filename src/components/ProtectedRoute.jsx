// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const { user, loading } = useSelector((state) => state.auth);

  // Display loading or prevent navigation if loading user data
  if (loading) return <div>Loading...</div>;

  return user ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
