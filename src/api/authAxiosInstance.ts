import axios from "axios";
import { getAuth } from "firebase/auth";

const authAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BURL,
});

authAxiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  let firebaseUid: string | null = null;

  try {
    const raw = localStorage.getItem("authUser");
    if (raw) {
      const user = JSON.parse(raw) as { firebaseUid?: string | null };
      if (user.firebaseUid) {
        firebaseUid = user.firebaseUid;
      }
    }
  } catch {
    // ignore errors
  }

  if (!firebaseUid) {
    firebaseUid = getAuth().currentUser?.uid ?? null;
  }

  if (firebaseUid) {
    config.headers["X-Firebase-Uid"] = firebaseUid;
  }

  return config;
});

export default authAxiosInstance;