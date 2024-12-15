import React from 'react';
import { ExternalLink } from 'lucide-react';
import { cn } from '../../../utils/cn';

interface ServiceBoxProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  color: 'primary' | 'secondary';
}

export const ServiceBox = ({ href, icon, title, description, color }: ServiceBoxProps) => {
  const colorStyles = {
    primary: 'from-primary-main to-primary-dark hover:from-primary-dark hover:to-primary-main',
    secondary: 'from-secondary-main to-secondary-dark hover:from-secondary-dark hover:to-secondary-main',
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'block p-6 rounded-xl bg-gradient-to-br transition-all duration-300 transform hover:scale-105',
        'text-white shadow-lg hover:shadow-xl',
        colorStyles[color]
      )}
    >
      <div className="flex items-start">
        <div className="flex-1">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
            {icon}
          </div>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-white/80">{description}</p>
        </div>
        <ExternalLink className="w-5 h-5 opacity-60" />
      </div>
    </a>
  );
};