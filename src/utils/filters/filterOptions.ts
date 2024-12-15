import { CATEGORIES, getCategoryOptions } from '../../config/categories';

export const categoryOptions = getCategoryOptions();

export const statusOptions = [
  { value: 'open', label: 'مفتوح' },
  { value: 'in-progress', label: 'قيد المعالجة' },
  { value: 'rejected', label: 'مرفوض' },
  { value: 'closed', label: 'مغلق' },
];

export const deliveryMethodOptions = [
  { value: 'email', label: 'بريد إلكتروني' },
  { value: 'phone', label: 'اتصال هاتفي' },
  { value: 'website', label: 'الموقع الإلكتروني' },
];

export const complaintTypeOptions = [
  { value: 'inquiry', label: 'استفسار' },
  { value: 'complaint', label: 'بلاغ' },
];