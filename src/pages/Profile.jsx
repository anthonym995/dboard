import React, { useState, useEffect } from "react";
import {
  FiMail,
  FiPhone,
  FiGlobe,
  FiMapPin,
  FiUser,
  FiBriefcase,
  FiHome,
  FiCalendar,
  FiEdit,
  FiSettings,
  FiUsers,
  FiActivity,
} from "react-icons/fi";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
        const data = await response.json();
        setProfile({
          name: data.name,
          username: data.username,
          email: data.email,
          phone: data.phone,
          website: data.website,
          company: data.company.name,
          address: `${data.address.street}, ${data.address.city}, ${data.address.zipcode}`,
          jobTitle: "Software Engineer",
          dob: "1990-05-14",
          bio: "Passionate developer with expertise in web technologies and software design.",
          activity: "Active",
          followers: 1200,
          following: 350,
          settings: "Customized Preferences",
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500 text-lg">Loading profile...</div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-5xl w-full bg-white rounded-xl shadow-xl overflow-hidden p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Side - User Details */}
        <div className="col-span-1 bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-4xl mb-4">
              <FiUser />
            </div>
            <h1 className="text-2xl font-semibold text-gray-900">{profile.name}</h1>
            <p className="text-gray-500">@{profile.username}</p>
            <p className="text-gray-600 mt-2">{profile.jobTitle}</p>
          </div>
          <div className="mt-6 space-y-4">
            <div className="flex items-center space-x-3 text-gray-700">
              <FiCalendar className="text-gray-500" />
              <span>DOB: {profile.dob}</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-700">
              <FiMail className="text-gray-500" />
              <span>{profile.email}</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-700">
              <FiPhone className="text-gray-500" />
              <span>{profile.phone}</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-700">
              <FiGlobe className="text-gray-500" />
              <a
                href={`https://${profile.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {profile.website}
              </a>
            </div>
            <div className="flex items-center space-x-3 text-gray-700">
              <FiMapPin className="text-gray-500" />
              <span>{profile.address}</span>
            </div>
          </div>
        </div>

        {/* Right Side - Additional Details */}
        <div className="col-span-2 space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">About</h2>
            <p className="text-gray-600">{profile.bio}</p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 flex items-center space-x-3">
              <FiUsers className="text-gray-500 text-xl" />
              <div>
                <p className="text-gray-600">Followers</p>
                <p className="text-xl font-semibold text-gray-900">{profile.followers}</p>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 flex items-center space-x-3">
              <FiUsers className="text-gray-500 text-xl" />
              <div>
                <p className="text-gray-600">Following</p>
                <p className="text-xl font-semibold text-gray-900">{profile.following}</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 flex items-center space-x-3">
            <FiActivity className="text-gray-500 text-xl" />
            <div>
              <p className="text-gray-600">Activity Status</p>
              <p className="text-xl font-semibold text-green-600">{profile.activity}</p>
            </div>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 flex items-center space-x-3">
            <FiSettings className="text-gray-500 text-xl" />
            <div>
              <p className="text-gray-600">Settings</p>
              <p className="text-xl font-semibold text-gray-900">{profile.settings}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
