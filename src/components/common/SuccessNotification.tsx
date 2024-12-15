import React, { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

interface SuccessNotificationProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

export const SuccessNotification = ({ message, onClose, duration = 5000 }: SuccessNotificationProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-slide-up">
      <div className="bg-green-50 text-green-800 px-6 py-4 rounded-lg shadow-lg border border-green-100 flex items-center space-x-3 rtl:space-x-reverse">
        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
        <span className="text-sm font-medium">{message}</span>
        <button
          onClick={onClose}
          className="p-1 hover:bg-green-100 rounded-full transition-colors"
        >
          <X className="w-4 h-4 text-green-500" />
        </button>
      </div>
    </div>
  );
};