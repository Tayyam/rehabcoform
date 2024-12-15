import React from 'react';
import { StatValue } from './StatValue';
import { StatIcon } from './StatIcon';
import { StatTrend } from './StatTrend';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  trend: number;
}

export const StatCard = ({ title, value, icon, trend }: StatCardProps) => (
  <div className="relative p-6 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <StatValue title={title} value={value} />
      <StatIcon icon={icon} />
    </div>
    <StatTrend value={trend} className="mt-4" />
  </div>
);