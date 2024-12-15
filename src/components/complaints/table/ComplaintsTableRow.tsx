import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../../store/useStore';
import { useAuthStore } from '../../../store/useAuthStore';
import { Complaint } from '../../../types';
import { useTranslation } from '../../../hooks/useTranslation';
import { formatDate } from '../../../utils/formatters';
import { ComplaintsTableStatus } from './ComplaintsTableStatus';
import { ComplaintsTableActions } from './ComplaintsTableActions';
import { ComplaintTypeLabel } from './ComplaintTypeLabel';
import { Copy, Check, Phone } from 'lucide-react';

interface ComplaintsTableRowProps {
  complaint: Complaint;
}

export const ComplaintsTableRow = ({ complaint }: ComplaintsTableRowProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const deleteComplaint = useStore((state) => state.deleteComplaint);
  const users = useAuthStore((state) => state.users);
  const createdByUser = users.find(u => u.id === complaint.createdBy);
  const lastUpdatedByUser = users.find(u => u.id === complaint.lastUpdatedBy);
  const [copiedId, setCopiedId] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const getDeliveryMethodText = (method: string) => {
    const methods = {
      email: 'بريد إلكتروني',
      phone: 'اتصال هاتفي',
      website: 'الموقع الإلكتروني'
    };
    return methods[method as keyof typeof methods] || method;
  };

  const handleCopy = async (text: string, type: 'id' | 'phone') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'id') {
        setCopiedId(true);
        setTimeout(() => setCopiedId(false), 2000);
      } else {
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(t('complaints.deleteConfirmation'))) {
      try {
        await deleteComplaint(complaint.id);
      } catch (error) {
        console.error('Error deleting complaint:', error);
      }
    }
  };

  const getWhatsAppLink = (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, '');
    return `https://wa.me/${cleanPhone}`;
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <button
          onClick={() => handleCopy(complaint.id, 'id')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          title="نسخ رقم المتابعة"
        >
          {copiedId ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4 text-gray-400 hover:text-gray-600" />
          )}
        </button>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <ComplaintTypeLabel type={complaint.type} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">
          {complaint.pilgrimName}
          {complaint.passportNumber && (
            <span className="text-gray-500 text-xs mr-2">
              ({complaint.passportNumber})
            </span>
          )}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {complaint.phoneNumber ? (
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <button
              onClick={() => handleCopy(complaint.phoneNumber!, 'phone')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              title="نسخ رقم الهاتف"
            >
              {copiedPhone ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4 text-gray-400 hover:text-gray-600" />
              )}
            </button>
            <a
              href={getWhatsAppLink(complaint.phoneNumber)}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-green-50 rounded-full transition-colors"
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
            <a
              href={`tel:${complaint.phoneNumber}`}
              className="p-2 hover:bg-blue-50 rounded-full transition-colors"
              title="اتصال مباشر"
            >
              <Phone className="w-4 h-4 text-blue-600" />
            </a>
          </div>
        ) : (
          <span className="text-sm text-gray-400">-</span>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{complaint.title}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{t(`categories.${complaint.category}`)}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <ComplaintsTableStatus status={complaint.status} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {getDeliveryMethodText(complaint.deliveryMethod)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {createdByUser?.name || 'زائر'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {lastUpdatedByUser?.name || createdByUser?.name || 'زائر'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {formatDate(complaint.createdAt)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <ComplaintsTableActions
          complaintId={complaint.id}
          onDelete={handleDelete}
        />
      </td>
    </tr>
  );
};