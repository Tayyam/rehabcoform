import { ComplaintStatus } from '../types';

export const STATUS: Record<ComplaintStatus, {
  id: ComplaintStatus;
  label: string;
  description: string;
  color: {
    bg: string;
    text: string;
    border: string;
  };
}> = {
  open: {
    id: 'open',
    label: 'مفتوح',
    description: 'البلاغ مفتوح وينتظر المعالجة',
    color: {
      bg: 'bg-yellow-50',
      text: 'text-yellow-800',
      border: 'border-yellow-200'
    }
  },
  'in-progress': {
    id: 'in-progress',
    label: 'قيد المعالجة',
    description: 'جاري العمل على البلاغ',
    color: {
      bg: 'bg-blue-50',
      text: 'text-blue-800',
      border: 'border-blue-200'
    }
  },
  rejected: {
    id: 'rejected',
    label: 'مرفوض',
    description: 'تم رفض البلاغ',
    color: {
      bg: 'bg-red-50',
      text: 'text-red-800',
      border: 'border-red-200'
    }
  },
  closed: {
    id: 'closed',
    label: 'مغلق',
    description: 'تم إغلاق البلاغ',
    color: {
      bg: 'bg-green-50',
      text: 'text-green-800',
      border: 'border-green-200'
    }
  }
};

export const getStatusLabel = (statusId: ComplaintStatus): string => {
  return STATUS[statusId]?.label || statusId;
};

export const getStatusColor = (statusId: ComplaintStatus) => {
  return STATUS[statusId]?.color || {
    bg: 'bg-gray-50',
    text: 'text-gray-800',
    border: 'border-gray-200'
  };
};