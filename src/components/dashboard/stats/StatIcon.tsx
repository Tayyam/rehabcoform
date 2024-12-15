import React from 'react';

interface StatIconProps {
  icon: React.ReactNode;
}

export const StatIcon = ({ icon }: StatIconProps) => (
  <div className="p-3 bg-primary-main bg-opacity-10 rounded-full">
    {icon}
  </div>
);