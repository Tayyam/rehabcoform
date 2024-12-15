export const COMPLAINT_TYPES = {
  inquiry: {
    id: 'inquiry',
    label: 'استفسار',
    description: 'للاستفسارات العامة والأسئلة',
    icon: 'HelpCircle',
    color: {
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      icon: 'text-blue-500',
      border: 'border-blue-200'
    }
  },
  complaint: {
    id: 'complaint',
    label: 'بلاغ',
    description: 'للشكاوى والمشاكل التي تحتاج حل',
    icon: 'AlertTriangle',
    color: {
      bg: 'bg-red-50',
      text: 'text-red-700',
      icon: 'text-red-500',
      border: 'border-red-200'
    }
  }
} as const;

export type ComplaintTypeKey = keyof typeof COMPLAINT_TYPES;

export const getComplaintTypeLabel = (typeId: ComplaintTypeKey): string => {
  return COMPLAINT_TYPES[typeId]?.label || typeId;
};

export const getComplaintTypeColor = (typeId: ComplaintTypeKey) => {
  return COMPLAINT_TYPES[typeId]?.color || {
    bg: 'bg-gray-50',
    text: 'text-gray-800',
    icon: 'text-gray-500',
    border: 'border-gray-200'
  };
};