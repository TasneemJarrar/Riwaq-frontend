import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useAuthStore } from "../store/useAuthStore";

export function useLogout() {
  const navigate = useNavigate();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  return async () => {
    clearAuth();
    navigate("/login", { replace: true });

    try {
      await signOut(auth);
    } catch (err) {
      console.error("Firebase signOut failed:", err);
    }
  };
}