"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import { ClerkLoading, ClerkLoaded, useUser } from "@clerk/nextjs";
import { FiBook, FiClock, FiBarChart2 } from "react-icons/fi";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import PerformanceChart from "./PerformanceChart";
import CourseProgressChart from "./CourseProgressChart";
import AssignmentsTable from "./AssignmentsTable";
import CourseCard from "./CourseCard";
import WelcomeHeader from "./WelcomeHeader";
import Loader from "../components/Loader";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { isSignedIn, user } = useUser();
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSignedIn) return;

    const userData = {
      clerkId: user.id,
      fullName: user.fullName,
      imageUrl: user.imageUrl,
      email: user.primaryEmailAddress?.emailAddress
    };


    // Send user data to backend
    fetch("/api/save-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    });

    // Mock data fetch - replace with actual API calls
    const fetchData = async () => {
      try {
        // Simulate API loading
        await new Promise(resolve => setTimeout(resolve, 800));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [isSignedIn, user]);

  if (!isSignedIn) return <div className="flex justify-center items-center h-screen"><Loader /></div>;
  if (loading) return <div className="flex justify-center items-center h-screen"><Loader /></div>;

  // Chart data configuration
  const performanceData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [
      {
        label: 'Your Performance',
        data: [65, 72, 78, 75, 82, 85],
        borderColor: '#4f46e5',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
      },
    ],
  };

  const courseProgressData = {
    labels: courses.map(course => course.title),
    datasets: [
      {
        data: courses.map(course => course.progress),
        backgroundColor: [
          'rgba(79, 70, 229, 0.8)',
          'rgba(99, 102, 241, 0.8)',
          'rgba(129, 140, 248, 0.8)',
        ],
        borderColor: [
          'rgba(79, 70, 229, 1)',
          'rgba(99, 102, 241, 1)',
          'rgba(129, 140, 248, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
  
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Fixed Sidebar - won't scroll */}
      <div className="flex-shrink-0">
        <Sidebar />
      </div>

      {/* Scrollable Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 md:p-8">
          <WelcomeHeader user={user} />

      

          {/* Performance Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <PerformanceChart data={performanceData} />
            <CourseProgressChart data={courseProgressData} />
          </div>

          {/* Upcoming Assignments */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Upcoming Assignments</h3>
              <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                View All
              </button>
            </div>
            <AssignmentsTable assignments={assignments} />
          </div>

          {/* Your Courses */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Your Courses</h3>
              <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                View All
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-scroll">
  
                <CourseCard  />
         
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Dashboard;