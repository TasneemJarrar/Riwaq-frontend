import { create } from "zustand";

export interface AuthUser {
  userId: string;
  points: number;
  learningDirectionId: string | null;
  isNewUser: boolean;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

interface AuthState {
  user: AuthUser | null;
  idToken: string | null;
  isAuthenticated: boolean;

  setAuth: (user: AuthUser, idToken: string) => void;
  refreshToken: (idToken: string) => void;
  clearAuth: () => void;
}

const storedUser = localStorage.getItem("authUser");

export const useAuthStore = create<AuthState>((set) => ({
  user: storedUser ? (JSON.parse(storedUser) as AuthUser) : null,
  idToken: localStorage.getItem("accessToken"),
  isAuthenticated: !!localStorage.getItem("accessToken"),

  setAuth: (user, idToken) => {
    localStorage.setItem("accessToken", idToken);
    localStorage.setItem("authUser", JSON.stringify(user));
    set({ user, idToken, isAuthenticated: true });
  },
  
  refreshToken: (idToken) => {
    localStorage.setItem("accessToken", idToken);
    set({ idToken });
  },

  clearAuth: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("authUser");
    set({ user: null, idToken: null, isAuthenticated: false });
  },
}));