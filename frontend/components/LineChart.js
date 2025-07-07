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
  // Sort data by date in ascending order for the line chart
  const sortedData = [...data].sort((a, b) => new Date(a.label) - new Date(b.label));

  const chartData = {
    labels: sortedData.map(item => item.label),
    datasets: [
      {
        label: 'Sum of daily expenses',
        data: sortedData.map(item => item.amount),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.3, // Makes the line curved
        fill: true,
        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255, 99, 132, 1)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows the chart to take the parent's size
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Daily Expense Sum',
        font: {
          size: 18,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: false,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: false,
          text: 'Amount (₹)',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center min-w-[430px] max-w-[44%] flex-grow transition-transform transform hover:scale-105 duration-300 ease-in-out border border-gray-200 h-[400px]">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;