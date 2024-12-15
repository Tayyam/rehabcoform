import { Complaint } from '../types';
import { useAuthStore } from '../store/useAuthStore';
import { formatExportDateTime } from './formatters';

const getComplaintTypeText = (type: string) => {
  return type === 'inquiry' ? 'استفسار' : 'بلاغ';
};

export const exportComplaintsToCSV = (complaints: Complaint[]) => {
  const users = useAuthStore.getState().users;

  // Get user names map for efficient lookup
  const userNames = new Map(users.map(user => [user.id, user.name]));

  // Define headers in Arabic
  const headers = [
    'رقم المتابعة',
    'نوع البلاغ',
    'العنوان',
    'الوصف',
    'التصنيف',
    'الحالة',
    'الأولوية',
    'اسم الحاج',
    'رقم جواز السفر',
    'رقم الهاتف',
    'طريقة الاستلام',
    'تم الإنشاء بواسطة',
    'آخر تحديث بواسطة',
    'تاريخ الإنشاء',
    'تاريخ آخر تحديث',
    'رابط الصورة المرفقة'
  ];

  // Map complaint data to rows
  const rows = complaints.map(complaint => [
    complaint.id,
    getComplaintTypeText(complaint.type),
    complaint.title,
    complaint.description,
    complaint.category,
    complaint.status,
    complaint.priority,
    complaint.pilgrimName,
    complaint.passportNumber || '',
    complaint.phoneNumber || '',
    complaint.deliveryMethod,
    userNames.get(complaint.createdBy) || 'زائر',
    userNames.get(complaint.lastUpdatedBy) || userNames.get(complaint.createdBy) || 'زائر',
    formatExportDateTime(complaint.createdAt),
    formatExportDateTime(complaint.updatedAt),
    complaint.imageUrl || '' // Add image URL to the export
  ]);

  // Add BOM for proper Arabic encoding
  const csvContent = '\ufeff' + [headers, ...rows]
    .map(row => 
      // Escape commas and quotes in cell values
      row.map(cell => {
        const cellStr = String(cell);
        if (cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n')) {
          return `"${cellStr.replace(/"/g, '""')}"`;
        }
        return cellStr;
      }).join(',')
    )
    .join('\n');
  
  // Create and trigger download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `تقرير_البلاغات_${formatExportDateTime(new Date())}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};