import React, { useState } from 'react';
import { useAuthStore } from '../../../store/useAuthStore';
import { Button } from '../../../components/common/Button';
import { Input } from '../../../components/common/Input';
import { Select } from '../../../components/common/Select';
import { useTranslation } from '../../../hooks/useTranslation';
import { UserRole, UserGender } from '../../../types/auth';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner';

interface AddUserModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const AddUserModal = ({ onClose, onSuccess }: AddUserModalProps) => {
  const { t } = useTranslation();
  const addUser = useAuthStore(state => state.addUser);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'operator' as UserRole,
    gender: 'male' as UserGender,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const success = await addUser(formData);
      if (success) {
        onSuccess();
        onClose();
      } else {
        setError('حدث خطأ أثناء إضافة المستخدم. يرجى التحقق من البريد الإلكتروني.');
      }
    } catch (error) {
      console.error('Add user error:', error);
      setError('حدث خطأ أثناء إضافة المستخدم');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{t('team.addMember')}</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <Input
            label="الاسم"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <Input
            type="email"
            label="البريد الإلكتروني"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />

          <Input
            type="password"
            label="كلمة المرور"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />

          <Select
            label="الجنس"
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value as UserGender })}
            required
          >
            <option value="male">ذكر</option>
            <option value="female">أنثى</option>
          </Select>

          <Select
            label="الدور"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
            required
          >
            <option value="operator">مدخل بيانات</option>
            <option value="admin">مدير نظام</option>
          </Select>

          <div className="flex justify-end space-x-2 rtl:space-x-reverse pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              disabled={isSubmitting}
            >
              إلغاء
            </Button>
            <Button 
              type="submit" 
              variant="primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? <LoadingSpinner size="sm" /> : 'إضافة'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};