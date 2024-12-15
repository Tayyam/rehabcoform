import React from 'react';
import { useTranslation } from '../../../hooks/useTranslation';
import { formatDate } from '../../../utils/formatters';
import { useAuthStore } from '../../../store/useAuthStore';
import { cn } from '../../../utils/cn';

interface ComplaintTimelineProps {
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  status: string;
  className?: string;
}

export const ComplaintTimeline = ({ 
  createdAt, 
  updatedAt, 
  createdBy, 
  status,
  className 
}: ComplaintTimelineProps) => {
  const { t } = useTranslation();
  const users = useAuthStore((state) => state.users);
  const createdByUser = users.find(u => u.id === createdBy);

  return (
    <div className={cn("", className)}>
      <h3 className="text-lg font-medium mb-4">{t('complaints.updates.title')}</h3>
      <div className="border-r-2 border-gray-200 pr-4 space-y-6">
        <div className="relative">
          <div className="absolute right-[-1.25rem] top-1 w-4 h-4 bg-primary-main rounded-full border-2 border-white"></div>
          <div className="mb-1">
            <div className="text-sm font-medium">{t(`status.${status}`)}</div>
            <div className="text-sm text-gray-500">
              {t('complaints.lastUpdatedBy')}: {createdByUser?.name || t('general.unknown')}
            </div>
            <div className="text-sm text-gray-500">{formatDate(updatedAt)}</div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute right-[-1.25rem] top-1 w-4 h-4 bg-gray-300 rounded-full border-2 border-white"></div>
          <div className="mb-1">
            <div className="text-sm font-medium">{t('complaints.updates.created')}</div>
            <div className="text-sm text-gray-500">
              {t('complaints.updates.by')}: {createdByUser?.name || t('general.unknown')}
            </div>
            <div className="text-sm text-gray-500">{formatDate(createdAt)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};