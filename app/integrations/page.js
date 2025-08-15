"use client";

import React from "react";

const integrations = [
  { 
    name: "Google Workspace", 
    logo: "google.jpg", 
    description: "Seamlessly connect Gmail, Drive, and Calendar." 
  },
  { 
    name: "Slack", 
    logo: "slack.jpg", 
    description: "Real-time communication with your teams." 
  },
  { 
    name: "Microsoft 365", 
    logo: "microsoft.jpg", 
    description: "Collaborate using Word, Excel, and Teams." 
  },
  { 
    name: "Zoom", 
    logo: "zoom.jpg", 
    description: "Host virtual classes and meetings." 
  },
  { 
    name: "Moodle", 
    logo: "moodle.png", 
    description: "Integrate your LMS for course management." 
  },
  { 
    name: "Discord", 
    logo: "discord.jpg", 
    description: "Build communities and discussion channels." 
  },
];

export default function Integrations() {
  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Smart Campus Integrations
        </h2>
        <p className="text-gray-600 mb-12">
          Connect all your favorite tools in one platform to enhance learning, collaboration, and productivity.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {integrations.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition transform hover:-translate-y-1 hover:scale-105"
            >
              <div className="mb-4">
                <img
                  src={item.logo}
                  alt={item.name}
                  className="mx-auto h-16 w-auto object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
              <p className="text-gray-500 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
