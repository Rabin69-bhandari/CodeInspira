'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContentAdder({ onClose, courseId }) {
  // State definitions
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [moduleCount, setModuleCount] = useState(0);
  const [modules, setModules] = useState([]);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [previewMode, setPreviewMode] = useState(false);
  const [quizMode, setQuizMode] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // Simplified quiz state
  const [currentQuiz, setCurrentQuiz] = useState({
    imageUrl: '',
    questions: []
  });

  // Current module form state
  const [currentModuleTitle, setCurrentModuleTitle] = useState('');
  const [currentModuleContent, setCurrentModuleContent] = useState('');
  const [currentModuleimageUrl, setCurrentModuleimageUrl] = useState('');

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Reset form state when module changes
  useEffect(() => {
    if (modules[currentModuleIndex]) {
      setCurrentModuleTitle(modules[currentModuleIndex].title || '');
      setCurrentModuleContent(modules[currentModuleIndex].content || '');
      setCurrentModuleimageUrl(modules[currentModuleIndex].imageUrl || '');
      setCurrentQuiz(modules[currentModuleIndex].quiz || {
        imageUrl: '',
        questions: []
      });
    } else {
      setCurrentModuleTitle('');
      setCurrentModuleContent('');
      setCurrentModuleimageUrl('');
      setCurrentQuiz({
        imageUrl: '',
        questions: []
      });
    }
  }, [currentModuleIndex, modules]);

  const handleInitialSubmit = (e) => {
    e.preventDefault();
    const count = parseInt(e.target.moduleCount.value);
    setModuleCount(count);
    setModules(Array(count).fill({ 
      title: '', 
      content: '', 
      imageUrl: '',
      quiz: {
        imageUrl: '',
        questions: []
      }
    }));
    setStep(2);
  };

  const handleModuleSubmit = (e) => {
    e.preventDefault();
    
    const updatedModules = [...modules];
    updatedModules[currentModuleIndex] = {
      title: currentModuleTitle,
      content: currentModuleContent,
      imageUrl: currentModuleimageUrl,
      quiz: currentQuiz
    };
    setModules(updatedModules);

    if (!quizMode) {
      setQuizMode(true);
    } else {
      setQuizMode(false);
      if (currentModuleIndex < moduleCount - 1) {
        setCurrentModuleIndex(currentModuleIndex + 1);
      } else {
        setPreviewMode(true);
      }
    }
  };

  // Quiz helper functions
  const addNewQuestion = () => {
    setCurrentQuiz(prev => ({
      ...prev,
      questions: [...prev.questions, {
        question: '',
        options: ['', ''],
        correctAnswer: 0
      }]
    }));
  };

  const removeQuestion = (index) => {
    setCurrentQuiz(prev => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index)
    }));
  };

  const handleQuizQuestionChange = (questionIndex, field, value) => {
    setCurrentQuiz(prev => {
      const newQuestions = [...prev.questions];
      newQuestions[questionIndex] = {
        ...newQuestions[questionIndex],
        [field]: field === 'options' 
          ? value 
          : field === 'correctAnswer'
            ? parseInt(value)
            : value
      };
      return { ...prev, questions: newQuestions };
    });
  };

  const addOption = (questionIndex) => {
    setCurrentQuiz(prev => {
      const newQuestions = [...prev.questions];
      newQuestions[questionIndex] = {
        ...newQuestions[questionIndex],
        options: [...newQuestions[questionIndex].options, '']
      };
      return { ...prev, questions: newQuestions };
    });
  };

  const removeOption = (questionIndex, optionIndex) => {
    setCurrentQuiz(prev => {
      const newQuestions = [...prev.questions];
      newQuestions[questionIndex] = {
        ...newQuestions[questionIndex],
        options: newQuestions[questionIndex].options.filter((_, i) => i !== optionIndex)
      };
      // Adjust correct answer if needed
      if (newQuestions[questionIndex].correctAnswer >= optionIndex) {
        newQuestions[questionIndex].correctAnswer = Math.max(0, newQuestions[questionIndex].correctAnswer - 1);
      }
      return { ...prev, questions: newQuestions };
    });
  };

  const goToModule = (index) => {
    const updatedModules = [...modules];
    updatedModules[currentModuleIndex] = {
      title: currentModuleTitle,
      content: currentModuleContent,
      imageUrl: currentModuleimageUrl,
      quiz: currentQuiz
    };
    setModules(updatedModules);
    
    setCurrentModuleIndex(index);
    setPreviewMode(false);
    setQuizMode(false);
  };

  const resetForm = () => {
    setStep(1);
    setTitle('');
    setModuleCount(0);
    setModules([]);
    setCurrentModuleIndex(0);
    setPreviewMode(false);
    setQuizMode(false);
    setCurrentModuleTitle('');
    setCurrentModuleContent('');
    setCurrentModuleimageUrl('');
    setCurrentQuiz({
      imageUrl: '',
      questions: []
    });
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const contentData = {
    title: title,
    courseId: courseId,
    modules: modules.map(module => ({
      title: module.title,
      content: module.content,
      imageUrl: module.imageUrl || null,
      quiz: module.quiz
    }))
  };

  const saveContentToBackend = async () => {
    try {
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contentData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Content saved successfully:', result);
      alert('Content saved successfully!');
      onClose();
    } catch (error) {
      console.error('Error saving content:', error);
      alert('Failed to save content. Please try again.');
    } 
  };

  if (!isMounted) return null;

  // Helper function to convert YouTube URL to embed format
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return '';
    if (url.includes('embed')) return url;
    
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    return (match && match[2].length === 11)
      ? `https://www.youtube.com/embed/${match[2]}`
      : url;
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={handleBackdropClick}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">
              {step === 1 ? 'Create New Content' : 
               quizMode ? 'Add Quiz Questions' : 
               previewMode ? 'Content Preview' : `Module ${currentModuleIndex + 1}`}
            </h1>
            <button 
              onClick={onClose}
              className="p-1 rounded-full hover:bg-white/10 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {step === 2 && (
            <div className="mt-4">
              <div className="flex overflow-x-auto pb-2">
                {modules.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToModule(index)}
                    className={`flex-shrink-0 mx-1 px-4 py-1 rounded-full text-sm font-medium transition-all ${
                      currentModuleIndex === index 
                        ? 'bg-white text-blue-600 shadow-md' 
                        : 'bg-white/20 hover:bg-white/30'
                    }`}
                  >
                    Module {index + 1}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-6 overflow-y-auto max-h-[70vh]">
          {/* Step 1 - Initial Setup */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <form onSubmit={handleInitialSubmit} className="space-y-6">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Content Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Enter course title"
                    required
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Number of Modules</label>
                  <input
                    type="number"
                    name="moduleCount"
                    min="1"
                    max="20"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl hover:shadow-lg transition-all font-medium"
                >
                  Continue
                </button>
              </form>
            </motion.div>
          )}

          {/* Step 2 - Module Content */}
          {step === 2 && !previewMode && !quizMode && (
            <motion.div
              key="module-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="bg-blue-50 p-4 rounded-xl">
                <h2 className="text-lg font-semibold text-blue-800">Module {currentModuleIndex + 1}</h2>
                <p className="text-sm text-blue-600">Fill in the details for this module</p>
              </div>
              
              <form onSubmit={handleModuleSubmit} className="space-y-6">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Module Title</label>
                  <input
                    type="text"
                    value={currentModuleTitle}
                    onChange={(e) => setCurrentModuleTitle(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Enter module title"
                    required
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Module Content</label>
                  <textarea
                    rows="6"
                    value={currentModuleContent}
                    onChange={(e) => setCurrentModuleContent(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Enter the content for this module"
                    required
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Module Video URL (Optional)</label>
                  <div className="flex space-x-2">
                    <input
                      type="url"
                      value={currentModuleimageUrl}
                      onChange={(e) => setCurrentModuleimageUrl(e.target.value)}
                      placeholder="https://www.youtube.com/watch?v=... or direct video URL"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                    {currentModuleimageUrl && (
                      <button
                        type="button"
                        onClick={() => setCurrentModuleimageUrl('')}
                        className="px-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  {currentModuleimageUrl && (
                    <div className="mt-2">
                      <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
                        {currentModuleimageUrl.includes('youtube.com') || currentModuleimageUrl.includes('youtu.be') ? (
                          <iframe
                            src={getYouTubeEmbedUrl(currentModuleimageUrl)}
                            className="w-full h-64"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        ) : (
                          <video controls className="w-full h-64 object-contain bg-black">
                            <source src={currentModuleimageUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => currentModuleIndex > 0 ? goToModule(currentModuleIndex - 1) : null}
                    className={`px-6 py-2 rounded-xl font-medium transition-all ${
                      currentModuleIndex > 0 
                        ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' 
                        : 'opacity-0 pointer-events-none'
                    }`}
                  >
                    Previous
                  </button>
                  
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all font-medium"
                  >
                    Add Quiz Questions
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Quiz Editor */}
          {step === 2 && quizMode && (
            <motion.div
              key="quiz-editor"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="bg-indigo-50 p-4 rounded-xl">
                <h2 className="text-lg font-semibold text-indigo-800">Quiz for: {currentModuleTitle}</h2>
                <p className="text-sm text-indigo-600">Add questions for this module's quiz</p>
              </div>

              <form onSubmit={handleModuleSubmit} className="space-y-6">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Quiz Video URL (Optional)</label>
                  <input
                    type="url"
                    value={currentQuiz.imageUrl}
                    onChange={(e) => setCurrentQuiz({...currentQuiz, imageUrl: e.target.value})}
                    placeholder="https://www.youtube.com/watch?v=... or direct video URL"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                  {currentQuiz.imageUrl && (
                    <div className="mt-2">
                      <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
                        {currentQuiz.imageUrl.includes('youtube.com') || currentQuiz.imageUrl.includes('youtu.be') ? (
                          <iframe
                            src={getYouTubeEmbedUrl(currentQuiz.imageUrl)}
                            className="w-full h-48"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        ) : (
                          <video controls className="w-full h-48 object-contain bg-black">
                            <source src={currentQuiz.imageUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {currentQuiz.questions.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No questions added yet. Click the button below to add your first question.
                    </div>
                  )}

                  <AnimatePresence>
                    {currentQuiz.questions.map((question, qIndex) => (
                      <motion.div
                        key={qIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-medium text-gray-800">Question {qIndex + 1}</h3>
                          <button
                            type="button"
                            onClick={() => removeQuestion(qIndex)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Remove
                          </button>
                        </div>

                        <div className="mb-4">
                          <input
                            type="text"
                            value={question.question}
                            onChange={(e) => handleQuizQuestionChange(qIndex, 'question', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            placeholder="Enter your question"
                            required
                          />
                        </div>

                        <div className="space-y-2 mb-4">
                          {question.options.map((option, oIndex) => (
                            <div key={oIndex} className="flex items-center space-x-3">
                              <div 
                                className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                                  question.correctAnswer === oIndex 
                                    ? 'border-green-500 bg-green-500' 
                                    : 'border-gray-300'
                                }`}
                                onClick={() => handleQuizQuestionChange(qIndex, 'correctAnswer', oIndex)}
                              >
                                {question.correctAnswer === oIndex && (
                                  <div className="w-2 h-2 rounded-full bg-white"></div>
                                )}
                              </div>
                              <input
                                type="text"
                                value={option}
                                onChange={(e) => {
                                  const newOptions = [...question.options];
                                  newOptions[oIndex] = e.target.value;
                                  handleQuizQuestionChange(qIndex, 'options', newOptions);
                                }}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                placeholder={`Option ${oIndex + 1}`}
                                required
                              />
                              {question.options.length > 2 && (
                                <button
                                  type="button"
                                  onClick={() => removeOption(qIndex, oIndex)}
                                  className="text-red-500 hover:text-red-700 text-sm"
                                >
                                  Remove
                                </button>
                              )}
                            </div>
                          ))}
                        </div>

                        <button
                          type="button"
                          onClick={() => addOption(qIndex)}
                          className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          + Add Option
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  <button
                    type="button"
                    onClick={addNewQuestion}
                    className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors"
                  >
                    + Add New Question
                  </button>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setQuizMode(false)}
                    className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-all"
                  >
                    Back to Module
                  </button>
                  
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl hover:shadow-lg transition-all font-medium"
                  >
                    {currentModuleIndex < moduleCount - 1 ? 'Save & Next Module' : 'Save & Preview'}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Preview Mode */}
          {previewMode && (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="bg-green-50 p-4 rounded-xl">
                <h2 className="text-lg font-semibold text-green-800">Content Preview</h2>
                <p className="text-sm text-green-600">Review your content before saving</p>
              </div>

              <div className="space-y-8">
                {modules.map((module, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{module.title}</h3>
                      
                      {module.imageUrl && (
                        <div className="mb-4">
                          <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
                            {module.imageUrl.includes('youtube.com') || module.imageUrl.includes('youtu.be') ? (
                              <iframe
                                src={getYouTubeEmbedUrl(module.imageUrl)}
                                className="w-full h-96"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              ></iframe>
                            ) : (
                              <video controls className="w-full h-96 object-contain bg-black">
                                <source src={module.imageUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>
                            )}
                          </div>
                        </div>
                      )}
                      
                      <div className="prose max-w-none text-gray-700 mb-6">
                        {module.content.split('\n').map((paragraph, i) => (
                          <p key={i}>{paragraph}</p>
                        ))}
                      </div>

                      <div className="border-t pt-6">
                        <h4 className="text-lg font-semibold text-gray-800 mb-4">Quiz</h4>
                        
                        {module.quiz.imageUrl && (
                          <div className="mb-6">
                            <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
                              {module.quiz.imageUrl.includes('youtube.com') || module.quiz.imageUrl.includes('youtu.be') ? (
                                <iframe
                                  src={getYouTubeEmbedUrl(module.quiz.imageUrl)}
                                  className="w-full h-64"
                                  frameBorder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                ></iframe>
                              ) : (
                                <video controls className="w-full h-64 object-contain bg-black">
                                  <source src={module.quiz.imageUrl} type="video/mp4" />
                                  Your browser does not support the video tag.
                                </video>
                              )}
                            </div>
                          </div>
                        )}
                        
                        <div className="space-y-5">
                          {module.quiz.questions.map((question, qIndex) => (
                            <div key={qIndex} className="bg-gray-50 p-4 rounded-lg">
                              <p className="font-medium text-gray-800 mb-3">
                                {qIndex + 1}. {question.question}
                              </p>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {question.options.map((option, oIndex) => (
                                  <div 
                                    key={oIndex} 
                                    className={`p-3 rounded-lg border ${
                                      question.correctAnswer === oIndex
                                        ? 'bg-green-50 border-green-200'
                                        : 'bg-white border-gray-200'
                                    }`}
                                  >
                                    <div className="flex items-center">
                                      <div className={`mr-2 flex-shrink-0 w-4 h-4 rounded-full border ${
                                        question.correctAnswer === oIndex
                                          ? 'bg-green-500 border-green-500'
                                          : 'bg-white border-gray-300'
                                      }`}></div>
                                      <span>{option}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap justify-between gap-4 pt-6">
                <button
                  onClick={() => {
                    setPreviewMode(false);
                    setQuizMode(false);
                  }}
                  className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-all"
                >
                  Edit Content
                </button>
                
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={resetForm}
                    className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-all"
                  >
                    Start Over
                  </button>
                  
                  <button
                    onClick={saveContentToBackend}
                    className="px-6 py-2 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl hover:shadow-lg transition-all font-medium"
                  >
                    Save Content
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}