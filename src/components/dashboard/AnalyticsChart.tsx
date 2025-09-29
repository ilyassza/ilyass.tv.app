'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ChartData {
  labels: string[];
  downloads: number[];
  visitors: number[];
}

interface AnalyticsChartProps {
  data?: ChartData;
}

export const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ data }) => {
  const chartRef = useRef<ChartJS>(null);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  if (!data) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-48 mb-4"></div>
          <div className="h-64 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
      </motion.div>
    );
  }

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'التحميلات',
        data: data.downloads,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
      {
        label: 'الزوار',
        data: data.visitors,
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgb(16, 185, 129)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        align: 'start' as const,
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          font: {
            size: 14,
            family: 'Inter, system-ui, sans-serif',
          },
          color: 'rgb(107, 114, 128)',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        padding: 12,
        titleFont: {
          size: 14,
          weight: 'bold',
        },
        bodyFont: {
          size: 13,
        },
        callbacks: {
          title: function(context: any) {
            return `${context[0].label}`;
          },
          label: function(context: any) {
            const label = context.dataset.label || '';
            return `${label}: ${context.parsed.y.toLocaleString('ar')}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'rgb(107, 114, 128)',
          font: {
            size: 12,
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(107, 114, 128, 0.1)',
        },
        ticks: {
          color: 'rgb(107, 114, 128)',
          font: {
            size: 12,
          },
          callback: function(value: any) {
            return value.toLocaleString('ar');
          },
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
    elements: {
      point: {
        hoverBackgroundColor: '#fff',
      },
    },
  };

  const totalDownloads = data.downloads.reduce((sum, val) => sum + val, 0);
  const totalVisitors = data.visitors.reduce((sum, val) => sum + val, 0);
  const avgDownloads = Math.round(totalDownloads / data.downloads.length);
  const avgVisitors = Math.round(totalVisitors / data.visitors.length);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            إحصائيات الأسبوع الماضي
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            تحليل التحميلات والزيارات
          </p>
        </div>

        {/* Summary Stats */}
        <div className="flex space-x-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {avgDownloads.toLocaleString('ar')}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              متوسط التحميلات
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {avgVisitors.toLocaleString('ar')}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              متوسط الزوار
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64 w-full">
        <Line ref={chartRef} data={chartData} options={options} />
      </div>

      {/* Bottom Stats */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                إجمالي التحميلات
              </p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {totalDownloads.toLocaleString('ar')}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                إجمالي الزوار
              </p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {totalVisitors.toLocaleString('ar')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};