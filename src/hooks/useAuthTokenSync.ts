import { useEffect } from "react";
import { onIdTokenChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useAuthStore } from "../store/useAuthStore";

export function useAuthTokenSync() {
  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (firebaseUser) => {
      const { isAuthenticated, refreshToken, clearAuth } = useAuthStore.getState();

      if (!firebaseUser) {
        if (isAuthenticated) clearAuth();
        return;
      }

      const freshToken = await firebaseUser.getIdToken();
      refreshToken(freshToken);
    });

    return () => unsubscribe();
  }, []);
}