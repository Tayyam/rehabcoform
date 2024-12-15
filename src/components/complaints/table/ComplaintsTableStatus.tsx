import React from 'react';
import { ComplaintStatus } from '../../../types';
import { getStatusColor, getStatusLabel } from '../../../config/status';

interface ComplaintsTableStatusProps {
  status: ComplaintStatus;
}

export const ComplaintsTableStatus = ({ status }: ComplaintsTableStatusProps) => {
  const color = getStatusColor(status);
  const label = getStatusLabel(status);

  return (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${color.bg} ${color.text}`}>
      {label}
    </span>
  );
};