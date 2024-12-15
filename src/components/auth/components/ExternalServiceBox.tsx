import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ExternalServiceBoxProps {
  href: string;
  icon: LucideIcon;
  title: string;
  description: string;
  variant: 'primary' | 'secondary';
}

export const ExternalServiceBox = ({
  href,
  icon: Icon,
  title,
  description,
  variant
}: ExternalServiceBoxProps) => {
  const colorClasses = {
    primary: {
      hover: 'hover:border-primary-main',
      icon: 'text-primary-main',
      bg: 'bg-primary-main/10',
      hoverBg: 'group-hover:bg-primary-main/20'
    },
    secondary: {
      hover: 'hover:border-secondary-main',
      icon: 'text-secondary-main',
      bg: 'bg-secondary-main/10',
      hoverBg: 'group-hover:bg-secondary-main/20'
    }
  };

  const colors = colorClasses[variant];

  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
    >
      <div className={`bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all duration-300 border-2 border-transparent ${colors.hover}`}>
        <div className="flex items-center justify-center mb-4">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${colors.bg} ${colors.hoverBg} transition-colors`}>
            <Icon className={`w-8 h-8 ${colors.icon}`} />
          </div>
        </div>
        <h3 className="text-xl font-bold text-center text-gray-900 mb-2">
          {title}
        </h3>
        <p className="text-gray-600 text-center">
          {description}
        </p>
      </div>
    </a>
  );
};