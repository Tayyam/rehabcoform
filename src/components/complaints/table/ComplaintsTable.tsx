import React, { useState, useMemo } from 'react';
import { useStore } from '../../../store/useStore';
import { useAuthStore } from '../../../store/useAuthStore';
import { ComplaintsTableHeader } from './ComplaintsTableHeader';
import { ComplaintsTableRow } from './ComplaintsTableRow';
import { ComplaintsTablePagination } from './ComplaintsTablePagination';
import { Card } from '../../common/Card';
import { filterVisibleComplaints } from '../../../utils/complaints';

interface ComplaintsTableProps {
  searchQuery?: string;
  filters?: {
    category: string;
    status: string;
    deliveryMethod: string;
    createdBy: string;
    type: string;
  };
}

export const ComplaintsTable = ({ searchQuery, filters }: ComplaintsTableProps) => {
  const complaints = useStore((state) => state.complaints);
  const user = useAuthStore((state) => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Get visible complaints and filter based on search query and filters
  const filteredComplaints = useMemo(() => {
    let visibleComplaints = filterVisibleComplaints(complaints, user);

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      visibleComplaints = visibleComplaints.filter(complaint => 
        complaint.id.toLowerCase().includes(query) ||
        complaint.pilgrimName.toLowerCase().includes(query) ||
        (complaint.passportNumber && complaint.passportNumber.toLowerCase().includes(query)) ||
        (complaint.phoneNumber && complaint.phoneNumber.toLowerCase().includes(query))
      );
    }

    if (filters) {
      if (filters.type) {
        visibleComplaints = visibleComplaints.filter(c => c.type === filters.type);
      }
      if (filters.category) {
        visibleComplaints = visibleComplaints.filter(c => c.category === filters.category);
      }
      if (filters.status) {
        visibleComplaints = visibleComplaints.filter(c => c.status === filters.status);
      }
      if (filters.deliveryMethod) {
        visibleComplaints = visibleComplaints.filter(c => c.deliveryMethod === filters.deliveryMethod);
      }
      if (filters.createdBy) {
        if (filters.createdBy === 'visitor') {
          visibleComplaints = visibleComplaints.filter(c => !c.createdBy || c.createdBy === 'visitor');
        } else {
          visibleComplaints = visibleComplaints.filter(c => c.createdBy === filters.createdBy);
        }
      }
    }

    return visibleComplaints;
  }, [complaints, searchQuery, user, filters]);

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredComplaints.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentComplaints = filteredComplaints.slice(startIndex, endIndex);

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <ComplaintsTableHeader />
          <tbody className="bg-white divide-y divide-gray-200">
            {currentComplaints.map((complaint) => (
              <ComplaintsTableRow key={complaint.id} complaint={complaint} />
            ))}
            {currentComplaints.length === 0 && (
              <tr>
                <td colSpan={9} className="px-6 py-12 text-center text-gray-500">
                  {searchQuery || (filters && Object.values(filters).some(v => v)) 
                    ? 'لا توجد نتائج للبحث' 
                    : 'لا توجد بلاغات لعرضها'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {filteredComplaints.length > itemsPerPage && (
        <ComplaintsTablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={filteredComplaints.length}
          itemsPerPage={itemsPerPage}
          startIndex={startIndex}
          endIndex={Math.min(endIndex, filteredComplaints.length)}
        />
      )}
    </Card>
  );
};