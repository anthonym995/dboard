import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Overview = () => {
  // Sample data for the chart
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"], // Months
    datasets: [
      {
        label: "Revenue",
        data: [12000, 15000, 13000, 17000, 16000, 18000, 20000], // Revenue data for each month
        borderColor: "#4CAF50", // Line color
        backgroundColor: "rgba(76, 175, 80, 0.2)", // Line fill color (transparent green)
        fill: true, // Fill the area under the line
        tension: 0.3, // Smoother line
        pointRadius: 5, // Circle radius at each point
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Revenue Over Time",
        font: {
          size: 18,
        },
      },
      tooltip: {
        mode: "nearest",
        intersect: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Month",
        },
      },
      y: {
        title: {
          display: true,
          text: "Revenue ($)",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="flex-1 p-6">
      {/* Title Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Overview</h1>
        <div className="flex items-center space-x-4">
          <button className="text-gray-500">
            <span>🔔</span> {/* Notification Icon */}
          </button>
          <button className="text-gray-500">
            <span>👤</span> {/* Profile Icon */}
          </button>
        </div>
      </div>

      {/* Key Metrics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-medium text-gray-600">Total Users</h3>
          <p className="text-2xl font-bold text-gray-900">1,240</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-medium text-gray-600">Active Users</h3>
          <p className="text-2xl font-bold text-gray-900">980</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-medium text-gray-600">Revenue</h3>
          <p className="text-2xl font-bold text-gray-900">$24,500</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h3 className="text-lg font-medium text-gray-600 mb-4">Revenue Over Time</h3>
        <Line data={data} options={options} />
      </div>

      {/* Quick Actions/Shortcuts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <button className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600">Add User</button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <button className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600">View Reports</button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <button className="w-full bg-yellow-500 text-white p-3 rounded-lg hover:bg-yellow-600">Create Task</button>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h3 className="text-lg font-medium text-gray-600 mb-4">Recent Activities</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <span className="text-blue-500">
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 110-16 8 8 0 010 16zm0 2a10 10 0 100-20 10 10 0 000 20z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
            <div>
              <p className="text-gray-900">
                User <span className="font-semibold">John Doe</span> logged in
              </p>
              <p className="text-sm text-gray-500">10 minutes ago</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <span className="text-green-500">
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zm-8-4a4 4 0 100 8 4 4 0 000-8z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
            <div>
              <p className="text-gray-900">
                Report generated for <span className="font-semibold">Sales</span>
              </p>
              <p className="text-sm text-gray-500">1 hour ago</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <span className="text-yellow-500">
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 2a2 2 0 012 2v12a2 2 0 01-2 2H2a2 2 0 01-2-2V4a2 2 0 012-2h16zm-1 2H3v12h14V4z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
            <div>
              <p className="text-gray-900">
                New user <span className="font-semibold">Jane Smith</span> registered
              </p>
              <p className="text-sm text-gray-500">2 hours ago</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <span className="text-red-500">
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 110-16 8 8 0 010 16zm0 2a10 10 0 100-20 10 10 0 000 20z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
            <div>
              <p className="text-gray-900">
                Error detected in <span className="font-semibold">Database</span>
              </p>
              <p className="text-sm text-gray-500">3 hours ago</p>
            </div>
          </div>
        </div>
      </div>

      {/* System Health/Status */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h3 className="text-lg font-medium text-gray-600 mb-4">System Health</h3>
        <div className="flex items-center space-x-4">
          <span className="text-green-500">🟢</span> {/* Online/healthy */}
          <p className="text-gray-800">System is Online and Healthy</p>
        </div>
      </div>

      {/* User Feedback/Surveys */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h3 className="text-lg font-medium text-gray-600 mb-4">User Feedback</h3>
        <p className="text-gray-800 mb-4">We would love to hear your thoughts on the system!</p>
        <button className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600">Take Survey</button>
      </div>

      {/* Footer */}
      <div className="bg-white text-gray-900 py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-between">
            {/* Footer Left: Links */}
            <div className="w-full sm:w-1/2 md:w-1/3 mb-4 md:mb-0">
              <h4 className="text-lg font-semibold mb-3 text-gray-700">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-500 hover:text-gray-700">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-gray-700">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-gray-700">
                    Help Center
                  </a>
                </li>
              </ul>
            </div>

            {/* Footer Middle: Contact */}
            <div className="w-full sm:w-1/2 md:w-1/3 mb-4 md:mb-0">
              <h4 className="text-lg font-semibold mb-3 text-gray-700">Contact Us</h4>
              <ul className="space-y-2">
                <li>
                  <span className="text-gray-500">Email: support@example.com</span>
                </li>
                <li>
                  <span className="text-gray-500">Phone: +1 234 567 890</span>
                </li>
              </ul>
            </div>

            {/* Footer Right: Social Links */}
            <div className="w-full sm:w-1/2 md:w-1/3">
              <h4 className="text-lg font-semibold mb-3 text-gray-700">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-500 hover:text-gray-700">
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M10 2a8 8 0 100 16 8 8 0 010-16zM9 4h2v12H9V4zM5 9h2v7H5V9zm8 0h2v7h-2V9z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-700">
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M2.5 10a7.5 7.5 0 1115 0 7.5 7.5 0 01-15 0zM10 5a5 5 0 100 10 5 5 0 000-10z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-700">
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M10 3a7 7 0 11-7 7 7 7 0 017-7zM3 10a7 7 0 0114 0A7 7 0 013 10z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-300 pt-4 text-center">
            <p className="text-sm text-gray-500">&copy; 2024 Your Company, All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
