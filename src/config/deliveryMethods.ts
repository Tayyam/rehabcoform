export const DELIVERY_METHODS = {
  email: {
    id: 'email',
    label: 'بريد إلكتروني',
    description: 'سيتم التواصل عبر البريد الإلكتروني',
    icon: 'Mail'
  },
  phone: {
    id: 'phone',
    label: 'اتصال هاتفي',
    description: 'سيتم التواصل عبر الهاتف',
    icon: 'Phone'
  },
  website: {
    id: 'website',
    label: 'الموقع الإلكتروني',
    description: 'سيتم عرض التحديثات على الموقع',
    icon: 'Globe'
  }
} as const;

export type DeliveryMethodType = keyof typeof DELIVERY_METHODS;

export const getDeliveryMethodLabel = (methodId: DeliveryMethodType): string => {
  return DELIVERY_METHODS[methodId]?.label || methodId;
};