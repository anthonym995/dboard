import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { blogsById } from "../../../api/blogs";
import Loader from "../../../components/ui/Loader";
import ErrorState from "../../../components/ui/ErrorState";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState([]); // Initialize to null
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPost = async () => {
    try {
      setIsLoading(true);
      console.log("Fetching post with ID:", id); // Debug the ID

      const data = await blogsById(id);

      if (!data) {
        throw new Error("No data returned from the API.");
      }

      console.log("API Response:", data); // Log the response
      setPost(data);
    } catch (err) {
      console.error("Error fetching post:", err.message); // Log error
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  if (isLoading) return <Loader />;
  if (error) return <ErrorState errorMessage={error.message} />;
  if (!post) return <p className="text-center text-gray-500">No post found.</p>;

  return (
    <>
      <div className="p-4 space-y-8 bg-gray-100 min-h-screen">
        <div className="bg-white border border-gray-300 rounded-lg shadow-md p-6">
          {/* Header Section */}
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
            <div>
              <h2 className="text-base font-semibold text-gray-800">{post.author || "No data"}</h2>
              <p className="text-xs text-gray-500">
                {new Date(post.date || "No data").toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Post Content */}
          <h1 className="text-lg font-bold text-gray-800 mb-2">{post.title || "No data"}</h1>
          <p className="text-sm text-gray-700 mb-4">{post.content || "No data"}</p>

          {/* Footer Section */}
          <div className="border-t border-gray-300 pt-4 flex justify-around text-gray-500">
            <button className="flex items-center space-x-2 hover:text-blue-500">
              <span className="material-icons">thumb_up</span>
              <span>Like</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-blue-500">
              <span className="material-icons">comment</span>
              <span>Comment</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-blue-500">
              <span className="material-icons">share</span>
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
