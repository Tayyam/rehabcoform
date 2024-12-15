import React from 'react';

interface StatValueProps {
  title: string;
  value: number;
}

export const StatValue = ({ title, value }: StatValueProps) => (
  <div>
    <p className="text-gray-500 text-sm font-medium">{title}</p>
    <p className="text-2xl font-bold mt-1 text-primary-main">{value}</p>
  </div>
);