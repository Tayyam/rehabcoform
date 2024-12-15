export * from './categories';
export * from './status';
export * from './priorities';
export * from './deliveryMethods';
export * from './complaintTypes';
export * from './validation';

// App-wide configuration
export const APP_CONFIG = {
  name: 'نظام بلاغات شركة رحاب',
  version: '1.0.0',
  defaultLocale: 'ar-SA',
  defaultTimezone: 'Asia/Riyadh',
  dateFormat: 'dd/MM/yyyy',
  timeFormat: 'HH:mm:ss',
  pagination: {
    defaultPageSize: 10,
    pageSizeOptions: [5, 10, 20, 50]
  },
  export: {
    dateFormat: 'dd/MM/yyyy HH:mm:ss',
    encoding: 'utf-8',
    delimiter: ',',
    fileExtension: '.csv'
  }
} as const;