import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useTranslation } from '../../../../hooks/useTranslation';
import { NoteItem } from './NoteItem';
import { useNotes } from '../../../../hooks/notes/useNotes';
import { LoadingSpinner } from '../../../../components/common/LoadingSpinner';

interface NotesListProps {
  complaintId: string;
  pilgrimName: string;
}

export const NotesList = ({ complaintId, pilgrimName }: NotesListProps) => {
  const { t } = useTranslation();
  const { notes, isLoading, isEmpty, error } = useNotes(complaintId);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-12">
        <p>{error}</p>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="text-center text-gray-500 py-12 bg-gray-50 rounded-lg">
        <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <p>لا توجد تعليقات حتى الآن</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {notes.map((note) => (
        <NoteItem 
          key={note.id} 
          note={note} 
          pilgrimName={pilgrimName}
        />
      ))}
    </div>
  );
};