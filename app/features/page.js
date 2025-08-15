"use client";
import { motion } from "framer-motion";
import { 
  FiBook, FiUsers, FiActivity, FiCalendar, FiFileText, FiAward, FiVideo, FiLayers, 
  FiBarChart2, FiMessageSquare, FiClock, FiBookmark, FiCheck 
} from "react-icons/fi";
import { 
  FaLightbulb, FaChartLine, FaHandshake, FaGraduationCap, FaRegCalendarAlt, 
  FaChalkboardTeacher, FaRegComments 
} from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { RiTeamFill, RiAiGenerate } from "react-icons/ri";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Features() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const featureList = [
    {
      icon: <FiBook className="w-12 h-12 text-indigo-600" />,
      title: "Smart Learning Hub",
      description:
        "Comprehensive course materials with AI-powered recommendations based on your learning patterns and performance.",
      highlights: ["Personalized course suggestions", "Interactive textbooks", "Learning path customization"]
    },
    {
      icon: <FiUsers className="w-12 h-12 text-indigo-600" />,
      title: "Collaborative Campus",
      description:
        "Real-time collaboration tools for group projects, study sessions, and peer-to-peer learning.",
      highlights: ["Virtual study rooms", "Shared whiteboards", "Group task management"]
    },
    {
      icon: <FiActivity className="w-12 h-12 text-indigo-600" />,
      title: "Activity Dashboard",
      description:
        "Track all campus activities, events, and deadlines in one centralized platform.",
      highlights: ["Integrated calendar", "Event notifications", "Participation analytics"]
    },
    {
      icon: <FaLightbulb className="w-12 h-12 text-indigo-600" />,
      title: "Innovation Lab",
      description:
        "Cutting-edge tools including AI tutors, VR learning environments, and interactive simulations.",
      highlights: ["AI-powered Q&A", "3D model visualization", "Concept mapping tools"]
    },
    {
      icon: <FaChartLine className="w-12 h-12 text-indigo-600" />,
      title: "Performance Analytics",
      description:
        "Detailed insights into academic performance with predictive analytics and improvement suggestions.",
      highlights: ["Grade forecasting", "Skill gap analysis", "Personalized feedback"]
    },
    {
      icon: <FaHandshake className="w-12 h-12 text-indigo-600" />,
      title: "Campus Connect",
      description:
        "Seamless communication between students, faculty, and administration.",
      highlights: ["Department channels", "Faculty office hours", "Announcement center"]
    },
    {
      icon: <FaGraduationCap className="w-12 h-12 text-indigo-600" />,
      title: "Academic Planner",
      description:
        "Plan your semester with course scheduling, assignment tracking, and exam preparation tools.",
      highlights: ["Degree progress tracker", "Assignment scheduler", "Exam countdown"]
    },
    {
      icon: <RiAiGenerate className="w-12 h-12 text-indigo-600" />,
      title: "AI Study Assistant",
      description:
        "Smart tools that help generate study materials, practice questions, and revision summaries.",
      highlights: ["Flashcard generator", "Practice quiz creator", "Lecture summarizer"]
    },
    {
      icon: <IoMdNotifications className="w-12 h-12 text-indigo-600" />,
      title: "Smart Alerts",
      description:
        "Customizable notifications for deadlines, campus events, and academic updates.",
      highlights: ["Priority-based alerts", "Multi-channel delivery", "Snooze options"]
    },
    {
      icon: <FiFileText className="w-12 h-12 text-indigo-600" />,
      title: "Digital Portfolio",
      description:
        "Showcase your academic work, projects, and achievements in a professional format.",
      highlights: ["Customizable templates", "Skill tagging", "Sharing controls"]
    },
    {
      icon: <FaChalkboardTeacher className="w-12 h-12 text-indigo-600" />,
      title: "Faculty Tools",
      description:
        "Specialized features for educators including grading assistance and class analytics.",
      highlights: ["Automated grading", "Class performance reports", "Attendance tracking"]
    },
    {
      icon: <RiTeamFill className="w-12 h-12 text-indigo-600" />,
      title: "Student Organizations",
      description:
        "Manage clubs, teams, and extracurricular activities with dedicated tools.",
      highlights: ["Group management", "Event planning", "Member communication"]
    }
  ];

  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        if (window.scrollY > 50) {
          navRef.current.classList.add("backdrop-blur-md", "bg-white/60", "shadow-md");
        } else {
          navRef.current.classList.add("backdrop-blur-md", "bg-white/60");
          navRef.current.classList.remove("shadow-md");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-200">

      {/* Glass Sticky Navbar */}
      <header
        ref={navRef}
        className="sticky top-0 z-50 w-full border-b bg-white/60 backdrop-blur-md transition-shadow duration-300 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-16 justify-between">
          <Link href="/" className="flex items-center">
            <img className="w-[140px]" src="/inspira.png" alt="Inspira Logo" />
          </Link>
          <nav className="hidden md:flex space-x-6 font-medium text-gray-700">
            <Link href="/about" className="hover:text-indigo-600 transition-colors duration-300">About</Link>
            <Link href="/features" className="hover:text-indigo-600 transition-colors duration-300">Features</Link>
            <Link href="/pricing" className="hover:text-indigo-600 transition-colors duration-300">Pricing</Link>
          </nav>
        </div>
      </header>

      {/* Features Section */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 flex-grow">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4"
          >
            Comprehensive Campus Features
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto"
          >
            Our Smart Campus platform integrates cutting-edge technology with academic needs to create a seamless learning and management experience.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {featureList.map((feature, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.03 }}
              className="bg-white p-8 rounded-2xl shadow-lg flex flex-col hover:shadow-xl transition-all duration-300 min-h-[380px] border border-gray-100"
            >
              <div className="mb-6 flex items-center justify-center w-16 h-16 bg-indigo-50 rounded-full mx-auto">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">{feature.title}</h3>
              <p className="text-gray-600 mb-4 text-center">{feature.description}</p>
              <div className="mt-auto">
                <div className="text-sm font-medium text-indigo-600 mb-2">Key Features:</div>
                <ul className="space-y-2">
                  {feature.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start text-gray-600 text-sm">
                      <FiCheck className="mt-1 mr-2 text-indigo-500 flex-shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-indigo-400 mb-4">Inspira</h3>
            <p className="text-gray-400 text-sm">
              Empowering educational institutions with smart campus solutions for the digital age.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-indigo-400 mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/features" className="hover:text-indigo-400 transition-colors duration-300">Features</Link></li>
              <li><Link href="/pricing" className="hover:text-indigo-400 transition-colors duration-300">Pricing</Link></li>
              <li><Link href="/integrations" className="hover:text-indigo-400 transition-colors duration-300">Integrations</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-indigo-400 mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/blog" className="hover:text-indigo-400 transition-colors duration-300">Blog</Link></li>
              <li><Link href="/guides" className="hover:text-indigo-400 transition-colors duration-300">Guides</Link></li>
              <li><Link href="/webinars" className="hover:text-indigo-400 transition-colors duration-300">Webinars</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-indigo-400 mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-indigo-400 transition-colors duration-300">About</Link></li>
              <li><Link href="/careers" className="hover:text-indigo-400 transition-colors duration-300">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-indigo-400 transition-colors duration-300">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} Inspira. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
