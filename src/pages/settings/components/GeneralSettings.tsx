import React, { useState } from 'react';
import { Button } from '../../../components/common/Button';
import { useTranslation } from '../../../hooks/useTranslation';

export const GeneralSettings = () => {
  const { t } = useTranslation();
  const [systemName, setSystemName] = useState('نظام شكاوي شركة رحاب');
  const [timezone, setTimezone] = useState('Asia/Riyadh');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save settings logic here
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('settings.systemName')}
        </label>
        <input
          type="text"
          value={systemName}
          onChange={(e) => setSystemName(e.target.value)}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-main focus:ring-primary-main"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('settings.timezone')}
        </label>
        <select
          value={timezone}
          onChange={(e) => setTimezone(e.target.value)}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-main focus:ring-primary-main"
        >
          <option value="Asia/Riyadh">توقيت مكة المكرمة (GMT+3)</option>
          <option value="Asia/Dubai">توقيت الإمارات (GMT+4)</option>
          <option value="Asia/Kuwait">توقيت الكويت (GMT+3)</option>
        </select>
      </div>

      <div className="pt-4">
        <Button type="submit" variant="primary">
          {t('actions.save')}
        </Button>
      </div>
    </form>
  );
};