import React from 'react';
import { FileText, Search } from 'lucide-react';
import { ExternalServiceBox } from './ExternalServiceBox';

const EXTERNAL_SERVICES = {
  NEW_COMPLAINT: 'https://ithraaalkhaircrmform.netlify.app',
  TRACK_COMPLAINT: 'https://ithraaalkhaircrmform.netlify.app'
};

export const ExternalServices = () => {
  return (
    <div className="max-w-3xl mx-auto mb-12">
      <div className="grid md:grid-cols-2 gap-6">
        <ExternalServiceBox
          href={EXTERNAL_SERVICES.NEW_COMPLAINT}
          icon={FileText}
          title="تقديم بلاغ جديد"
          description="قم بتسجيل بلاغك بسهولة وسرعة"
          variant="primary"
        />
        <ExternalServiceBox
          href={EXTERNAL_SERVICES.TRACK_COMPLAINT}
          icon={Search}
          title="متابعة حالة البلاغ"
          description="تابع حالة بلاغك واستلم التحديثات"
          variant="secondary"
        />
      </div>
    </div>
  );
};