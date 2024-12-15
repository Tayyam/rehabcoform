import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useTranslation } from '../../../../hooks/useTranslation';
import { Button } from '../../../../components/common/Button';
import { TextArea } from '../../../../components/common/TextArea';
import { LoadingSpinner } from '../../../../components/common/LoadingSpinner';
import { useAddNote } from '../../../../hooks/notes/useAddNote';

interface AddNoteFormProps {
  complaintId: string;
}

export const AddNoteForm = ({ complaintId }: AddNoteFormProps) => {
  const { t } = useTranslation();
  const [content, setContent] = useState('');
  const { addNote, isSubmitting, error, clearError } = useAddNote();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await addNote(complaintId, content);
    if (success) {
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative bg-gray-50 rounded-lg p-4">
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
          {error}
        </div>
      )}

      <TextArea
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
          clearError();
        }}
        placeholder={t('complaints.notes.placeholder')}
        className="mb-2 bg-white text-lg"
        rows={3}
        disabled={isSubmitting}
      />
      
      <div className="flex justify-end">
        <Button
          type="submit"
          variant="primary"
          size="sm"
          disabled={!content.trim() || isSubmitting}
          className="flex items-center"
        >
          {isSubmitting ? (
            <LoadingSpinner size="sm" />
          ) : (
            <>
              <Send className="w-4 h-4 ml-2" />
              {t('complaints.notes.send')}
            </>
          )}
        </Button>
      </div>
    </form>
  );
};