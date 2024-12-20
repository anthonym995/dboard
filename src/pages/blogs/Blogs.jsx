import React, { useState, useEffect } from "react";
import { fetchblogs } from "../../api/blogs";
import Loader from "../../components/ui/Loader";
import ErrorState from "../../components/ui/ErrorState";
import { Link } from "react-router-dom";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetchblogs();
      setBlogs(response);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) return <Loader height="true" />;
  if (error) return <ErrorState />;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Blogs</h1>
      {blogs.length > 0 ? (
        <ul className="space-y-6 p-4">
          {blogs.map((blog) => (
            <li
              key={blog._id}
              className="bg-white border border-gray-300 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <img
                  src={blog.authorAvatar || "https://via.placeholder.com/40"}
                  alt="Author Avatar"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <h3 className="text-sm font-semibold text-gray-800">
                    {blog.author || "Anonymous"}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <Link
                to={`/blogs/${blog._id}`}
                className="text-lg font-medium text-gray-900 mb-2 hover:underline block"
              >
                {blog.title}
              </Link>
              <p className="text-sm text-gray-700">{blog.description}</p>
              <p className="text-sm text-gray-700">{blog.status}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500 mt-8">No blogs available.</p>
      )}
    </div>
  );
}
