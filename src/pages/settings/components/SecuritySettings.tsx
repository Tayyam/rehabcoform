import React, { useState } from 'react';
import { Button } from '../../../components/common/Button';
import { Input } from '../../../components/common/Input';
import { useTranslation } from '../../../hooks/useTranslation';
import { useAuthStore } from '../../../store/useAuthStore';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner';
import { AlertCircle, CheckCircle } from 'lucide-react';

export const SecuritySettings = () => {
  const { t } = useTranslation();
  const changePassword = useAuthStore(state => state.changePassword);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    if (!currentPassword) {
      setError('يرجى إدخال كلمة المرور الحالية');
      return false;
    }
    if (!newPassword) {
      setError('يرجى إدخال كلمة المرور الجديدة');
      return false;
    }
    if (newPassword.length < 6) {
      setError('يجب أن تتكون كلمة المرور من 6 أحرف على الأقل');
      return false;
    }
    if (newPassword !== confirmPassword) {
      setError('كلمة المرور الجديدة غير متطابقة');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await changePassword(currentPassword, newPassword);
      setSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Error changing password:', error);
      setError('فشل تغيير كلمة المرور. يرجى التأكد من كلمة المرور الحالية.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center">
          <AlertCircle className="w-5 h-5 ml-2 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-50 text-green-600 p-4 rounded-lg flex items-center">
          <CheckCircle className="w-5 h-5 ml-2 flex-shrink-0" />
          <p>تم تغيير كلمة المرور بنجاح</p>
        </div>
      )}

      <Input
        type="password"
        label={t('settings.currentPassword')}
        value={currentPassword}
        onChange={(e) => {
          setCurrentPassword(e.target.value);
          setError('');
        }}
        required
      />

      <Input
        type="password"
        label={t('settings.newPassword')}
        value={newPassword}
        onChange={(e) => {
          setNewPassword(e.target.value);
          setError('');
        }}
        required
      />

      <Input
        type="password"
        label={t('settings.confirmPassword')}
        value={confirmPassword}
        onChange={(e) => {
          setConfirmPassword(e.target.value);
          setError('');
        }}
        required
      />

      <div className="pt-4">
        <Button 
          type="submit" 
          variant="primary"
          disabled={isSubmitting}
          className="w-full sm:w-auto"
        >
          {isSubmitting ? (
            <LoadingSpinner size="sm" />
          ) : (
            t('settings.changePassword')
          )}
        </Button>
      </div>
    </form>
  );
};