import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useStore } from '../../../store/useStore';
import { getResponseTimeAnalysis } from '../../../utils/analytics/responseTimeAnalysis';
import './ChartConfig';

export const ResponseTimeAnalysis = () => {
  const complaints = useStore((state) => state.complaints);
  const responseData = getResponseTimeAnalysis(complaints);

  const data = {
    labels: ['< 24 ساعة', '24-48 ساعة', '2-5 أيام', '> 5 أيام'],
    datasets: [
      {
        label: 'عدد البلاغات',
        data: [
          responseData.lessThan24h,
          responseData.between24and48h,
          responseData.between2and5d,
          responseData.moreThan5d,
        ],
        backgroundColor: 'rgba(43, 62, 137, 0.5)',
        borderColor: 'rgb(43, 62, 137)',
        borderWidth: 1,
        borderRadius: 4,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
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

  return <Bar data={data} options={options} />;
};