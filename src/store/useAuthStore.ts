import { create } from 'zustand';
import { AuthState, User, UserRole, UserGender } from '../types/auth';
import { 
  signIn, 
  signOut, 
  updatePassword 
} from '../lib/firebase/auth';
import { createUser, getUsers as getUsersFromDb } from '../lib/firebase/users';

interface AuthStore extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  addUser: (userData: {
    email: string;
    password: string;
    name: string;
    role: UserRole;
    gender: UserGender;
  }) => Promise<boolean>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  setUser: (user: User | null) => void;
  users: User[];
  fetchUsers: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  users: [],

  setUser: (user) => set({ user, isAuthenticated: !!user }),

  login: async (email, password) => {
    try {
      const user = await signIn(email, password);
      set({ user, isAuthenticated: true });
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  },

  logout: async () => {
    try {
      await signOut();
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },

  changePassword: async (currentPassword: string, newPassword: string) => {
    try {
      await updatePassword(currentPassword, newPassword);
    } catch (error) {
      console.error('Change password error:', error);
      throw error;
    }
  },

  addUser: async (userData) => {
    try {
      await createUser(userData);
      await set.getState().fetchUsers();
      return true;
    } catch (error) {
      console.error('Add user error:', error);
      return false;
    }
  },

  fetchUsers: async () => {
    try {
      const users = await getUsersFromDb();
      set({ users });
    } catch (error) {
      console.error('Fetch users error:', error);
      throw error;
    }
  },
}));