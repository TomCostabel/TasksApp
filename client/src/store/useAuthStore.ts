import { create } from 'zustand';

interface AuthState {
  isLogin: boolean;
  user: { email: string } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: (email: string) => Promise<void>;
  error: string | null;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLogin: false,
  user: null,
  error: null,
  login: async (email, password) => {
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      // const data = await response.json();
      set({ isLogin: true, user: { email }, error: null });
    } catch (error) {
      set({ error: 'Failed to login' });
    }
  },
  logout: async (email) => {
    try {
      const response = await fetch('http://localhost:3000/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      set({ isLogin: false, user: { email }, error: null });
    } catch (error) {
      set({ error: 'Failed to Logout' });
    }
  },
}));