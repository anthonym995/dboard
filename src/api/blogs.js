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
    throw new Error(`Failed to fetch post with ID ${_id}: ${error.message}`);
  }
};

export const CreateBlogs = async (BlogsData) => {
  try {
    const response = await baseAPI.post("/blogs", BlogsData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create blog");
  }
};

export const updateBlogs = async (BlogsData) => {
  try {
    const response = await baseAPI.put(`/blogs/${BlogsData?.id}`, BlogsData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.message || "An error occurred while updating the user"
    );
  }
};

export const deleteBlogs = async (_id) => {
  try {
    const response = await baseAPI.delete(`/blogs/${_id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.message || "An error occurred while deleting the user"
    );
  }
};
