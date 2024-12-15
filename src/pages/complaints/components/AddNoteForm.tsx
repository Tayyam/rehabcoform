import React, { useState } from 'react';
import { Send, AlertCircle } from 'lucide-react';
import { useTranslation } from '../../../hooks/useTranslation';
import { useNotesStore } from '../../../store/useNotesStore';
import { Button } from '../../../components/common/Button';
import { TextArea } from '../../../components/common/TextArea';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner';

interface AddNoteFormProps {
  complaintId: string;
}

export const AddNoteForm = ({ complaintId }: AddNoteFormProps) => {
  const { t } = useTranslation();
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const addNote = useNotesStore(state => state.addNote);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    setError('');

    try {
      await addNote(complaintId, content.trim());
      setContent('');
    } catch (error) {
      console.error('Error adding note:', error);
      setError('حدث خطأ أثناء إضافة التعليق');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative bg-gray-50 rounded-lg p-4">
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg flex items-center">
          <AlertCircle className="w-5 h-5 ml-2" />
          {error}
        </div>
      )}

      <TextArea
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
          setError('');
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