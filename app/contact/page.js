'use client';

import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FiMail, FiMapPin, FiSend, FiArrowLeft } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      message: Yup.string().required('Required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
    
      try {
        const res = await fetch("/api/save-contacts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
    
        if (!res.ok) {
          throw new Error("Failed to send");
        }
    
        setToast({
          visible: true,
          message: "Message sent successfully!",
          type: "success",
        });
    
        resetForm();
      } catch (error) {
        console.error("Error sending message:", error);
        setToast({
          visible: true,
          message: "Failed to send message. Please try again.",
          type: "error",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
    ,
  });

  // Auto-hide toast after 5 seconds
  useEffect(() => {
    if (toast?.visible) {
      const timer = setTimeout(() => {
        setToast({ ...toast, visible: false });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 relative">
      {/* Back arrow in top right */}
      <button 
        onClick={() => router.back()}
        className="absolute top-8 left-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
        aria-label="Go back"
      >
        <FiArrowLeft className="h-6 w-9 text-gray-600" />
      </button>

      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Contact Us
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            We'd love to hear from you
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900">Get in touch</h2>
            <p className="mt-4 text-gray-500">
              Have a question or want to work together? Fill out the form or reach us directly.
            </p>

            <div className="mt-8 space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-indigo-50 rounded-md p-3">
                  <FiMail className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Email</h3>
                  <p className="mt-1 text-gray-500">contact@example.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 bg-indigo-50 rounded-md p-3">
                  <FiMapPin className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Office</h3>
                  <p className="mt-1 text-gray-500">123 Main St, San Francisco, CA 94107</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900">Send us a message</h2>

            <form onSubmit={formik.handleSubmit} className="mt-6 space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    className={`block w-full px-4 py-3 rounded-md border ${formik.errors.name && formik.touched.name ? 'border-red-300' : 'border-gray-300'} shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
                  />
                  {formik.errors.name && formik.touched.name ? (
                    <p className="mt-2 text-sm text-red-600">{formik.errors.name}</p>
                  ) : null}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className={`block w-full px-4 py-3 rounded-md border ${formik.errors.email && formik.touched.email ? 'border-red-300' : 'border-gray-300'} shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
                  />
                  {formik.errors.email && formik.touched.email ? (
                    <p className="mt-2 text-sm text-red-600">{formik.errors.email}</p>
                  ) : null}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <div className="mt-1">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.message}
                    className={`block w-full px-4 py-3 rounded-md border ${formik.errors.message && formik.touched.message ? 'border-red-300' : 'border-gray-300'} shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
                  />
                  {formik.errors.message && formik.touched.message ? (
                    <p className="mt-2 text-sm text-red-600">{formik.errors.message}</p>
                  ) : null}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <FiSend className="mr-2 h-5 w-5" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast?.visible && (
        <div className={`fixed bottom-4 right-4 p-4 rounded-md shadow-lg transition-all duration-300 ${toast.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              {toast.type === 'success' ? (
                <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{toast.message}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}