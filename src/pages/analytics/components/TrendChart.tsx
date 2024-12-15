import React from 'react';
import { Line } from 'react-chartjs-2';
import { useStore } from '../../../store/useStore';
import { getTrendAnalysis } from '../../../utils/analytics/trendAnalysis';
import './ChartConfig';

export const TrendChart = () => {
  const complaints = useStore((state) => state.complaints);
  const trendData = getTrendAnalysis(complaints);

  const data = {
    labels: trendData.map(d => d.month),
    datasets: [
      {
        label: 'إجمالي البلاغات',
        data: trendData.map(d => d.total),
        borderColor: 'rgb(43, 62, 137)',
        backgroundColor: 'rgba(0, 128, 128, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'البلاغات المغلقة',
        data: trendData.map(d => d.closed),
        borderColor: 'rgb(198, 47, 60)',
        backgroundColor: 'rgba(196, 164, 132, 0.1)',
        fill: true,
        tension: 0.4,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
    },
    scales: {
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
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            family: 'Noto Sans Arabic'
          }
        }
      }
    }
  };

  return <Line data={data} options={options} />;
};