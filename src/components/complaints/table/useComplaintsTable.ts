import { useState, useMemo } from 'react';
import { useComplaints } from '../../../hooks/useComplaints';

export const useComplaintsTable = (searchQuery?: string) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const { complaints, loading, error, isEmpty } = useComplaints(searchQuery);

  const paginatedComplaints = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return complaints.slice(startIndex, endIndex);
  }, [complaints, currentPage]);

  const totalPages = Math.ceil(complaints.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, complaints.length);

  return {
    complaints: paginatedComplaints,
    pagination: {
      currentPage,
      totalPages,
      startIndex,
      endIndex,
      totalItems: complaints.length,
      itemsPerPage,
      onPageChange: setCurrentPage,
    },
    loading,
    error,
    isEmpty,
  };
};