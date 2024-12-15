import React from 'react';
import { User } from 'lucide-react';
import { Note } from '../../../../types';
import { useAuthStore } from '../../../../store/useAuthStore';
import { useTranslation } from '../../../../hooks/useTranslation';
import { formatDateTime } from '../../../../utils/formatters';

interface NoteItemProps {
  note: Note;
  pilgrimName: string;
}

export const NoteItem = ({ note, pilgrimName }: NoteItemProps) => {
  const { t } = useTranslation();
  const users = useAuthStore((state) => state.users);
  const author = users.find(u => u.id === note.author);
  
  // Determine if the note is from a staff member or visitor
  const isStaffNote = author !== undefined;
  
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
          isStaffNote ? 'bg-primary-main/10' : 'bg-secondary-main/10'
        }`}>
          <User className={`w-6 h-6 ${
            isStaffNote ? 'text-primary-main' : 'text-secondary-main'
          }`} />
        </div>
      </div>
      <div className="flex-grow">
        <div className={`rounded-lg p-4 ${
          isStaffNote ? 'bg-gray-50' : 'bg-secondary-main/5'
        }`}>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <span className={`font-medium ${
                isStaffNote ? 'text-gray-900' : 'text-secondary-dark'
              }`}>
                {isStaffNote ? author.name : 'زائر'}
              </span>
              <span className="mx-2 text-gray-400">•</span>
              <span className="text-sm text-gray-500">
                {formatDateTime(note.createdAt)}
              </span>
            </div>
          </div>
          <p className="text-gray-600 whitespace-pre-wrap">{note.content}</p>
        </div>
      </div>
    </div>
  );
};
