import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatTrendProps {
  value: number;
  className?: string;
}

export const StatTrend = ({ value, className }: StatTrendProps) => (
  <div className={`flex items-center text-sm ${className}`}>
    {value > 0 ? (
      <TrendingUp className="w-4 h-4 text-green-500 ml-1" />
    ) : (
      <TrendingDown className="w-4 h-4 text-red-500 ml-1" />
    )}
    <span className={value > 0 ? 'text-green-500' : 'text-red-500'}>
      {Math.abs(value)}% مقارنة بالشهر السابق
    </span>
  </div>
);