import baseAPI from "./baseAPI";

export const fetchUsers = async () => {
  try {
    const data = await baseAPI.get("/users");
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchUserById = async (id) => {
  try {
    const data = await baseAPI.get(`/users/${id}`);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const createUser = async (userData) => {
  try {
    const response = await baseAPI.post("/users", userData);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};


export const updateUser = async (userId, userData) => {
  try {
    const response = await baseAPI.put(`/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.message || "An error occurred while updating the user");
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await baseAPI.delete(`/users/${userId}`);
    return response.data; // This may return a success message or an empty response, depending on your API.
  } catch (error) {
    throw new Error(error.message || "An error occurred while deleting the user");
  }
};
