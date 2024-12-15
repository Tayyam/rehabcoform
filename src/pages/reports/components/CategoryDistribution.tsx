import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useStore } from '../../../store/useStore';
import { useTranslation } from '../../../hooks/useTranslation';
import { getCategoryDistribution } from '../../../services/reports';

ChartJS.register(ArcElement, Tooltip, Legend);

export const CategoryDistribution = () => {
  const { t } = useTranslation();
  const complaints = useStore((state) => state.complaints);
  const distribution = getCategoryDistribution(complaints);

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
    },
    cutout: '60%'
  };

  const data = {
    labels: Object.keys(distribution).map(key => t(`categories.${key}`)),
    datasets: [
      {
        data: Object.values(distribution),
        backgroundColor: [
          'rgba(43, 62, 137, 0.8)',
          'rgba(198, 47, 60, 0.8)',
          'rgba(60, 79, 164, 0.8)',
          'rgba(33, 44, 108, 0.8)',
          'rgba(43, 62, 137, 0.8)',
        ],
        borderColor: [
          'rgb(43, 62, 137)',
          'rgb(198, 47, 60)',
          'rgb(60, 79, 164)',
          'rgb(33, 44, 108)',
          'rgb(43, 62, 137)',
        ],
        borderWidth: 2,
      },
    ],
  };

  return <Doughnut data={data} options={options} />;
};
