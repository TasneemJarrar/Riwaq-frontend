import axios from "axios";

const authAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BURL,
});

authAxiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const raw = localStorage.getItem("authUser");
    if (raw) {
      const user = JSON.parse(raw) as { firebaseUid?: string | null };
      if (user.firebaseUid) {
        config.headers["X-Firebase-Uid"] = user.firebaseUid;
      }
    }
  } catch {
    // ignore errors
  }

  return config;
});

export default authAxiosInstance;