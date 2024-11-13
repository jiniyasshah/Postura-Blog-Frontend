// src/features/blog/blogSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllBlogPosts as getAllBlogPostsApi,
  createNewBlogPost as createNewBlogPostApi,
} from "../../api/blogs";

// Async Thunks
export const getAllBlogPosts = createAsyncThunk(
  "blog/getAllBlogPosts",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllBlogPostsApi();
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createNewBlogPost = createAsyncThunk(
  "blog/createNewBlogPost",
  async (postData, { rejectWithValue }) => {
    try {
      const data = await createNewBlogPostApi(postData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Blog Slice
const blogSlice = createSlice({
  name: "blog",
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get All Blog Posts
      .addCase(getAllBlogPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllBlogPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(getAllBlogPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create New Blog Post
      .addCase(createNewBlogPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewBlogPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.push(action.payload);
      })
      .addCase(createNewBlogPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default blogSlice.reducer;
