import React from 'react';
import { useTranslation } from '../../../hooks/useTranslation';
import { formatDate } from '../../../utils/formatters';
import { useAuthStore } from '../../../store/useAuthStore';

interface ComplaintTimelineProps {
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  status: string;
}

export const ComplaintTimeline = ({ createdAt, updatedAt, createdBy, status }: ComplaintTimelineProps) => {
  const { t } = useTranslation();
  const users = useAuthStore((state) => state.getUsers());
  const createdByUser = users.find(u => u.id === createdBy);

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">سجل التحديثات</h3>
      <div className="border-r-2 border-gray-200 pr-4 space-y-6">
        <div className="relative">
          <div className="absolute right-[-1.25rem] top-1 w-4 h-4 bg-primary-main rounded-full border-2 border-white"></div>
          <div className="mb-1">
            <div className="text-sm font-medium">{t(`status.${status}`)}</div>
            <div className="text-sm text-gray-500">
              آخر تحديث بواسطة: {createdByUser?.name || t('general.unknown')}
            </div>
            <div className="text-sm text-gray-500">{formatDate(updatedAt)}</div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute right-[-1.25rem] top-1 w-4 h-4 bg-gray-300 rounded-full border-2 border-white"></div>
          <div className="mb-1">
            <div className="text-sm font-medium">تم إنشاء الشكوى</div>
            <div className="text-sm text-gray-500">
              بواسطة: {createdByUser?.name || t('general.unknown')}
            </div>
            <div className="text-sm text-gray-500">{formatDate(createdAt)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};