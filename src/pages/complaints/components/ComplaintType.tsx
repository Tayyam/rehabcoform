import React from 'react';
import { HelpCircle, AlertTriangle } from 'lucide-react';
import { ComplaintType as ComplaintTypeEnum } from '../../../types';
import { useTranslation } from '../../../hooks/useTranslation';

interface ComplaintTypeProps {
  type: ComplaintTypeEnum;
}

export const ComplaintType = ({ type }: ComplaintTypeProps) => {
  const { t } = useTranslation();
  const Icon = type === 'inquiry' ? HelpCircle : AlertTriangle;
  
  const getTypeStyles = () => {
    return type === 'inquiry' 
      ? 'bg-blue-50 text-blue-700'
      : 'bg-red-50 text-red-700';
  };

  return (
    <div>
      <h3 className="text-sm font-medium text-gray-500 mb-4">نوع البلاغ</h3>
      <div className={`flex items-center p-3 rounded-lg ${getTypeStyles()}`}>
        <Icon className="w-5 h-5 ml-2" />
        <span className="font-medium">
          {t(`complaintType.${type}`)}
        </span>
      </div>
      <p className="text-sm text-gray-500 mt-2">
        {t(`complaintType.${type}Desc`)}
      </p>
    </div>
  );
};