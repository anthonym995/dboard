import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await response.json();
        const formattedData = data.slice(0, 10).map((report) => ({
          id: report.id,
          title: report.title,
          date: new Date().toISOString().split("T")[0],
          status: ["Completed", "Pending", "In Progress"][Math.floor(Math.random() * 3)],
          description: report.body,
        }));
        setReports(formattedData);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (isLoading) {
    return <div className="text-center py-10 text-gray-500">Loading reports...</div>;
  }

  const chartData = {
    labels: reports.map((report) => report.title.substring(0, 10) + "..."),
    datasets: [
      {
        label: "Reports Status",
        data: reports.map((report) => (report.status === "Completed" ? 3 : report.status === "Pending" ? 2 : 1)),
        backgroundColor: ["#4caf50", "#ffeb3b", "#2196f3"],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Reports Chart</h2>
        <Bar data={chartData} className="mb-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Reports List */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Reports Overview</h1>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                <thead>
                  <tr className="bg-gray-100 border-b">
                    <th className="py-3 px-4 text-left text-gray-700 font-semibold">Title</th>
                    <th className="py-3 px-4 text-left text-gray-700 font-semibold">Date</th>
                    <th className="py-3 px-4 text-left text-gray-700 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((report) => (
                    <tr key={report.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-800 font-medium">{report.title}</td>
                      <td className="py-3 px-4 text-gray-600">{report.date}</td>
                      <td
                        className={`py-3 px-4 font-semibold ${
                          report.status === "Completed"
                            ? "text-green-600"
                            : report.status === "Pending"
                            ? "text-yellow-600"
                            : "text-blue-600"
                        }`}
                      >
                        {report.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column - Report Details */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Report Details</h2>
            {reports.length > 0 ? (
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{reports[0].title}</h3>
                <p className="text-gray-600 mt-2">{reports[0].description}</p>
                <p className="text-gray-500 mt-4">
                  Status: <span className="font-semibold">{reports[0].status}</span>
                </p>
                <p className="text-gray-500">Date: {reports[0].date}</p>
              </div>
            ) : (
              <p className="text-gray-500">No reports available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
