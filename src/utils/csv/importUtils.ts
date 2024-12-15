import Papa from 'papaparse';
import { complaintImportSchema } from './importSchema';
import { validatePhoneNumber } from '../validation';
import { APP_CONFIG } from '../../config';

interface ValidationError {
  row: number;
  column: string;
  message: string;
}

export const parseCSV = (file: File): Promise<{ data: any[]; errors: ValidationError[] }> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      encoding: APP_CONFIG.export.encoding,
      skipEmptyLines: true,
      complete: (results) => {
        const errors: ValidationError[] = [];
        const validData: any[] = [];

        results.data.forEach((row: any, index) => {
          // Skip completely empty rows
          if (Object.values(row).every(value => !value)) {
            return;
          }

          try {
            // Clean up the data before validation
            const cleanedRow = Object.fromEntries(
              Object.entries(row).map(([key, value]) => {
                // Handle phone number specifically
                if (key === 'رقم الهاتف') {
                  // If it's empty, return empty string
                  if (!value) return [key, ''];
                  
                  // Convert number to string if needed
                  const phoneStr = String(value).trim();
                  
                  // Add + prefix if it's a valid number without it
                  if (/^\d+$/.test(phoneStr)) {
                    return [key, `+${phoneStr}`];
                  }
                  
                  // If it already has a +, just return it trimmed
                  if (phoneStr.startsWith('+')) {
                    return [key, phoneStr];
                  }
                  
                  // For any other format, return as is
                  return [key, phoneStr];
                }
                
                // For all other fields, just trim strings
                return [key, typeof value === 'string' ? value.trim() : value];
              })
            );

            // Map type values to correct format
            if (cleanedRow['نوع البلاغ']) {
              cleanedRow['نوع البلاغ'] = cleanedRow['نوع البلاغ'] === 'استفسار' ? 'inquiry' : 'complaint';
            }

            // Validate row data
            const validatedRow = complaintImportSchema.parse(cleanedRow);

            // Additional phone number validation if provided
            if (validatedRow['رقم الهاتف']) {
              const phoneError = validatePhoneNumber(validatedRow['رقم الهاتف']);
              if (phoneError) {
                errors.push({
                  row: index + 2, // Add 2 to account for header row and 0-based index
                  column: 'رقم الهاتف',
                  message: phoneError
                });
                return;
              }
            }

            validData.push(validatedRow);
          } catch (error: any) {
            if (error.errors) {
              error.errors.forEach((err: any) => {
                errors.push({
                  row: index + 2,
                  column: err.path[0] || '',
                  message: err.message
                });
              });
            }
          }
        });

        resolve({ data: validData, errors });
      },
      error: (error) => reject(error)
    });
  });
};

export const generateExampleCSV = () => {
  const exampleData = [
    {
      'نوع البلاغ': 'استفسار',
      'العنوان': 'استفسار عن موعد الرحلة',
      'الوصف': 'أرغب في معرفة تفاصيل مواعيد الرحلات',
      'التصنيف': 'transport',
      'الحالة': 'open',
      'الأولوية': 'medium',
      'اسم الحاج': 'محمد أحمد',
      'رقم جواز السفر': 'A1234567',
      'رقم الهاتف': '+966501234567',
      'طريقة الاستلام': 'phone'
    },
    {
      'نوع البلاغ': 'بلاغ',
      'العنوان': 'مشكلة في السكن',
      'الوصف': 'الغرفة غير مجهزة بشكل كامل',
      'التصنيف': 'accommodation',
      'الحالة': 'open',
      'الأولوية': 'high',
      'اسم الحاج': 'عبدالله محمد',
      'رقم جواز السفر': 'B7654321',
      'رقم الهاتف': '+966509876543',
      'طريقة الاستلام': 'email'
    }
  ];

  const csv = Papa.unparse(exampleData);
  const blob = new Blob(['\ufeff' + csv], { 
    type: `text/csv;charset=${APP_CONFIG.export.encoding};` 
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `نموذج_رفع_البلاغات${APP_CONFIG.export.fileExtension}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};