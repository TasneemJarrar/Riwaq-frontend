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
  firebaseUid: data.firebaseUid ?? firebaseUser.uid,
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