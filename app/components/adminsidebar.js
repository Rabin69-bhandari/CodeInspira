"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FiHome, FiUser, FiSettings, FiChevronLeft, FiMenu } from "react-icons/fi";
import { useUser } from "@clerk/nextjs";
import { IoIosNotificationsOutline } from "react-icons/io";
import { SignOutButton } from "@clerk/nextjs";
import { IoExitOutline } from "react-icons/io5";
import { MdHelpOutline } from "react-icons/md";
import { IoBagSharp } from "react-icons/io5";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { user } = useUser();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      <div
        className="bg-white text-gray-800 h-screen p-4 flex flex-col transition-all duration-300 ease-in-out border-r border-gray-200"
        style={{ width: isOpen ? "240px" : "80px" }}
      >
        {/* Logo */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-gray-200">
          {isOpen ? (
            <img src="inspira.png" alt="logo" className="h-15 " />
          ) : (
            <div className="h-0 w-0"></div>
          )}
          <button
            onClick={toggleSidebar}
            className="p-2 mx-auto text-gray-500 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-300"
          >
            {isOpen ? <FiChevronLeft size={20} /> : <FiMenu size={20} />}
          </button>
        </div>

        {/* Menu Links */}
        <nav className="flex-1 space-y-2">
          {[
            { href: "/admin", icon: <FiHome size={20} />, label: "Admin Panel" },
            { href: "/admin-courses", icon: <IoBagSharp size={20} />, label: "Courses" },
            { href: "/adminnotifications", icon: <IoIosNotificationsOutline size={20} />, label: "Notification" },
          ].map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="flex items-center p-3 text-gray-700 rounded-lg hover:bg-purple-50 hover:text-[rgb(79,57,246)] transition-colors duration-200"
            >
              <span className="text-[rgb(79,57,246)]">{item.icon}</span>
              {isOpen && <span className="ml-3">{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Log out */}
        <SignOutButton>
          <button className="flex items-center p-3 rounded-xl hover:bg-purple-50 hover:text-[rgb(79,57,246)] transition-colors duration-200 text-gray-700">
            <IoExitOutline className="text-[rgb(79,57,246)]" size={20} />
            {isOpen && <span className="ml-3">Log Out</span>}
          </button>
        </SignOutButton>

        {/* User Profile */}
        {isOpen && (
          <div className="pt-4 mt-auto border-t border-gray-200">
            <div className="flex items-center p-2 rounded-lg hover:bg-purple-50">
              <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
                <img src={user?.imageUrl} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{user?.fullName}</p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSidebar;
