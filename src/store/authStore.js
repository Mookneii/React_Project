import { create } from "zustand";
import { safeGet, safeSet, safeRemove } from "../utils/storage";

export const useAuthStore = create((set) => ({
  token: safeGet("token", null),
  setToken: (token) => {
    safeSet("token", token);
    set({ token });
  },
  logout: () => {
    safeRemove("token");
    set({ token: null });
  },
}));
