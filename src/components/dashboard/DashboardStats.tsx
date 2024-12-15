import React from 'react';
import { BarChart3, Users, Clock, CheckCircle } from 'lucide-react';
import { StatCard } from './stats/StatCard';
import { useTranslation } from '../../hooks/useTranslation';
import { Card } from '../common/Card';
import { useStats } from '../../hooks/useStats';

export const DashboardStats = () => {
  const stats = useStats();
  const { t } = useTranslation();

  return (
    <Card className="p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title={t('stats.totalComplaints')}
          value={stats.total}
          icon={<BarChart3 className="w-8 h-8 text-primary-main" />}
          trend={10}
        />
        <StatCard
          title={t('stats.open')}
          value={stats.byStatus('open')}
          icon={<Users className="w-8 h-8 text-primary-main" />}
          trend={-5}
        />
        <StatCard
          title={t('stats.inProgress')}
          value={stats.byStatus('in-progress')}
          icon={<Clock className="w-8 h-8 text-primary-main" />}
          trend={15}
        />
        <StatCard
          title={t('stats.closed')}
          value={stats.byStatus('closed')}
          icon={<CheckCircle className="w-8 h-8 text-primary-main" />}
          trend={20}
        />
      </div>
    </Card>
  );
};