import blogsAPI from "../api/blogsAPI";

export const fetchblogs = async () => {
  try {
    const data = await blogsAPI.get("/blogs");
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchPostById = async (id) => {
  try {
    const response = await blogsAPI.get(`/blogs/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch post with ID ${id}: ${error.message}`);
  }
};