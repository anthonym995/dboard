import baseAPI from "./baseAPI";

export const fetchblogs = async () => {
  try {
    const data = await baseAPI.get("/blogs");
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const blogsById = async (_id) => {
  try {
    const response = await baseAPI.get(`/blogs/${_id}`);
    console.log("Full Response:", response);
    return response;
  } catch (error) {
    throw new Error(`Failed to fetch post with ID ${id}: ${error.message}`);
  }
};



export const createBlogs = async (blogsData) => {
  try {
    const response = await baseAPI.post(`/blogs`, blogsData); // No `id` in the URL
    return response.data; // Return the response data
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to create blog.");
  }
};

export const updateBlog = async (blogsData) => {
  try {
    const response = await baseAPI.put(`/blogs/${blogsData._id}`, blogsData);
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message ||error.message ||"An error occurred while updating the blog.");
  }
};

export const deleteBlogs = async (_id) => {
  try {
    const response = await baseAPI.delete(`/blogs/${_id}`);  // Updated URL for deleting blog posts
    return response.data;
  } catch (error) {
    throw new Error(error.message || "An error occurred while deleting the blog post");
  }
};
