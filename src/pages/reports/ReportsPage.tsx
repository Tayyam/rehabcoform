import React from 'react';
import { BarChart, PieChart, Calendar, Download, Filter } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { ComplaintsChart } from './components/ComplaintsChart';
import { CategoryDistribution } from './components/CategoryDistribution';
import { StatsCards } from './components/StatsCards';
import { useTranslation } from '../../hooks/useTranslation';

export const ReportsPage = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{t('reports.title')}</h1>
        <div className="flex gap-4">
          <Button variant="outline" size="sm" className="flex items-center">
            <Filter className="w-4 h-4 ml-2" />
            {t('reports.filterByDate')}
          </Button>
          <Button variant="primary" size="sm" className="flex items-center">
            <Download className="w-4 h-4 ml-2" />
            {t('reports.export')}
          </Button>
        </div>
      </div>

      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 mt-8">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold">{t('reports.monthlyComplaints')}</h2>
              <p className="text-sm text-gray-500 mt-1">آخر 6 أشهر</p>
            </div>
            <BarChart className="w-5 h-5 text-primary-main" />
          </div>
          <div className="h-[300px]">
            <ComplaintsChart />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold">{t('reports.categoryDistribution')}</h2>
              <p className="text-sm text-gray-500 mt-1">توزيع الشكاوى حسب التصنيف</p>
            </div>
            <PieChart className="w-5 h-5 text-primary-main" />
          </div>
          <div className="h-[300px] flex items-center justify-center">
            <CategoryDistribution />
          </div>
        </Card>
      </div>
    </div>
  );
};