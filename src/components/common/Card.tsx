import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export const Card = ({ className, children }: CardProps) => (
  <div className={cn(
    'bg-white rounded-lg shadow-sm border border-gray-100',
    className
  )}>
    {children}
  </div>
);