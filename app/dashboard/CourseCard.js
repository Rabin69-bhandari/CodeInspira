'use client';
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const CourseCard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUser();
  const clerkId = user?.id;

  const router = useRouter()

  const gotopage = (courseId)=>{
    router.push(`/courselearn/${courseId}`);
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/Get_course?clerkId=${clerkId}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching user data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (clerkId) {
      fetchUserData();
    }
  }, [clerkId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-md">
        Error: {error}
      </div>
    );
  }

  if (!userData || (userData?.enrolledCourses.length === 0 && userData?.completedCourses.length === 0)) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No courses available</p>
      </div>
    );
  }

  // Combine enrolled and completed courses for display
  const allCourses = [
    ...(userData.enrolledCourses || []).map(course => ({
      ...course,
      type: 'enrolled',
      progress: course.isCompleted ? 100 : 50 // Default progress for enrolled courses
    })),
    ...(userData.completedCourses || []).map(completed => ({
      ...completed.courseDetails,
      type: 'completed',
      progress: 100,
      score: completed.score,
      completedAt: completed.completedAt
    }))
  ];

  // Only take the first 2 courses if there are more
  const displayedCourses = allCourses.slice(0, 2);

  return (
    <div className='flex gap-4'>
      {displayedCourses.map((course, index) => (
        <div 
          key={index} 
          className="border border-gray-200 min-w-80 rounded-lg overflow-hidden hover:shadow-md transition-shadow flex flex-col"
        >
          <div className={`p-4 ${course.type === 'completed' ? 'bg-green-50' : 'bg-indigo-50'}`}>
            <h4 className="text-lg font-semibold text-gray-800">
              {course.subject || 'No Subject'}
            </h4>
            <p className="text-sm text-gray-600">
              {course.professorname || 'Professor not specified'}
            </p>
          </div>
          
          <div className="p-4 flex-grow">
            <div className="mb-3">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Progress</span>
                <span>{course.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    course.progress === 100 ? 'bg-green-500' : 'bg-indigo-600'
                  }`} 
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {course.title || 'No title available'}
              </h3>
              <p className="text-sm text-gray-600">
                {course.description || 'No description available'}
              </p>
            </div>

            {course.assigment && (
              <div className="mb-4">
                <p className="text-sm text-gray-500">Current Assignment:</p>
                <p className="text-sm font-medium text-gray-800">
                  {course.assigment}
                </p>
              </div>
            )}

            {course.type === 'completed' && (
              <div className="mb-4 p-2 bg-green-50 rounded-md">
                <p className="text-sm text-green-700">
                  Completed with score: <span className="font-bold">{course.score}/100</span>
                </p>
                <p className="text-xs text-green-600 mt-1">
                  Completed on: {new Date(course.completedAt).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-200">
            <button onClick={() =>(gotopage(course.id))} className={`w-full py-2 rounded-md text-sm font-medium transition-colors ${
              course.type === 'completed' 
                ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}>
              {course.type === 'completed' ? 'View Certificate' : 'Continue Learning'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseCard;