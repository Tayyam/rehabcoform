import React from 'react';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const Switch = ({ checked, onChange }: SwitchProps) => {
  return (
    <button
      type="button"
      className={`${
        checked ? 'bg-primary-main' : 'bg-gray-200'
      } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-main focus:ring-offset-2`}
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
    >
      <span
        className={`${
          checked ? 'translate-x-5' : 'translate-x-0'
        } pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
      />
    </button>
  );
};