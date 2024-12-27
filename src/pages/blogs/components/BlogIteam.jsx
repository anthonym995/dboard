import React from 'react';
import { Link } from "react-router-dom";

export default function BlogIteam({ blog }) {
  const {
    _id,
    author = "Anonymous",
    description = "No description available",
    status = "Unknown",
    authorAvatar,
    title = "Untitled Blog",
    createdAt,
  } = blog;

  return (
    <li
      className="bg-white border border-gray-300 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-300"
    >
      <div className="flex items-center mb-4">
        <img
          src={authorAvatar || "https://via.placeholder.com/40"}
          alt="Author Avatar"
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <h3 className="text-sm font-semibold text-gray-800">{author}</h3>
          <p className="text-xs text-gray-500">
            {createdAt
              ? new Date(createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "Unknown Date"}
          </p>
        </div>
      </div>
      <Link
        to={`/blogs/${_id}`}
        className="text-lg font-medium text-gray-900 mb-2 hover:underline block"
      >
        {title}
      </Link>
      <p className="text-sm text-gray-700">{description}</p>
      <p className="text-sm text-gray-700">{status}</p>
    </li>
  );
}
