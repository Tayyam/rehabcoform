import React from 'react';
import { cn } from '../../utils/cn';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helper?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, helper, children, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={cn(
            "w-full px-4 py-3 rounded-lg border border-gray-300",
            "text-base text-gray-900 bg-white",
            "focus:outline-none focus:ring-2 focus:ring-primary-main/20 focus:border-primary-main",
            "transition-colors duration-200",
            error && "border-red-500 focus:ring-red-500/20 focus:border-red-500",
            className
          )}
          {...props}
        >
          {children}
        </select>
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
        {helper && !error && (
          <p className="mt-1 text-sm text-gray-500">{helper}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';