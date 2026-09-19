import axios from "axios";

const authAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BURL,
});

authAxiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default authAxiosInstance;