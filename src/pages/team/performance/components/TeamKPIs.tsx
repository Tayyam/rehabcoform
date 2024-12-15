import React from 'react';
import { Card } from '../../../../components/common/Card';
import { useStore } from '../../../../store/useStore';
import { useAuthStore } from '../../../../store/useAuthStore';
import { calculateTeamStats } from '../../../../utils/teamStats';
import { Clock, CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react';

export const TeamKPIs = () => {
  const complaints = useStore(state => state.complaints);
  const users = useAuthStore(state => state.users);
  const stats = calculateTeamStats(complaints, users);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">المهام المنجزة</p>
            <p className="text-2xl font-bold mt-1 text-primary-main">
              {stats.completedTasks}
            </p>
          </div>
          <div className="p-3 bg-primary-main/10 rounded-full">
            <CheckCircle className="w-8 h-8 text-primary-main" />
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm text-green-500">
          <TrendingUp className="w-4 h-4 ml-1" />
          {stats.completionRate}% معدل الإنجاز
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">متوسط وقت الاستجابة</p>
            <p className="text-2xl font-bold mt-1 text-primary-main">
              {stats.avgResponseTime} ساعة
            </p>
          </div>
          <div className="p-3 bg-primary-main/10 rounded-full">
            <Clock className="w-8 h-8 text-primary-main" />
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm text-green-500">
          <TrendingUp className="w-4 h-4 ml-1" />
          تحسن بنسبة 15% عن الشهر السابق
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">نسبة النجاح</p>
            <p className="text-2xl font-bold mt-1 text-primary-main">
              {stats.successRate}%
            </p>
          </div>
          <div className="p-3 bg-primary-main/10 rounded-full">
            <TrendingUp className="w-8 h-8 text-primary-main" />
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm text-green-500">
          <TrendingUp className="w-4 h-4 ml-1" />
          تحسن بنسبة 8% عن الشهر السابق
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">المهام المعلقة</p>
            <p className="text-2xl font-bold mt-1 text-primary-main">
              {stats.pendingTasks}
            </p>
          </div>
          <div className="p-3 bg-primary-main/10 rounded-full">
            <AlertTriangle className="w-8 h-8 text-primary-main" />
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm text-red-500">
          <TrendingUp className="w-4 h-4 ml-1" />
          زيادة بنسبة 5% عن الشهر السابق
        </div>
      </Card>
    </div>
  );
};