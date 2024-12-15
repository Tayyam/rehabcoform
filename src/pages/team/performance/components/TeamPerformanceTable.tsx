import React from 'react';
import { useStore } from '../../../../store/useStore';
import { useAuthStore } from '../../../../store/useAuthStore';
import { calculateTeamStats } from '../../../../utils/teamStats';

export const TeamPerformanceTable = () => {
  const complaints = useStore(state => state.complaints);
  const users = useAuthStore(state => state.users);
  const stats = calculateTeamStats(complaints, users);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              اسم الموظف
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              الشكاوى المنشأة
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              الشكاوى المغلقة
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              متوسط وقت الإغلاق
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              نسبة النجاح
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {stats.teamPerformance.map((member) => (
            <tr key={member.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{member.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {member.createdCount}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {member.closedCount}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {member.avgClosureTime} ساعة
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-1 h-2 bg-gray-100 rounded-full">
                    <div 
                      className="h-2 bg-primary-main rounded-full" 
                      style={{ width: `${member.successRate}%` }}
                    />
                  </div>
                  <span className="ml-2 text-sm text-gray-500">
                    {member.successRate}%
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};