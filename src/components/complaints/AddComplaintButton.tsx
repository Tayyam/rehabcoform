import React, { useState } from 'react';
import { Plus, Database } from 'lucide-react';
import { Button } from '../common/Button';
import { AddComplaintForm } from './AddComplaintForm';
import { Modal } from '../common/Modal';
import { useTranslation } from '../../hooks/useTranslation';
import { useStore } from '../../store/useStore';
import { useAuthStore } from '../../store/useAuthStore';
import { generateSampleComplaints } from '../../utils/sampleData';

export const AddComplaintButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();
  const user = useAuthStore(state => state.user);
  const addComplaint = useStore(state => state.addComplaint);

  const handleGenerateSampleData = async () => {
    if (!user) return;
    const sampleComplaints = generateSampleComplaints(user.id, 10);
    
    for (const complaint of sampleComplaints) {
      const { id, createdAt, updatedAt, notes, createdBy, lastUpdatedBy, ...complaintData } = complaint;
      try {
        await addComplaint(complaintData);
      } catch (error) {
        console.error('Error adding sample complaint:', error);
      }
    }
  };

  return (
    <div className="flex items-center space-x-2 rtl:space-x-reverse">
      <Button
        variant="primary"
        size="sm"
        className="flex items-center"
        onClick={() => setIsModalOpen(true)}
      >
        <Plus className="w-4 h-4 ml-2" />
        {t('complaints.addNew')}
      </Button>

      <Button
        variant="outline"
        size="sm"
        className="flex items-center"
        onClick={handleGenerateSampleData}
      >
        <Database className="w-4 h-4 ml-2" />
        إضافة بيانات تجريبية
      </Button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={t('complaints.addNew')}
      >
        <AddComplaintForm onSuccess={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};