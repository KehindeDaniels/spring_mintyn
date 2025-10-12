import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";

interface AuthState {
  token: string | null;
  user: { id: number; email: string } | null;
  setToken: (token: string) => void;
  setUser: (user: { id: number; email: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setToken: (token) => {
        Cookies.set("token", token, { secure: true, sameSite: "strict" });
        set({ token });
      },
      setUser: (user) => set({ user }),
      logout: () => {
        Cookies.remove("token");
        set({ token: null, user: null });
      },
    }),
    { name: "auth-storage" }
  )
);
