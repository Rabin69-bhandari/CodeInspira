'use client';
import { useState } from 'react';
import { FiUser, FiMail, FiBookOpen, FiEdit3, FiCheckCircle } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

export default function StudentDashboard() {
  const router = useRouter();
  const [student] = useState({
    name: 'Alex Johnson',
    image: '/default-avatar.jpg',
    cohort: 'Fall 2024',
    semester: 'Semester 4',
    email: 'alex.johnson@university.edu',
    about: 'Computer Science major with interest in AI and Machine Learning.',
    recentCourse: 'CS 401 - Advanced Algorithms'
  });

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Main Content */}
      <main className="flex-1 p-8 space-y-6">

        {/* Top Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FiUser className="text-[rgb(81,38,250)]" /> My Profile
          </h1>
          <div className="flex items-center space-x-3">
            <img src={student.image} alt="avatar" className="w-10 h-10 rounded-full" />
            <span className="font-medium text-gray-700">{student.name}</span>
          </div>
        </div>

        {/* Content Area */}
        <div className="grid md:grid-cols-3 gap-6">

          {/* Profile Card */}
          <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl shadow hover:shadow-lg transition-shadow p-6">
            <div className="flex flex-col items-center text-center">
              <img src={student.image} alt="Student" className="w-28 h-28 rounded-full border-4 border-white shadow" />
              <h2 className="mt-4 text-xl font-bold text-white">{student.name}</h2>
              <p className="text-blue-100">{student.cohort}</p>
              <p className="text-blue-100 mb-4">{student.semester}</p>
              <p className="text-blue-100">{student.email}</p>
              <button className="mt-4 px-6 py-2 bg-white hover:bg-blue-50 text-blue-600 rounded-lg shadow transition-colors flex items-center gap-2">
                <FiEdit3 /> Save
              </button>
            </div>
          </div>

          {/* Academic Status */}
          <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl shadow hover:shadow-lg transition-shadow p-6 col-span-2">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
              <FiBookOpen /> Academic Status
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
                <p className="text-gray-600">Recent Course</p>
                <p className="font-bold text-gray-800">{student.recentCourse}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
                <p className="text-gray-600">Profile Status</p>
                <p className="font-bold text-green-600 flex items-center gap-1">
                  <FiCheckCircle /> Active
                </p>
              </div>
            </div>
          </div>

          {/* My Tasks */}
          <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl shadow hover:shadow-lg transition-shadow p-6 col-span-3">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
              <FiMail /> My Tasks
            </h3>
            <ul className="space-y-3">
              <li className="flex justify-between">
                <span className="text-blue-100">Submit AI Project</span>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">Completed</span>
              </li>
              <li className="flex justify-between">
                <span className="text-blue-100">Pay Tuition Fees</span>
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">Pending</span>
              </li>
              <li className="flex justify-between">
                <span className="text-blue-100">Attend Workshop</span>
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">Due Soon</span>
              </li>
            </ul>
          </div>

        </div>
      </main>
    </div>
  );
}