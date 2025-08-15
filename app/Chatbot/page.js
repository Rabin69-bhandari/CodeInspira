// app/components/Chatbot/page.js
'use client';
import { useState, useEffect, useRef } from 'react';
import Sidebar from "../components/sidebar";
import { FiMessageSquare, FiX, FiSend, FiBook, FiCalendar, FiFileText } from 'react-icons/fi';

const Chatbot = ({ mode = 'page' }) => {
  const [isOpen, setIsOpen] = useState(mode === 'page');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Sample course data - replace with your actual course structure
  const courses = {
    'CS401': {
      title: 'Advanced Algorithms',
      topics: ['Divide and Conquer', 'Dynamic Programming', 'Graph Algorithms'],
      materials: ['Lecture Slides', 'Textbook Chapters', 'Practice Problems'],
      assignments: [
        { name: 'Assignment 1', due: '2023-11-15' },
        { name: 'Assignment 2', due: '2023-12-01' }
      ]
    },
    'MATH301': {
      title: 'Advanced Calculus',
      topics: ['Multivariable Calculus', 'Vector Calculus', 'Differential Equations'],
      materials: ['Video Lectures', 'Problem Sets', 'Reference Books'],
      assignments: [
        { name: 'Problem Set 1', due: '2023-11-20' },
        { name: 'Midterm Project', due: '2023-12-10' }
      ]
    }
  };

  // Initialize with welcome message
  useEffect(() => {
    if (mode === 'page' || isOpen) {
      setMessages([{
        text: `Hello! I'm your course assistant. I can help you with:\n- Course information\n- Assignment deadlines\n- Study materials\n\nWhat would you like to know?`,
        sender: 'bot',
        timestamp: new Date()
      }]);
    }
    scrollToBottom();
  }, [mode, isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      text: input,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate bot response
    setTimeout(() => {
      const response = generateBotResponse(input);
      setMessages(prev => [...prev, {
        text: response,
        sender: 'bot',
        timestamp: new Date()
      }]);
      setIsLoading(false);
      scrollToBottom();
    }, 800);
  };

  const generateBotResponse = (userInput) => {
    const inputLower = userInput.toLowerCase();

    // Course information
    if (inputLower.includes('course') || inputLower.includes('class')) {
      const courseList = Object.entries(courses).map(([code, { title }]) => 
        `• ${code}: ${title}`).join('\n');
      return `Here are your current courses:\n${courseList}\n\nWhich course would you like information about?`;
    }

    // Specific course queries
    for (const [code, details] of Object.entries(courses)) {
      if (inputLower.includes(code.toLowerCase())) {
        if (inputLower.includes('topic') || inputLower.includes('cover')) {
          return `${code} covers these topics:\n${details.topics.map(t => `• ${t}`).join('\n')}`;
        }
        if (inputLower.includes('material') || inputLower.includes('resource')) {
          return `Available materials for ${code}:\n${details.materials.map(m => `• ${m}`).join('\n')}`;
        }
        if (inputLower.includes('assignment') || inputLower.includes('due')) {
          const assignments = details.assignments.map(a => 
            `• ${a.name} (Due: ${a.due})`).join('\n');
          return `Upcoming assignments for ${code}:\n${assignments}`;
        }
        return `${code}: ${details.title}\n\nWhat would you like to know?\n- Topics\n- Materials\n- Assignments`;
      }
    }

    // Help command
    if (inputLower.includes('help')) {
      return `I can help with:\n• Course information\n• Assignment deadlines\n• Study materials\n• Exam dates\n\nTry asking about a specific course like "CS401 topics"`;
    }

    // Default response
    return "I'm your course assistant. I can help you with course information, assignments, and study materials. Try asking about a specific course!";
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen && messages.length === 0) {
      setMessages([{
        text: `Hi there! How can I help you with your courses today?`,
        sender: 'bot',
        timestamp: new Date()
      }]);
    }
  };

  // Popup mode
  if (mode === 'popup') {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen ? (
          <button
            onClick={toggleChat}
            className="bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-all animate-bounce"
            aria-label="Open chatbot"
          >
            <FiMessageSquare size={24} />
          </button>
        ) : (
          <div className="w-80 bg-white rounded-lg shadow-xl flex flex-col overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <FiMessageSquare />
                <h3 className="font-semibold">Course Assistant</h3>
              </div>
              <button 
                onClick={toggleChat}
                className="p-1 rounded-full hover:bg-indigo-700 transition-colors"
              >
                <FiX size={18} />
              </button>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto h-96 bg-gray-50">
              {messages.map((msg, i) => (
                <div key={i} className={`mb-3 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs rounded-lg px-3 py-2 ${msg.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-200'}`}>
                    <p className="whitespace-pre-line">{msg.text}</p>
                    <p className="text-xs mt-1 opacity-70 text-right">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start mb-3">
                  <div className="bg-white border border-gray-200 rounded-lg px-3 py-2">
                    <div className="flex space-x-1">
                      {[...Array(3)].map((_, i) => (
                        <div 
                          key={i}
                          className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                          style={{ animationDelay: `${i * 0.2}s` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="border-t border-gray-200 p-3 bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about your courses..."
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!input.trim()}
                  className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
                >
                  <FiSend size={18} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Page mode
  return (
    <div className='flex h-screen overflow-hidden bg-gray-50'>
        <Sidebar />
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-3 mb-6">
        <FiMessageSquare className="text-indigo-600 text-2xl" />
        <h2 className="text-2xl font-bold text-gray-800">Course Assistant</h2>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="h-[500px] overflow-y-auto p-4 bg-gray-50">
          {messages.map((msg, i) => (
            <div key={i} className={`mb-4 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-md rounded-lg px-4 py-2 ${msg.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-200'}`}>
                <p className="whitespace-pre-line">{msg.text}</p>
                <p className="text-xs mt-1 opacity-70">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="bg-white border border-gray-200 rounded-lg px-4 py-2">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="border-t border-gray-200 p-4 bg-white">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask about course content, assignments..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleSendMessage}
              disabled={!input.trim()}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors flex items-center gap-1"
            >
              <span>Send</span>
              <FiSend />
            </button>
          </div>
        </div>
      </div>
    </div>
     </div>
  );
};

export default Chatbot;