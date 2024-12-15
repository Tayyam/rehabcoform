import React from 'react';
import { useTeamStore } from '../../store/useTeamStore';
import { useAuthStore } from '../../store/useAuthStore';
import { TeamMemberCard } from './TeamMemberCard';
import { LoadingSpinner } from '../common/LoadingSpinner';

export const TeamList = () => {
  const { users, loading, deleteUser } = useTeamStore();
  const currentUser = useAuthStore(state => state.user);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  if (!users.length) {
    return (
      <div className="text-center text-gray-500 py-12">
        <p>لا يوجد أعضاء في الفريق حالياً</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.map((user) => (
        <TeamMemberCard
          key={user.id}
          user={user}
          onDelete={deleteUser}
          currentUserId={currentUser?.id || ''}
        />
      ))}
    </div>
  );
};