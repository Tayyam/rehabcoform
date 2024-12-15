import React from 'react';
import { Card } from '../../../components/common/Card';
import { useStore } from '../../../store/useStore';
import { useTranslation } from '../../../hooks/useTranslation';
import { getPerformanceMetrics } from '../../../services/reports';
import { TrendingUp, TrendingDown, Clock, CheckCircle2, AlertCircle, BarChart2 } from 'lucide-react';

export const StatsCards = () => {
  const { t } = useTranslation();
  const complaints = useStore((state) => state.complaints);
  const metrics = getPerformanceMetrics(complaints);

  const stats = [
    {
      title: 'إجمالي الشكاوى',
      value: complaints.length,
      trend: 12,
      icon: <BarChart2 className="w-8 h-8" />,
      color: 'bg-primary-main/10',
      textColor: 'text-primary-main',
    },
    {
      title: 'معدل الحل',
      value: `${Math.round(metrics.resolutionRate)}%`,
      trend: 8,
      icon: <CheckCircle2 className="w-8 h-8" />,
      color: 'bg-green-50',
      textColor: 'text-green-800',
    },
    {
      title: 'متوسط وقت الحل',
      value: `${metrics.avgResolutionTime} يوم`,
      trend: -5,
      icon: <Clock className="w-8 h-8" />,
      color: 'bg-blue-50',
      textColor: 'text-blue-800',
    },
    {
      title: 'الشكاوى المفتوحة',
      value: complaints.filter(c => c.status === 'open').length,
      trend: 15,
      icon: <AlertCircle className="w-8 h-8" />,
      color: 'bg-yellow-50',
      textColor: 'text-yellow-800',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className={`${stat.color} p-6`}>
          <div className="flex items-center justify-between mb-4">
            <div className={`${stat.textColor}`}>
              {stat.icon}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="text-sm text-gray-600">{stat.title}</div>
            <div className={`text-2xl font-bold mt-2 ${stat.textColor}`}>
              {stat.value}
            </div>
            <div className="flex items-center mt-4">
              {stat.trend > 0 ? (
                <TrendingUp className="w-4 h-4 text-green-500 ml-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500 ml-1" />
              )}
              <span className={stat.trend > 0 ? 'text-green-500' : 'text-red-500'}>
                {Math.abs(stat.trend)}% مقارنة بالشهر السابق
              </span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};