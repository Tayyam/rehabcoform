import React from 'react';
import { useStore } from '../store/useStore';
import { BarChart3, Users, Clock, CheckCircle } from 'lucide-react';

export const DashboardStats = () => {
  const complaints = useStore((state) => state.complaints);
  
  const stats = {
    total: complaints.length,
    open: complaints.filter((c) => c.status === 'open').length,
    inProgress: complaints.filter((c) => c.status === 'in-progress').length,
    closed: complaints.filter((c) => c.status === 'closed').length,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <StatCard
        title="Total Complaints"
        value={stats.total}
        icon={<BarChart3 className="w-8 h-8 text-blue-500" />}
        color="bg-blue-50"
      />
      <StatCard
        title="Open"
        value={stats.open}
        icon={<Users className="w-8 h-8 text-yellow-500" />}
        color="bg-yellow-50"
      />
      <StatCard
        title="In Progress"
        value={stats.inProgress}
        icon={<Clock className="w-8 h-8 text-orange-500" />}
        color="bg-orange-50"
      />
      <StatCard
        title="Closed"
        value={stats.closed}
        icon={<CheckCircle className="w-8 h-8 text-green-500" />}
        color="bg-green-50"
      />
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

const StatCard = ({ title, value, icon, color }: StatCardProps) => (
  <div className={`${color} p-6 rounded-lg shadow-sm`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>
      {icon}
    </div>
  </div>
);