import { Complaint } from '../types';
import { User } from '../types/auth';

export const filterVisibleComplaints = (complaints: Complaint[], user: User | null) => {
  if (!user) return [];
  
  // Both admins and operators can see all complaints
  return complaints;
};

export const validateComplaint = (complaint: Partial<Complaint>) => {
  const errors: string[] = [];

  if (!complaint.title?.trim()) {
    errors.push('العنوان مطلوب');
  }

  if (!complaint.description?.trim()) {
    errors.push('الوصف مطلوب');
  }

  if (!complaint.pilgrimName?.trim()) {
    errors.push('اسم الحاج مطلوب');
  }

  return errors;
};

export const getComplaintStatusColor = (status: string) => {
  const colors = {
    open: 'bg-yellow-100 text-yellow-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    rejected: 'bg-red-100 text-red-800',
    closed: 'bg-green-100 text-green-800',
  };
  return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
};

export const getComplaintPriorityColor = (priority: string) => {
  const colors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };
  return colors[priority as keyof typeof colors] || 'bg-gray-100 text-gray-800';
};