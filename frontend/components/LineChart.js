// components/LineChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ data }) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(a.label) - new Date(b.label)
  );

  const chartData = {
    labels: sortedData.map((item) => item.label),
    datasets: [
      {
        label: 'Daily Expenses (₹)',
        data: sortedData.map((item) => item.amount),
        borderColor: 'rgba(99, 102, 241, 1)', // Tailwind Indigo-500
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: 'rgba(99, 102, 241, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(99, 102, 241, 1)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Spending Over Last 30 Days',
        font: {
          size: 18,
        },
        color: '#374151', // Tailwind Gray-700
      },
    },
    scales: {
      x: {
        ticks: { color: '#6B7280' }, // Gray-500
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        ticks: { color: '#6B7280' },
        grid: {
          color: '#E5E7EB', // Gray-200
          borderDash: [2, 2],
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-[49.5%] h-[400px] max-w-2xl mx-auto border border-gray-200">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
