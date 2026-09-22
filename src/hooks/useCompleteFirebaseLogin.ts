import { useNavigate } from "react-router-dom";
import type { User as FirebaseUser } from "firebase/auth";
import authAxiosInstance from "../api/authAxiosInstance";
import { useAuthStore, type AuthUser } from "../store/useAuthStore";

interface FirebaseLoginResponse {
  userId: string;
  firebaseUid: string | null;
  points: number;
  learningDirectionId: string | null;
  isNewUser: boolean;
}

/**
 * Shared "last mile" of every auth method (Google, email/password login,
 * email/password register): take a Firebase user, exchange its idToken
 * with our backend, persist the session, and redirect based on isNewUser.
 */
export function useCompleteFirebaseLogin() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  return async (firebaseUser: FirebaseUser) => {
    const idToken = await firebaseUser.getIdToken();

    const { data } = await authAxiosInstance.post<FirebaseLoginResponse>(
      "/api/auth/firebase-login",
      { idToken }
    );

    const user: AuthUser = {
      userId: data.userId,
      points: data.points,
      learningDirectionId: data.learningDirectionId,
      isNewUser: data.isNewUser,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName,
      photoURL: firebaseUser.photoURL,
    };

    setAuth(user, idToken);
    navigate(data.isNewUser ? "/onboarding" : "/feed");
  };
}