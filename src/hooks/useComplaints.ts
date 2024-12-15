import { useEffect } from 'react';
import { useStore } from '../store/useStore';
import { useAuthStore } from '../store/useAuthStore';
import { filterVisibleComplaints } from '../utils/complaints';

export const useComplaints = (searchQuery?: string) => {
  const { complaints, loading, error, fetchComplaints } = useStore();
  const user = useAuthStore(state => state.user);

  useEffect(() => {
    fetchComplaints();
  }, [fetchComplaints]);

  const visibleComplaints = filterVisibleComplaints(complaints, user);
  const filteredComplaints = searchQuery 
    ? visibleComplaints.filter(complaint => 
        complaint.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        complaint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        complaint.pilgrimName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : visibleComplaints;

  return {
    complaints: filteredComplaints,
    loading,
    error,
    isEmpty: !loading && filteredComplaints.length === 0,
    isLoading: loading && filteredComplaints.length === 0,
  };
};