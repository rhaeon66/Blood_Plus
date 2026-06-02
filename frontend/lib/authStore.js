import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  token: null,
  user: null,
  isLoading: false,
  error: null,

  setToken: (token) => set({ token }),
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  logout: () => set({ token: null, user: null, error: null }),

  loadFromStorage: () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      if (token && user) {
        set({ token, user: JSON.parse(user) });
      }
    }
  },

  saveToStorage: (token, user) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      set({ token, user });
    }
  },
}));
