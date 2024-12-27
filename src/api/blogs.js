import baseAPI from "./baseAPI";

export const fetchblogs = async () => {
  try {
    const data = await baseAPI.get("/blogs");
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const blogsById = async (id) => {
  try {
    const response = await baseAPI.get(`/blogs/${id}`);
    console.log("Full Response:", response);
    return response;
  } catch (error) {
    throw new Error(`Failed to fetch post with ID ${id}: ${error.message}`);
  }
};
