import { Complaint } from '../../types';

export const filterComplaints = (
  complaints: Complaint[],
  filters: {
    category: string;
    status: string;
    deliveryMethod: string;
    createdBy: string;
    type: string;
  }
) => {
  return complaints.filter(complaint => {
    if (filters.category && complaint.category !== filters.category) return false;
    if (filters.status && complaint.status !== filters.status) return false;
    if (filters.deliveryMethod && complaint.deliveryMethod !== filters.deliveryMethod) return false;
    if (filters.type && complaint.type !== filters.type) return false;
    if (filters.createdBy) {
      if (filters.createdBy === 'visitor') {
        return !complaint.createdBy || complaint.createdBy === 'visitor';
      }
      return complaint.createdBy === filters.createdBy;
    }
    return true;
  });
};

export const getActiveFiltersCount = (filters: Record<string, string>) => {
  return Object.values(filters).filter(Boolean).length;
};