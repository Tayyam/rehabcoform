import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { Card } from '../../components/common/Card';
import { NotificationSettings } from './components/NotificationSettings';
import { SecuritySettings } from './components/SecuritySettings';
import { Bell, Shield } from 'lucide-react';

export const SettingsPage = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{t('settings.title')}</h1>
      </div>

      <div className="space-y-8">
        <Card className="p-6">
          <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
            <div className="p-2 bg-primary-main/10 rounded-lg">
              <Bell className="w-6 h-6 text-primary-main" />
            </div>
            <h2 className="text-lg font-semibold">{t('settings.notifications')}</h2>
          </div>
          <NotificationSettings />
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
            <div className="p-2 bg-primary-main/10 rounded-lg">
              <Shield className="w-6 h-6 text-primary-main" />
            </div>
            <h2 className="text-lg font-semibold">{t('settings.security')}</h2>
          </div>
          <SecuritySettings />
        </Card>
      </div>
    </div>
  );
};