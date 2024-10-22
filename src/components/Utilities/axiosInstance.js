import axios from "axios";

// Create axios instance
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_DOMIN,
  timeout: 10000, // Timeout after 10 seconds
});

// Request Interceptor to add Authorization header

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      // Add Authorization header if token exists
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle unauthorized (401) or forbidden (403) responses
    if (error.response?.status === 401 || error.response?.status === 403) {
      console.error(
        "Unauthorized or Forbidden. Redirect to login page or handle as needed."
      );
      // Optionally: Redirect to login page or refresh token logic
    }

    // Other error handling
    console.error("Error:", error.response?.data?.message || error.message);

    return Promise.reject(error);
  }
);

export default axiosInstance;
