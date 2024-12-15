import React from 'react';
import { useTranslation } from '../../../hooks/useTranslation';

export const ComplaintsTableHeader = () => {
  const { t } = useTranslation();

  return (
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
          {t('complaints.referenceNumber')}
        </th>
        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
          {t('complaintType.label')}
        </th>
        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
          اسم الحاج
        </th>
        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
          رقم الهاتف
        </th>
        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
          {t('complaints.title')}
        </th>
        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
          {t('complaints.category')}
        </th>
        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
          {t('complaints.status')}
        </th>
        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
          طريقة الاستلام
        </th>
        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
          تم الإنشاء بواسطة
        </th>
        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
          آخر تحديث بواسطة
        </th>
        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
          {t('complaints.createdAt')}
        </th>
        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
          {t('complaints.actions')}
        </th>
      </tr>
    </thead>
  );
};