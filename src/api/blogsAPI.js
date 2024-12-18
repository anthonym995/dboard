import axios from "axios";

const blogsAPI = axios.create({
  baseURL: "https://nodejs-x.vercel.app/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Error handler
export function handleError(error) {
  console.error("API Error:", error.message || error);
  throw error;
}

// Add a request interceptor
blogsAPI.interceptors.request.use(
  (config) => {
    if (process.env.NODE_ENV === "development") {
      console.log("Request:", {
        method: config.method,
        url: config.url,
        headers: config.headers,
        data: config.data,
      });
    }
    return config;
  },
  (error) => handleError(error)
);

// Add a response interceptor
blogsAPI.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === "development") {
      console.log("Response:", {
        status: response.status,
        statusText: response.statusText,
        data: response.data,
        headers: response.headers,
      });
    }
    return response.data; // Automatically return `data` field
  },
  (error) => handleError(error)
);

export default blogsAPI;
