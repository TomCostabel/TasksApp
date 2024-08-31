import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'

interface UserRegister {
  email: string;
  password: string;
  confirmPassword: string;
}

interface AuthState {
  isLogin: boolean;
  setLogin: (loginState: boolean) => void;
  user: { email: string } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: (email: string) => Promise<void>;
  register: (userRegister: UserRegister) => Promise<void>
  errorLogin: string | null;
  errorRegister: string | null;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLogin: false,
      setLogin: (loginState) => set({ isLogin: loginState }),
      user: null,
      errorLogin: null,
      errorRegister: null,


      login: async (email, password) => {
        try {
          const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });
          console.log(response)

          if (!response.ok) {
            const errorData = await response.json()
            set({ errorLogin: errorData });
            throw new Error(errorData.message);
          }

          set({ isLogin: true, user: { email }, errorLogin: null });

        } catch (error) {
          set({ errorLogin: `${error}` });
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

          set({ isLogin: false, user: null, errorLogin: null });
        } catch (error) {
          set({ errorLogin: `${error}` });
        }
      },

      register: async (userRegister: UserRegister) => {
        try {
          const { password, confirmPassword } = userRegister;

          if (password !== confirmPassword) {
            throw new Error('Las contraseñas no coinciden');
          }
          const response = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userRegister),
          });
          if (!response.ok) {
            throw new Error('Email ya registrado');
          }

          set({ errorRegister: null });
        } catch (error) {
          set({ errorRegister: `${error}` });
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