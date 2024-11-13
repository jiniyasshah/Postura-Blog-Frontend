// src/api/users.js
import api from "../services/axios";

// Register User
export const registerUser = async (credentials) => {
  const response = await api.post("/users/register", credentials);
  return response.data;
};

// Login User
export const loginUser = async (credentials) => {
  const response = await api.post("/users/login", credentials);
  return response.data;
};

// Logout User
export const logoutUser = async () => {
  const response = await api.post("/users/logout");
  return response.data;
};

// Get Current User
export const getCurrentUser = async () => {
  const response = await api.get("/users/get-current-user");
  return response.data;
};

// Refresh Token
export const refreshAccessToken = async () => {
  const response = await api.post("/users/refresh-token");
  return response.data;
};

// Change Password
export const changePassword = async (passwordData) => {
  const response = await api.post("/users/change-password", passwordData);
  return response.data;
};

// Update Account Information
export const updateAccount = async (accountData) => {
  const response = await api.patch("/users/update-account", accountData);
  return response.data;
};
