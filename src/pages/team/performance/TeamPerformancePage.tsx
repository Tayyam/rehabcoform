import React, { useEffect } from 'react';
import { Download } from 'lucide-react';
import { Card } from '../../../components/common/Card';
import { Button } from '../../../components/common/Button';
import { TeamKPIs } from './components/TeamKPIs';
import { ComplaintsChart } from './components/ComplaintsChart';
import { TeamPerformanceTable } from './components/TeamPerformanceTable';
import { useStore } from '../../../store/useStore';
import { useAuthStore } from '../../../store/useAuthStore';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner';
import { exportTeamReport } from '../../../services/reports/teamReports';

export const TeamPerformancePage = () => {
  const fetchComplaints = useStore(state => state.fetchComplaints);
  const fetchUsers = useAuthStore(state => state.fetchUsers);
  const loading = useStore(state => state.loading);
  const userLoading = useAuthStore(state => state.loading);

  useEffect(() => {
    fetchComplaints();
    fetchUsers();
  }, [fetchComplaints, fetchUsers]);

  const handleExport = async () => {
    try {
      await exportTeamReport();
    } catch (error) {
      console.error('Error exporting team report:', error);
    }
  };

  if (loading || userLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center py-12">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">أداء فريق العمل</h1>
        <Button 
          variant="primary" 
          size="sm" 
          className="flex items-center"
          onClick={handleExport}
        >
          <Download className="w-4 h-4 ml-2" />
          تصدير التقرير
        </Button>
      </div>

      <div className="space-y-8">
        <TeamKPIs />
        
        <ComplaintsChart />

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-6">ملخص أداء الفريق</h2>
          <TeamPerformanceTable />
        </Card>
      </div>
    </div>
  );
};