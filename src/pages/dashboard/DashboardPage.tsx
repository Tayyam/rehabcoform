import React, { useState } from 'react';
import { DashboardStats } from '../../components/dashboard/DashboardStats';
import { ComplaintsList } from '../../components/complaints/ComplaintsList';
import { AddComplaintButton } from '../../components/complaints/AddComplaintButton';
import { ComplaintsFilters } from '../../components/complaints/filters/ComplaintsFilters';
import { useTranslation } from '../../hooks/useTranslation';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Search, Download, RefreshCw, Trash2 } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { useAuthStore } from '../../store/useAuthStore';
import { useFiltersStore } from '../../store/useFiltersStore';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { exportComplaintsToCSV } from '../../utils/export';
import { ImportComplaintsButton } from '../../components/complaints/ImportComplaintsButton';

export const DashboardPage = () => {
  const { t } = useTranslation();
  const user = useAuthStore(state => state.user);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const complaints = useStore(state => state.complaints);
  const deleteAllComplaints = useStore(state => state.deleteAllComplaints);
  const { filters, setFilter, clearFilters } = useFiltersStore();

  const handleDeleteAll = async () => {
    setIsDeleting(true);
    try {
      await deleteAllComplaints();
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error('Error deleting all complaints:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleExport = () => {
    exportComplaintsToCSV(complaints);
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilter(key, value);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {t('general.dashboard')}
        </h1>
        <AddComplaintButton />
      </div>

      <DashboardStats />

      <div className="mt-8 space-y-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[300px]">
            <Input
              placeholder="ابحث برقم المتابعة أو اسم الحاج أو رقم جواز السفر أو رقم الهاتف..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-lg"
              icon={<Search className="w-5 h-5 text-gray-400" />}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={handleExport}
              className="flex items-center"
            >
              <Download className="w-4 h-4 ml-2" />
              تصدير التقرير
            </Button>

            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              className="flex items-center"
            >
              <RefreshCw className="w-4 h-4 ml-2" />
              تحديث
            </Button>

            <ImportComplaintsButton />

            {user?.role === 'admin' && complaints.length > 0 && (
              <Button
                variant="outline"
                className="text-red-600 hover:text-red-700 border-red-300 hover:bg-red-50 flex items-center"
                onClick={() => setShowDeleteConfirm(true)}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <LoadingSpinner />
                ) : (
                  <>
                    <Trash2 className="w-4 h-4 ml-2" />
                    حذف جميع البلاغات
                  </>
                )}
              </Button>
            )}
          </div>
        </div>

        <ComplaintsFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={clearFilters}
        />

        <ComplaintsList searchQuery={searchQuery} filters={filters} />
      </div>

      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDeleteAll}
        title="حذف جميع البلاغات"
        message="هل أنت متأكد من حذف جميع البلاغات؟ لا يمكن التراجع عن هذا الإجراء."
        type="danger"
        confirmText="حذف الكل"
        cancelText="إلغاء"
      />
    </div>
  );
};