import { useEffect, useState } from "react";
import { auth, provider } from "@/lib/firebase";
import { AuthContext } from "@/context/auth-context";
import {
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth";

const E2E_AUTH_STORAGE_KEY = "__slofactcheck_e2e_auth__";
const E2E_AUTH_ENABLED = import.meta.env.VITE_E2E_AUTH === "true";
const DEFAULT_E2E_USER = {
  uid: "e2e-user-1",
  displayName: "E2E User",
  email: "e2e@example.com",
  photoURL: "",
};

const readStoredE2EUser = () => {
  if (!E2E_AUTH_ENABLED || typeof window === "undefined") {
    return null;
  }

  const rawState = window.localStorage.getItem(E2E_AUTH_STORAGE_KEY);
  if (!rawState) {
    return null;
  }

  try {
    const parsedState = JSON.parse(rawState);
    return parsedState?.user ?? null;
  } catch {
    return null;
  }
};

const writeStoredE2EUser = (user) => {
  if (!E2E_AUTH_ENABLED || typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    E2E_AUTH_STORAGE_KEY,
    JSON.stringify({ user: user ?? null })
  );
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (E2E_AUTH_ENABLED) {
      setUser(readStoredE2EUser());
      setLoading(false);
      return undefined;
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    if (E2E_AUTH_ENABLED) {
      const nextUser = readStoredE2EUser() ?? DEFAULT_E2E_USER;
      writeStoredE2EUser(nextUser);
      setUser(nextUser);
      setLoading(false);
      return { user: nextUser };
    }

    try {
      return await signInWithPopup(auth, provider);
    } catch (error) {
      const popupFallbackErrors = new Set([
        "auth/popup-blocked",
        "auth/popup-closed-by-user",
        "auth/cancelled-popup-request",
      ]);

      if (popupFallbackErrors.has(error?.code)) {
        await signInWithRedirect(auth, provider);
        return null;
      }

      throw error;
    }
  };

  const logout = async () => {
    if (E2E_AUTH_ENABLED) {
      writeStoredE2EUser(null);
      setUser(null);
      return;
    }

    return signOut(auth);
  };

  const value = {
    user,
    loading,
    loginWithGoogle,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
