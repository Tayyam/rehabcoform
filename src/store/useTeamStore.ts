import { create } from 'zustand';
import { User } from '../types/auth';
import { getUsers as getUsersFromDb, deleteUser as deleteUserFromDb } from '../lib/firebase/users';

interface TeamState {
  users: User[];
  loading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
}

export const useTeamStore = create<TeamState>((set) => ({
  users: [],
  loading: false,
  error: null,

  fetchUsers: async () => {
    set({ loading: true, error: null });
    try {
      const users = await getUsersFromDb();
      set({ users });
    } catch (error) {
      console.error('Error fetching users:', error);
      set({ error: 'Failed to fetch users' });
    } finally {
      set({ loading: false });
    }
  },

  deleteUser: async (userId: string) => {
    set({ loading: true, error: null });
    try {
      await deleteUserFromDb(userId);
      // Refresh users list after deletion
      const users = await getUsersFromDb();
      set({ users });
    } catch (error) {
      console.error('Error deleting user:', error);
      set({ error: 'Failed to delete user' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },
}));