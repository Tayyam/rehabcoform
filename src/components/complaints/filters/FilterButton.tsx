import React from 'react';
import { X } from 'lucide-react';
import { Button } from '../../common/Button';

interface FilterButtonProps {
  count: number;
  onClear: () => void;
}

export const FilterButton = ({ count, onClear }: FilterButtonProps) => {
  if (count === 0) return null;

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={(e) => {
        e.stopPropagation();
        onClear();
      }}
      className="text-gray-600"
    >
      <X className="w-4 h-4 ml-1" />
      مسح التصفية
    </Button>
  );
};