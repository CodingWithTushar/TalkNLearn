import { create } from "zustand";

export const useThemeState = create((set) => ({
  theme: localStorage.getItem("TalkNLearn-theme") || "light",
  setTheme: (theme) => {
    localStorage.setItem("TalkNLearn-theme", theme);
    set({ theme });
  },
}));
