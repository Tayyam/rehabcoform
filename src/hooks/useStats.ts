import { useMemo } from 'react';
import { useStore } from '../store/useStore';
import { ComplaintStatus } from '../types';

export const useStats = () => {
  const complaints = useStore((state) => state.complaints);

  return useMemo(() => ({
    total: complaints.length,
    byStatus: (status: ComplaintStatus) => 
      complaints.filter((c) => c.status === status).length,
    percentageByStatus: (status: ComplaintStatus) => 
      complaints.length ? (complaints.filter((c) => c.status === status).length / complaints.length) * 100 : 0,
  }), [complaints]);
};