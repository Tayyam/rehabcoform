import React, { useState } from 'react';
import { parsePhoneNumber, AsYouType, CountryCode } from 'libphonenumber-js';
import { cn } from '../../utils/cn';
import { ChevronDown, Globe } from 'lucide-react';

interface PhoneInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  error?: string;
  helper?: string;
}

export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, label, error, helper, value, onChange, ...props }, ref) => {
    const [focused, setFocused] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatter = new AsYouType();
      const formattedValue = formatter.input(e.target.value);
      onChange(formattedValue);
    };

    const getCountryFromNumber = (value: string) => {
      try {
        const phoneNumber = parsePhoneNumber(value);
        return phoneNumber?.country;
      } catch {
        return null;
      }
    };

    const country = getCountryFromNumber(value);

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          <div className={cn(
            "absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none",
            "border-l border-gray-300 bg-gray-50",
            focused && "border-primary-main bg-primary-main/5"
          )}>
            {country ? (
              <span className="text-sm font-medium">
                {`+${parsePhoneNumber(value)?.countryCallingCode}`}
              </span>
            ) : (
              <Globe className="w-5 h-5 text-gray-400" />
            )}
          </div>
          <input
            ref={ref}
            type="tel"
            className={cn(
              "w-full px-4 py-3 rounded-lg border border-gray-300",
              "text-base text-gray-900 placeholder-gray-400",
              "focus:outline-none focus:ring-2 focus:ring-primary-main/20 focus:border-primary-main",
              "transition-colors duration-200",
              "pl-4 pr-16 text-left",
              error && "border-red-500 focus:ring-red-500/20 focus:border-red-500",
              className
            )}
            value={value}
            onChange={handleChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            dir="ltr"
            {...props}
          />
        </div>
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

PhoneInput.displayName = 'PhoneInput';