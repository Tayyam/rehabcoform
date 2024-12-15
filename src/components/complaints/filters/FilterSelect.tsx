import React from 'react';
import { Select } from '../../common/Select';

interface FilterSelectProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  options: Array<{ value: string; label: string }>;
}

export const FilterSelect = ({ value, onChange, label, options }: FilterSelectProps) => {
  return (
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      label={label}
      className="bg-white"
    >
      <option value="">الكل</option>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
};