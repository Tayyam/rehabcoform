import React from 'react';
import { Clock, Tag, AlertCircle, MessageSquare } from 'lucide-react';
import { useTranslation } from '../../../hooks/useTranslation';
import { formatDate } from '../../../utils/formatters';
import { useAuthStore } from '../../../store/useAuthStore';
import { Complaint } from '../../../types';
import { cn } from '../../../utils/cn';

interface ComplaintInfoProps {
  complaint: Complaint;
  className?: string;
}

export const ComplaintInfo = ({ complaint, className }: ComplaintInfoProps) => {
  const { t } = useTranslation();
  const users = useAuthStore((state) => state.users);
  const createdByUser = users.find(u => u.id === complaint.createdBy);

  return (
    <div className={cn("grid grid-cols-2 gap-4", className)}>
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        <Clock className="w-5 h-5 text-gray-400" />
        <div>
          <div className="text-sm text-gray-500">{t('complaints.createdAt')}</div>
          <div className="text-sm font-medium">{formatDate(complaint.createdAt)}</div>
        </div>
      </div>

      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        <Tag className="w-5 h-5 text-gray-400" />
        <div>
          <div className="text-sm text-gray-500">{t('complaints.category')}</div>
          <div className="text-sm font-medium">{t(`categories.${complaint.category}`)}</div>
        </div>
      </div>

      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        <AlertCircle className="w-5 h-5 text-gray-400" />
        <div>
          <div className="text-sm text-gray-500">{t('complaints.priority')}</div>
          <div className="text-sm font-medium">{t(`priority.${complaint.priority}`)}</div>
        </div>
      </div>

      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        <MessageSquare className="w-5 h-5 text-gray-400" />
        <div>
          <div className="text-sm text-gray-500">{t('complaints.createdBy')}</div>
          <div className="text-sm font-medium">{createdByUser?.name || t('general.unknown')}</div>
        </div>
      </div>
    </div>
  );
};