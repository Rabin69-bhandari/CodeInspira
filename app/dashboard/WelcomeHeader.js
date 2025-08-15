"use client";
import React from "react";

const WelcomeHeader = ({ user }) => {
  return (
    <div className="mb-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
        Welcome back, {user.firstName || "Student"}!
      </h1>
      <p className="text-gray-600">Here's what's happening with your courses</p>
    </div>
  );
};

export default WelcomeHeader;