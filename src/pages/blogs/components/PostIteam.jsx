import React, { useState } from "react";


export default function PostItem({ _id, title, content, author, status, onUpdate }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Toggle modal open/close
  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleEditPost = () => {
    toggleModal();
  };

  // Handle updating the blog post
  const handleUpdateBlog = (updatedBlog) => {
    onUpdate(updatedBlog); // Call the onUpdate prop to notify the parent
    setIsModalOpen(false); // Close the modal after update
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-md p-6">
      {/* Header Section */}
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
        <div>
          <h2 className="text-base font-semibold text-gray-800">
            {author || "Unknown Author"}
          </h2>
          <p className="text-xs text-gray-500">{new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* Post Content */}
      <h1 className="text-lg font-bold text-gray-800 mb-2">
        {title || "Untitled Post"}
      </h1>
      <p className="text-sm text-gray-700 mb-4">{content || "No content available."}</p>
      <p className="text-sm text-gray-700 mb-4">Status: {status || "N/A"}</p>

      {/* Footer Section */}
      <div className="border-t border-gray-300 pt-4 flex justify-around text-gray-500">
        <button className="flex items-center space-x-2 hover:text-blue-500">
          <GoThumbsup />
          <span>Like</span>
        </button>
        <button className="flex items-center space-x-2 hover:text-blue-500">
          <GoThumbsdown />
          <span>Dislike</span>
        </button>
        <button className="flex items-center space-x-2 hover:text-blue-500">
          <span className="material-icons">comment</span>
        </button>
        <button className="flex items-center space-x-2 hover:text-blue-500">
          <RiShareForwardFill />
          <span>Share</span>
        </button>
      </div>

      {/* Open Modal Button */}
      <div className="mt-4 text-right">
        <button
          onClick={handleEditPost}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Edit Post
        </button>
      </div>

      {/* BlogForm Modal */}
      {isModalOpen && (
        <BlogForm
          isModalOpen={isModalOpen}
          toggleModal={toggleModal}
          initialData={{ _id, title, content, author, status }}
          onUpdateBlog={handleUpdateBlog}
        />
      )}
    </div>
  );
}
