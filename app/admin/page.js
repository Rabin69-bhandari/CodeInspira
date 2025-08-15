"use client";
import React, { useState, useEffect } from 'react';
import AdminSidebar from '../components/adminsidebar';
import { FiHome, FiUsers, FiSettings, FiBook, FiAward, FiCalendar, FiDollarSign, FiMail } from 'react-icons/fi';
import { useUser } from '@clerk/nextjs';
import { useRouter } from "next/navigation";

const AdminDashboard = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);
  const router = useRouter();

  // Assignment state
  const [assignmentTitle, setAssignmentTitle] = useState('');
  const [assignmentDescription, setAssignmentDescription] = useState('');
  const [assignmentCourse, setAssignmentCourse] = useState('');
  const [assignmentDueDate, setAssignmentDueDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  console.log(courses)

  // Replace with your actual admin ID check
  if(user?.id !== "user_31EuwuplEAmDNTV8n0YgztSRftv"){
    router.push("/dashboard")
  }

  useEffect(() => {
    // Fetch students
    fetch("/api/Get-user")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error("Error fetching students:", err));

    // Fetch courses
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error("Error fetching courses:", err));
  }, []);

  const handleAssignmentSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/Get-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: assignmentTitle,
          description: assignmentDescription,
          courseId: assignmentCourse,
          dueDate: assignmentDueDate,
        }),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        // Reset form
        setAssignmentTitle('');
        setAssignmentDescription('');
        setAssignmentCourse('');
        setAssignmentDueDate('');
        
        // Hide success message after 3 seconds
        setTimeout(() => setSubmitSuccess(false), 3000);
      } else {
        console.error('Failed to create assignment');
      }
    } catch (error) {
      console.error('Error submitting assignment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Education system metrics
  const metrics = [
    { title: "Total Students", value: students.length, change: "+15%", icon: <FiUsers className="text-blue-500" size={24} /> },
    { title: "Active Courses", value: courses.length, change: "+5%", icon: <FiBook className="text-green-500" size={24} /> },
  ];

  // Recent enrollments
  const recentEnrollments = students.slice(0, 5).map(student => ({
    ...student,
    course: courses.find(c => c.id === student.courseId)?.name || "N/A",
    status: student.active ? "Active" : "Inactive"
  }));

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 overflow-y-auto p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 capitalize">
            {activeTab.replace('-', ' ')}
          </h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <FiMail className="text-gray-500" size={20} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-2">
                <span className="text-indigo-600 font-medium text-sm">
                  {user?.fullName}
                </span>
              </div>
              <span className="text-sm font-medium">{user?.fullName}</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        {activeTab === 'dashboard' && (
          <div>
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {metrics.map((metric, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-gray-500">{metric.title}</p>
                      <p className="text-2xl font-bold mt-1">{metric.value}</p>
                      <p className={`text-sm mt-1 ${metric.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                        {metric.change} from last month
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-full">
                      {metric.icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts and Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Recent Enrollments */}
              <div className="bg-white p-6 rounded-lg shadow-sm lg:col-span-2">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Recent Enrollments</h2>
                  <button className="text-sm text-indigo-600 hover:text-indigo-800">
                    View All
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentEnrollments.map((student) => (
                        <tr key={student._id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.fullName}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.course}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${student.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-green-100 text-green-800'}`}>
                             Active
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Assignment Adder */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Create Assignment</h2>
                <form onSubmit={handleAssignmentSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={assignmentTitle}
                      onChange={(e) => setAssignmentTitle(e.target.value)}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      id="description"
                      value={assignmentDescription}
                      onChange={(e) => setAssignmentDescription(e.target.value)}
                      rows={3}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">
                      Course
                    </label>
                    <select
                      id="course"
                      value={assignmentCourse}
                      onChange={(e) => setAssignmentCourse(e.target.value)}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                      required
                    >
                      <option value="">Select a course</option>
                      {courses.map((course) => (
                        <option key={course._id} value={course.id}>{course.title}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Due Date
                    </label>
                    <input
                      type="datetime-local"
                      id="dueDate"
                      value={assignmentDueDate}
                      onChange={(e) => setAssignmentDueDate(e.target.value)}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Create Assignment'}
                  </button>
                  
                  {submitSuccess && (
                    <div className="p-2 text-sm text-green-600 bg-green-50 rounded-md">
                      Assignment created successfully!
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default AdminDashboard;