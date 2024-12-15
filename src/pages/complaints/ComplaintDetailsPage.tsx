import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { useNotesStore } from '../../store/useNotesStore';
import { Card } from '../../components/common/Card';
import { ComplaintHeader } from './components/ComplaintHeader';
import { ComplaintInfo } from './components/ComplaintInfo';
import { ComplaintDescription } from './components/ComplaintDescription';
import { ComplaintTimeline } from './components/ComplaintTimeline';
import { ComplaintNotes } from './components/ComplaintNotes';
import { ComplaintStatus } from './components/ComplaintStatus';
import { ComplaintType } from './components/ComplaintType';
import { ComplaintContact } from './components/ComplaintContact';
import { ComplaintAttachments } from './components/ComplaintAttachments';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';

export const ComplaintDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const complaints = useStore((state) => state.complaints);
  const loading = useStore((state) => state.loading);
  const complaint = complaints.find((c) => c.id === id);
  const fetchNotes = useNotesStore((state) => state.fetchNotes);

  useEffect(() => {
    if (id) {
      fetchNotes(id);
    }
  }, [id, fetchNotes]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!complaint) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-xl font-medium text-gray-900">البلاغ غير موجود</h2>
        </div>
      </div>
    );
  }

  // Convert legacy imageUrl to attachments format if needed
  const attachments = complaint.attachments?.length > 0 
    ? complaint.attachments 
    : complaint.imageUrl 
      ? [{ 
          url: complaint.imageUrl, 
          type: 'image', 
          name: 'صورة البلاغ' 
        }] 
      : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ComplaintHeader complaint={complaint} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        {/* Left Sidebar - Status and Timeline */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="p-6">
            <ComplaintStatus status={complaint.status} />
          </Card>

          <Card className="p-6">
            <ComplaintType type={complaint.type} />
          </Card>

          <Card className="p-6">
            <ComplaintTimeline
              createdAt={complaint.createdAt}
              updatedAt={complaint.updatedAt}
              createdBy={complaint.createdBy}
              status={complaint.status}
            />
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-9 space-y-6">
          <Card className="p-6">
            <ComplaintInfo complaint={complaint} />
          </Card>

          <Card className="p-6">
            <ComplaintContact
              pilgrimName={complaint.pilgrimName}
              passportNumber={complaint.passportNumber}
              phoneNumber={complaint.phoneNumber}
              deliveryMethod={complaint.deliveryMethod}
            />
          </Card>

          <Card className="p-6">
            <ComplaintDescription description={complaint.description} />
          </Card>

          {attachments.length > 0 && (
            <Card className="p-6">
              <ComplaintAttachments attachments={attachments} />
            </Card>
          )}

          <ComplaintNotes complaintId={complaint.id} />
        </div>
      </div>
    </div>
  );
};