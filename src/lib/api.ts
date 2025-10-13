import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

// Detect environment
const isBrowser = typeof window !== "undefined";

const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  (isBrowser ? "/api" : "https://mint-frontend-test.onrender.com/api");

// Create Axios instance
const api: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn(" [Axios] No token found in cookies");
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
