import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { blogsById } from "../../../api/blogs";
import Loader from "../../../components/ui/Loader";
import ErrorState from "../../../components/ui/ErrorState";
import { GoThumbsdown, GoThumbsup } from "react-icons/go";
import { RiShareForwardFill } from "react-icons/ri";
import { FaRegCommentDots } from "react-icons/fa";



export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPost = async () => {
    try {
      setIsLoading(true);
      const data = await blogsById(id);
      if (!data) throw new Error("No data returned from the API.");
      setPost(data);
    } catch (err) {
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
  if (!post) return <p className="text-center text-gray-500">No posts found.</p>;

  const { title, content, author, status ,categories,tags} = post;
  
  return (
    <div className="p-4 space-y-8 bg-gray-100 min-h-screen">
      <div className="bg-white border border-gray-300 rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
          <div>
            <h2 className="text-base font-semibold text-gray-800">{author || "Unknown Author"}</h2>
            <p className="text-xs text-gray-500">{new Date().toLocaleDateString()}</p>
          </div>
        </div>
        <h1 className="text-lg font-bold text-gray-800 mb-2">{title || "Untitled Post"}</h1>
        <p className="text-sm text-gray-700 mb-4">{content || "No content available."}</p>
        <p className="text-sm text-gray-700 mb-4">{tags || "No content available."}</p>
        <p className="text-sm text-gray-700 mb-4">Status: {status || "N/A"}</p>
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
            <FaRegCommentDots />
            <span>Comment</span>
          </button>
          <button className="flex items-center space-x-2 hover:text-blue-500">
            <RiShareForwardFill />
            <span>Share</span>
          </button>
        </div>
  
      </div>
    </div>
  );
}