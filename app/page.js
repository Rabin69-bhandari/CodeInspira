"use client";
import { useUser, SignInButton, UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiPlay, FiCheck, FiX, FiMenu, FiBook, FiCalendar, FiMessageSquare, FiBarChart2 } from "react-icons/fi";

export default function Home() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Computer Science Student",
      content: "Inspira completely transformed how I study. The collaborative tools helped our team project score 20% higher than previous semesters!",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Engineering Student",
      content: "The performance analytics helped me identify my weak areas. My GPA improved from 3.2 to 3.8 in just one semester!",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "Medical Student",
      content: "The interactive learning modules made complex concepts so much easier to understand. I've recommended Inspira to all my classmates.",
      avatar: "https://randomuser.me/api/portraits/women/63.jpg"
    }
  ];
  const { user, isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      if (user?.id === "user_31EuwuplEAmDNTV8n0YgztSRftv") {
        router.replace("/admin");
      } else {
        router.replace("/dashboard");
      }
    }
  }, [isLoaded, isSignedIn, user, router]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovering) {
        setActiveTestimonial((prev) => (prev + 1) % testimonials?.length);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovering]);

  if (!isLoaded || isSignedIn) return null;

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
  };

 

  const features = [
    {
      icon: <FiBook className="w-6 h-6 text-indigo-600" />,
      title: "Interactive Learning",
      description: "Engage with course material through interactive tools and multimedia resources designed to enhance retention and understanding.",
      features: ["Smart flashcards with spaced repetition", "Video lectures with timestamped notes", "Interactive quizzes with instant feedback", "3D models for complex concepts"],
      bgColor: "bg-indigo-50"
    },
    {
      icon: <FiBarChart2 className="w-6 h-6 text-indigo-600" />,
      title: "Performance Tracking",
      description: "Monitor your academic progress with detailed analytics and actionable insights tailored to your learning style.",
      features: ["AI-powered grade predictions", "Study time tracking with productivity analysis", "Personalized recommendations", "Comparative analytics with class averages"],
      bgColor: "bg-purple-50"
    },
    {
      icon: <FiMessageSquare className="w-6 h-6 text-indigo-600" />,
      title: "Collaborative Tools",
      description: "Work seamlessly with classmates on group projects and assignments with our integrated collaboration suite.",
      features: ["Shared notebooks with version control", "Real-time document editing", "Integrated chat and video calls", "Task assignment and progress tracking"],
      bgColor: "bg-blue-50"
    }
  ];

  const stats = [
    { value: "10,000+", label: "Active Students", icon: <FiBook className="w-6 h-6 text-indigo-600" /> },
    { value: "95%", label: "Reported GPA Improvement", icon: <FiBarChart2 className="w-6 h-6 text-indigo-600" /> },
    { value: "50+", label: "Supported Institutions", icon: <FiCalendar className="w-6 h-6 text-indigo-600" /> },
    { value: "24/7", label: "Dedicated Support", icon: <FiMessageSquare className="w-6 h-6 text-indigo-600" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      
      {/* Fixed Navigation Bar */}
      <header className="fixed top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm transition-shadow duration-300">
        <div className="container relative flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 font-bold text-3xl">
            <Link href="/" className="text-indigo-600 hover:text-indigo-700 transition-colors duration-300">
              <span className="flex items-center">
                {/* Replace this with your logo */}
                <img className="w-35 " src="inspira.png" alt="inspira logo " />
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden ml-auto p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100 transition-colors duration-300"
            onClick={() => setMobileMenuOpen(true)}
          >
            <FiMenu className="w-6 h-6" />
          </button>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, x: '100%' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '100%' }}
                transition={{ type: 'spring', damping: 25 }}
                className="fixed inset-0 z-50 bg-white p-6 md:hidden"
              >
                <div className="flex justify-end mb-8">
                  <button 
                    className="p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100 transition-colors duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FiX className="w-6 h-6" />
                  </button>
                </div>
                <nav className="flex flex-col space-y-6 text-xl font-medium">
                  <Link 
                    href="/about" 
                    className="text-black hover:text-indigo-600 transition-colors duration-300 py-2 border-b border-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About
                  </Link>
                  <Link 
                    href="/features" 
                    className="text-black hover:text-indigo-600 transition-colors duration-300 py-2 border-b border-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Features
                  </Link>
                  <Link 
                    href="/pricing" 
                    className="text-black hover:text-indigo-600 transition-colors duration-300 py-2 border-b border-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Pricing
                  </Link>
                  <div className="pt-4 space-y-4">
                    <SignInButton mode="modal">
                      <button 
                        className="w-full px-4 py-3 text-base font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors duration-300 shadow-sm"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Get Started
                      </button>
                    </SignInButton>
                    <SignInButton mode="modal">
                      <button 
                        className="w-full px-4 py-3 text-base font-medium text-indigo-600 bg-white border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors duration-300 shadow-sm"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Sign In
                      </button>
                    </SignInButton>
                  </div>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>

          <nav className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center space-x-8 text-lg font-medium">
            <Link href="/about" className="text-black hover:text-indigo-600 transition-colors duration-300 relative group">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/features" className="text-black hover:text-indigo-600 transition-colors duration-300 relative group">
              Features
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/pricing" className="text-black hover:text-indigo-600 transition-colors duration-300 relative group">
              Pricing
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          <div className="ml-auto hidden md:flex items-center space-x-6">
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <>
                <SignInButton mode="modal">
                  <button className=" px-4 py-2 text-sm font-medium text-black hover:text-indigo-600 transition-colors duration-300 hover:bg-gray-100 rounded-md">
                    Sign In
                  </button>
                </SignInButton>
                <SignInButton mode="modal">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors duration-500 shadow-sm "
                  >
                    Get Started
                  </motion.button>
                </SignInButton>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Smart Campus Learning
              </span> <br />for the Modern Student
            </h1>
            <p className="mt-6 text-lg text-gray-700 leading-relaxed">
              Inspira transforms how students learn, collaborate, and succeed with an all-in-one platform designed for academic excellence and seamless teamwork. 
              Harness the power of AI-driven insights and collaborative tools to maximize your academic potential.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <SignInButton mode="modal">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 text-base font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors duration-300 shadow-lg flex items-center gap-2"
                >
                  Get Started <FiArrowRight />
                </motion.button>
              </SignInButton>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 text-base font-medium text-indigo-600 bg-white border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors duration-300 shadow-sm flex items-center gap-2"
              >
                Watch Demo <FiPlay />
              </motion.button>
            </div>
            <div className="mt-8 flex items-center gap-4 text-sm text-gray-500">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((item) => (
                  <motion.img 
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: item * 0.1 }}
                    src={`https://randomuser.me/api/portraits/${item % 2 === 0 ? 'women' : 'men'}/${item + 20}.jpg`}
                    alt="User"
                    className="w-8 h-8 rounded-full border-2 border-white hover:border-indigo-200 transition-all duration-300 hover:scale-110"
                  />
                ))}
              </div>
              <span>Trusted by <span className="font-semibold text-indigo-600">10,000+</span> students worldwide</span>
            </div>
          </motion.div>

          {/* Hero Splash Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative w-full h-96 md:h-[400px] lg:h-[450px] rounded-3xl overflow-hidden shadow-2xl border border-gray-200 bg-white"
          >
            <img
              src="home.jpg" 
              alt="Hero Splash"
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 text-center"
              >
                <div className="flex justify-center mb-3">
                  <div className="p-3 rounded-full bg-indigo-100">
                    {stat.icon}
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Academic Excellence Made Simple</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Everything you need to succeed in your academic journey, all in one powerful platform designed with students in mind.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              whileHover={{ y: -10 }}
              className="p-8 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden"
            >
              <div className={`absolute top-0 left-0 w-full h-1 ${feature.bgColor}`}></div>
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-indigo-50">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <ul className="space-y-2">
                {feature.features.map((item, i) => (
                  <li key={i} className="flex items-start text-gray-600">
                    <FiCheck className="mt-1 mr-2 text-indigo-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Students Are Saying</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Hear from students who transformed their academic experience with Inspira.
            </p>
          </motion.div>

          <div className="relative h-64 md:h-72 lg:h-80">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonials[activeTestimonial].id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center max-w-3xl mx-auto px-4"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className="mb-6">
                  <img 
                    src={testimonials[activeTestimonial].avatar} 
                    alt={testimonials[activeTestimonial].name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-indigo-500"
                  />
                </div>
                <blockquote className="text-xl md:text-2xl font-medium mb-4">
                  "{testimonials[activeTestimonial].content}"
                </blockquote>
                <div>
                  <p className="font-semibold text-indigo-300">{testimonials[activeTestimonial].name}</p>
                  <p className="text-gray-400 text-sm">{testimonials[activeTestimonial].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-3 h-3 rounded-full ${activeTestimonial === index ? 'bg-indigo-500' : 'bg-gray-600'}`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-12 text-center relative overflow-hidden"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Elevate Your Learning?</h2>
            <p className="text-lg max-w-2xl mx-auto text-indigo-100 mb-8">
              Join thousands of students using Inspira to achieve academic excellence and collaborate seamlessly.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <SignInButton mode="modal">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 text-lg font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors duration-300 shadow-lg flex items-center gap-2"
                >
                  Get Started for Free <FiArrowRight />
                </motion.button>
              </SignInButton>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 text-lg font-medium text-white bg-transparent border border-white rounded-lg hover:bg-white/10 transition-colors duration-300 shadow-sm flex items-center gap-2"
              >
                Talk to Our Team
              </motion.button>
            </div>
            <p className="mt-6 text-sm text-indigo-200">
              No credit card required. 14-day free trial.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-indigo-400 mb-4">Inspira</h3>
            <p className="text-gray-400 text-sm mb-4">
              Empowering the next generation of learners with smart, collaborative tools for academic success.
            </p>
            <div className="flex space-x-4">
              {['Twitter', 'Facebook', 'Instagram', 'LinkedIn'].map((social, index) => (
                <a key={index} href="#" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300">
                  <span className="sr-only">{social}</span>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-indigo-400 mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/features" className="hover:text-indigo-400 transition-colors duration-300">Features</Link></li>
              <li><Link href="/pricing" className="hover:text-indigo-400 transition-colors duration-300">Pricing</Link></li>
              <li><Link href="/integrations" className="hover:text-indigo-400 transition-colors duration-300">Integrations</Link></li>
              <li><Link href="/changelog" className="hover:text-indigo-400 transition-colors duration-300">Changelog</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-indigo-400 mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/blog" className="hover:text-indigo-400 transition-colors duration-300">Blog</Link></li>
              <li><Link href="/guides" className="hover:text-indigo-400 transition-colors duration-300">Guides</Link></li>
              <li><Link href="/webinars" className="hover:text-indigo-400 transition-colors duration-300">Webinars</Link></li>
              <li><Link href="/support" className="hover:text-indigo-400 transition-colors duration-300">Support</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-indigo-400 mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-indigo-400 transition-colors duration-300">About</Link></li>
              <li><Link href="/careers" className="hover:text-indigo-400 transition-colors duration-300">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-indigo-400 transition-colors duration-300">Contact</Link></li>
              <li><Link href="/press" className="hover:text-indigo-400 transition-colors duration-300">Press</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 Inspira Technologies. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-gray-400 hover:text-indigo-400 text-sm transition-colors duration-300">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-400 hover:text-indigo-400 text-sm transition-colors duration-300">Terms of Service</Link>
            <Link href="/cookies" className="text-gray-400 hover:text-indigo-400 text-sm transition-colors duration-300">Cookie Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}