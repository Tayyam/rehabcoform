import React from 'react';
import { Modal } from '../../common/Modal';
import { Complaint } from '../../../types';
import { useTranslation } from '../../../hooks/useTranslation';
import { Button } from '../../common/Button';
import { ComplaintInfo } from './ComplaintInfo';
import { ComplaintTimeline } from './ComplaintTimeline';

interface ViewComplaintModalProps {
  isOpen: boolean;
  onClose: () => void;
  complaint: Complaint;
}

export const ViewComplaintModal = ({ isOpen, onClose, complaint }: ViewComplaintModalProps) => {
  const { t } = useTranslation();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={complaint.title}
    >
      <div className="flex flex-col space-y-6">
        {/* Status Badge */}
        <div className="bg-yellow-50 px-4 py-2 rounded-lg">
          <span className="text-sm font-medium text-yellow-800">
            {t(`status.${complaint.status}`)}
          </span>
        </div>

        {/* Main Info Grid */}
        <ComplaintInfo complaint={complaint} />

        {/* Description */}
        <div>
          <h3 className="text-lg font-medium mb-2">{t('complaints.description')}</h3>
          <p className="text-gray-600">{complaint.description}</p>
        </div>

        {/* Updates Timeline */}
        <ComplaintTimeline
          createdAt={complaint.createdAt}
          updatedAt={complaint.updatedAt}
          createdBy={complaint.createdBy}
          status={complaint.status}
        />

        {/* Action Buttons */}
        <div className="flex justify-end space-x-2 rtl:space-x-reverse pt-4">
          <Button variant="outline" onClick={onClose}>
            إغلاق
          </Button>
          <Button variant="primary">
            بدء المعالجة
          </Button>
        </div>
      </div>
    </Modal>
  );
};