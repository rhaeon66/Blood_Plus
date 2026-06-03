import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  token: null,
  user: null,
  isLoading: false,
  error: null,

  setToken: (token) => set({ token }),

  setUser: (user) => set({ user }),

  setLoading: (isLoading) =>
    set({ isLoading }),

  setError: (error) =>
    set({ error }),

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    set({
      token: null,
      user: null,
      error: null,
    });
  },

  loadFromStorage: () => {
    try {
      const token =
        localStorage.getItem('token');

      const user =
        localStorage.getItem('user');

      if (token && user) {
        set({
          token,
          user: JSON.parse(user),
        });
      }
    } catch (error) {
      console.error(error);
    }
  },

  saveToStorage: (token, user) => {
    localStorage.setItem(
      'token',
      token
    );

    localStorage.setItem(
      'user',
      JSON.stringify(user)
    );

    set({
      token,
      user,
    });
  },
}));