import axios from "axios";
import i18n from "../i18next";


const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BURL,
});


axiosInstance.interceptors.request.use((config)=>{
  config.headers["Accept-language"] = i18n.language;
  return config;
})

export default axiosInstance;