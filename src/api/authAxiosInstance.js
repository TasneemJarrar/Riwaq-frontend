import axios from "axios";
import i18n from "../i18next";

const authAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BURL,
});

authAxiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  config.headers["Accept-language"] = i18n.language;

  return config;
});

export default authAxiosInstance;