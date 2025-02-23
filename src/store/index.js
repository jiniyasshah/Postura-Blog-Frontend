// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import blogReducer from "../features/blog/blogSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    blog: blogReducer,
  },
});

export default store;
