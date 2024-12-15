import React from 'react';
import { ComplaintsTable } from './table/ComplaintsTable';

interface ComplaintsListProps {
  searchQuery?: string;
  filters?: {
    category: string;
    status: string;
    deliveryMethod: string;
    createdBy: string;
  };
}

export const ComplaintsList = ({ searchQuery, filters }: ComplaintsListProps) => {
  return <ComplaintsTable searchQuery={searchQuery} filters={filters} />;
};