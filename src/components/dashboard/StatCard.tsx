import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  trend: number;
}

export const StatCard = ({ title, value, icon, trend }: StatCardProps) => (
  <div className="relative p-6 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold mt-1 text-primary-main">{value}</p>
      </div>
      <div className="p-3 bg-primary-main bg-opacity-10 rounded-full">
        {icon}
      </div>
    </div>
    <div className="mt-4 flex items-center text-sm">
      {trend > 0 ? (
        <TrendingUp className="w-4 h-4 text-green-500 ml-1" />
      ) : (
        <TrendingDown className="w-4 h-4 text-red-500 ml-1" />
      )}
      <span className={trend > 0 ? 'text-green-500' : 'text-red-500'}>
        {Math.abs(trend)}% مقارنة بالشهر السابق
      </span>
    </div>
  </div>
);