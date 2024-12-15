import React from 'react';
import { User, Phone, Mail, Globe } from 'lucide-react';
import { DeliveryMethod } from '../../../types';

interface ComplaintContactProps {
  pilgrimName: string;
  passportNumber?: string;
  phoneNumber?: string;
  deliveryMethod: DeliveryMethod;
}

export const ComplaintContact = ({
  pilgrimName,
  passportNumber,
  phoneNumber,
  deliveryMethod
}: ComplaintContactProps) => {
  const getDeliveryMethodIcon = () => {
    switch (deliveryMethod) {
      case 'email':
        return <Mail className="w-5 h-5 text-primary-main" />;
      case 'phone':
        return <Phone className="w-5 h-5 text-primary-main" />;
      case 'website':
        return <Globe className="w-5 h-5 text-primary-main" />;
    }
  };

  const getDeliveryMethodText = () => {
    switch (deliveryMethod) {
      case 'email':
        return 'بريد إلكتروني';
      case 'phone':
        return 'اتصال هاتفي';
      case 'website':
        return 'الموقع الإلكتروني';
    }
  };

  const getWhatsAppLink = (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, '');
    return `https://wa.me/${cleanPhone}`;
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">معلومات الاتصال</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center mb-3">
            <User className="w-5 h-5 text-primary-main ml-2" />
            <span className="text-sm font-medium text-gray-500">اسم الحاج</span>
          </div>
          <p className="text-gray-900">{pilgrimName}</p>
          {passportNumber && (
            <p className="text-sm text-gray-500 mt-1">
              رقم الجواز: {passportNumber}
            </p>
          )}
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center mb-3">
            {getDeliveryMethodIcon()}
            <span className="text-sm font-medium text-gray-500">طريقة التواصل</span>
          </div>
          <p className="text-gray-900">{getDeliveryMethodText()}</p>
          {phoneNumber && (
            <div className="mt-2 flex items-center space-x-2 rtl:space-x-reverse">
              <a
                href={`tel:${phoneNumber}`}
                className="text-primary-main hover:text-primary-dark"
              >
                {phoneNumber}
              </a>
              <a
                href={getWhatsAppLink(phoneNumber)}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 hover:bg-green-50 rounded-full transition-colors"
                title="التواصل عبر واتساب"
              >
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-4 h-4 text-green-600"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};