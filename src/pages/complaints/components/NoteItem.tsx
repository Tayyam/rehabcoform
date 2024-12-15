import React from 'react';
import { User } from 'lucide-react';
import { Note } from '../../../types';
import { useAuthStore } from '../../../store/useAuthStore';
import { useTranslation } from '../../../hooks/useTranslation';
import { formatDateTime } from '../../../utils/formatters';

interface NoteItemProps {
  note: Note;
}

export const NoteItem = ({ note }: NoteItemProps) => {
  const { t } = useTranslation();
  const users = useAuthStore((state) => state.users);
  const author = users.find(u => u.id === note.author);
  
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-primary-main/10 flex items-center justify-center">
          <User className="w-6 h-6 text-primary-main" />
        </div>
      </div>
      <div className="flex-grow">
        <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <span className="font-medium text-gray-900">
                {author?.name || t('general.unknown')}
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