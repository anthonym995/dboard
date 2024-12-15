import axios from "axios";

// Create an Axios instance
const baseAPI = axios.create({
  baseURL: "https://nodejs-x.vercel.app/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// errorHandler.js
export function handleError(error) {
  console.log(error);
  throw error;
}

// Add a request interceptor
baseAPI.interceptors.request.use(
  (config) => {
    console.log("Request:", {
      method: config.method,
      url: config.url,
      headers: config.headers,
      data: config.data,
    });
    return config;
  },
  (error) => {
    // Handle request errors
    return handleError(error);
  }
);

// Add a response interceptor
baseAPI.interceptors.response.use(
  (response) => {
    console.log("Response:", {
      status: response.status,
      statusText: response.statusText,
      data: response.data,
      headers: response.headers,
    });
    return response.data;
  },
  (error) => {
    // Handle response errors
    return handleError(error);
  }
);

export default baseAPI;
