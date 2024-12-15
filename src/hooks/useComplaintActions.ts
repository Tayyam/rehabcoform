import { useState } from 'react';
import { useStore } from '../store/useStore';
import { ComplaintStatus } from '../types';

export const useComplaintActions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { updateComplaintStatus, deleteComplaint } = useStore();

  const handleStatusUpdate = async (id: string, status: ComplaintStatus) => {
    setLoading(true);
    setError(null);
    try {
      await updateComplaintStatus(id, status);
    } catch (error) {
      setError('Failed to update complaint status');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteComplaint(id);
    } catch (error) {
      setError('Failed to delete complaint');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    updateStatus: handleStatusUpdate,
    deleteComplaint: handleDelete,
    loading,
    error,
  };
};