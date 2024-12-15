import React from 'react';
import { useTranslation } from '../../../hooks/useTranslation';

interface ComplaintStatusProps {
  status: string;
}

export const ComplaintStatus = ({ status }: ComplaintStatusProps) => {
  const { t } = useTranslation();

  const getStatusColor = (status: string) => {
    const colors = {
      open: 'bg-yellow-50 text-yellow-800',
      'in-progress': 'bg-blue-50 text-blue-800',
      rejected: 'bg-red-50 text-red-800',
      closed: 'bg-green-50 text-green-800',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-50 text-gray-800';
  };

  return (
    <div className={`inline-block px-3 py-1 rounded-full ${getStatusColor(status)}`}>
      <span className="text-sm font-medium">
        {t(`status.${status}`)}
      </span>
    </div>
  );
};