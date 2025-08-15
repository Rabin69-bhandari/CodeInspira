"use client";
import { useEffect, useState } from "react";
import { FiBook, FiClock, FiCalendar, FiAward, FiSearch, FiStar, FiUsers, FiBarChart2 } from "react-icons/fi";
import Sidebar from "../components/sidebar";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useUser();
  const router = useRouter();
  const clerkId = user?.id
  const goToPage = async (courseId) => {
    try {
      const response = await fetch("/api/save-user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ clerkId, courseId}),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || "Failed to update course completion");
      }
  
      console.log("Success:", data);
      return data;
    } catch (error) {
      console.error("Error updating course completion:", error);
    }finally{

      router.push(`/courselearn/${courseId}`);
    }


  };

  const fetchCourses = async () => {
    try {
      const res = await fetch("/api/courses");
      if (!res.ok) throw new Error("Failed to fetch courses");
      const data = await res.json();
      setCourses(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
      <div className="flex items-center">
        <div className="text-red-500 mr-3">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <p className="font-medium">Error loading courses</p>
          <p className="text-sm text-gray-600">{error}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Fixed Sidebar */}
      <div className="flex-shrink-0">
        <Sidebar />
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Fixed Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <h1 className="text-2xl font-bold text-gray-900">Course Catalog</h1>
          <div className="relative max-w-md mt-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search courses..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Scrollable Course Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <StatCard 
              icon={<FiBook className="w-6 h-6" />}
              title="Total Courses"
              value={courses.length}
              color="bg-blue-100 text-blue-600"
            />
            <StatCard 
              icon={<FiUsers className="w-6 h-6" />}
              title="Active Learners"
              value={courses.reduce((acc, course) => acc + (course.enrolled || 0), 0)}
              color="bg-green-100 text-green-600"
            />
            <StatCard 
              icon={<FiStar className="w-6 h-6" />}
              title="Avg Rating"
              value={(courses.reduce((acc, course) => acc + (course.rating || 0), 0) / (courses.length || 1)).toFixed(1)}
              color="bg-yellow-100 text-yellow-600"
            />
            <StatCard 
              icon={<FiBarChart2 className="w-6 h-6" />}
              title="Categories"
              value={new Set(courses.map(course => course.category)).size}
              color="bg-purple-100 text-purple-600"
            />
          </div>

          {/* Course Grid */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Available Courses</h2>
            {filteredCourses.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-12 text-center">
                <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">No courses found</h3>
                <p className="mt-2 text-gray-600">
                  {searchTerm ? "Try adjusting your search query" : "Check back later for new courses"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <CourseCard
                    key={course._id}
                    course={course}
                    onEnroll={() => goToPage(course._id)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Status Summary */}
          <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-yellow-50 text-yellow-600 mr-4">
                  <FiAward size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Completed</p>
                  <p className="text-2xl font-semibold">
                    {courses.filter(c => c.status === 'completed').length}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Upcoming</p>
                <p className="text-2xl font-semibold">
                  {courses.filter(c => c.status === 'upcoming').length}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({ icon, title, value, color }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${color} mr-4`}>
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
      </div>
    </div>
  );
}

// Course Card Component
function CourseCard({ course, onEnroll }) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Course Image */}
      <div className="h-48 bg-gray-200 relative overflow-hidden">
        {course.imageUrl ? (
          <img 
            src={course.imageUrl} 
            alt={course.title}
            className="w-full h-full object-cover"
            onError={(e) => e.target.src = '/course-placeholder.jpg'}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
            <FiBook className="w-12 h-12 text-blue-500" />
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(course.status).badge}`}>
            {formatStatus(course.status)}
          </span>
        </div>
      </div>
      
      {/* Course Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <span className="text-sm font-medium text-blue-600">{course.category || 'General'}</span>
          <div className="flex items-center">
            <FiStar className="text-yellow-400 mr-1" />
            <span className="font-medium">{course.rating || '4.5'}</span>
          </div>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>
        
        <button 
          onClick={onEnroll}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
        >
          View Course
        </button>
      </div>
    </div>
  );
}

// Helper functions
function formatStatus(status) {
  const statusMap = {
    'not-started': 'Not Started',
    'in-progress': 'In Progress',
    'completed': 'Completed',
    'upcoming': 'Coming Soon'
  };
  return statusMap[status] || status;
}

function getStatusColor(status) {
  const colors = {
    'not-started': { badge: 'bg-gray-100 text-gray-800' },
    'in-progress': { badge: 'bg-blue-100 text-blue-800' },
    'completed': { badge: 'bg-green-100 text-green-800' },
    'upcoming': { badge: 'bg-purple-100 text-purple-800' }
  };
  return colors[status] || colors['not-started'];
}
