// src/services/axios.js
import axios from "axios";
import store from "../store";
import { refreshAccessToken } from "../features/auth/authSlice";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true, // Sends cookies with every request
});

// Flag to check if a refresh token request is in progress
let isRefreshing = false;
let refreshSubscribers = [];

// Function to add requests to a queue
const subscribeTokenRefresh = (cb) => {
  refreshSubscribers.push(cb);
};

// Function to process queued requests once token is refreshed
const onRefreshed = (newToken) => {
  refreshSubscribers.forEach((cb) => cb(newToken));
  refreshSubscribers = [];
};

// Interceptor for refreshing tokens on 401 or 403
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.config &&
      (error.config.url.includes("/login") ||
        error.config.url.includes("/register") ||
        error.config.url.includes("/logout"))
    ) {
      return Promise.reject(error); // Just return without intercepting
    }

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const result = await store.dispatch(refreshAccessToken());
          const newToken = result.payload;

          isRefreshing = false;
          onRefreshed(newToken); // Process all queued requests
          console.log("refreshed");
          // Retry the original request with the new token
          return api(originalRequest);
        } catch (refreshError) {
          isRefreshing = false;
          return Promise.reject(refreshError); // Failed to refresh, log out user if needed
        }
      }

      // If a refresh request is in progress, queue other requests
      return new Promise((resolve) => {
        subscribeTokenRefresh(() => {
          resolve(api(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  }
);

export default api;
