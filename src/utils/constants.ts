export const COMPLAINT_STATUSES = {
  OPEN: 'open',
  IN_PROGRESS: 'in-progress',
  REJECTED: 'rejected',
  CLOSED: 'closed',
} as const;

export const COMPLAINT_CATEGORIES = {
  ADMINISTRATIVE: 'administrative',
  HEALTH: 'health',
  TRANSPORT: 'transport',
  ACCOMMODATION: 'accommodation',
  FOOD: 'food',
} as const;

export const PRIORITIES = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
} as const;