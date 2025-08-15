"use client";
import React from "react";
import Sidebar from "../components/sidebar";
import { 
  FiInfo, 
  FiShield, 
  FiMail, 
  FiLock, 
  FiUser, 
  FiCreditCard, 
  FiBell,
  FiDatabase,
  FiDownload,
  FiTrash2
} from "react-icons/fi";

const PrivacyPolicy = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg p-8 mb-10 text-white">
            <div className="flex items-center gap-4">
              <FiShield className="text-3xl" />
              <div>
                <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
                <p className="text-purple-100">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
            </div>
          </div>

          {/* Policy Content */}
          <div className="space-y-10">
            <section className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <FiUser className="text-purple-600 text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Information We Collect</h2>
                  <p className="text-gray-600 mb-4">
                    We collect information you provide directly, including when you create an account, make a purchase, 
                    or contact us. This may include:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                    <li className="flex items-start gap-2">
                      <FiUser className="text-purple-500 mt-1 flex-shrink-0" />
                      <span>Personal details (name, email address, contact information)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FiCreditCard className="text-purple-500 mt-1 flex-shrink-0" />
                      <span>Payment and transaction details</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FiBell className="text-purple-500 mt-1 flex-shrink-0" />
                      <span>Communication preferences</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <FiDatabase className="text-purple-600 text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">2. How We Use Your Information</h2>
                  <p className="text-gray-600 mb-4">We use the collected information to:</p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                    <li>Provide, maintain, and improve our services</li>
                    <li>Process transactions and send related information</li>
                    <li>Respond to your requests and provide customer support</li>
                    <li>Send technical notices, updates, and security alerts</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <FiInfo className="text-purple-600 text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">3. Data Sharing</h2>
                  <p className="text-gray-600 mb-4">
                    We do not sell your personal information. We may share information with:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                    <li>Service providers who perform services on our behalf</li>
                    <li>Legal authorities when required by law</li>
                    <li>Business transfers (in case of merger or acquisition)</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <FiDownload className="text-purple-600 text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">4. Your Rights</h2>
                  <p className="text-gray-600 mb-4">You have the right to:</p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                    <li className="flex items-start gap-2">
                      <FiDatabase className="text-purple-500 mt-1 flex-shrink-0" />
                      <span>Access, correct, or delete your personal information</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FiLock className="text-purple-500 mt-1 flex-shrink-0" />
                      <span>Object to or restrict certain data processing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FiDownload className="text-purple-500 mt-1 flex-shrink-0" />
                      <span>Receive your data in a portable format</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FiTrash2 className="text-purple-500 mt-1 flex-shrink-0" />
                      <span>Withdraw consent at any time</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <FiLock className="text-purple-600 text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">5. Security</h2>
                  <p className="text-gray-600 mb-4">
                    We implement appropriate technical and organizational measures to protect your personal information.
                    However, no system can be 100% secure.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <FiInfo className="text-purple-600 text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">6. Changes to This Policy</h2>
                  <p className="text-gray-600 mb-4">
                    We may update this policy periodically. We'll notify you of significant changes by posting the new policy 
                    on our website with a new "Last Updated" date.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <FiMail className="text-purple-600 text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">7. Contact Us</h2>
                  <p className="text-gray-600">
                    For questions about this policy, please contact us at:
                    <a href="mailto:privacy@yourdomain.com" className="text-purple-600 hover:underline ml-1 font-medium">
                      privacy@yourdomain.com
                    </a>
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;