import { useState } from 'react';
import { useNotesStore } from '../../store/useNotesStore';

export const useAddNote = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const addNote = useNotesStore(state => state.addNote);

  const handleAddNote = async (complaintId: string, content: string) => {
    if (!content.trim()) return;

    setIsSubmitting(true);
    setError('');

    try {
      await addNote(complaintId, content.trim());
      return true;
    } catch (error) {
      console.error('Error adding note:', error);
      setError('حدث خطأ أثناء إضافة التعليق');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    addNote: handleAddNote,
    isSubmitting,
    error,
    clearError: () => setError(''),
  };
};