import React, { useState } from "react";
import { FiUser, FiLock, FiBell, FiSettings, FiLogOut } from "react-icons/fi";

export default function Settings() {
  const [settings, setSettings] = useState({
    notifications: true,
    privacy: "Public",
    accountSecurity: "Two-Factor Authentication Enabled",
  });

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Settings</h1>

        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 flex items-center space-x-4">
            <FiUser className="text-gray-500 text-2xl" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Profile Settings</h2>
              <p className="text-gray-600">Manage your profile details and preferences.</p>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 flex items-center space-x-4">
            <FiBell className="text-gray-500 text-2xl" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
              <p className="text-gray-600">{settings.notifications ? "Enabled" : "Disabled"}</p>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 flex items-center space-x-4">
            <FiLock className="text-gray-500 text-2xl" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Privacy Settings</h2>
              <p className="text-gray-600">{settings.privacy}</p>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 flex items-center space-x-4">
            <FiSettings className="text-gray-500 text-2xl" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Account Security</h2>
              <p className="text-gray-600">{settings.accountSecurity}</p>
            </div>
          </div>

          <div className="bg-red-50 p-6 rounded-lg border border-red-200 flex items-center space-x-4 cursor-pointer hover:bg-red-100">
            <FiLogOut className="text-red-500 text-2xl" />
            <div>
              <h2 className="text-lg font-semibold text-red-600">Log Out</h2>
              <p className="text-red-500">Securely sign out of your account.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
