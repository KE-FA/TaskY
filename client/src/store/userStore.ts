import { create } from "zustand";
import type { StateCreator } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  userName: string;
  avatarUrl: string;
}

interface UserStore {
  user: User | null;
  setUser: (user: User | ((prev: User | null) => User)) => void;
  logoutUser: () => void;
}

const userStore: StateCreator<UserStore> = (set) => ({
  user: null,
  setUser: (update) => {
    set((state) => ({
      user: typeof update === "function" ? update(state.user) : update,
    }));
  },
  logoutUser: () => {
    set(() => ({ user: null }));
  },
});

const useUser = create(persist(userStore, { name: "Auth" }));

export default useUser;
