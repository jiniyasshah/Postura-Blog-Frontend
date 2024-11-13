// src/api/blogs.js
import api from "../services/axios";

// Fetch All Blog Posts
export const getAllBlogPosts = async () => {
  const response = await api.get("/blogs");
  return response.data;
};

// Fetch Single Blog Post
export const getSingleBlogPost = async (postId) => {
  const response = await api.post("/blogs/view-post", { id: postId });
  return response.data;
};

// Create New Blog Post
export const createNewBlogPost = async (postData) => {
  const response = await api.post("/blogs/create-post", postData);
  return response.data;
};

// Edit Existing Blog Post
export const editBlogPost = async (postData) => {
  const response = await api.post("/blogs/edit-post", postData);
  return response.data;
};

// Like Blog Post
export const likeBlogPost = async (postId) => {
  const response = await api.post("/blogs/like-post", { id: postId });
  return response.data;
};

// Comment on Blog Post
export const addCommentToBlogPost = async (commentData) => {
  const response = await api.post("/blogs/comment-post", commentData);
  return response.data;
};
