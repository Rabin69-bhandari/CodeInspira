"use client"

import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import Sidebar from '../components/sidebar';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch('/api/notifications');
        if (!res.ok) {
          throw new Error('Failed to fetch notifications');
        }
        const data = await res.json();
        setNotifications(data);
        setUnreadCount(data.filter(n => !n.read).length);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification._id === id ? { ...notification, read: true } : notification
    ));
    setUnreadCount(unreadCount - 1);
    // You might want to add API call to update read status in backend
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => 
      ({ ...notification, read: true })
    ));
    setUnreadCount(0);
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <Loader />
    </div>
  );

  if (error) return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm text-red-700">Error: {error}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className='flex'>
    <Sidebar />
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Notifications
          {unreadCount > 0 && (
            <span className="ml-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
              {unreadCount} new
            </span>
          )}
        </h2>
        {notifications.length > 0 && unreadCount > 0 && (
          <button 
            onClick={markAllAsRead}
            className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Mark all as read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">No notifications</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">We'll notify you when something arrives.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div 
              key={notification._id} 
              onClick={() => markAsRead(notification._id)}
              className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer hover:shadow-md ${
                notification.read 
                  ? 'bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700' 
                  : 'bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-800'
              }`}
            >
              <div className="flex items-start">
                <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                  notification.read 
                    ? 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300' 
                    : 'bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-blue-300'
                }`}>
                  {notification.icon || (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                    </svg>
                  )}
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex items-center justify-between">
                    <p className={`text-sm font-medium ${
                      notification.read 
                        ? 'text-gray-800 dark:text-gray-200' 
                        : 'text-blue-800 dark:text-blue-200'
                    }`}>
                      {notification.title || 'New notification'}
                    </p>
                    <time className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(notification.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </time>
                  </div>
                  <p className={`mt-1 text-sm ${
                    notification.read 
                      ? 'text-gray-600 dark:text-gray-400' 
                      : 'text-blue-600 dark:text-blue-300'
                  }`}>
                    {notification.message}
                  </p>
                  {notification.action && (
                    <button className="mt-2 text-xs font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                      {notification.action}
                    </button>
                  )}
                </div>
                {!notification.read && (
                  <div className="ml-2 flex-shrink-0">
                    <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default Notification;