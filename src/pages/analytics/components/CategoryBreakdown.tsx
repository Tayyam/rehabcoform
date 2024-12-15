import React from 'react';
import { Pie } from 'react-chartjs-2';
import { useStore } from '../../../store/useStore';
import { getCategoryAnalysis } from '../../../utils/analytics/categoryAnalysis';
import { useTranslation } from '../../../hooks/useTranslation';
import './ChartConfig';

export const CategoryBreakdown = () => {
  const { t } = useTranslation();
  const complaints = useStore((state) => state.complaints);
  const categoryData = getCategoryAnalysis(complaints);

  const data = {
    labels: Object.keys(categoryData).map(cat => t(`categories.${cat}`)),
    datasets: [
      {
        data: Object.values(categoryData),
        backgroundColor: [
          'rgba(43, 62, 137, 0.8)', // اللون الجديد 1
          'rgba(198, 47, 60, 0.8)', // اللون الجديد 2
          'rgba(60, 79, 164, 0.8)', // اللون الجديد 3
          'rgba(33, 44, 108, 0.8)', // اللون الجديد 4
          'rgba(43, 62, 137, 0.8)', // اللون الجديد 5
        ],
        borderWidth: 1,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        rtl: true,
        labels: {
          font: {
            family: 'Noto Sans Arabic'
          }
        }
      }
    }
  };

  return <Pie data={data} options={options} />;
};
