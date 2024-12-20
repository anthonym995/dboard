import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { blogsById } from "../../../api/blogs";
import Loader from "../../../components/ui/Loader";
import ErrorState from "../../../components/ui/ErrorState";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null); // Changed to `null` to reflect expected data structure
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPost = async () => {
    try {
      setIsLoading(true);
      const response = await blogsById(id);
      console.log('API Response:', response); // Debugging the API response
      if (response && response.status === 200 && response.data) {
        setPost(response.data); // Assuming response.data contains the post object
      } else {
        throw new Error("Failed to fetch post data");
      }
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

  return (
    <div className="p-4 space-y-8">
      <div className="bg-white border border-gray-300 rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{post.title}</h1>
        <p className="text-sm text-gray-700 mb-2">{post.content}</p>
        <p className="text-sm text-gray-600">
          <strong>Author:</strong> {post.author}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Date:</strong> {new Date(post.date).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
