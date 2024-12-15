import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useTranslation } from '../../../hooks/useTranslation';
import { NoteItem } from './NoteItem';
import { Note } from '../../../types';

interface NotesListProps {
  notes: Note[];
}

export const NotesList = ({ notes }: NotesListProps) => {
  const { t } = useTranslation();

  if (notes.length === 0) {
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
        <NoteItem key={note.id} note={note} />
      ))}
    </div>
  );
};