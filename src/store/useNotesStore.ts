import { create } from 'zustand';
import { Note } from '../types/note';
import { 
  addNote as addNoteToDb,
  getNotesByComplaintId,
} from '../lib/firebase/notes';

interface NotesState {
  notes: Record<string, Note[]>;
  loading: boolean;
  error: string | null;
  addNote: (complaintId: string, content: string) => Promise<void>;
  fetchNotes: (complaintId: string) => Promise<void>;
}

export const useNotesStore = create<NotesState>((set, get) => ({
  notes: {},
  loading: false,
  error: null,

  addNote: async (complaintId: string, content: string) => {
    set({ loading: true, error: null });
    try {
      await addNoteToDb(complaintId, content);
      await get().fetchNotes(complaintId);
    } catch (error) {
      console.error('Error adding note:', error);
      set({ error: 'Failed to add note' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  fetchNotes: async (complaintId: string) => {
    set({ loading: true, error: null });
    try {
      const notes = await getNotesByComplaintId(complaintId);
      set(state => ({
        notes: {
          ...state.notes,
          [complaintId]: notes
        }
      }));
    } catch (error) {
      console.error('Error fetching notes:', error);
      set({ error: 'Failed to fetch notes' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },
}));