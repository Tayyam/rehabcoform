import React, { useState } from 'react';
import { useStore } from '../../../store/useStore';
import { useAuthStore } from '../../../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/common/Button';
import { ConfirmDialog } from '../../../components/common/ConfirmDialog';
import { useTranslation } from '../../../hooks/useTranslation';
import { Complaint } from '../../../types';
import { Play, CheckCircle, RefreshCw, Trash2 } from 'lucide-react';

interface ComplaintActionsProps {
  complaint: Complaint;
}

export const ComplaintActions = ({ complaint }: ComplaintActionsProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const updateStatus = useStore((state) => state.updateComplaintStatus);
  const deleteComplaint = useStore((state) => state.deleteComplaint);

  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    action: () => void;
    type: 'danger' | 'warning' | 'info';
  }>({
    isOpen: false,
    title: '',
    message: '',
    action: () => {},
    type: 'warning'
  });

  const handleReopenComplaint = () => {
    setConfirmDialog({
      isOpen: true,
      title: 'إعادة فتح الشكوى',
      message: 'هل أنت متأكد من إعادة فتح هذه الشكوى؟',
      action: () => updateStatus(complaint.id, 'open'),
      type: 'warning'
    });
  };

  const handleDelete = () => {
    setConfirmDialog({
      isOpen: true,
      title: 'حذف الشكوى',
      message: 'هل أنت متأكد من حذف هذه الشكوى؟ لا يمكن التراجع عن هذا الإجراء.',
      action: () => {
        deleteComplaint(complaint.id);
        navigate('/');
      },
      type: 'danger'
    });
  };

  return (
    <>
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        {complaint.status === 'open' && (
          <Button 
            variant="primary" 
            onClick={() => updateStatus(complaint.id, 'in-progress')}
            className="flex items-center bg-primary-main hover:bg-primary-dark"
          >
            <Play className="w-4 h-4 ml-2" />
            {t('actions.startProcessing')}
          </Button>
        )}

        {complaint.status === 'in-progress' && (
          <Button 
            variant="primary" 
            onClick={() => updateStatus(complaint.id, 'closed')}
            className="flex items-center bg-green-600 hover:bg-green-700"
          >
            <CheckCircle className="w-4 h-4 ml-2" />
            {t('actions.closeComplaint')}
          </Button>
        )}

        {complaint.status === 'closed' && (
          <Button 
            variant="outline" 
            onClick={handleReopenComplaint}
            className="flex items-center border-yellow-500 text-yellow-600 hover:bg-yellow-50"
          >
            <RefreshCw className="w-4 h-4 ml-2" />
            {t('actions.reopenComplaint')}
          </Button>
        )}

        {user?.role === 'admin' && (
          <Button
            variant="outline"
            className="text-red-600 hover:text-red-700 border-red-300 hover:bg-red-50 flex items-center"
            onClick={handleDelete}
          >
            <Trash2 className="w-4 h-4 ml-2" />
            {t('actions.delete')}
          </Button>
        )}
      </div>

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        onConfirm={confirmDialog.action}
        title={confirmDialog.title}
        message={confirmDialog.message}
        type={confirmDialog.type}
      />
    </>
  );
};