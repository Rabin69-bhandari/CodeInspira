'use client';
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PerformanceChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Score',
        data: [],
        borderColor: '#4f46e5',
        backgroundColor: 'rgba(79, 70, 229, 0.2)',
        tension: 0.3,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/Get-user'); // your API
        const users = await res.json();

        const rabin = users.find(u => u.fullName === "Rabin Bhandari");
        if (!rabin) return;

        // Sort completed courses by date
        const completedSorted = rabin.completedCourses.sort(
          (a, b) => new Date(a.completedAt) - new Date(b.completedAt)
        );

        const labels = completedSorted.map(c => 
          new Date(c.completedAt).toLocaleDateString('en-GB', {
            day: '2-digit', month: 'short', year: 'numeric'
          })
        );

        const data = completedSorted.map(c => c.score);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Score',
              data,
              borderColor: '#4f46e5',
              backgroundColor: 'rgba(79, 70, 229, 0.2)',
              tension: 0.3,
            },
          ],
        });
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Rabin Bhandari - Performance Trend</h3>
      <div className="h-64">
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: 'top' },
              tooltip: {
                callbacks: {
                  label: (context) => `Score: ${context.raw}`,
                },
              },
            },
            scales: {
              y: { beginAtZero: true, max: 100 },
            },
          }}
        />
      </div>
    </div>
  );
};

export default PerformanceChart;
