"use client";
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { useUser } from "@clerk/clerk-react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const CourseProgressChart = () => {
  const { user } = useUser();
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Average Score',
        data: [],
        backgroundColor: [],
      },
    ],
  });

  useEffect(() => {
    const fetchCompletedCourses = async () => {
      if (!user?.id) return;

      try {
        const res = await fetch(`/api/save-user?clerkId=${user.id}`);
        const courses = await res.json();


        // Aggregate scores by courseName
        const aggregation = {};
        courses.forEach(c => {
          if (aggregation[c.courseName]) {
            aggregation[c.courseName].total += c.score;
            aggregation[c.courseName].count += 1;
          } else {
            aggregation[c.courseName] = { total: c.score, count: 1, subject: c.subject };
          }
        });

        // Prepare chart data with average scores
        const labels = [];
        const data = [];
        const colors = ['#4f46e5', '#6366f1', '#a5b4fc', '#c7d2fe', '#e0e7ff'];

        Object.keys(aggregation).forEach((courseName, idx) => {
          labels.push(courseName);
          data.push(aggregation[courseName].total / aggregation[courseName].count);
        });

        setChartData({
          labels,
          datasets: [
            {
              label: 'Average Score',
              data,
              backgroundColor: colors.slice(0, labels.length),
            },
          ],
        });

       

      } catch (err) {
        console.error("Error fetching completed courses:", err);
      }
    };

    fetchCompletedCourses();
  }, [user]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Course Progress</h3>
      <div className="h-64">
        <Doughnut
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom',
              },
              tooltip: {
                callbacks: {
                  label: (context) => `${context.label}: ${context.raw.toFixed(1)}%`,
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default CourseProgressChart;
