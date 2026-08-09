import { UserSession } from "@/src/types/auth.types";
import { create } from "zustand";

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

interface SessionState {
  status: AuthStatus;
  session: UserSession | null;
  clearSession: () => void;
  updateSession: () => void;
}

const fetchSessionFromAPI = async () => {
  try {
    const response = await fetch("/api/auth/session");
    if (response.ok) {
      const data = await response.json();
      return data
        ? { session: data, status: "authenticated" as AuthStatus }
        : { session: null, status: "unauthenticated" as AuthStatus };
    }
    return { session: null, status: "unauthenticated" as AuthStatus };
  } catch {
    return { session: null, status: "unauthenticated" as AuthStatus };
  }
};


export const useSessionStore = create<SessionState>((set) => ({
  status: "loading" as AuthStatus,
  session: null,    
  clearSession: () => set({ session: null, status: "unauthenticated" }),
  updateSession: async () => {
    const { session, status } = await fetchSessionFromAPI();
    set({ session, status });
  }

}));


if(typeof window !== "undefined") {
  useSessionStore.getState().updateSession();
}