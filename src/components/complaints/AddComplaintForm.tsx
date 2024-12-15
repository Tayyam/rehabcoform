import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { ComplaintCategory, ComplaintType } from '../../types';
import { useTranslation } from '../../hooks/useTranslation';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { TextArea } from '../common/TextArea';
import { Select } from '../common/Select';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { PhoneInput } from '../common/PhoneInput';
import { validatePhoneNumber } from '../../utils/validation';
import { ComplaintTypeSelect } from './form/ComplaintTypeSelect';

interface AddComplaintFormProps {
  onSuccess?: (complaintId: string) => void;
  isPublic?: boolean;
}

export const AddComplaintForm = ({ onSuccess, isPublic = false }: AddComplaintFormProps) => {
  const { t } = useTranslation();
  const addComplaint = useStore((state) => state.addComplaint);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    type: 'inquiry' as ComplaintType, // Default to inquiry
    title: '',
    description: '',
    category: 'administrative' as ComplaintCategory,
    priority: 'medium' as const,
    pilgrimName: '',
    passportNumber: '',
    phoneNumber: '',
    deliveryMethod: 'email' as const,
  });
  const [phoneError, setPhoneError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setPhoneError('');

    // Validate phone number if provided
    if (formData.phoneNumber) {
      const phoneValidationError = validatePhoneNumber(formData.phoneNumber);
      if (phoneValidationError) {
        setPhoneError(phoneValidationError);
        setLoading(false);
        return;
      }
    }

    try {
      const complaintId = await addComplaint({
        ...formData,
        deliveryMethod: isPublic ? 'website' : formData.deliveryMethod,
        status: 'open',
        attachments: [],
      });

      setFormData({
        type: 'inquiry',
        title: '',
        description: '',
        category: 'administrative',
        priority: 'medium',
        pilgrimName: '',
        passportNumber: '',
        phoneNumber: '',
        deliveryMethod: 'email',
      });

      if (onSuccess) {
        onSuccess(complaintId);
      }
    } catch (error) {
      console.error('Error submitting complaint:', error);
      setError('حدث خطأ أثناء إرسال البلاغ');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-lg text-sm">
          {error}
        </div>
      )}

      <ComplaintTypeSelect
        value={formData.type}
        onChange={(value) => setFormData({ ...formData, type: value })}
      />

      <Input
        label="اسم الحاج"
        value={formData.pilgrimName}
        onChange={(e) => setFormData({ ...formData, pilgrimName: e.target.value })}
        required
      />

      <Input
        label="رقم جواز السفر (اختياري)"
        value={formData.passportNumber}
        onChange={(e) => setFormData({ ...formData, passportNumber: e.target.value })}
      />

      <PhoneInput
        label="رقم الهاتف (اختياري)"
        value={formData.phoneNumber}
        onChange={(value) => {
          setFormData({ ...formData, phoneNumber: value });
          setPhoneError('');
        }}
        error={phoneError}
        helper="مثال: +966501234567"
        placeholder="أدخل رقم الهاتف"
      />

      <Input
        label={t('complaints.title')}
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
      />

      <TextArea
        label={t('complaints.description')}
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        rows={4}
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Select
          label={t('complaints.category')}
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value as ComplaintCategory })}
        >
          <option value="administrative">إداري</option>
          <option value="health">صحي</option>
          <option value="transport">نقل</option>
          <option value="accommodation">سكن</option>
          <option value="food">تغذية</option>
        </Select>

        <Select
          label={t('complaints.priority')}
          value={formData.priority}
          onChange={(e) => setFormData({ ...formData, priority: e.target.value as 'low' | 'medium' | 'high' })}
        >
          <option value="low">منخفضة</option>
          <option value="medium">متوسطة</option>
          <option value="high">عالية</option>
        </Select>

        {!isPublic && (
          <Select
            label="طريقة الاستلام"
            value={formData.deliveryMethod}
            onChange={(e) => setFormData({ ...formData, deliveryMethod: e.target.value as 'email' | 'phone' })}
          >
            <option value="email">بريد إلكتروني</option>
            <option value="phone">اتصال هاتفي</option>
          </Select>
        )}
      </div>

      <div className="flex justify-end space-x-2 rtl:space-x-reverse pt-4">
        <Button 
          type="submit" 
          variant="primary"
          disabled={loading}
        >
          {loading ? <LoadingSpinner size="sm" /> : t('actions.submit')}
        </Button>
      </div>
    </form>
  );
};