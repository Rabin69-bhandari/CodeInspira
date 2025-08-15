'use client';

import { useEffect, useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import ReactPlayer from "react-player";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiClock, FiBookOpen, FiCheckCircle } from "react-icons/fi";
import { useAuth } from "@clerk/nextjs";
import Sidebar from "@/app/components/sidebar";

const CoursePage = () => {
  const router = useRouter();
  const { userId: clerkId } = useAuth();
  const { id: courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [quizMode, setQuizMode] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [totalCourseScore, setTotalCourseScore] = useState(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const fetchCourse = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/courseslearn/${courseId}`);
      if (!res.ok) throw new Error("Failed to load course");
      const data = await res.json();
      setCourse(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  const saveCourseCompletion = async () => {
    try {
      const response = await fetch('/api/save-user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clerkId,
          courseId,
          score: totalCourseScore
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save course completion');
      }

      return await response.json();
    } catch (error) {
      console.error('Error saving completion:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (courseId) fetchCourse();
  }, [courseId, fetchCourse]);

  const handleModuleChange = (newIndex) => {
    setCurrentModuleIndex(newIndex);
    setQuizMode(false);
    setQuizSubmitted(false);
    setQuizAnswers({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleQuizAnswer = (questionIndex, answerIndex) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };

  const calculateModuleScore = (moduleIndex) => {
    if (!course?.modules[moduleIndex]?.quiz) return 0;
    
    const moduleQuiz = course.modules[moduleIndex].quiz.questions;
    let correct = 0;
    
    Object.entries(quizAnswers).forEach(([qIndex, answer]) => {
      if (moduleQuiz[qIndex]?.correctAnswer === answer) {
        correct++;
      }
    });

    return Math.round((correct / moduleQuiz.length) * 100);
  };

  const submitQuiz = async () => {
    const currentQuiz = course.modules[currentModuleIndex].quiz.questions;
    let correct = 0;
    
    currentQuiz.forEach((question, index) => {
      if (quizAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });

    const moduleScore = Math.round((correct / currentQuiz.length) * 100);
    setScore(moduleScore);
    setQuizSubmitted(true);

    // Calculate total course score
    let totalCorrect = 0;
    let totalQuestions = 0;
    
    course.modules.forEach((module, modIndex) => {
      if (module.quiz) {
        module.quiz.questions.forEach((question, qIndex) => {
          if (quizAnswers[qIndex] === question.correctAnswer) {
            totalCorrect++;
          }
          totalQuestions++;
        });
      }
    });

    const overallScore = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
    setTotalCourseScore(overallScore);

    // Save completion if this is the last module
    const isLastModule = currentModuleIndex === course.modules.length - 1;
    if (isLastModule) {
      try {
        await saveCourseCompletion();
      } catch (error) {
        console.error("Failed to save course completion:", error);
      }
    }

    console.log(`Module ${currentModuleIndex + 1} Score: ${moduleScore}%`);
    console.log(`Overall Course Score: ${overallScore}%`);
  };

  const currentModule = course?.modules?.[currentModuleIndex] || {};
  const currentQuiz = currentModule.quiz?.questions || [];

  if (loading) return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 max-w-7xl mx-auto p-4 lg:p-8">
        <div className="animate-pulse space-y-8">
          <div className="h-12 bg-gray-200 rounded-xl w-3/4"></div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-6">
              <div className="aspect-video bg-gray-200 rounded-2xl"></div>
              <div className="h-10 bg-gray-200 rounded-xl w-1/2"></div>
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 max-w-7xl mx-auto p-4 lg:p-8">
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="text-xl font-semibold text-red-800">Error loading course</h3>
              <p className="text-red-600 mt-1">{error}</p>
            </div>
            <button 
              onClick={fetchCourse}
              className="px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (!course) return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 max-w-7xl mx-auto p-4 lg:p-8">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <h3 className="text-2xl font-semibold text-gray-900">Course not found</h3>
          <p className="mt-2 text-gray-600">The requested course could not be found</p>
          <Link href="/courses" className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
            Browse Courses
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 max-w-7xl mx-auto p-4 lg:p-8">
        {/* Course Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100"
        >
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
              <p className="text-gray-600 mt-2">
                Last updated: {new Date(course.updatedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center text-sm text-gray-500">
                <FiClock className="mr-1" />
                {course.modules?.length || 0} modules
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <FiBookOpen className="mr-1" />
                {course.subject || 'General'}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Module Content */}
          <div className="lg:col-span-3">
            {/* Video Player */}
            {console.log(currentModule.imageUrl.replace("watch?v=", "embed/"))}
            {isClient && currentModule.imageUrl && (
              <div className="bg-black rounded-xl overflow-hidden mb-6 aspect-video">
                <iframe
      className="w-full h-full rounded-lg"
      src={currentModule.imageUrl.replace("watch?v=", "embed/")}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
              </div>
            )}

            {/* Module Title and Content */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {currentModule.title || `Module ${currentModuleIndex + 1}`}
              </h2>
              
              <div className="prose max-w-none text-gray-700">
                {currentModule.content?.split("\n").map((paragraph, i) => (
                  <p key={i} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </motion.div>

            {quizMode && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8"
              >
                <div className="space-y-6">
                  {currentQuiz.map((question, qIndex) => (
                    <div key={qIndex} className="border border-gray-200 rounded-xl p-6 hover:shadow-sm transition-shadow">
                      <h3 className="text-lg font-medium text-gray-800 mb-4">
                        {qIndex + 1}. {question.question}
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {question.options.map((option, oIndex) => (
                          <button
                            key={oIndex}
                            onClick={() => !quizSubmitted && handleQuizAnswer(qIndex, oIndex)}
                            disabled={quizSubmitted}
                            className={`p-4 rounded-lg border text-left transition-all ${
                              quizAnswers[qIndex] === oIndex
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-blue-300'
                            } ${
                              quizSubmitted && oIndex === question.correctAnswer
                                ? 'bg-green-50 border-green-500'
                                : ''
                            } ${
                              quizSubmitted && 
                              quizAnswers[qIndex] === oIndex && 
                              oIndex !== question.correctAnswer
                                ? 'bg-red-50 border-red-500'
                                : ''
                            }`}
                          >
                            <div className="flex items-center">
                              <div className={`w-5 h-5 rounded-full border mr-3 flex-shrink-0 flex items-center justify-center ${
                                quizAnswers[qIndex] === oIndex
                                  ? 'border-blue-500 bg-blue-500 text-white'
                                  : 'border-gray-300'
                              } ${
                                quizSubmitted && oIndex === question.correctAnswer
                                  ? 'border-green-500 bg-green-500 text-white'
                                  : ''
                              }`}>
                                {quizAnswers[qIndex] === oIndex && (
                                  <FiCheckCircle className="w-3 h-3" />
                                )}
                                {quizSubmitted && oIndex === question.correctAnswer && (
                                  <FiCheckCircle className="w-3 h-3" />
                                )}
                              </div>
                              <span>{option}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between">
                  {!quizSubmitted ? (
                    <>
                      <button
                        onClick={() => setQuizMode(false)}
                        className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors"
                      >
                        Back to Module
                      </button>
                      <button
                        onClick={submitQuiz}
                        className="px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl hover:shadow-lg transition-all font-medium"
                      >
                        Submit Quiz
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={async () => {
                        setQuizMode(false);
                        if (currentModuleIndex < course.modules.length - 1) {
                          setTimeout(() => {
                            handleModuleChange(currentModuleIndex + 1);
                          }, 300);
                        } else {
                          try {
                            await saveCourseCompletion();
                            router.push(`/marketplace`);
                          } catch (error) {
                            console.error("Failed to save completion:", error);
                          }
                        }
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all font-medium"
                    >
                      {currentModuleIndex < course.modules.length - 1 ? 'Next Module' : 'Finish Course'}
                    </button>
                  )}
                </div>
              </motion.div>
            )}

            {!quizMode && currentModule.quiz && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-8"
              >
                <button
                  onClick={() => setQuizMode(true)}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all font-medium"
                >
                  Take Module Quiz
                </button>
              </motion.div>
            )}
          </div>

          {/* Sidebar - Fixed Position */}
          <div className="lg:col-span-1 sticky top-8 h-fit">
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-5 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <h3 className="font-semibold text-gray-900">Course Modules</h3>
                </div>
                <div className="divide-y divide-gray-200 max-h-[60vh] overflow-y-auto">
                  <AnimatePresence>
                    {course.modules?.map((module, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleModuleChange(index)}
                        className={`w-full text-left p-4 transition-all ${
                          currentModuleIndex === index 
                            ? 'bg-blue-50 text-blue-600' 
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${
                            currentModuleIndex === index 
                              ? 'bg-blue-100 text-blue-600' 
                              : 'bg-gray-100 text-gray-500'
                          }`}>
                            {index + 1}
                          </div>
                          <span className="truncate">{module.title || `Module ${index + 1}`}</span>
                        </div>
                      </motion.button>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {!quizMode && (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                  <h3 className="font-semibold text-gray-900 mb-3">Module Progress</h3>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2.5 rounded-full" 
                      style={{ width: `${((currentModuleIndex + 1) / course.modules.length) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Completed {currentModuleIndex + 1} of {course.modules.length} modules
                  </p>
                  {quizSubmitted && (
                    <>
                      <div className="mt-4 pt-4 border-t border-blue-200">
                        <h4 className="font-medium text-gray-900 mb-2">Quiz Scores</h4>
                        <div className="space-y-2">
                          {course.modules.map((module, index) => (
                            module.quiz && (
                              <div key={index} className="flex justify-between items-center">
                                <span className="text-sm text-gray-700">
                                  Module {index + 1}:
                                </span>
                                <span className="text-sm font-medium">
                                  {calculateModuleScore(index)}%
                                </span>
                              </div>
                            )
                          ))}
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-blue-200">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-900">Total Score:</span>
                          <span className="font-bold text-lg">{totalCourseScore}%</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;