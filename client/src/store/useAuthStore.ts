import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'

interface AuthState {
  isLogin: boolean;
  setLogin: (loginState: boolean) => void;
  user: { email: string } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: (email: string) => Promise<void>;
  register: (userRegister: object) => Promise<void>
  error: string | null;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLogin: false,
      setLogin: (loginState) => set({ isLogin: loginState }),
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
            body: JSON.stringify({ email })
          });

          if (!response.ok) {
            throw new Error('Logout failed');
          }

          set({ isLogin: false, user: null, error: null });
        } catch (error) {
          set({ error: 'Failed to Logout' });
        }
      },

      register: async (userRegister: object) => {
        try {
          const response = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userRegister),
          });

          if (!response.ok) {
            throw new Error('Error al registrar usuario');
          }

          set({ error: null });
        } catch (error) {
          set({ error: 'Failed to register' });
        }
      },
    }),

    // -------------> Persistencia en el localStorage 
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);