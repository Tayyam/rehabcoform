import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useStore } from '../../../store/useStore';
import { getMonthlyStats } from '../../../services/reports';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const ComplaintsChart = () => {
  const complaints = useStore((state) => state.complaints);
  const monthlyStats = getMonthlyStats(complaints);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        align: 'end' as const,
        rtl: true,
        labels: {
          font: {
            family: 'Noto Sans Arabic'
          }
        }
      },
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

  const data = {
    labels: monthlyStats.map(stat => stat.month),
    datasets: [
      {
        label: 'إجمالي الشكاوى',
        data: monthlyStats.map(stat => stat.total),
        backgroundColor: 'rgba(43, 62, 137, 0.2)',
        borderColor: 'rgb(43, 62, 137)',
        borderWidth: 2,
        borderRadius: 4,
      },
      {
        label: 'الشكاوى المغلقة',
        data: monthlyStats.map(stat => stat.closed),
        backgroundColor: 'rgba(198, 47, 60, 0.2)',
        borderColor: 'rgb(198, 47, 60)',
        borderWidth: 2,
        borderRadius: 4,
      }
    ],
  };

  return <Bar options={options} data={data} />;
};