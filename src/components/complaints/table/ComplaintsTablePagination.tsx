import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '../../common/Button';

interface ComplaintsTablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
  startIndex: number;
  endIndex: number;
}

export const ComplaintsTablePagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  startIndex,
  endIndex,
}: ComplaintsTablePaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  // Show only a window of pages
  const getVisiblePages = () => {
    if (totalPages <= 3) return pages;
    
    if (currentPage <= 2) return [...pages.slice(0, 3), '...', totalPages];
    if (currentPage >= totalPages - 1) return [1, '...', ...pages.slice(-3)];
    
    return [
      1,
      '...',
      currentPage,
      '...',
      totalPages,
    ];
  };

  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <Button
          variant="outline"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          size="sm"
        >
          السابق
        </Button>
        <Button
          variant="outline"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          size="sm"
        >
          التالي
        </Button>
      </div>
      
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            عرض{' '}
            <span className="font-medium">{startIndex + 1}</span>
            {' '}-{' '}
            <span className="font-medium">{endIndex}</span>
            {' '}من{' '}
            <span className="font-medium">{totalItems}</span>
            {' '}نتيجة
          </p>
        </div>
        
        <div>
          <nav className="relative z-0 inline-flex rounded-lg shadow-sm -space-x-px rtl:space-x-reverse" aria-label="Pagination">
            <Button
              variant="outline"
              className="relative inline-flex items-center px-3 py-2 rounded-r-lg border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <span className="sr-only">السابق</span>
              <ChevronRight className="h-5 w-5" />
            </Button>
            
            {getVisiblePages().map((page, index) => (
              <React.Fragment key={index}>
                {page === '...' ? (
                  <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                    ...
                  </span>
                ) : (
                  <Button
                    variant={currentPage === page ? 'primary' : 'outline'}
                    onClick={() => onPageChange(page as number)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      currentPage === page 
                        ? 'z-10 bg-primary-main border-primary-main text-white hover:bg-primary-dark'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </Button>
                )}
              </React.Fragment>
            ))}
            
            <Button
              variant="outline"
              className="relative inline-flex items-center px-3 py-2 rounded-l-lg border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <span className="sr-only">التالي</span>
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </nav>
        </div>
      </div>
    </div>
  );
};