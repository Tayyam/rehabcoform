// src/hooks/notes/useNotes.ts
import { useEffect } from 'react';
import { useNotesStore } from '../../store/useNotesStore';

export const useNotes = (complaintId: string) => {
  const { notes, loading, error, fetchNotes } = useNotesStore(state => ({
    notes: state.notes[complaintId] || [],
    loading: state.loading,
    error: state.error,
    fetchNotes: state.fetchNotes
  }));

  useEffect(() => {
    fetchNotes(complaintId);
  }, [complaintId, fetchNotes]);

  return {
    notes,
    loading,
    error,
    isLoading: loading && !notes.length,
    isEmpty: !loading && !notes.length,
  };
};
