import { create } from 'zustand';

export type ThemeMode = 'light' | 'dark';

interface ThemeState {
  mode: ThemeMode;
  toggleTheme: () => void;
  setMode: (mode: ThemeMode) => void;
}

const useThemeStore = create<ThemeState>((set) => ({
  mode: (localStorage.getItem('theme_mode') as ThemeMode) || 'dark',
  toggleTheme: () =>
    set((state) => {
      const nextMode: ThemeMode = state.mode === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme_mode', nextMode);
      return { mode: nextMode };
    }),
  
  setMode: (mode: ThemeMode) => {
    localStorage.setItem('theme_mode', mode);
    set({ mode });
  },
}));

export default useThemeStore;