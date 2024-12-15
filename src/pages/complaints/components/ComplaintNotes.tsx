import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useTranslation } from '../../../hooks/useTranslation';
import { Card } from '../../../components/common/Card';
import { NotesList } from './notes/NotesList';
import { AddNoteForm } from './notes/AddNoteForm';
import { useStore } from '../../../store/useStore';

interface ComplaintNotesProps {
  complaintId: string;
}

export const ComplaintNotes = ({ complaintId }: ComplaintNotesProps) => {
  const { t } = useTranslation();
  const complaint = useStore(state => 
    state.complaints.find(c => c.id === complaintId)
  );

  if (!complaint) return null;

  return (
    <Card className="p-6">
      <div className="flex items-center space-x-2 rtl:space-x-reverse mb-6">
        <MessageCircle className="w-5 h-5 text-primary-main" />
        <h3 className="text-lg font-medium">{t('complaints.notes.title')}</h3>
      </div>
      
      <div className="space-y-6 mb-8">
        <NotesList complaintId={complaintId} pilgrimName={complaint.pilgrimName} />
      </div>

      <AddNoteForm complaintId={complaintId} />
    </Card>
  );
};