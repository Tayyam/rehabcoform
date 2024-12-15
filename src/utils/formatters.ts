import { format } from 'date-fns';
import { arSA } from 'date-fns/locale';
import { APP_CONFIG } from '../config';

export const formatDate = (date: string | Date | number | null | undefined) => {
  if (!date) return 'غير محدد';
  
  try {
    // Handle Firestore Timestamp
    if (typeof date === 'object' && 'seconds' in date) {
      return format(new Date(date.seconds * 1000), APP_CONFIG.dateFormat, { locale: arSA });
    }

    const dateObj = typeof date === 'string' ? new Date(date) : new Date(date);
    
    if (isNaN(dateObj.getTime())) {
      throw new Error('Invalid date');
    }
    
    return format(dateObj, APP_CONFIG.dateFormat, { locale: arSA });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'تاريخ غير صالح';
  }
};

export const formatDateTime = (date: string | Date | number | null | undefined) => {
  if (!date) return 'غير محدد';
  
  try {
    // Handle Firestore Timestamp
    if (typeof date === 'object' && 'seconds' in date) {
      return format(new Date(date.seconds * 1000), `${APP_CONFIG.dateFormat} ${APP_CONFIG.timeFormat}`, { locale: arSA });
    }

    const dateObj = typeof date === 'string' ? new Date(date) : new Date(date);
    
    if (isNaN(dateObj.getTime())) {
      throw new Error('Invalid date');
    }
    
    return format(dateObj, `${APP_CONFIG.dateFormat} ${APP_CONFIG.timeFormat}`, { locale: arSA });
  } catch (error) {
    console.error('Error formatting date and time:', error);
    return 'تاريخ ووقت غير صالح';
  }
};

export const formatExportDateTime = (date: string | Date | number | null | undefined) => {
  if (!date) return '';
  
  try {
    // Handle Firestore Timestamp
    if (typeof date === 'object' && 'seconds' in date) {
      return format(new Date(date.seconds * 1000), APP_CONFIG.export.dateFormat);
    }

    const dateObj = typeof date === 'string' ? new Date(date) : new Date(date);
    
    if (isNaN(dateObj.getTime())) {
      throw new Error('Invalid date');
    }
    
    return format(dateObj, APP_CONFIG.export.dateFormat);
  } catch (error) {
    console.error('Error formatting date and time:', error);
    return '';
  }
};