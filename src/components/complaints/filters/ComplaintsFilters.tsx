import React, { useState } from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import { useAuthStore } from '../../../store/useAuthStore';
import { cn } from '../../../utils/cn';
import { FilterButton } from './FilterButton';
import { FilterSelect } from './FilterSelect';
import { 
  categoryOptions, 
  statusOptions, 
  deliveryMethodOptions,
  complaintTypeOptions 
} from '../../../utils/filters';
import { getActiveFiltersCount } from '../../../utils/filters';

interface ComplaintsFiltersProps {
  filters: {
    category: string;
    status: string;
    deliveryMethod: string;
    createdBy: string;
    type: string;
  };
  onFilterChange: (key: string, value: string) => void;
  onClearFilters: () => void;
}

export const ComplaintsFilters = ({ 
  filters, 
  onFilterChange,
  onClearFilters 
}: ComplaintsFiltersProps) => {
  const users = useAuthStore(state => state.users);
  const [isExpanded, setIsExpanded] = useState(false);
  const activeFiltersCount = getActiveFiltersCount(filters);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-6 overflow-hidden">
      <div 
        className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="p-2 bg-primary-main/10 rounded-lg">
            <Filter className="w-5 h-5 text-primary-main" />
          </div>
          <div>
            <h3 className="font-medium">تصفية البلاغات</h3>
            {activeFiltersCount > 0 && (
              <p className="text-sm text-gray-500 mt-1">
                {activeFiltersCount} من عوامل التصفية نشطة
              </p>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <FilterButton count={activeFiltersCount} onClear={onClearFilters} />
          <ChevronDown className={cn(
            "w-5 h-5 text-gray-400 transition-transform duration-200",
            isExpanded && "transform rotate-180"
          )} />
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <FilterSelect
              value={filters.type}
              onChange={(value) => onFilterChange('type', value)}
              label="نوع البلاغ"
              options={complaintTypeOptions}
            />

            <FilterSelect
              value={filters.category}
              onChange={(value) => onFilterChange('category', value)}
              label="التصنيف"
              options={categoryOptions}
            />

            <FilterSelect
              value={filters.status}
              onChange={(value) => onFilterChange('status', value)}
              label="الحالة"
              options={statusOptions}
            />

            <FilterSelect
              value={filters.deliveryMethod}
              onChange={(value) => onFilterChange('deliveryMethod', value)}
              label="طريقة الاستلام"
              options={deliveryMethodOptions}
            />

            <FilterSelect
              value={filters.createdBy}
              onChange={(value) => onFilterChange('createdBy', value)}
              label="تم الإنشاء بواسطة"
              options={[
                { value: 'visitor', label: 'زائر' },
                ...users.map(user => ({ value: user.id, label: user.name }))
              ]}
            />
          </div>
        </div>
      )}
    </div>
  );
};