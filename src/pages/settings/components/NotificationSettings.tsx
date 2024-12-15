import React, { useState } from 'react';
import { useTranslation } from '../../../hooks/useTranslation';
import { Switch } from '../../../components/common/Switch';
import { Mail, MessageSquare, AlertCircle } from 'lucide-react';

export const NotificationSettings = () => {
  const { t } = useTranslation();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (type: 'email' | 'sms', value: boolean) => {
    if (type === 'email') {
      setEmailNotifications(value);
    } else {
      setSmsNotifications(value);
    }
    
    // Show saved alert
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <div className="space-y-6">
      {showAlert && (
        <div className="bg-green-50 text-green-600 p-3 rounded-lg text-sm flex items-center animate-fade-in">
          <AlertCircle className="w-4 h-4 ml-2" />
          تم حفظ التغييرات بنجاح
        </div>
      )}

      <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between group hover:bg-gray-100 transition-colors">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="p-2 bg-white rounded-lg">
            <Mail className="w-5 h-5 text-primary-main" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900">
              {t('settings.emailNotifications')}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {t('settings.emailNotificationsDesc')}
            </p>
          </div>
        </div>
        <Switch
          checked={emailNotifications}
          onChange={(checked) => handleChange('email', checked)}
        />
      </div>

      <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between group hover:bg-gray-100 transition-colors">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="p-2 bg-white rounded-lg">
            <MessageSquare className="w-5 h-5 text-primary-main" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900">
              {t('settings.smsNotifications')}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {t('settings.smsNotificationsDesc')}
            </p>
          </div>
        </div>
        <Switch
          checked={smsNotifications}
          onChange={(checked) => handleChange('sms', checked)}
        />
      </div>
    </div>
  );
};