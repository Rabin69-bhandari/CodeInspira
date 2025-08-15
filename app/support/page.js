"use client";
import { motion } from "framer-motion";
import { useRef } from "react";

export default function SupportPage() {
  const navRef = useRef(null);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-150 text-white">

      {/* Glass Sticky Navbar */}
      <header
        ref={navRef}
        className="sticky top-0 z-50 w-full border-b border-purple-500/30 bg-black/10 backdrop-blur-lg shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-16 justify-between">
          <h1 className="text-xl font-bold text-purple-400">Inspira Support</h1>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-purple-600 to-purple-800 py-16 px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold text-white mb-4"
        >
          How can we help you?
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto"
        >
          Our support team is here to assist you with any questions or issues. Fill out the form below and we’ll get back to you as soon as possible.
        </motion.p>
      </section>

      {/* Support Cards Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {[
          { title: "FAQs", description: "Find answers to the most common questions.", icon: "📚" },
          { title: "Live Chat", description: "Chat with our support team instantly.", icon: "💬" },
          { title: "Email Support", description: "Send us a detailed message.", icon: "✉️" },
        ].map((card, index) => (
          <motion.div
            key={index}
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 p-8 rounded-2xl shadow-xl flex flex-col items-center text-center"
          >
            <div className="text-4xl mb-4">{card.icon}</div>
            <h3 className="text-xl font-bold mb-2">{card.title}</h3>
            <p className="text-white/80">{card.description}</p>
          </motion.div>
        ))}
      </section>

      {/* Contact Form */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          className="bg-gray-900 rounded-2xl p-8 shadow-xl"
        >
          <h2 className="text-3xl font-bold text-purple-400 mb-6 text-center">Send us a message</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-white mb-2">Name</label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-white mb-2">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-white mb-2">Message</label>
              <textarea
                rows="5"
                placeholder="Your message..."
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 transition-all text-white font-bold shadow-lg"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </section>

    </div>
  );
}
