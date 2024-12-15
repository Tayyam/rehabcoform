import { create } from 'zustand';
import { Complaint, ComplaintStatus } from '../types';
import { 
  addComplaint as addComplaintToDb,
  updateComplaintStatus as updateStatusInDb,
  deleteComplaint as deleteComplaintFromDb,
  deleteAllComplaints as deleteAllComplaintsFromDb,
  getComplaints as getComplaintsFromDb,
} from '../lib/firebase/complaints';
import { deleteNotesByComplaintId } from '../lib/firebase/notes/deleteNotes';

interface ComplaintsState {
  complaints: Complaint[];
  error: string | null;
  loading: boolean;
  addComplaint: (complaint: Omit<Complaint, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'lastUpdatedBy'>) => Promise<string>;
  updateComplaintStatus: (id: string, status: ComplaintStatus) => Promise<void>;
  deleteComplaint: (id: string) => Promise<void>;
  deleteAllComplaints: () => Promise<void>;
  fetchComplaints: () => Promise<void>;
}

export const useStore = create<ComplaintsState>((set, get) => ({
  complaints: [],
  error: null,
  loading: false,

  fetchComplaints: async () => {
    set({ loading: true, error: null });
    try {
      const complaints = await getComplaintsFromDb();
      // Ensure all complaints have a type, defaulting to 'complaint' for existing data
      const complaintWithTypes = complaints.map(complaint => ({
        ...complaint,
        type: complaint.type || 'complaint'
      }));
      set({ complaints: complaintWithTypes });
    } catch (error) {
      console.error('Error fetching complaints:', error);
      set({ error: 'Failed to fetch complaints' });
    } finally {
      set({ loading: false });
    }
  },

  addComplaint: async (complaint) => {
    set({ loading: true, error: null });
    try {
      const complaintId = await addComplaintToDb(complaint);
      await get().fetchComplaints();
      return complaintId;
    } catch (error) {
      console.error('Error adding complaint:', error);
      set({ error: 'Failed to add complaint' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  updateComplaintStatus: async (id, status) => {
    set({ loading: true, error: null });
    try {
      await updateStatusInDb(id, status);
      await get().fetchComplaints();
    } catch (error) {
      console.error('Error updating complaint status:', error);
      set({ error: 'Failed to update complaint status' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  deleteComplaint: async (id) => {
    set({ loading: true, error: null });
    try {
      // First delete all related notes
      await deleteNotesByComplaintId(id);
      // Then delete the complaint
      await deleteComplaintFromDb(id);
      await get().fetchComplaints();
    } catch (error) {
      console.error('Error deleting complaint:', error);
      set({ error: 'Failed to delete complaint' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  deleteAllComplaints: async () => {
    set({ loading: true, error: null });
    try {
      // Get all complaints first
      const complaints = get().complaints;
      // Delete notes for each complaint
      await Promise.all(complaints.map(complaint => 
        deleteNotesByComplaintId(complaint.id)
      ));
      // Then delete all complaints
      await deleteAllComplaintsFromDb();
      await get().fetchComplaints();
    } catch (error) {
      console.error('Error deleting all complaints:', error);
      set({ error: 'Failed to delete all complaints' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },
}));