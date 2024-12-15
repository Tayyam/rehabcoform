import React from 'react';
import { ComplaintType } from '../../../types';
import { HelpCircle, AlertTriangle } from 'lucide-react';

interface ComplaintTypeSelectProps {
  value: ComplaintType;
  onChange: (value: ComplaintType) => void;
}

export const ComplaintTypeSelect = ({ value, onChange }: ComplaintTypeSelectProps) => {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        نوع البلاغ
      </label>
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          className={`flex items-center p-4 rounded-lg border-2 transition-colors ${
            value === 'inquiry'
              ? 'border-primary-main bg-primary-main/5'
              : 'border-gray-200 hover:border-primary-main/50'
          }`}
          onClick={() => onChange('inquiry')}
        >
          <HelpCircle className={`w-5 h-5 ml-3 ${
            value === 'inquiry' ? 'text-primary-main' : 'text-gray-400'
          }`} />
          <div className="text-right">
            <div className={`font-medium ${
              value === 'inquiry' ? 'text-primary-main' : 'text-gray-900'
            }`}>
              استفسار
            </div>
            <div className="text-sm text-gray-500">
              للاستفسارات العامة والأسئلة
            </div>
          </div>
        </button>

        <button
          type="button"
          className={`flex items-center p-4 rounded-lg border-2 transition-colors ${
            value === 'complaint'
              ? 'border-primary-main bg-primary-main/5'
              : 'border-gray-200 hover:border-primary-main/50'
          }`}
          onClick={() => onChange('complaint')}
        >
          <AlertTriangle className={`w-5 h-5 ml-3 ${
            value === 'complaint' ? 'text-primary-main' : 'text-gray-400'
          }`} />
          <div className="text-right">
            <div className={`font-medium ${
              value === 'complaint' ? 'text-primary-main' : 'text-gray-900'
            }`}>
              بلاغ
            </div>
            <div className="text-sm text-gray-500">
              للشكاوى والمشاكل التي تحتاج حل
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};