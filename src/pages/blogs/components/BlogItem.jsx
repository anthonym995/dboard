import React from "react";
import { Link } from "react-router-dom";

export default function BlogItem({ blog }) {
  const DEFAULT_AVATAR = "http://placekitten.com/250/250";

  const {
    _id,
    author = "Anonymous",
    description = "No description available",
    authorAvatar,
    title = "Untitled Blog",
  } = blog;

  const truncateTitle = (title, wordLimit) => {
    const words = title.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return title;
  };

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 h-auto">
      <Link to={`/blogs/${_id}`}>
        <img
          className="rounded-t-lg w-full h-48 object-cover"
          src={authorAvatar || DEFAULT_AVATAR}
          alt={`${author}'s avatar`}
        />
      </Link>
      <div className="p-5">
        <Link to={`/blogs/${_id}`}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {truncateTitle(title, 5)}
          </h5>
        </Link>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
        <Link
          to={`/blogs/${_id}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
