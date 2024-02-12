import { createJSONStorage, persist } from 'zustand/middleware';

import { AppConfig } from '@/constant/env';
import { createZustandStore } from '@/utils/resetStore';

export type UserFlows = 'Login' | 'Signup' | '';

interface UserData {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: string;
  profile_image: string;
}

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
const initialState: any = {
  token: '',
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  user: {} as any,
};

export interface AuthState {
  isLoggedIn?: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  token?: string;
  setToken: (token: string) => void;
  user?: UserData;
  setUserData: (user: UserData) => void;
}

const useAuthStore = createZustandStore<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,

      setIsLoggedIn: (isLoggedIn: boolean): void => {
        set({ isLoggedIn });
      },

      setToken: (token: string): void => {
        set({ token });
      },
      setUserData: (user: UserData): void => {
        set({ user });
      },
      reset: () => {
        set(initialState);
      },
    }),
    {
      name: AppConfig.PERSIST_SECRET_KEY,
      storage: createJSONStorage(() => window.localStorage),
    }
  )
);

export default useAuthStore;
