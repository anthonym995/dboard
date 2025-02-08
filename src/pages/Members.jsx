import React, { useState, useEffect } from "react";
import { FiUser, FiMail, FiPhone, FiGlobe, FiMapPin, FiBriefcase } from "react-icons/fi";

export default function Members() {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await response.json();
        setMembers(data);
      } catch (error) {
        console.error("Error fetching members:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, []);

  if (isLoading) {
    return <div className="text-center py-10 text-gray-500">Loading members...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Team Members</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => (
            <div
              key={member.id}
              className="bg-white p-6 rounded-lg border border-gray-200 shadow-md flex flex-col items-center text-center transition-transform transform hover:scale-105"
            >
              <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-3xl mb-4">
                <FiUser />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">{member.name}</h2>
              <p className="text-gray-600">@{member.username}</p>
              <div className="mt-4 w-full">
                <div className="flex items-center space-x-2 text-gray-500 text-sm">
                  <FiMail className="text-gray-400" />
                  <span>{member.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-500 text-sm mt-2">
                  <FiPhone className="text-gray-400" />
                  <span>{member.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-500 text-sm mt-2">
                  <FiGlobe className="text-gray-400" />
                  <a
                    href={`https://${member.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {member.website}
                  </a>
                </div>
                <div className="flex items-center space-x-2 text-gray-500 text-sm mt-2">
                  <FiBriefcase className="text-gray-400" />
                  <span>{member.company.name}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-500 text-sm mt-2">
                  <FiMapPin className="text-gray-400" />
                  <span>
                    {member.address.street}, {member.address.city}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
