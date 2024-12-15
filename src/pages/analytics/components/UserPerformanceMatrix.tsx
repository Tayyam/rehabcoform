import React from 'react';
import { Radar } from 'react-chartjs-2';
import { useStore } from '../../../store/useStore';
import { useAuthStore } from '../../../store/useAuthStore';
import { getUserPerformanceAnalysis } from '../../../utils/analytics/userPerformanceAnalysis';
import './ChartConfig';

export const UserPerformanceMatrix = () => {
  const complaints = useStore((state) => state.complaints);
  const users = useAuthStore((state) => state.users);
  const performanceData = getUserPerformanceAnalysis(complaints, users);

  const data = {
    labels: ['معدل الإنجاز', 'سرعة الاستجابة', 'رضا العملاء', 'جودة الحل', 'كفاءة العمل'],
    datasets: performanceData.map((user, index) => ({
      label: user.name,
      data: [
        user.completionRate,
        user.responseSpeed,
        user.satisfaction,
        user.solutionQuality,
        user.efficiency
      ],
      backgroundColor: `rgba(43, 62, 137, ${0.2 + (index * 0.1)})`,
      borderColor: `rgb(198, 47, 60)`,
      borderWidth: 1,
      pointBackgroundColor: 'rgb(198, 47, 60)',
      
    }))
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
          font: {
            family: 'Noto Sans Arabic'
          }
        },
        pointLabels: {
          font: {
            family: 'Noto Sans Arabic'
          }
        }
      }
    },
    plugins: {
      legend: {
        position: 'top' as const,
        rtl: true,
        labels: {
          font: {
            family: 'Noto Sans Arabic'
          }
        }
      }
    }
  };

  return <Radar data={data} options={options} />;
};