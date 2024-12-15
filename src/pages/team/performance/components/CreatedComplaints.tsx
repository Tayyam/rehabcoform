import React from 'react';
import { Card } from '../../../../components/common/Card';
import { useTeamStats } from '../../../../hooks/useTeamStats';
import { Bar } from 'react-chartjs-2';

export const CreatedComplaints = () => {
  const { createdComplaintsByMember } = useTeamStats();

  const chartData = {
    labels: createdComplaintsByMember.map(item => item.name),
    datasets: [
      {
        label: 'الشكاوى المنشأة',
        data: createdComplaintsByMember.map(item => item.count),
        backgroundColor: 'rgba(43, 62, 137, 0.2)',
        borderColor: 'rgb(43, 62, 137)',
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
        display: false
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#f3f4f6'
        }
      }
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-6">الشكاوى المنشأة</h2>
      <div className="h-[300px]">
        <Bar data={chartData} options={options} />
      </div>
    </Card>
  );
};