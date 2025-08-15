"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { SignInButton } from "@clerk/nextjs";

export default function AboutUs() {
  const navRef = useRef(null);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

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

      {/* Hero Section */}
<section className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 py-12 px-4 sm:px-6 lg:px-8">
  <div className="max-w-5xl my-9 mx-auto text-center">
    <motion.h1
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-white text-5xl md:text-6xl font-bold font-auralize  mb-6"
    >
      About Inspira
    </motion.h1>
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.8 }}
      className="text-lg md:text-xl text-white max-w-3xl mx-auto"
    >
      Inspira is a modern workspace designed to help teams and individuals collaborate efficiently and achieve more. Our platform combines productivity tools, communication channels, and analytics to help you work smarter, not harder.
    </motion.p>
  </div>
</section>

      {/* Our Story */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div variants={fadeIn} initial="hidden" whileInView="visible" className="space-y-6">
          <h2 className="text-3xl font-bold text-indigo-600">Our Story</h2>
          <p className="text-black">
           Founded in 2020, Inspira began as a small team of passionate developers and designers with a shared vision: to address the growing problem of scattered workflows in modern teams. We observed that many organizations, from startups to educational institutions, struggled to manage tasks efficiently, communicate effectively, and track performance across different projects. Driven by this challenge, our mission became clear: to create a unified platform where teams of all sizes can collaborate seamlessly, stay organized, and focus on what truly matters.
          </p>
          <p className="text-black">
          Over the years, Inspira has grown steadily, evolving into a robust platform that now supports thousands of professionals, students, and organizations across the globe. By offering intuitive tools for task management, communication, and performance tracking, Inspira helps users save time, enhance productivity, and achieve their goals more efficiently. Our commitment to continuous innovation ensures that teams can adapt to changing demands, work smarter, and unlock their full potential in a fast-paced world.
          </p>
        </motion.div>
        <motion.div variants={fadeIn} initial="hidden" whileInView="visible">
          <img  src="our story.png"alt="Our Story"
            className="rounded-x2 shadow-lg w-full object-cover"
          />
        </motion.div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div variants={fadeIn} initial="hidden" whileInView="visible" className="space-y-6">
          <h2 className="text-3xl font-bold text-indigo-600">Our Mission</h2>
          <p className="text-black">
           To empower teams and individuals to work smarter, communicate effectively, and collaborate seamlessly by providing tools that simplify complex workflows, enhance productivity, and foster innovation. We aim to help our users overcome challenges efficiently, achieve their goals faster, and create meaningful impact in both their professional and personal endeavors, transforming the way work gets done.
          </p>
          <h2 className="text-3xl font-bold text-indigo-600">Our Vision</h2>
          <p className="text-black">
            To become the world's most trusted productivity platform, enabling professionals, students, and teams across the globe to work smarter, collaborate seamlessly, and unlock their full potential. We aim to transform the way people manage tasks, communicate, and innovate by providing intuitive, powerful tools that streamline workflows, foster creativity, and drive meaningful results. Our ultimate goal is to create a platform that not only improves efficiency but also inspires growth, learning, and innovation in every professional and educational environment.
          </p>
        </motion.div>
        <motion.div variants={fadeIn} initial="hidden" whileInView="visible">
          <img src="our mission.jpg"
            alt="Mission & Vision"
            className="rounded-x2 shadow-lg w-full object-cover"
          />
        </motion.div>
      </section>

      {/* Core Values */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <motion.h2
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          className="text-3xl md:text-4xl font-bold text-indigo-600 mb-12"
        >
          Our Core Values
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Collaboration", description: "We believe teamwork drives the best results, and we create tools that foster collaboration.", img: "collabration.jpg" },
            { title: "Innovation", description: "Constantly evolving and improving, we strive to bring creative solutions to complex problems.", img: "innovation.jpg" },
            { title: "Integrity", description: "Honesty, transparency, and accountability are at the heart of everything we do.", img: "integrity.jpg" },
          ].map((value, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center"
            >
              <img
                src={value.img}
                alt={value.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h4 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h4>
              <p className="text-gray-600 text-center">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <motion.h2
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          className="text-3xl md:text-4xl font-bold text-indigo-600 mb-12"
        >
          Meet Our Team
        </motion.h2>

        <div className="grid sm:grid-cols-3 md:grid-cols-4 gap-8">
          {[
            { name: "Alice Smith", role: "CEO", img: "alice smith.jpg" },
            { name: "John Doe", role: "CTO", img: "image.jpg" },
            { name: "Arunav Gupta", role: "Lead Designer", img: "gupta.jpg" },
            { name: "Michael Chen", role: "Product Manager", img: "image3.jpg" },
          ].map((member, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              transition={{ delay: index * 0.1 }}
              className="bg-indigo-600 rounded-xl shadow-lg flex flex-col items-center"
            >
              <h4 className="text-lg font-semibold text-black mb-2">{member.name}</h4>
              <p className="text-black mb-4">{member.role}</p>
              <img
                src={member.img}
                alt={`${member.name} profile`}
                className="w-24 h-24 rounded-full object-cover border-2 border-indigo-500"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-12 text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Join Our Community</h2>
          <p className="text-lg max-w-2xl mx-auto text-indigo-100 mb-8">
            Be part of a team that values productivity, creativity, and innovation.
          </p>
          <div className="flex justify-center gap-4">
            <SignInButton >

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 text-base font-medium text-indigo-600 bg-white rounded-md hover:bg-gray-100 shadow-lg"
                >
                Sign Up for Free
              </motion.button>
                </SignInButton>
            
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 text-base font-medium text-white border border-white rounded-md hover:bg-white/10"
              >
                Contact Sales
              </motion.button>
            </Link>
          </div>
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
