import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/common/Card';
import { AddComplaintForm } from '../../components/complaints/AddComplaintForm';
import { Logo } from '../../components/common/Logo';
import { SuccessMessage } from './components/SuccessMessage';

export const PublicComplaintForm = () => {
  const [referenceNumber, setReferenceNumber] = useState<string | null>(null);

  const handleSuccess = (complaintId: string) => {
    if (complaintId) {
      setReferenceNumber(complaintId.slice(0, 8).toUpperCase());
    }
  };

  if (referenceNumber) {
    return <SuccessMessage referenceNumber={referenceNumber} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <Logo />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            تسجيل بلاغ جديد
          </h2>
          <p className="mt-2 text-gray-600">
            يرجى تعبئة النموذج التالي وسيتم التواصل معك في أقرب وقت
          </p>
        </div>

        <Card className="p-8">
          <AddComplaintForm onSuccess={handleSuccess} isPublic={true} />
        </Card>

        <div className="mt-4 text-center">
          <Link
            to="/login"
            className="text-primary-main hover:text-primary-dark transition-colors"
          >
            العودة للرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
};