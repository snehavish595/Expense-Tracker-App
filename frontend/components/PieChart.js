// components/PieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.label),
    datasets: [
      {
        label: 'Amount',
        data: data.map(item => item.amount),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)', // Bills (example color)
          'rgba(54, 162, 235, 0.6)', // Clothes (example color)
          'rgba(255, 206, 86, 0.6)', // Skin (example color)
          'rgba(75, 192, 192, 0.6)', // Watches (example color)
          'rgba(153, 102, 255, 0.6)', // Add more colors if more categories
          'rgba(255, 159, 64, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
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
        text: 'Expense spread across categories',
        font: {
          size: 18,
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-[49.5%] h-[400px] max-w-2xl mx-auto border border-gray-200">
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChart;