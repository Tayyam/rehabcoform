import React, { useState } from 'react';
import { User, Mail, Trash2 } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { formatDate } from '../../utils/formatters';
import { DeleteConfirmDialog } from '../common/DeleteConfirmDialog';
import { Button } from '../common/Button';
import type { User as UserType } from '../../types/auth';

interface TeamMemberCardProps {
  user: UserType;
  onDelete: (userId: string) => Promise<void>;
  currentUserId: string;
}

export const TeamMemberCard = ({ user, onDelete, currentUserId }: TeamMemberCardProps) => {
  const { t } = useTranslation();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(user.id);
    } catch (error) {
      console.error('Error deleting user:', error);
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="p-2 bg-primary-main bg-opacity-10 rounded-full">
            <User className="w-8 h-8 text-primary-main" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{user.name}</h3>
            <p className="text-sm text-gray-500">
              {user.role === 'admin' ? 'مدير نظام' : 'مدخل بيانات'}
            </p>
          </div>
        </div>

        {/* Only show delete button for admins and not for current user */}
        {currentUserId !== user.id && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDeleteConfirm(true)}
            className="text-red-600 hover:text-red-700 border-red-300 hover:bg-red-50"
            disabled={isDeleting}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </div>
      
      <div className="mt-4 space-y-2">
        <div className="flex items-center text-sm text-gray-500">
          <Mail className="w-4 h-4 ml-2" />
          {user.email}
        </div>
        <div className="text-sm text-gray-500">
          الجنس: {user.gender === 'male' ? 'ذكر' : 'أنثى'}
        </div>
        <div className="text-sm text-gray-500">
          تاريخ الإنشاء: {formatDate(user.createdAt)}
        </div>
      </div>

      <DeleteConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        title="حذف عضو الفريق"
        message={`هل أنت متأكد من حذف ${user.name}؟ لا يمكن التراجع عن هذا الإجراء.`}
      />
    </div>
  );
};