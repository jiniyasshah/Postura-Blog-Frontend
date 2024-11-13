// App.jsx
import React from "react";
import Home from "./pages/Home/Home";
import { Routes, Route } from "react-router-dom"; // Keep using Routes and Route for routing
import Login from "./pages/Auth/Login"; // Example import
import useAuth from "./hooks/useAuth";
import Dashboard from "./pages/Blog/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
const App = () => {
  useAuth();
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Other protected routes can go here */}
        </Route>
      </Routes>
    </div>
  );
};

export default App;
