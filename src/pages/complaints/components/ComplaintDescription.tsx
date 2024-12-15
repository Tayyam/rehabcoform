import React from 'react';
import { useTranslation } from '../../../hooks/useTranslation';
import { Card } from '../../../components/common/Card';

interface ComplaintDescriptionProps {
  description: string;
}

export const ComplaintDescription = ({ description }: ComplaintDescriptionProps) => {
  const { t } = useTranslation();

  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-4">{t('complaints.description')}</h3>
      <p className="text-gray-600 whitespace-pre-wrap">{description}</p>
    </Card>
  );
};