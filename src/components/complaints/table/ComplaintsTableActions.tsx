import React, { useState } from 'react';
import { Eye, Trash2 } from 'lucide-react';
import { Button } from '../../common/Button';
import { DeleteConfirmDialog } from '../../common/DeleteConfirmDialog';
import { useTranslation } from '../../../hooks/useTranslation';
import { useAuthStore } from '../../../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

interface ComplaintsTableActionsProps {
  complaintId: string;
  onDelete: () => void;
}

export const ComplaintsTableActions = ({ complaintId, onDelete }: ComplaintsTableActionsProps) => {
  const { t } = useTranslation();
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(`/complaints/${complaintId}`)}
          className="flex items-center"
        >
          <Eye className="w-4 h-4 ml-1" />
          {t('actions.view')}
        </Button>
        {user?.role === 'admin' && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDeleteDialog(true)}
            className="flex items-center text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4 ml-1" />
            {t('actions.delete')}
          </Button>
        )}
      </div>

      <DeleteConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={onDelete}
        title="حذف البلاغ"
        message="هل أنت متأكد من حذف هذا البلاغ؟ لا يمكن التراجع عن هذا الإجراء."
      />
    </>
  );
};