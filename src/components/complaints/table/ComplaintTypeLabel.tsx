import React from 'react';
import { HelpCircle, AlertTriangle } from 'lucide-react';
import { ComplaintType } from '../../../types';
import { COMPLAINT_TYPES, getComplaintTypeColor, getComplaintTypeLabel } from '../../../config/complaintTypes';

interface ComplaintTypeLabelProps {
  type?: ComplaintType;
}

export const ComplaintTypeLabel = ({ type = 'complaint' }: ComplaintTypeLabelProps) => {
  const validType: ComplaintType = type === 'inquiry' ? 'inquiry' : 'complaint';
  const color = getComplaintTypeColor(validType);
  const label = getComplaintTypeLabel(validType);
  const Icon = validType === 'inquiry' ? HelpCircle : AlertTriangle;

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${color.bg} ${color.text}`}>
      <Icon className={`w-4 h-4 ml-1.5 ${color.icon}`} />
      {label}
    </span>
  );
};