export const PRIORITIES = {
  low: {
    id: 'low',
    label: 'منخفضة',
    description: 'بلاغ غير عاجل',
    color: {
      bg: 'bg-green-50',
      text: 'text-green-800',
      border: 'border-green-200'
    }
  },
  medium: {
    id: 'medium',
    label: 'متوسطة',
    description: 'بلاغ يحتاج معالجة خلال فترة معقولة',
    color: {
      bg: 'bg-yellow-50',
      text: 'text-yellow-800',
      border: 'border-yellow-200'
    }
  },
  high: {
    id: 'high',
    label: 'عالية',
    description: 'بلاغ عاجل يحتاج معالجة سريعة',
    color: {
      bg: 'bg-red-50',
      text: 'text-red-800',
      border: 'border-red-200'
    }
  }
} as const;

export type PriorityType = keyof typeof PRIORITIES;

export const getPriorityLabel = (priorityId: PriorityType): string => {
  return PRIORITIES[priorityId]?.label || priorityId;
};

export const getPriorityColor = (priorityId: PriorityType) => {
  return PRIORITIES[priorityId]?.color || {
    bg: 'bg-gray-50',
    text: 'text-gray-800',
    border: 'border-gray-200'
  };
};