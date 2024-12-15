import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../../components/common/Card';
import { Logo } from '../../../components/common/Logo';

interface SuccessMessageProps {
  referenceNumber: string;
}

export const SuccessMessage = ({ referenceNumber }: SuccessMessageProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full p-8 text-center">
        <div className="mb-6">
          <Logo />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          تم تسجيل بلاغك بنجاح
        </h2>
        <p className="text-gray-600 mb-6">
          رقم المتابعة الخاص بك هو:
        </p>
        <div className="bg-primary-main/5 text-primary-main text-2xl font-bold py-4 rounded-lg mb-8">
          {referenceNumber}
        </div>
        <p className="text-sm text-gray-500 mb-6">
          يرجى الاحتفاظ برقم المتابعة للاستفسار عن حالة بلاغك لاحقاً
        </p>
        <Link
          to="/login"
          className="inline-block w-full px-4 py-2 bg-primary-main text-white rounded-md hover:bg-primary-dark transition-colors"
        >
          العودة للرئيسية
        </Link>
      </Card>
    </div>
  );
};