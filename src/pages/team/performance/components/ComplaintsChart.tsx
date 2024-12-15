import React from 'react';
import { Card } from '../../../../components/common/Card';
import { useStore } from '../../../../store/useStore';
import { useAuthStore } from '../../../../store/useAuthStore';
import { calculateTeamStats } from '../../../../utils/teamStats';
import { Bar } from 'react-chartjs-2';

export const ComplaintsChart = () => {
  const complaints = useStore(state => state.complaints);
  const users = useAuthStore(state => state.users);
  const stats = calculateTeamStats(complaints, users);

  const chartData = {
    labels: stats.teamPerformance.map(member => member.name),
    datasets: [
      {
        label: 'الشكاوى المنشأة',
        data: stats.teamPerformance.map(member => member.createdCount),
        backgroundColor: 'rgba(43, 62, 137, 0.2)',
        borderColor: 'rgb(43, 62, 137)',
        borderWidth: 2,
        borderRadius: 4,
      },
      {
        label: 'الشكاوى المغلقة',
        data: stats.teamPerformance.map(member => member.closedCount),
        backgroundColor: 'rgba(198, 47, 60, 0.2)',
        borderColor: 'rgb(198, 47, 60)',
        borderWidth: 2,
        borderRadius: 4,
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        align: 'center' as const,
        rtl: true,
        labels: {
          font: {
            family: 'Noto Sans Arabic'
          },
          padding: 20
        }
      },
      tooltip: {
        rtl: true,
        titleAlign: 'right' as const,
        bodyAlign: 'right' as const,
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            family: 'Noto Sans Arabic'
          }
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#f3f4f6'
        },
        ticks: {
          font: {
            family: 'Noto Sans Arabic'
          }
        }
      }
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-6">إحصائيات الشكاوى حسب الموظف</h2>
      <div className="h-[400px]">
        <Bar data={chartData} options={options} />
      </div>
    </Card>
  );
};
