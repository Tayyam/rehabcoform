import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) => {
  const baseStyles = 'rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-primary-main text-white hover:bg-primary-dark focus:ring-primary-light',
    secondary: 'bg-secondary-main text-white hover:bg-secondary-dark focus:ring-secondary-light',
    outline: 'border-2 border-primary-main text-primary-main hover:bg-primary-main hover:text-white',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};