"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { SignInButton } from "@clerk/nextjs";


export default function PricingPage() {
  const [activeIndex, setActiveIndex] = useState(1); // Start with Campus Plan in front
  const [direction, setDirection] = useState(null);
  const navRef = useRef(null);





  const plans = [
    {
      name: "Weekly",
      price: "$20",
      period: "per month after trial",
      description: "For individual learners",
      features: [
        "Course materials",
        "Collaboration tools",
        "Event calendar",
        "5GB storage",
        "Discussion forums",
        "Basic analytics",
      ],
    },
    {
      name: "Monthly",
      price: "$120",
      period: "per month after trial",
      description: "Departments & groups",
      features: [
        "Course management",
        "Project spaces",
        "Resource booking",
        "Lecture storage",
        "Team tools",
        "Advanced analytics",
      ],
    },
    {
      name: "Yearly",
      price: "$240",
      period: "per month after trial",
      description: "Campus-wide solution",
      features: [
        "Unlimited courses",
        "Institutional analytics",
        "Campus scheduling",
        "Compliance tracking",
        "Communication",
        "Custom reports",
      ],
    },
  ];

  const handleNext = () => {
    setDirection("right");
    setActiveIndex((prev) => (prev + 2) % plans.length);
  };

  const handlePrev = () => {
    setDirection("left");
    setActiveIndex((prev) => (prev - 1 + plans.length) % plans.length);
  };

  const getPosition = (index) => {
    const distance = (index - activeIndex + plans.length) % plans.length;
    if (distance === 0) return "center";
    if (distance === 1) return "right";
    return "left";
  };

  const variants = {
    center: { x: 0, zIndex: 3, scale: 1, opacity: 1 },
    left: { x: "-70%", zIndex: 1, scale: 0.85, opacity: 0.6 },
    right: { x: "70%", zIndex: 2, scale: 0.85, opacity: 0.6 },
    exitLeft: { x: "-100%", opacity: 0 },
    exitRight: { x: "100%", opacity: 0 },
  };

  return (
    <div className="flex flex-col min-h-screen">

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

      <section className="w-full bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden flex-grow">
        <div className="max-w-3xl mx-auto my-9 text-center mb-12">
          <h2 className="text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent  mb-4">
            Smart Campus Solutions
          </h2>
          <p className="text-black font-semibold text-sm mb-8">
            Start with 3 days free trial, no credit card required
          </p>
        </div>

        <div className="relative h-[420px] max-w-lg mx-auto">

      <button 
      onClick={handlePrev} className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </button>

    <button 
     onClick={handleNext} className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /> </svg>
      </button>
      <AnimatePresence custom={direction}>
        {plans.map((plan, index) => {
              const position = getPosition(index);
              return (
                <motion.div
                  key={index}
                  custom={direction}
                  initial={position}
                  animate={position}
                  exit={direction === "right" ? "exitRight" : "exitLeft"}
                  variants={variants}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className={`absolute inset-0 rounded-xl p-6 shadow-md ${
                    index === activeIndex ? "bg-black text-white" : "bg-white text-gray-900"
                  } flex flex-col`}
                >
                  <div className="mb-4">
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <p className="text-xs mt-1">{plan.description}</p>
                  </div>

                  <div className="mb-6">
                    <p className="text-2xl font-extrabold">{plan.price}</p>
                    <p className="text-sm opacity-80">3 days free trial</p>
                    <p className="text-xs opacity-60">{plan.period}</p>
                  </div>

                 <SignInButton> 
                  <button
                      className={`w-full py-2.5 rounded-md text-sm font-medium mb-4 ${
                        index === activeIndex ? "bg-white text-black hover:bg-gray-100" : "bg-black text-white hover:bg-gray-800"
                        } transition-colors`}
                    >
                      Start Free Trial
                    </button>
                    </SignInButton>

                 

                  <div className="text-left">
                    <h4 className="font-medium text-sm mb-2">Features</h4>
                    <ul className="space-y-1.5 text-xs">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-1">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="flex justify-center mt-6 gap-1">
          {plans.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > activeIndex ? "right" : "left");
                setActiveIndex(index);
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === activeIndex ? "bg-black scale-125" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        <div className="max-w-lg mx-auto mt-10 text-center text-sm text-black">
          <p>After your 3-day free trial, your selected membership will automatically continue.</p>
          <p className="mt-2">Cancel anytime during trial period with no charges.</p>
        </div>
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