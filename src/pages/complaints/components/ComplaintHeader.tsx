import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Copy, Check } from 'lucide-react';
import { Button } from '../../../components/common/Button';
import { ComplaintActions } from './ComplaintActions';
import { Complaint } from '../../../types';

interface ComplaintHeaderProps {
  complaint: Complaint;
}

export const ComplaintHeader = ({ complaint }: ComplaintHeaderProps) => {
  const navigate = useNavigate();
  const [copied, setCopied] = React.useState(false);

  const handleCopyId = async () => {
    try {
      await navigator.clipboard.writeText(complaint.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="mb-8">
      <Button
        variant="outline"
        size="sm"
        className="mb-4 flex items-center"
        onClick={() => navigate('/')}
      >
        <ArrowRight className="w-4 h-4 ml-2" />
        العودة للرئيسية
      </Button>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{complaint.title}</h1>
          <div className="flex items-center space-x-2 rtl:space-x-reverse mt-1">
            <span className="text-sm text-gray-500 font-mono">
              رقم المتابعة: {complaint.id}
            </span>
            <button
              onClick={handleCopyId}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              title="نسخ رقم المتابعة"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4 text-gray-400 hover:text-gray-600" />
              )}
            </button>
          </div>
        </div>
        <ComplaintActions complaint={complaint} />
      </div>
    </div>
  );
};