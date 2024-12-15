import React, { useState, useEffect } from 'react';
import { UserPlus } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { TeamList } from './components/TeamList';
import { AddUserModal } from './components/AddUserModal';
import { useTranslation } from '../../hooks/useTranslation';
import { useAuthStore } from '../../store/useAuthStore';
import { useTeamStore } from '../../store/useTeamStore';
import { SuccessNotification } from '../../components/common/SuccessNotification';

export const TeamPage = () => {
  const { t } = useTranslation();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const user = useAuthStore(state => state.user);
  const { fetchUsers, deleteUser } = useTeamStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUser(userId);
      setSuccessMessage('تم حذف العضو بنجاح');
      setShowSuccess(true);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{t('team.title')}</h1>
        {user?.role === 'admin' && (
          <Button 
            variant="primary" 
            size="sm" 
            className="flex items-center"
            onClick={() => setShowAddModal(true)}
          >
            <UserPlus className="w-4 h-4 ml-2" />
            {t('team.addMember')}
          </Button>
        )}
      </div>

      <Card className="p-6">
        <TeamList onDeleteUser={handleDeleteUser} />
      </Card>

      {showAddModal && (
        <AddUserModal 
          onClose={() => setShowAddModal(false)}
          onSuccess={() => {
            fetchUsers();
            setShowAddModal(false);
            setSuccessMessage('تم إضافة العضو بنجاح');
            setShowSuccess(true);
          }}
        />
      )}

      {showSuccess && (
        <SuccessNotification
          message={successMessage}
          onClose={() => setShowSuccess(false)}
        />
      )}
    </div>
  );
};