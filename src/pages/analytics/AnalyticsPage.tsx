import React from 'react';
import { BarChart2, TrendingUp, Users, Clock } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { TrendChart } from './components/TrendChart';
import { CategoryBreakdown } from './components/CategoryBreakdown';
import { ResponseTimeAnalysis } from './components/ResponseTimeAnalysis';
import { UserPerformanceMatrix } from './components/UserPerformanceMatrix';
import { useTranslation } from '../../hooks/useTranslation';

export const AnalyticsPage = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">تحليل البيانات</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold">تحليل الاتجاهات</h2>
              <p className="text-sm text-gray-500 mt-1">تطور البلاغات خلال الفترة الزمنية</p>
            </div>
            <TrendingUp className="w-5 h-5 text-secondary-main" />
          </div>
          <div className="h-[300px]">
            <TrendChart />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold">توزيع التصنيفات</h2>
              <p className="text-sm text-gray-500 mt-1">نسب البلاغات حسب التصنيف</p>
            </div>
            <BarChart2 className="w-5 h-5 text-secondary-main" />
          </div>
          <div className="h-[300px]">
            <CategoryBreakdown />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold">تحليل وقت الاستجابة</h2>
              <p className="text-sm text-gray-500 mt-1">متوسط وقت معالجة البلاغات</p>
            </div>
            <Clock className="w-5 h-5 text-secondary-main" />
          </div>
          <div className="h-[300px]">
            <ResponseTimeAnalysis />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold">أداء الموظفين</h2>
              <p className="text-sm text-gray-500 mt-1">تحليل إنتاجية فريق العمل</p>
            </div>
            <Users className="w-5 h-5 text-secondary-main" />
          </div>
          <div className="h-[300px]">
            <UserPerformanceMatrix />
          </div>
        </Card>
      </div>
    </div>
  );
};
