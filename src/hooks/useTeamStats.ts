import { useMemo } from 'react';
import { useStore } from '../store/useStore';
import { useAuthStore } from '../store/useAuthStore';
import { calculateTeamStats } from '../utils/teamStats';

export const useTeamStats = () => {
  const complaints = useStore((state) => state.complaints);
  const users = useAuthStore((state) => state.getUsers());

  return useMemo(() => 
    calculateTeamStats(complaints, users),
    [complaints, users]
  );
};