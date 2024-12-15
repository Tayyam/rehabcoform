import { Timestamp } from 'firebase/firestore';
import { AppError } from './errors';

export const toFirestoreDate = (date: Date | string | number) => {
  try {
    const dateObj = typeof date === 'string' || typeof date === 'number' 
      ? new Date(date) 
      : date;
      
    if (isNaN(dateObj.getTime())) {
      throw new Error('Invalid date');
    }
    
    return Timestamp.fromDate(dateObj);
  } catch (error) {
    throw new AppError('Invalid date format', 'INVALID_DATE', 400);
  }
};

export const fromFirestoreDate = (timestamp: Timestamp | null | undefined) => {
  if (!timestamp) return null;
  
  try {
    return timestamp.toDate();
  } catch (error) {
    throw new AppError('Invalid timestamp', 'INVALID_TIMESTAMP', 400);
  }
};

export const formatFirestoreDate = (timestamp: Timestamp | null | undefined, format: string = 'ISO') => {
  const date = fromFirestoreDate(timestamp);
  if (!date) return null;
  
  switch (format) {
    case 'ISO':
      return date.toISOString();
    case 'LOCAL':
      return date.toLocaleString('ar-SA');
    default:
      return date.toString();
  }
};