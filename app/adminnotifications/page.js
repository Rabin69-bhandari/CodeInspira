"use client";
import React, { useEffect, useState } from "react";
import AdminSidebar from "../components/adminsidebar";
import { FiSend, FiTrash2, FiBell, FiClock } from "react-icons/fi";
import { motion } from "framer-motion";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  // Fetch notifications history
  const fetchNotifications = async () => {
    try {
      const res = await fetch("/api/notifications");
      const data = await res.json();
      setNotifications(data);
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Send notification
  const handleSendNotification = async () => {
    if (!message.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      if (res.ok) {
        setMessage("");
        fetchNotifications();
      }
    } catch (err) {
      console.error("Error sending notification:", err);
    } finally {
      setLoading(false);
    }
  };

  // Delete notification
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/notifications/${id}`, {
        method: "DELETE",
      });
      if (res.ok) fetchNotifications();
    } catch (err) {
      console.error("Failed to delete notification:", err);
    }
  };

  // Filter notifications by tab
  const filteredNotifications = notifications.filter(notif => {
    if (activeTab === "all") return true;
    // Add more filters if needed (e.g., "unread", "important")
    return true;
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="flex-1 p-6 md:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Notifications</h2>
              <p className="text-gray-500">Manage and send system notifications</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              className={`px-4 py-2 font-medium text-sm flex items-center ${activeTab === "all" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
              onClick={() => setActiveTab("all")}
            >
              <FiBell className="mr-2" />
              All Notifications
            </button>
            {/* Add more tabs if needed */}
          </div>

          {/* Send Notification Card */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Send New Notification</h3>
            <textarea
              className="w-full p-4 border border-gray-200 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Type your notification message here..."
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="flex justify-end">
              <button
                onClick={handleSendNotification}
                disabled={loading || !message.trim()}
                className={`px-6 py-2 rounded-lg flex items-center transition-all ${loading || !message.trim() ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg"}`}
              >
                <FiSend className="mr-2" />
                {loading ? "Sending..." : "Send Notification"}
              </button>
            </div>
          </motion.div>

          {/* Notification History */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Notification History</h3>
              <span className="text-sm text-gray-500">
                {filteredNotifications.length} {filteredNotifications.length === 1 ? "item" : "items"}
              </span>
            </div>

            {filteredNotifications.length === 0 ? (
              <div className="text-center py-12">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <FiBell className="text-gray-400 text-xl" />
                </div>
                <h4 className="text-gray-500 font-medium">No notifications yet</h4>
                <p className="text-gray-400 text-sm mt-1">Notifications you send will appear here</p>
              </div>
            ) : (
              <ul className="space-y-3">
                {filteredNotifications.map((notif) => (
                  <motion.li
                    key={notif._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="group p-4 hover:bg-gray-50 rounded-lg transition-colors border border-gray-100"
                  >
                    <div className="flex justify-between">
                      <div className="flex items-start">
                        <div className="bg-blue-100 p-2 rounded-lg mr-4">
                          <FiBell className="text-blue-600" />
                        </div>
                        <div>
                          <p className="text-gray-800">{notif.message}</p>
                          <div className="flex items-center mt-2 text-xs text-gray-400">
                            <FiClock className="mr-1" />
                            <span>{new Date(notif.createdAt).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDelete(notif._id)}
                        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all p-2"
                        title="Delete notification"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </motion.li>
                ))}
              </ul>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;